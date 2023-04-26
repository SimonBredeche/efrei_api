import jwt from 'jsonwebtoken';
import { eleveController } from '../controllers/eleve/controller.js';
import { professeurController } from '../controllers/professeur/controller.js';

export const loggingMiddleware = async(req, res, next) => {
    const { authorization: token } = req.headers;
    if(token != undefined){
        try{
        const {id,type} = jwt.verify(token, 'SECRET');
        if(type == "eleve"){
            req.eleve = await eleveController.methods.getEleveById({id: id})

        }else{
            req.professeur = await professeurController.methods.getProfesseurById({id: id})
        }
        }catch(e){}
    }
    next()
}
  