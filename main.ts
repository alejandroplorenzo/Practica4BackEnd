import express, { Request, Response } from "express";
import mongoose from "mongoose";
import {load} from "https://deno.land/std@0.204.0/dotenv/mod.ts";

import cambiarEstadoTarea from "./resolvers/cambiarEstadoTarea.ts";
import  contratarID  from "./resolvers/contratarID.ts";
import  deleteEmpresa  from "./resolvers/deleteEmpresa.ts";
import  deleteTarea  from "./resolvers/deleteTarea.ts";
import  deleteTrabajador  from "./resolvers/deleteTrabajador.ts";
import  despedirID  from "./resolvers/despedirID.ts";
import  getEmpresa  from "./resolvers/getEmpresa.ts";
import  getEmpresaID  from "./resolvers/getEmpresaID.ts";
import  getTarea  from "./resolvers/getTarea.ts";
import  getTareaID  from "./resolvers/getTareaID.ts";
import  getTrabajador  from "./resolvers/getTrabajador.ts";
import  getTrabajadorID  from "./resolvers/getTrabajadorID.ts";
import  postEmpresa  from "./resolvers/postEmpresa.ts";
import  postTarea  from "./resolvers/postTarea.ts";
import  postTrabajador  from "./resolvers/postTrabajador.ts";

const env = await load();
const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

try{
  await mongoose.connect(MONGO_URL);
  console.info("Se conecta bien a Mongo");
}catch(e){
  console.error(e);
}
const app = express();
app.use(express.json());
app
  // TRABAJADOR
  .get("/worker/:id", getTrabajadorID)
  .delete("/worker/:id", deleteTrabajador)
  .get("/worker", getTrabajador)
  .post("/worker", postTrabajador)

  // EMPRESA
  .get("/business/:id", getEmpresaID)
  .delete("/business/:id", deleteEmpresa)
  .get("/business", getEmpresa)
  .post("/business", postEmpresa)
  .put("/business/:id/fire/:workerId", despedirID)
  .put("/business/:id/hire/:workerId", contratarID)

  // TAREA
  .get("/task/:id", getTareaID)
  .delete("/task/:id", deleteTarea)
  .get("/task", getTarea)
  .post("/task", postTarea)
  .put("/task/:id?status=x ", cambiarEstadoTarea)

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});