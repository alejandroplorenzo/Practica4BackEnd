import mongoose from "mongoose";
import  {Empresa}  from "../types.ts";
import  {TrabajadorModel}  from "./Trabajador.ts";

const Schema = mongoose.Schema;

const EmpresaSchema = new Schema(
  {
    name: { type: String, required: true },
    trabajadores: [
      {type: Schema.Types.ObjectId, ref: "Trabajador", required: false, default: null},
    ],
  },
  { timestamps: true }
);

EmpresaSchema.path("trabajadores").validate(function (trabajadores:Array<mongoose.Schema.Types.ObjectId>) {
  if(trabajadores){
      if(trabajadores.length > 10){
          throw new Error('La empresa puede tener un maximo de 10 trabajadores');
      }
  }
  return true;
})

EmpresaSchema
.path("trabajadores")
.validate(async function (trabajadores: mongoose.Types.ObjectId[]) {
  try {
    if (trabajadores.some((id) => !mongoose.isValidObjectId(id))) return false;
    const trabajador = await TrabajadorModel.find({ _id: { $in: trabajadores } });
    return trabajador.length === trabajadores.length;
  } catch (e) {
    console.error(e);
    return false;
  }
});

export type EmpresaModelType = mongoose.Document & Omit<Empresa, "id" | "trabajadores"> & {
  trabajadores: Array<mongoose.Types.ObjectId>;
  };
  
export const EmpresaModel = mongoose.model<EmpresaModelType>("Empresa", EmpresaSchema);