import {Request, Response} from "express";
import { TareaModel, TareaModelType } from "../db/Tarea.ts";

const getTarea = async(_req:Request, res:Response<Array<TareaModelType> | {error : unknown}>) => {
    try{
        const tarea = await TareaModel.find({})
        .populate({path: "empresa", select: "name"}).populate({path: "trabajador", select: "name"}).exec(); 
        
        res.status(200).send(tarea);

    }catch(error){
        res.status(404).send(error.message);
        return;
    }
}

export default getTarea;