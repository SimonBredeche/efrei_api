export let typesSalle = `
  type salle {
    id: ID!
    nom: String,
    deleted: Boolean,
    cours: [cours]
  }
`