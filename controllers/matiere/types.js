export let typesMatiere = `
  type matiere {
    id: ID!
    deleted: Boolean
    nom: String
    coef: Int
    professeur: [professeur]
    matiere_classe: [matiere_classe]
    notes: [notes] 
  }
`