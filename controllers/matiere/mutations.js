export let mutationMatiere = `
createMatiere(nom: String,coef: Int): [matiere]
deleteMatiere(id: Int): [matiere]
updateMatiere(id: Int, nom: String, coef: Int): [matiere]
`