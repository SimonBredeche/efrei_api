export let mutationSalle = `
createSalle(nom: String): [salle]
deleteSalle(id: Int): [salle]
updateSalle(id: Int,nom: String): [salle]
`