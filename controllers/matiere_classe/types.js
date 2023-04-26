export let typesMatiereClasse = `
  type matiere_classe {
    id: ID!
    id_classe: Int
    id_matiere: Int
    deleted: Boolean
    classe: classe
    matiere: matiere
  }
`