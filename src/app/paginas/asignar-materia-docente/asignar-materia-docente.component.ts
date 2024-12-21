import { Component ,inject} from '@angular/core';
import { SelectionColorService } from '../../servicios/selection-color.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MateriasProfesorService} from '../../servicios/materias-profesor.service';
import { ActivatedRoute, Router } from '@angular/router';
import{FormularioAsignarMateriaDocenteComponent} from '../formulario-asignar-materia-docente/formulario-asignar-materia-docente.component';
import { MatDialog } from '@angular/material/dialog';
import { Profesor } from '../../interfaces/profesor';
import {ProfesorService} from '../../servicios/profesor.service'
import {MensajeService} from '../mensaje/mensaje.component'
@Component({
  selector: 'app-asignar-materia-docente',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './asignar-materia-docente.component.html',
  styleUrl: './asignar-materia-docente.component.sass'
})
export class AsignarMateriaDocenteComponent {
  selectedColor: string = '';
  profesoresAsignadosAMateria:any[]=[];
  id_materia:number=0;
  route:ActivatedRoute=inject(ActivatedRoute);
  profesores:Profesor[]=[];
  asignacionesMateria:any[]=[];
  asignacionesMateriaFiltradas:any[]=[];
  anios:string[]=[];



  constructor(private colorService: SelectionColorService, private materiasProfesorService: MateriasProfesorService,  private dialog: MatDialog,    private profesorService: ProfesorService,
    private readonly mensajeService:MensajeService
  ){
    this.id_materia=this.route.snapshot.params['id_materia']
  }

  actualizarDatos(){
    this.materiasProfesorService.obtenerMaterias().subscribe(
      response=>{
       
        this.asignacionesMateria=response;
        this.filtrarMateriasAnio();
        this.filtrarProfesores();
        this.filtrarAnios();
        this.getProfesores()
      },
        error=>{
          console.log(error)
        }
      )
  }

  ngOnInit() {
    this.colorService.currentColor$.subscribe(color => {
      this.selectedColor = color; // Actualiza el color recibido
      console.log('Color recibido en Login:', this.selectedColor);
    });

    this.actualizarDatos();
        
         
      
  }

  selectedYear: number = new Date().getFullYear();

  filtrarProfesores(){
    this.profesoresAsignadosAMateria=this.asignacionesMateriaFiltradas.map((materiaAsignada)=>materiaAsignada.profesor)
  }

  filtrarMateriasAnio(){
    this.asignacionesMateriaFiltradas=this.asignacionesMateria.filter((materiaAsignada)=>materiaAsignada.materia?.id_materia==this.id_materia && materiaAsignada.anio==this.selectedYear);
  }
  filtrarAnios(){
    this.anios=[...new Set(this.asignacionesMateria.map((materia)=>materia.anio.toString()))]
    if(!this.anios.includes(new Date().getFullYear().toString())){
        this.anios.push(new Date().getFullYear().toString());
    }
  }
  
  onYearChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedYear = +selectElement.value;
    this.filtrarMateriasAnio()
    this.filtrarProfesores();
    this.getProfesores();
  }

  getProfesores(){
    this.profesorService.getProfesores().subscribe(
      response => {
        const profesoresAsignados = this.profesoresAsignadosAMateria;
        this.profesores = response.filter(profesor =>
          !profesoresAsignados.some(profe => profe.id_profesor === profesor.id_profesor)
        );
        console.log("resp", response);
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

  asignarProfesor() {
    
    
    const dialogRef = this.dialog.open(FormularioAsignarMateriaDocenteComponent, {
      width: '300px',
      data: 
      { fecha: `${this.selectedYear}-02-02T06:08:02.442Z`, profesores:this.profesores}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        let materiaAsignada:any={
          // id_dicta:0,
          id_materia:+this.id_materia,
          id_profesor:+result.profesor.id_profesor,
          fecha:result.fecha.split("T")[0],
          anio:+this.selectedYear

        }
        console.log("ingresa",materiaAsignada);
        this.materiasProfesorService.agregarMateriaAsignada(materiaAsignada).subscribe(
          response=>{
            console.log("resp",response)
            this.actualizarDatos();
          },
          error=>{
            console.log(error)
          }
        )

      }
    });

  }

  desAsignar(profesor:Profesor){
    console.log(profesor.id_profesor)
    console.log(this.id_materia)
    let id_eliminarMatAsi=this.asignacionesMateriaFiltradas.filter((materia) =>{
      return materia.profesor.id_profesor==profesor.id_profesor && materia.id_materia==this.id_materia && this.selectedYear==materia.anio
    })[0].id_dicta
    this.mensajeService.mostrarMensajeConfirmacion("Confirmacion.","¿Estás seguro de que deseas desasignar la materia al docente? Esta acción no se puede deshacer.",()=>{
    this.materiasProfesorService.eliminarMateriaAsignada(id_eliminarMatAsi).subscribe(
      (response:any)=>{
        this.actualizarDatos();
        this.mensajeService.mostrarMensajeExito("Exito!!!","Docente eliminado de la materia con la informacion relacionada");
      },
      (error:any)=>{
        console.log(error)
        this.mensajeService.mostrarMensajeError("Error!!!","Ocurrio un error al eliminar al docente de la materia");
      }
    )

  });
  }

}
