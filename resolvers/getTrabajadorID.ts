import {Request, Response} from "express";
import { TrabajadorModel, TrabajadorModelType } from "../db/Trabajador.ts";

const getTrabajador = async(req:Request<{id:string}>, res:Response<TrabajadorModelType | {error : unknown}>) => {
    try{
        const { id } = req.params;

        const trabajador = await TrabajadorModel.findById(id)
        .populate({path: "empresa", select: "name"}).populate({path: "tareas", select: "name"}).exec(); 

        if(!trabajador){
            res.status(404).send("Trabajador no encontrado");
            return;
        }

        res.status(200).send(trabajador); 
    }catch(error){
        res.status(404).send(error.message);
        return;
    }
}

export default getTrabajador;