import {Request, Response} from "express";
import { TrabajadorModel, TrabajadorModelType } from "../db/Trabajador.ts";

const getTrabajador = async(_req:Request, res:Response<Array<TrabajadorModelType> | {error : unknown}>) => {
    try{
        const trabajador = await TrabajadorModel.find({})
        .populate({path: "empresa", select: "name"}).populate({path: "tareas", select: "name estado"}).exec();     

        res.status(200).send(trabajador);
    }catch(error){
        res.status(404).send(error.message);
        return;
    }
}

export default getTrabajador;