import {Paralelo} from "./paralelo";
import {Profesor} from './profesor'

export interface Materia {
licencias?: any;
asistencias?: any;
faltas?: any;
profesor?: number;
imagen?: any;
materia?: any;
id?: number;
id_materia?: number;
nombre: string;
area: string ;
paralelo: Paralelo;
id_paralelo:number;
profesorAsignado?:Profesor;
}
