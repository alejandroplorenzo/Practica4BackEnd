import {Request, Response} from "express";
import { EmpresaModel, EmpresaModelType } from "../db/Empresa.ts";

const postEmpresa = async(req:Request<EmpresaModelType>, res:Response<string | {error:unknown}>) => {
    try{
        const {name} = req.body;

        const newempresa = new EmpresaModel({name});
        await newempresa.save();

        res.status(200).send({
            name: newempresa.name,
            id: newempresa._id.toString(),
        });

        res.status(201).send("Empresa creada");
    }catch(error){
        res.status(500).send(error.message);
        return;
    }
};

export default postEmpresa;