import { PrismaClient } from '@prisma/client'
import { mutationCours } from './mutations.js'
import { queryCours } from './query.js'
import { typesCours } from './types.js'
import { formatDate,stringToDate } from '../../utils/utils.js'

const prisma = new PrismaClient()

export let coursController = {
    types: typesCours,
    query: queryCours,
    mutations : mutationCours,
    methods: {
        getCours: async () => {
            let allCours = await prisma.cours.findMany({
                where: {
                    deleted: false
                },
                include: {
                    matiere: true,
                    professeur: true,
                    classe: true,
                    salle: true
                }
            })
            return allCours.map((cours) => {
                cours.debut = formatDate(cours.debut)
                cours.fin = formatDate(cours.fin)
                return cours;
            })
            
        },
        getCoursForClasse: async({id_classe,debut,fin}) => {
            let debut_formatted = stringToDate(debut)
            let fin_formatted = stringToDate(fin)

            let allCours = await prisma.cours.findMany({
                where: {
                    deleted: false,
                    id_classe: id_classe,
                    debut: { gte: debut_formatted },
                    fin: { lte: fin_formatted }
                },
                include: {
                    matiere: true,
                    professeur: true,
                    classe: true,
                    salle: true
                }
            })
            return allCours.map((cours) => {
                cours.debut = formatDate(cours.debut)
                cours.fin = formatDate(cours.fin)
                return cours;
            })

        },
        createCours: async({id_matiere,id_salle,id_classe,id_professeur,debut,fin}) => {
            
            let debut_formatted = stringToDate(debut)
            let fin_formatted = stringToDate(fin)
            
            await prisma.cours.create({
                data: {
                    id_matiere: id_matiere,
                    id_classe: id_classe,
                    id_salle: id_salle,
                    id_professeur: id_professeur,
                    debut: debut_formatted,
                    fin: fin_formatted
                }
            })
            return await coursController.methods.getCours();
        },
        updateCours: async({id,id_matiere,id_salle,id_classe,id_professeur,debut,fin}) => {
            await prisma.cours.update({
                where: {
                    id: id
                },
                data: {
                    id_matiere: id_matiere || undefined,
                    id_classe: id_classe || undefined,
                    id_salle: id_salle || undefined,
                    id_professeur: id_professeur || undefined,
                    debut: debut || undefined,
                    fin: fin || undefined
                }
            })
            return await coursController.methods.getCours();
        },
        deleteCours: async({id}) => {
            await prisma.cours.update({
                where: {
                    id: id
                },
                data: {
                    deleted: true
                }
            })
            return await coursController.methods.getCours();
        }
    }
}