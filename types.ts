export type Empresa = {
    id: string;
    name: string;
    trabajadores: Array<Omit<Trabajador, "empresa" | "tareas">>
};

export type Trabajador = {
    id: string;
    name: string;
    empresa: Omit<Empresa, "trabajadores">;
    tareas: Array<Omit<Tarea, "trabajador" | "empresa">>;
};

export type Tarea = {
    id: string;
    name: string;
    estado: Estado;
    trabajador: Omit<Trabajador, "tareas">;
    empresa: Omit<Empresa, "trabajadores">;
};

export type Estado = "TO DO" | "In Progress" | "In Test" | "Closed";

/*export enum Estado {
    ToDo = "To Do", //Ha de ser asi ya que lo que se ejecuta es js (no tipado) y mongoose no puede poner tipo Enum
    InProgress = "In Progress",
    InTest = "In Test",
    Closed = "Closed"
}*/