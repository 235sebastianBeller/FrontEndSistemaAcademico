export interface Nota {
  id:number;
  fecha:Date;
  trimestre:number;
  tipo:string;
  nota:number;
  materiaAsignada:{
    id_dicta:number;
    fecha:Date;
  }
  estudiante:{
    id_estudiante:number;
    nombre:string;
    apellido:string;
    email:string;
    id_paralelo:number;
  }

}
