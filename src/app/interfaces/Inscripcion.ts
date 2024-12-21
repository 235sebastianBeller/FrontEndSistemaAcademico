import { Materia } from "./materia";
import { Estudiante } from "./estudiante";
export interface MateriaAsignada {
    id_dicta: number;
    fecha: string;
    materia: Materia;
  }
  
  export interface Inscripcion {
    id_inscripcion: number;
    fecha_inscripcion: string;
    id_estudiante: number;
    id_dicta: number;
    estudiante: Estudiante;
    materiaAsignada: MateriaAsignada;
  }
  