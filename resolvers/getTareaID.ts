import {Request, Response} from "express";
import { TareaModel, TareaModelType } from "../db/Tarea.ts";

const getTareaID = async(req:Request<{id:string}>, res:Response<TareaModelType | {error:unknown}>) => {
    try{
        const { id } = req.params;

        const tarea = await TareaModel.findById(id)
        .populate({path: "empresa", select: "name"}).populate({path: "trabajador", select: "name"}).exec(); 

        if(!tarea){
            res.status(404).send("Tarea no encontrada");
            return;            
        }

        res.status(200).json(tarea);
    }catch(error){
        res.status(404).send(error.message);
        return;
    }
}

export default getTareaID;