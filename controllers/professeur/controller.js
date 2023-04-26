import { PrismaClient } from '@prisma/client'
import { mutationProfesseur } from './mutations.js'
import { queryProfesseur } from './query.js'
import { hashedPassword,isValidPassword } from '../../utils/utils.js'
import { typesProfesseur } from './types.js'
import jwt from 'jsonwebtoken';


const prisma = new PrismaClient()

export let professeurController = {
    types: typesProfesseur,
    query: queryProfesseur,
    mutations : mutationProfesseur,
    methods: {
        getProfesseur: async () => {
            return await prisma.professeur.findMany({
                where: {
                    deleted: false
                },
                include: {
                    matiere: true
                }
            })
        },
        getProfesseurById: async({id}) => {
            return await prisma.professeur.findUnique({
                where: {
                    id: id
                },
                include: {
                    matiere: true
                }
            })
        },
        loginProfesseur : async({email,password}, input , context) => {
            let potentialMatch = await prisma.professeur.findFirst({
                where: {
                    deleted: false,
                    email: email 
                }
            })
            if(potentialMatch == null){
                return "invalid credentials"
            }else{
                if(isValidPassword(password,potentialMatch.password)){
                    let token = jwt.sign({ 
                        type: 'professeur',
                        id:  potentialMatch.id
                    }, 'SECRET');
                    return token
                }else{
                    return "invalid credentials"
                }
            }
        },
        getInfoLoggedProfesseur : async(params, input , context) => {
            if(input.professeur != undefined){
                return input.professeur
            }else{
                throw new Error('User not logged!');
            }
            
        },
        createProfesseur: async({id_matiere,nom,prenom,email,password}) => {
            let psw = await hashedPassword(password);
            await prisma.professeur.create({
                data: {
                    id_matiere: id_matiere,
                    nom: nom,
                    prenom: prenom,
                    email: email,
                    password: psw
                }
            })
            return await professeurController.methods.getProfesseur();
        },
        updateProfesseur: async({id,id_matiere,nom,prenom,email}) => {
            await prisma.professeur.update({
                where: {
                    id: id
                },
                data: {
                    id_matiere: id_matiere || undefined,
                    nom: nom || undefined,
                    prenom: prenom || undefined,
                    email: email || undefined
                }
            })
            return await professeurController.methods.getProfesseur();
        },
        deleteProfesseur: async({id}) => {
            await prisma.professeur.update({
                where: {
                    id: id
                },
                data: {
                    deleted: true
                }
            })
            return await professeurController.methods.getProfesseur();
        }
    }
}