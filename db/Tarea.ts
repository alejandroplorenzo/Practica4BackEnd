import mongoose from "mongoose";
import  {Tarea}  from "../types.ts";
import  {EmpresaModel}  from "./Empresa.ts";
import  {TrabajadorModel}  from "./Trabajador.ts";

const Schema = mongoose.Schema;

const tareaSchema = new Schema(
  {
    name: { type: String, required: true },
    trabajador: { type: Schema.Types.ObjectId, ref: "Trabajador", required: true },
    empresa: { type: Schema.Types.ObjectId, ref: "Empresa", required: true },
    estado: { type: String, required: true, enum: ["TO DO", "In Progress", "In Test", "Closed"] },
  },
  { timestamps: true }
);

tareaSchema
  .path("trabajador")
  .validate(async function (trabajadorID: mongoose.Types.ObjectId) {
    try {
      if (!mongoose.isValidObjectId(trabajadorID)) return false;
      const trabajador = await TrabajadorModel.findById(trabajadorID);
      if (!trabajador) return false;
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  });

tareaSchema
  .path("empresa")
  .validate(async function (empresaID: mongoose.Types.ObjectId) {
    try {
      if (!mongoose.isValidObjectId(empresaID)) return false;
      const empresa = await EmpresaModel.findById(empresaID);
      if (!empresa) return false;
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  });

  tareaSchema.post("save", async function (tarea:TareaModelType) {
    await TrabajadorModel.findByIdAndUpdate(
      tarea.trabajador, 
      {$push: {tareas: tarea._id}},
      { writeConcern: { w: 'majority' } }
      ).exec();
})

export type TareaModelType = mongoose.Document & Omit<Tarea, "id" | "trabajador" | "empresa"> & {
  trabajador: mongoose.Types.ObjectId;
  empresa: mongoose.Types.ObjectId;
};

export const TareaModel = mongoose.model<TareaModelType>("Tarea", tareaSchema);
