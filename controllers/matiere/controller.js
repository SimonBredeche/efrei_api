import { PrismaClient } from '@prisma/client'
import { mutationMatiere } from './mutations.js'
import { queryMatiere } from './query.js'
import { typesMatiere } from './types.js'

const prisma = new PrismaClient()

export let matiereController = {
    types: typesMatiere,
    query: queryMatiere,
    mutations : mutationMatiere,
    methods: {
        getMatiere: async () => {
            return await prisma.matiere.findMany({
                where: {
                    deleted: false
                }
            })
        },
        createMatiere: async({nom,coef}) => {
            await prisma.matiere.create({
                data: {
                    nom: nom,
                    coef:  coef
                }
            })
            return await matiereController.methods.getMatiere();
        },
        updateMatiere: async({id,nom,coef}) => {
            await prisma.matiere.update({
                where: {
                    id: id
                },
                data: {
                    nom: nom || undefined,
                    coef:  coef || undefined
                }
            })
            return await matiereController.methods.getMatiere();
        },
        deleteMatiere: async({id}) => {
            await prisma.matiere.update({
                where: {
                    id: id
                },
                data: {
                    deleted: true
                }
            })
            return await matiereController.methods.getMatiere();
        }
    }
}