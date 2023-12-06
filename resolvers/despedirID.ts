import {Request, Response} from "express";
import { EmpresaModel, EmpresaModelType } from "../db/Empresa.ts";
import  {TrabajadorModel}  from "../db/Trabajador.ts";

const despedirID = async(req:Request<{id:string, workerId:string}>, res:Response<EmpresaModelType | {error : unknown}>) => {
    try{
        const id  = req.params.id;
        const workerId = req.params.workerId;

        const empresa = await EmpresaModel.findById(id).exec();
        const trabajador = await TrabajadorModel.findById(workerId).exec();

        if(!empresa){
            res.status(404).send("Empresa no encontrada");
            return;
        }        

        if(!trabajador){
            res.status(404).send("Trabajador no encontrado");
            return;
        }

        const index = empresa.trabajadores.indexOf(workerId);
        if (index !== -1) {
            empresa.trabajadores.splice(index, 1);
        }

       await empresa.save();

        await TrabajadorModel.findOneAndUpdate(
            { _id: workerId },
            { $set: { empresa: null } },
            { writeConcern: { w: 'majority' } } 
          ).exec();


    }catch(error){
        res.status(500).send(error.message);
        return;
    }
};

export default despedirID;