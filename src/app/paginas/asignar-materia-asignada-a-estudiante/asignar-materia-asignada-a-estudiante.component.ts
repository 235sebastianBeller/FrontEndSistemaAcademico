import { Component ,inject} from '@angular/core';
import { SelectionColorService } from '../../servicios/selection-color.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import{FormularioAsignarMateriaEstudianteComponent} from '../formulario-asignar-materia-estudiante/formulario-asignar-materia-estudiante.component';
import { MatDialog } from '@angular/material/dialog';
import { Profesor } from '../../interfaces/profesor';
import {EstudiantesAdminService} from '../../servicios/estudiantes-admin.service'
import {MensajeService} from '../mensaje/mensaje.component'
import {InscripcionService} from '../../servicios/inscripcion.service'
import type { Estudiante } from '../../interfaces/estudiante';


@Component({
  selector: 'app-asignar-materia-asignada-a-estudiante',
  standalone: true,
  imports: [CommonModule,FormsModule],

  templateUrl: './asignar-materia-asignada-a-estudiante.component.html',
  styleUrl: './asignar-materia-asignada-a-estudiante.component.sass'
})
export class AsignarMateriaAsignadaAEstudianteComponent {
  selectedColor: string = '';
  estudiantessAsignadosAMateria:any[]=[];
  id_dicta:number=0;
  route:ActivatedRoute=inject(ActivatedRoute);
  estudiantes:Estudiante[]=[];

  inscripcionesMateria:any[]=[];
  inscripcionesMateriaFiltradas:any[]=[];
  anios:string[]=[];
  anio:number=new Date().getFullYear();


  selectedYear: number = 2024;
  constructor(private colorService: SelectionColorService, private inscripcionService: InscripcionService,  private dialog: MatDialog,    private estudianteService: EstudiantesAdminService,
    private readonly mensajeService:MensajeService
  ){
    this.id_dicta=this.route.snapshot.params['id_dicta']
    this.selectedYear=this.route.snapshot.params['anio'];

  }

  actualizarDatos(){
    this.inscripcionService.obtenerInscripcionesDeMateriaAsignada(this.id_dicta).subscribe(
      response=>{

       
        this.inscripcionesMateria=response;
        this.inscripcionesMateriaFiltradas=response;
        this.filtrarEstudiantes();
        this.getEstudiantes()
      },
        error=>{
          console.log(error)
        }
      )
  }

  ngOnInit() {
    this.colorService.currentColor$.subscribe(color => {
      this.selectedColor = color; // Actualiza el color recibido
    });

    this.actualizarDatos();
        
         
      
  }



  filtrarEstudiantes(){
    this.estudiantessAsignadosAMateria=this.inscripcionesMateriaFiltradas.map((inscripcion)=>inscripcion.estudiante)
  }
  

  getEstudiantes(){
    this.estudianteService.obtenerListaEstudiantes().subscribe(
      response => {
        const estudiantesAsignados = this.estudiantessAsignadosAMateria;
        this.estudiantes = response.filter(estudiante =>
          !estudiantesAsignados.some(est => est.id_estudiante === estudiante.id_estudiante)
        );
      },
      error => {
        console.error(error);
      }
    );
  }
  getColorClass(): string {
    switch (this.selectedColor) {
      case 'verde':
        return 'color-verde';
      case 'amarillo':
        return 'color-amarillo';
      default:
        return 'color-azul';
    }
  }

  asignarEstudiante() {
    
    
    const dialogRef = this.dialog.open(FormularioAsignarMateriaEstudianteComponent, {
      width: '300px',
      data: 
      { fecha: `${this.selectedYear}-02-02T06:08:02.442Z`, estudiantes:this.estudiantes}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let inscripcion:any={
          id_dicta:this.id_dicta,
          id_estudiante:result.estudiante.id_estudiante,
          fecha_inscripcion:result.fecha.split("T")[0],
          anio:this.selectedYear
        }
        this.inscripcionService.asignarEstudiantes([inscripcion]).subscribe(
          response=>{
            this.actualizarDatos();
          },
          error=>{
            console.log(error)
          }
        )

      }
    });

  }

  desAsignar(estudiante:Estudiante){
    let id_eliminarInscr=this.inscripcionesMateriaFiltradas.filter((inscripcion) =>{
      return inscripcion.estudiante.id_estudiante==estudiante.id_estudiante && inscripcion.id_dicta==this.id_dicta && this.selectedYear==inscripcion.anio
    })[0].id_inscripcion
    this.mensajeService.mostrarMensajeConfirmacion("Confirmacion.","¿Estás seguro de que deseas desasignar la materia al estudiante? Esta acción no se puede deshacer.",()=>{
    this.inscripcionService.desAsignarEstudiante(id_eliminarInscr).subscribe(
      (response:any)=>{
        this.actualizarDatos();
        this.mensajeService.mostrarMensajeExito("Exito!!!","Estudiante eliminado de la materia con la informacion relacionada");
      },
      (error:any)=>{
        console.log(error)
        this.mensajeService.mostrarMensajesError("Error!!!",["Ocurrio un error al eliminar al estudiante de la materia"]);
      }
    )
  });


  }
}
