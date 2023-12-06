import {Request, Response} from "express";
import  {TrabajadorModel, TrabajadorModelType}  from "../db/Trabajador.ts";


const postTrabajador = async(req:Request<TrabajadorModelType>, res:Response<string | {error:unknown}>) => {
    try{
        const {name} = req.body;

        const newtrabajador = new TrabajadorModel({name});
        await newtrabajador.save();

        res.status(200).send({
            name: newtrabajador.name,
            id: newtrabajador._id.toString(),
        });

        res.status(201).send("Trabajador creado");
    }catch(error){
        res.status(500).send(error.message);
        return;
    }
};

export default postTrabajador;