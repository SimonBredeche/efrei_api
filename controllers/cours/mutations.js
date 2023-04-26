export let mutationCours = `
createCours(id_matiere: Int,id_salle: Int,id_classe: Int,id_professeur: Int,debut: String,fin: String): [cours]
deleteCours(id: Int): [cours]
updateCours(id: Int,id_matiere: Int,id_salle: Int,id_classe: Int,id_professeur: Int,debut: String,fin: String): [cours]
`