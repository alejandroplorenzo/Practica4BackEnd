import {Request, Response} from "express";
import  {TrabajadorModel}  from "../db/Trabajador.ts";

const deleteTarea = async(
    req:Request<{id:string}>, 
    res:Response<string | {error:unknown}>
) => {
    const id = req.params.id;
    const Trabajador = await TrabajadorModel.findByIdAndDelete(id).exec();
    if (!Trabajador) {
      res.status(404).send({ error: "Trabajador no encontrado" });
      return;
    }
    res.status(200).send("Trabajador eliminado");

}

export default deleteTarea;