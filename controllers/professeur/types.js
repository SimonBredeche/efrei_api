export let typesProfesseur = `
  type professeur {
    id: ID!
    id_matiere: Int
    deleted: Boolean
    nom: String
    prenom: String
    email: String
    password: String
    matiere: matiere
  }
`