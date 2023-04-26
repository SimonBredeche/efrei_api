import express from "express"
import { graphqlHTTP } from "express-graphql"
import { buildSchema } from "graphql"
import { loggingMiddleware } from "./middleware/login.js"

import { matiereController } from "./controllers/matiere/controller.js"
import { professeurController } from "./controllers/professeur/controller.js"
import { classeController } from "./controllers/classe/controller.js"
import { matiereClasseController } from "./controllers/matiere_classe/controller.js"
import { eleveController } from "./controllers/eleve/controller.js"
import { notesController } from "./controllers/notes/controller.js"
import { salleController } from "./controllers/salle/controller.js"
import { coursController } from "./controllers/cours/controller.js"

let schema = buildSchema(`

  ${classeController.types}
  ${eleveController.types}
  ${matiereController.types}
  ${matiereClasseController.types}
  ${notesController.types}
  ${professeurController.types}
  ${coursController.types}
  ${salleController.types}

  type Query {
    ${matiereController.query}
    ${professeurController.query}
    ${classeController.query}
    ${matiereClasseController.query}
    ${eleveController.query}
    ${notesController.query}
    ${salleController.query}
    ${coursController.query}
  }

  type Mutation {
    ${matiereController.mutations}
    ${professeurController.mutations}
    ${classeController.mutations}
    ${matiereClasseController.mutations}
    ${eleveController.mutations}
    ${notesController.mutations}
    ${salleController.mutations}
    ${coursController.mutations}
  }

`)

let root = {
    ...matiereController.methods,
    ...professeurController.methods,
    ...classeController.methods,
    ...matiereClasseController.methods,
    ...eleveController.methods,
    ...notesController.methods,
    ...salleController.methods,
    ...coursController.methods
}


let app = express()
app.use(express.json());
app.use(loggingMiddleware);
app.use(
  "/graphql",
  graphqlHTTP(req => ({
    schema: schema,
    rootValue: root,
    graphiql: true,
    context: req
  }))
)
app.listen(4000)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")


/**
 * 
 * objet: [X-MAX-DEV-4-1][GRAPHQL] BREDECHE Simon
 * email : melvin.bisson@andn-services.fr
 * 
 * 14 mai 2023
 */