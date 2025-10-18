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

export type  ShopData = {
  barrio_id: number;
  ciudad: string;
  creado_en: string;
  dias_laborales: string[];
  direccion: string;
  duracion_turno: number;
  horario_fin: string;
  horario_inicio: string;
  id: number;
  latitud: number;
  longitud: number;
  nombre_taller: string;
  usuario_id: number
}