export let mutationEleve = `
createEleve(id_classe: Int,nom: String,prenom: String,email: String,password: String): [eleve]
deleteEleve(id: Int): [eleve]
updateEleve(id: Int,id_classe: Int,nom: String,prenom: String,email: String,password: String): [eleve]
`