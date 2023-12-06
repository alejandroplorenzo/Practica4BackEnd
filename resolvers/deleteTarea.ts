import {Request, Response} from "express";
import  {TareaModel}  from "../db/Tarea.ts";

const deleteTarea = async(
    req:Request<{id:string}>, 
    res:Response<string | {error:unknown}>
) => {
    const id = req.params.id;
    const tarea = await TareaModel.findByIdAndDelete(id).exec();
    if (!tarea) {
      res.status(404).send({ error: "Tarea no encontrada" });
      return;
    }
    res.status(200).send("Tarea eliminada");

}

export default deleteTarea;