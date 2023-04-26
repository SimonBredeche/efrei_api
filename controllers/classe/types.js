export let typesClasse = `
  type classe {
    id: ID!
    nom: String
    deleted: Boolean
    eleve: [eleve]
    matiere_classe: [matiere_classe]
  }
`