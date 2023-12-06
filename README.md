# Practica4BackEnd
Los endpoins necesarios seguirán el siguiente path:
/worker/:id -> Devolverá el trabajador que corresponde al id
/business/:id -> Devolverá la empresa que corresponde al id
/task/:id -> Devolverá la tarea que corresponde al id
/worker/:id -> Eliminará el trabajador que corresponde al id
/business/:id -> Eliminará la empresa que corresponde al id
/task/:id -> Eliminará la tarea que corresponde al id
/worker - > Deberá devolver todos los trabajadores
/business - > Deberá devolver todas las empresas
/task- > Deberá devolver todas las tareas
/worker - > Deberá crear un trabajador
/business - > Deberá crear una empresa
/task- > Deberá crear una tarea
/business/:id/fire/:workerId -> Deberá despedir de la empresa al trabajador que corresponde al id
/business/:id/hire/:workerId -> Deberá contratar de la empresa al trabajador que corresponde al id
/task/:id?status=x -> Cambiara el estado de una tarea
