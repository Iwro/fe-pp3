export type User = {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    rol_id: number;
  };

export type Mecanico = {
    id: number;
    nombre_taller: string;
    ciudad: string;
    direccion: string;
    // cualquier otro campo que uses
  };