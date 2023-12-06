import {Request, Response} from "express";
import { EmpresaModel, EmpresaModelType } from "../db/Empresa.ts";

const getEmpresaID = async(req:Request<{id:string}>, res:Response<EmpresaModelType | {error : unknown}>) => {
    try{
        const { id } = req.params;

        const empresa = await EmpresaModel.findById(id)
        .populate({path: "trabajadores", select: "name"}).exec(); 
        
        if(!empresa){
            res.status(404).send("Empresa no encontrada");
            return;
        }

        res.status(200).send(empresa); 
    }catch(error){
        res.status(404).send(error.message);
        return;
    }
}

export default getEmpresaID;