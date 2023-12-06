import mongoose from "mongoose";
import {Trabajador} from "../types.ts";
//import  {EmpresaModel}  from "./Empresa.ts";
import  {TareaModel}  from "./Tarea.ts";


const Schema = mongoose.Schema;

const trabajadorSchema = new Schema(
  {
    name: { type: String, required: true },
    empresa: { type: Schema.Types.ObjectId, ref: "Empresa", required: false},
    tareas: [
      { type: Schema.Types.ObjectId, ref: "Tarea", required: false, default: null }
    ],
  },
  { timestamps: true }
);

/*trabajadorSchema
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
  });*/

trabajadorSchema.path("name").validate(function (name:string) {
    if(!name){
      console.error("Nombre no introducido");
      return false;
    }
    return true;
})


  trabajadorSchema.path("tareas").validate(function (tareaID:Array<mongoose.Schema.Types.ObjectId>) {
    if(tareaID){
        if(tareaID.length > 10){
            throw new Error('El trabajador no puede tener mas de 10 tareas');
        }
    }
    return true;
})

  trabajadorSchema
  .path("tareas")
  .validate(async function (tareaID: mongoose.Types.ObjectId[]) {
    try {
      if (tareaID.some((id) => !mongoose.isValidObjectId(id))) return false;

      const tarea = await TareaModel.find({ _id: { $in: tareaID } });
      return tarea.length === tareaID.length;
    } catch (e) {
      console.error(e);
      return false;
    }
  });

  trabajadorSchema.post("findOneAndDelete", async function (trabajador:TrabajadorModelType) {
    await TareaModel.deleteMany({trabajador: trabajador._id});
  });

export type TrabajadorModelType = mongoose.Document & Omit<Trabajador, "id" | "empresa" | "tareas"> & {
  empresa: mongoose.Types.ObjectId;
  tareas: Array<mongoose.Types.ObjectId>;
};


export const TrabajadorModel = mongoose.model<TrabajadorModelType>("Trabajador", trabajadorSchema);
