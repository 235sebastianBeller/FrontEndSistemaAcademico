import { Component,inject ,OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {AsistenciaService} from '../../servicios/asistencia.service'
import {Asistencia} from '../../interfaces/asistencia'
import { MatSelectModule } from '@angular/material/select';
import {MateriaAsignadaDocente} from '../../interfaces/materia-asignada-docente';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { MensajeService } from '../mensaje/mensaje.component';
import Swal from 'sweetalert2';
import {InscripcionService} from '../../servicios/inscripcion.service'
import{Estudiante} from '../../interfaces/estudiante';
import {JsonPipe} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SelectionColorService } from '../../servicios/selection-color.service';
@Component({
  selector: 'app-registro-asistencia-docentes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './registro-asistencia-docentes.component.html',
  styleUrls: ['./registro-asistencia-docentes.component.sass']
})
export class RegistroAsistenciaDocentesComponent implements OnInit {
  selectedColor: string = '';
  isLoading = true;
  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  fechaInicio:Date=new Date();
  btnEditar: boolean = true;
  servicioAsistencias:AsistenciaService=inject(AsistenciaService);
  servicioInscripcion:InscripcionService=inject(InscripcionService);
  inscritos:Estudiante[]=[];
  asistenciasEstudiantes: {[key: string]: Asistencia[]|any}[]=[];

  materiaAsignada!:MateriaAsignadaDocente;
  // asistencias: any[]=[];
  filteredAsistencias: any[] = []; // Lista de asistencias filtradas

  displayedColumns: string[]=[] ;
  cambiosAsistencias: any[]=[];
  private readonly currentYear = new Date().getFullYear();
  readonly minDate = new Date(this.currentYear - 20, 0, 1);
  readonly maxDate = new Date(this.currentYear + 1, 11, 31);
  route:ActivatedRoute=inject(ActivatedRoute)
  idMateria!:number;
  constructor( private colorService: SelectionColorService,private mensajeService:MensajeService) {
    this.idMateria=this.route.snapshot.params['idMateria']
  }
  estaFechaEntreSemana(fecha:Date){
    let fechaInicio = new Date(this.fechaInicio);
    const diaSemana = fechaInicio.getDay();
    const diasAlLunes =  1 - diaSemana;
    fechaInicio.setDate(fechaInicio.getDate() + diasAlLunes);
    let fechaFin=new Date(fechaInicio)
    fechaFin.setDate(fechaFin.getDate()+5)
    return fecha>=fechaInicio && fecha<=fechaFin

  }
  filtrarAsistenciasEnFechas(asistencias:any){


    return asistencias.filter((asistencia:any)=>{
      let fecha=new Date(asistencia.fecha_asistencia+"T23:59:00")
      return this.estaFechaEntreSemana(fecha)
    });

  }

  filtrarFechas(event:MatDatepickerInputEvent<Date>){
    const fechaSeleccionada: Date | null = event.value;
    this.fechaInicio=fechaSeleccionada|| new Date();
    this.obtenerAsistencias()
  }

  obtenerAsistencias(){
    this.isLoading = true; 
    this.servicioAsistencias.getAsistenciasDeMateriaAsignada(this.idMateria).subscribe(
      (response: MateriaAsignadaDocente) => {
        this.materiaAsignada = response;
        this.materiaAsignada.asistencias=this.filtrarAsistenciasEnFechas(this.materiaAsignada.asistencias)

        this.asistenciasEstudiantes=this.servicioAsistencias.getAsistenciasAgrupadasPorEstudiante(this.materiaAsignada.asistencias)
        if(this.asistenciasEstudiantes.length==0){
        this.asistenciasEstudiantes=this.servicioAsistencias.getAsistenciasInscripcionAgrupadasPorEstudiante(this.materiaAsignada.inscripciones)
        ;
        }
        this.filtrarFechaColumnas();
        this.filteredAsistencias=this.asistenciasEstudiantes;
        this.isLoading = false; 

      },
      error => {
        console.error('Error en la petición GET:', error);
      }
    )
  }

  esMayor(fechaAnterior:string,fechaActual:string){
    let fechaAnt=new Date(fechaAnterior);
    let fechaAct=new Date(fechaActual);
    return fechaAnt.getTime()-fechaAct.getTime();
  }

