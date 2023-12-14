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
