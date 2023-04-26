export let mutationNotes= `
createNotes(id_eleve: Int,id_matiere: Int,note: Int): [notes]
deleteNotes(id: Int): [notes]
updateNotes(id: Int, id_eleve: Int,id_matiere: Int,note: Int): [notes]
`