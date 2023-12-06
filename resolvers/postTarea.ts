import {Request, Response} from "express";
import { TareaModel, TareaModelType } from "../db/Tarea.ts";


const postTarea = async(req:Request<TareaModelType>, res:Response<string | {error:unknown}>) => {
    try{
        const {name, trabajador, empresa, estado } = req.body;

        const newtarea = new TareaModel({name, estado, empresa, trabajador}); 
        await newtarea.save(); 
        
        res.status(200).send({
            name: newtarea.name,
            trabajador: newtarea.trabajador,
            empresa: newtarea.empresa,
            estado: newtarea.estado,
            id: newtarea._id.toString(),
          });

    }catch(error){
        res.status(500).send(error.message);
        return;
    }
}

export default postTarea;