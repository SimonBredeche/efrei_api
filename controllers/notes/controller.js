import { PrismaClient } from '@prisma/client'
import { mutationNotes } from './mutations.js'
import { queryNotes} from './query.js'
import { typesNotes } from './types.js'

const prisma = new PrismaClient()

export let notesController = {
    types: typesNotes,
    query: queryNotes,
    mutations : mutationNotes,
    methods: {
        getNotes: async () => {
            return await prisma.notes.findMany({
                where: {
                    deleted: false
                },
                include: {
                    eleve: true,
                    matiere: true
                }
            })
        },
        createNotes: async({id_eleve,id_matiere,note}) => {
            await prisma.notes.create({
                data: {
                    id_eleve: id_eleve,
                    id_matiere:  id_matiere,
                    note: note
                }
            })
            return await notesController.methods.getNotes();
        },
        updateNotes: async({id,id_eleve,id_matiere,note}) => {
            await prisma.notes.update({
                where: {
                    id: id
                },
                data: {
                    id_eleve: id_eleve || undefined,
                    id_matiere:  id_matiere || undefined,
                    note: note || undefined
                }
            })
            return await notesController.methods.getNotes();
        },
        deleteNotes: async({id}) => {
            await prisma.notes.update({
                where: {
                    id: id
                },
                data: {
                    deleted: true
                }
            })
            return await notesController.methods.getNotes();
        }
    }
}