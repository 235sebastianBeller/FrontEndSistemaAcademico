import {Estudiante} from './estudiante';
import {MateriaAsignadaDocente} from './materia-asignada-docente';
export interface Asistencia {
    id_asistencia?: number;
    fecha_asistencia: Date;
    estado: string;
    id_dicta: number;
    id_estudiante: number;
    materiaAsignada?: any;
    fecha: string;
    estudiante?: Estudiante;

  }
