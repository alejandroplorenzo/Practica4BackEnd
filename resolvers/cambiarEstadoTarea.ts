import {Request, Response} from "express";
import  {TareaModel} from "../db/Tarea.ts";

const cambiarEstadoTarea = async(req:Request<{tareaID:string}>, res:Response<string | {error : unknown}>) => {
    try{
        const tareaID = req.params.tareaID;
        const estado = req.body.estado;

        const tarea = await TareaModel.findById(tareaID).exec();

        if(!tarea){
            res.status(404).send("Tarea no encontrada");
            return;
        }

        await TareaModel.findByIdAndUpdate(tareaID, {estado: estado}, {runValidators: true}).exec();
    }catch(error){
        res.status(500).send(error.message);
        return;
    }
};

export default cambiarEstadoTarea;