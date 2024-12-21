import { Component } from '@angular/core';
import {MateriaService} from '../../servicios/materia.service';
import {Materia} from '../../interfaces/materia';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MensajeService } from '../mensaje/mensaje.component';
import {FormularioAgregarMateriaComponent} from '../formulario-agregar-materia/formulario-agregar-materia.component';
import {ParaleloService} from '../../servicios/paralelo.service';
import {Paralelo} from '../../interfaces/paralelo'
import type { Profesor } from '../../interfaces/profesor';
import {MateriasProfesorService} from '../../servicios/materias-profesor.service'
import { Estudiante } from '../../interfaces/estudiante';
import { SelectionColorService } from '../../servicios/selection-color.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-materias-administrador',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './materias-administrador.component.html',
  styleUrl: './materias-administrador.component.sass'
})
export class MateriasAdministradorComponent {
  selectedColor: string = '';
  materias:Materia[]=[];
  paralelos:Paralelo[]=[];
  searchTerm: string = '';
  profesores:Profesor[]=[];
  estudiantes:Estudiante[]=[];

  constructor(
    private colorService: SelectionColorService,
    private servicioMaterias: MateriaService,
    private dialog: MatDialog,
    private mensajeService: MensajeService,
    private paraleloService: ParaleloService,
    private materiasProfesorService: MateriasProfesorService,
  ){
    servicioMaterias.getMaterias().subscribe(
      response=>{
        this.materias=response;
        let materiasProfesores:any=[];
      },
      error=>{
        console.log(error)
      }
    )
    paraleloService.getParalelo().subscribe(
      response=>{
        this.paralelos=response;
      },
      error=>{
        console.log(error)
      }
    )

  }

  addNewMateria() {
    const dialogRef = this.dialog.open(FormularioAgregarMateriaComponent, {
      width: '300px',
      data: 
      { name: '', paralelos: this.paralelos }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let materia:any={
          nombre:result.name,
          id_paralelo:+result.paralelo.id_paralelo,
        }
        this.servicioMaterias.postMateria(materia).subscribe(
          response=>{
            materia.id_materia=response.id_materia || 0
            materia.id=response.id_materia || 0
            materia.paralelo=result.paralelo
            this.materias.push(materia)
            this.mensajeService.mostrarMensajeExito("Exito!!","Se agrego correctamente la materia.");
          },
          error=>{
            console.log(error);
            this.mensajeService.mostrarMensajesError("Error!!",error.error.message);

          }
        )
      }
    });

  }

  ngOnInit() {
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

  

  
  get filteredMaterias(): Materia[] {
    return this.materias.filter(materia =>
      materia.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }





}
