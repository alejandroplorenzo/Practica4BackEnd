import {Request, Response} from "express";
import { EmpresaModel, EmpresaModelType } from "../db/Empresa.ts";

const getEmpresa = async(_req:Request, res:Response<Array<EmpresaModelType> | {error : unknown}>) => {
    try{
        const empresa = await EmpresaModel.find({}).populate({path: "trabajadores", select: "name"}).exec(); 
        res.status(200).send(empresa);

    }catch(error){
        res.status(404).send(error.message);
        return;
    }
}
export default getEmpresa;