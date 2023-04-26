import { PrismaClient } from '@prisma/client'
import { mutationMatiereClasse } from './mutations.js'
import { queryMatiereClasse } from './query.js'
import { typesMatiereClasse } from './types.js'

const prisma = new PrismaClient()

export let matiereClasseController = {
    types: typesMatiereClasse,
    query: queryMatiereClasse,
    mutations : mutationMatiereClasse,
    methods: {
        getMatiereClasse: async () => {
            return await prisma.matiere_classe.findMany({
                where: {
                    deleted: false
                },
                include: {
                    classe: true,
                    matiere: true
                }
            })
        },
        createMatiereClasse: async({id_classe,id_matiere}) => {
            await prisma.matiere_classe.create({
                data: {
                    id_classe: id_classe,
                    id_matiere:  id_matiere
                }
            })
            return await matiereClasseController.methods.getMatiereClasse();
        },
        updateMatiereClasse: async({id,id_classe,id_matiere}) => {
            await prisma.matiere_classe.update({
                where: {
                    id: id
                },
                data: {
                    id_classe: id_classe || undefined,
                    id_matiere:  id_matiere || undefined
                }
            })
            return await matiereClasseController.methods.getMatiereClasse();
        },
        deleteMatiereClasse: async({id}) => {
            await prisma.matiere_classe.update({
                where: {
                    id: id
                },
                data: {
                    deleted: true
                }
            })
            return await matiereClasseController.methods.getMatiereClasse();
        }
    }
}