export let typesCours = `
  type cours {
    id: ID!
    id_matiere: Int,
    id_salle: Int,
    id_classe: Int,
    id_professeur: Int,
    debut: String,
    fin: String,
    salle: salle,
    matiere: matiere,
    classe: classe,
    professeur: professeur
  }
`