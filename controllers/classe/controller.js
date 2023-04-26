import { PrismaClient } from '@prisma/client'
import { mutationClasse } from './mutations.js'
import { queryClasse } from './query.js'
import { typesClasse } from './types.js'

const prisma = new PrismaClient()

export let classeController = {
    types: typesClasse,
    query: queryClasse,
    mutations : mutationClasse,
    methods: {
        getClasse: async () => {
            return await prisma.classe.findMany({
                where: {
                    deleted: false
                },
                include: {
                    eleve: true,
                    matiere_classe: {
                        include: {
                            matiere: true,
                        }
                    }
                }
            })
        },
        createClasse: async({nom}) => {
            await prisma.classe.create({
                data: {
                    nom: nom
                }
            })
            return await classeController.methods.getClasse();
        },
        updateClasse: async({id,nom}) => {
            await prisma.classe.update({
                where: {
                    id: id
                },
                data: {
                    nom: nom || undefined
                }
            })
            return await classeController.methods.getClasse();
        },
        deleteClasse: async({id}) => {
            await prisma.classe.update({
                where: {
                    id: id
                },
                data: {
                    deleted: true
                }
            })
            return await classeController.methods.getClasse();;
        }
    }
}