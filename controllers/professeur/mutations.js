export let mutationProfesseur = `
createProfesseur(id_matiere: Int,nom: String,prenom: String,email: String,password: String): [professeur]
deleteProfesseur(id: Int): [professeur]
updateProfesseur(id: Int, id_matiere: Int,nom: String,prenom: String,email: String,password: String): [professeur]
`