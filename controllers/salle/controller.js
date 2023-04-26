import { PrismaClient } from '@prisma/client'
import { mutationSalle } from './mutations.js'
import { querySalle } from './query.js'
import { typesSalle } from './types.js'

const prisma = new PrismaClient()

export let salleController = {
    types: typesSalle,
    query: querySalle,
    mutations : mutationSalle,
    methods: {
        getSalle: async () => {
            return await prisma.salle.findMany({
                where: {
                    deleted: false
                }
            })
        },
        createSalle: async({nom}) => {
            await prisma.salle.create({
                data: {
                    nom: nom
                }
            })
            return await salleController.methods.getSalle();
        },
        updateSalle: async({id,nom}) => {
            await prisma.salle.update({
                where: {
                    id: id
                },
                data: {
                    nom: nom || undefined
                }
            })
            return await salleController.methods.getSalle();
        },
        deleteSalle: async({id}) => {
            await prisma.salle.update({
                where: {
                    id: id
                },
                data: {
                    deleted: true
                }
            })
            return await salleController.methods.getSalle();
        }
    }
}