  ngOnInit(): void {
   this.obtenerAsistencias();
   this.colorService.currentColor$.subscribe(color => {
    this.selectedColor = color; // Actualiza el color recibido
  });
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
  
  getEstadoAsistencia(asistencias: Asistencia[], fecha: string): string {

    return this.servicioAsistencias.getAsistenciaPorFecha(asistencias, fecha)?.estado ||"Falta" ;

  }
  crearNuevasAsistencias(fechaActual:Date,inscripciones:any){
    let nuevasAsistencias:Asistencia[]=[]
    for(let registro of inscripciones){
      let asistencia={
        fecha_asistencia: fechaActual.toISOString().split("T")[0],
        estado:"Falta"
       }
       let data:any={
        id_dicta:this.materiaAsignada.id_dicta,
        id_estudiante: registro.id_estudiante,
        estudiante: registro.estudiante,
        ...asistencia
      }
      nuevasAsistencias.push(data)
    }
    return nuevasAsistencias;

  }

  filtrarFechaColumnas(){
    let fechas:string[]= [...this.servicioAsistencias.getUniqueFechas()].sort(
      (fechaAnterior,fechaActual)=>{
      return this.esMayor(fechaAnterior,fechaActual);
    });
    this.displayedColumns=["nombre",...fechas]
  }

  esFechaRepetida(fechaActual:Date){
    if(this.displayedColumns.includes(fechaActual.toLocaleDateString())){
      this.mensajeService.mostrarMensajeError("Error!!","Fecha Repetida! La fecha que desea agregar ya existe.");
      return true
    }
    return false

  }

  esFechaValida(fechaActual:Date){
    if(!this.estaFechaEntreSemana(fechaActual)){
      this.mensajeService.mostrarMensajeError("Error!!","Fecha Incorrecta! La fecha no esta en el rango de dias habiles de la semana.");
      return false;
    }
    return true
  }

  agregarFecha(event: MatDatepickerInputEvent<Date>) {
    const fechaSeleccionada: Date | null = event.value;
    let fechaActual=fechaSeleccionada|| new Date();
    if(!this.esFechaValida(new Date(fechaActual.toISOString().split("T")[0]+"T23:59:59"))
      ||this.esFechaRepetida(fechaActual)
    ){
      return
    }
    let asistencias=this.crearNuevasAsistencias(fechaActual,this.materiaAsignada.inscripciones);
    this.servicioAsistencias.guardarAsistencias(asistencias).subscribe(
      (response: any[]) => {
        this.materiaAsignada.asistencias = this.materiaAsignada.asistencias || [];
        response=response.map(asistencia=>{
          asistencia.fecha_asistencia=asistencia.fecha_asistencia.split(" ")[0]
          return asistencia;
        })
        this.materiaAsignada.asistencias=[...response,...this.materiaAsignada.asistencias]
        this.asistenciasEstudiantes =this.servicioAsistencias.getAsistenciasAgrupadasPorEstudiante(this.materiaAsignada.asistencias) ;
        this.filteredAsistencias=this.asistenciasEstudiantes;
        this.filtrarFechaColumnas();
      },
      error => {
        console.error('Error en la petición POST:', error);
      }
    )

  }


  actualizarAsistencia(asistencias: Asistencia[], fecha: string, event: any) {

    let asistencia = asistencias.find(
      (a) => new Date(a.fecha_asistencia+"T23:59:59").toLocaleDateString() === fecha
    );

    if (asistencia) {
      asistencia.estado = event.value;
      this.cambiosAsistencias.push({
        id_asistencia: asistencia.id_asistencia,
        estado: asistencia.estado,
      });
    } else {
      console.log("No se encontró la asistencia para la fecha especificada.");
    }

    return event.value;
  }
  guardarCambios(){
    this.mensajeService.mostrarMensajeExito("¡Éxito","La fecha se ha guardado exitosamente")
    this.cambiosAsistencias.forEach(

      (cambios)=>{
        this.servicioAsistencias.actualizarAsistencia(cambios.id_asistencia,cambios).subscribe(
          (response: Asistencia) => {
          },
          error => {
            console.error('Error en la petición POST:', error);
          }
        )
      }
    )
  }


  editarFecha(fecha: string) {
    Swal.fire({
      title: 'Editar Fecha',
      input: 'date',
      inputLabel: `Fecha actual: ${fecha}`,
      inputValue: fecha,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      buttonsStyling: false,
      inputValidator: (value) => {
        if (!value ) {
          return 'Por favor, selecciona una fecha válida.';
        }
        return null;
      }
    }).then((result) => {
      if (result.isConfirmed && result.value ) {
        if(!this.esFechaValida(new Date(result.value+"T23:59:59"))
          || this.esFechaRepetida(new Date(result.value+"T23:59:59"))

        ){
          return
        }
        const nuevaFecha = result.value;

        // Actualizar displayedColumns con la nueva fecha si existe
        const index = this.displayedColumns.indexOf(fecha);
        if (index !== -1) {
          this.displayedColumns[index] = new Date(nuevaFecha+"T23:59:00").toLocaleDateString("en-US");
        }
        // Actualizar cada registro en asistencias con la nueva fecha
        for (let registro of this.asistenciasEstudiantes) {
          const asistencia = registro["asistencias"].find(
            (a: any) => new Date(a.fecha_asistencia + "T23:59:00").toLocaleDateString() === fecha
          );

          if (asistencia) {
            asistencia.fecha_asistencia = new Date(nuevaFecha).toISOString().split("T")[0]
            this.servicioAsistencias.actualizarAsistencia(asistencia.id_asistencia,asistencia).subscribe(
              (response: Asistencia) => {
              },
              error => {
                console.error('Error en la petición POST:', error);
              }
            )
          }
        }

        this.filtrarFechaColumnas();
      }
    });

    setTimeout(() => {
      const confirmButton = document.querySelector('.swal2-confirm') as HTMLElement;
      const cancelButton = document.querySelector('.swal2-cancel') as HTMLElement;

      if (confirmButton) {
        confirmButton.style.backgroundColor = '#dc3545'; 
        confirmButton.style.color = '#ffffff'; 
        confirmButton.style.border = 'none';
        confirmButton.style.padding = '8px 16px';
        confirmButton.style.borderRadius = '4px';
        confirmButton.style.fontSize = '14px';
        confirmButton.style.cursor = 'pointer';
        confirmButton.style.marginRight = '20px'; 
      }
    
      if (cancelButton) {
        cancelButton.style.backgroundColor = '#007bff'; 
        cancelButton.style.color = '#ffffff'; 
        cancelButton.style.border = 'none';
        cancelButton.style.padding = '8px 16px';
        cancelButton.style.borderRadius = '4px';
        cancelButton.style.fontSize = '14px';
        cancelButton.style.cursor = 'pointer';
      }
    }, 0);
  }

  eliminarFecha(fecha: string) {
    //const confirmacion = confirm(`¿Estás seguro de eliminar la fecha ${fecha}?`);
    this.mensajeService.mostrarMensajeConfirmacion(
      '¡Confirmación!',
      `¿Estás seguro de eliminar la fecha ${fecha}?`,
      ()=>{
       // if (confirmacion) {


       const index = this.displayedColumns.indexOf(fecha);
       if (index !== -1) {
         this.displayedColumns.splice(index, 1);
        }

        for (let registro of this.asistenciasEstudiantes) {
          const asistenciaIndex = registro["asistencias"].findIndex((a: Asistencia) =>{
            return new Date(a.fecha_asistencia+"T23:59:00").toLocaleDateString() == new Date(fecha).toLocaleDateString()
          }
        );
            if (asistenciaIndex !== -1) {
              let asistencia=registro["asistencias"][asistenciaIndex];
              registro["asistencias"].splice(asistenciaIndex, 1);
              this.servicioAsistencias.eliminarAsistencia(asistencia.id_asistencia).subscribe(
                (response: Asistencia) => {
                },
                error => {
                  console.error('Error en la petición POST:', error);
                }
              )
            }
          }
        }

    )

  }


  filtrarEstudiantes(event: Event) {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredAsistencias = this.asistenciasEstudiantes.filter((asistencia) =>
      asistencia["nombre"].toLowerCase().includes(input)
    );
  }

  get dataSource() {
    return this.filteredAsistencias;
  }
}