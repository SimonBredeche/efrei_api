export let typesEleve = `
  type eleve {
    id: ID!
    id_classe: Int
    nom: String
    deleted: Boolean
    prenom: String
    email: String
    password: String
    classe: classe
    notes: [notes]
  }
`