import {Request, Response} from "express";
import  {EmpresaModel}  from "../db/Empresa.ts";

const deleteEmpresa = async(
    req:Request<{id:string}>, 
    res:Response<string | {error:unknown}>
) => {
    const id = req.params.id;
    const empresa = await EmpresaModel.findByIdAndDelete(id).exec();
    if (!empresa) {
      res.status(404).send({ error: "Empresa no encontrada" });
      return;
    }
    res.status(200).send("Empresa eliminada");

}

export default deleteEmpresa;