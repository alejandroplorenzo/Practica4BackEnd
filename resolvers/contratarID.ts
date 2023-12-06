
import {Request, Response} from "express";
import  {EmpresaModel}  from "../db/Empresa.ts";
import {TrabajadorModel}  from "../db/Trabajador.ts";

const contratarID = async(req:Request<{id:string, workerId:string}>, res:Response<string | {error : unknown}>) => {
    try{
        const id  = req.params.id;
        const  workerId = req.params.workerId;

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

        if(trabajador.empresa !== null){
            res.status(404).send("Trabajador ya contratado en esa empresa");
            return;
        }

          await EmpresaModel.findOneAndUpdate(
            { _id: id },
            { $push: { trabajadores: workerId } },
            { runValidators: true, writeConcern: { w: 'majority' } }
          ).exec();   

          await TrabajadorModel.findOneAndUpdate(
            { _id: workerId },
            { $set: { empresa: empresa?._id } },
            { writeConcern: { w: 'majority' } } 
          ).exec();
  

    }catch(error){
        res.status(500).send(error.message);
        return;
    }
}
export default contratarID;