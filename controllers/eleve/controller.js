import { PrismaClient } from '@prisma/client'
import { mutationEleve } from './mutations.js'
import { queryEleve } from './query.js'
import { typesEleve } from './types.js'
import { hashedPassword,isValidPassword } from '../../utils/utils.js'
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient()

export let eleveController = {
    types : typesEleve,
    query: queryEleve,
    mutations : mutationEleve,
    methods: {
        getEleve: async () => {
            return await prisma.eleve.findMany({
                where: {
                    deleted: false
                },
                include: {
                    notes: {
                        include:{
                            matiere: true
                        }
                    },
                    classe: true
                }
            })
        },
        getEleveById: async({id}) => {
            return await prisma.eleve.findUnique({
                where: {
                    id: id
                },
                include: {
                    notes: {
                        include:{
                            matiere: true
                        }
                    },
                    classe: true
                }
            })
        },
        loginEleve : async({email,password}, input , context) => {
            let potentialMatch = await prisma.eleve.findFirst({
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
                        type: 'eleve',
                        id:  potentialMatch.id
                    }, 'SECRET');
                    return token
                }else{
                    return "invalid credentials"
                }
            }
        },
        getInfoLoggedEleve : async(params, input , context) => {
            if(input.eleve != undefined){
                return input.eleve
            }else{
                throw new Error('User not logged!');
            }
            
        },
        createEleve: async({id_classe,nom,prenom,email,password}) => {
            let psw = await hashedPassword(password);
            await prisma.eleve.create({
                data: {
                    id_classe: id_classe,
                    nom:  nom,
                    prenom: prenom,
                    email: email,
                    password: psw
                }
            })
            return await eleveController.methods.getEleve();
        },
        updateEleve: async({id,id_classe,nom,prenom,email}) => {
            await prisma.eleve.update({
                where: {
                    id: id
                },
                data: {
                    id_classe: id_classe || undefined,
                    nom:  nom || undefined,
                    prenom: prenom || undefined,
                    email: email || undefined
                }
            })
            return await eleveController.methods.getEleve();
        },
        deleteEleve: async({id}) => {
            await prisma.eleve.update({
                where: {
                    id: id
                },
                data: {
                    deleted: true
                }
            })
            return await eleveController.methods.getEleve();
        }
    }
}