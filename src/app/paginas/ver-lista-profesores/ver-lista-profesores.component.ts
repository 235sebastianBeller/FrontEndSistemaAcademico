import { Component, OnInit } from '@angular/core';
import { Profesor } from '../../interfaces/profesor';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ProfesorService } from '../../servicios/profesor.service';
import { MatDialog } from '@angular/material/dialog';
import { FormEditarProfesorComponent } from '../form-editar-profesor/form-editar-profesor.component';
import { SelectionColorService } from '../../servicios/selection-color.service';
import { FormCrearProfesorComponent } from '../form-crear-profesor/form-crear-profesor.component';
import {MensajeService} from '../mensaje/mensaje.component'


@Component({
  selector: 'app-ver-lista-profesores',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './ver-lista-profesores.component.html',
  styleUrl: './ver-lista-profesores.component.sass'
})
export class VerListaProfesoresComponent implements OnInit {
  selectedColor: string = '';
  profesores: Profesor[] = [];
  profesoresFiltrados: Profesor[] = [];
  terminoBusqueda: string = '';
  profesorSeleccionado: Profesor | null = null; 

  constructor(private colorService: SelectionColorService,
    private profesorService: ProfesorService,public dialog: MatDialog,
    private readonly mensajeService:MensajeService
  
  ) {}


  ngOnInit(): void {
    this.getProfesores();
    this.colorService.currentColor$.subscribe(color => {
      this.selectedColor = color;
    });
  }

  getProfesoresFiltrados(){
    return [...this.profesoresFiltrados].reverse();
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
  
  getProfesores() {
    this.profesorService.getProfesores().subscribe(
      (data: Profesor[]) => {
        this.profesores = data;
        this.profesoresFiltrados=data;
      },
      (error) => {
        console.error('Error al obtener los profesores:', error);
      }
    );
  }
  editarProfesor(profesor: Profesor) {
    const dialogRef = this.dialog.open(FormEditarProfesorComponent, {
      width: '300px',
      data: profesor
    });

    dialogRef.afterClosed().subscribe((result: Profesor | undefined) => {
      if (result) {
        this.mensajeService.mostrarMensajeConfirmacion("Confirmacion.","Estas seguro que quieres editar al profesor?",()=>{
        this.actualizarProfesor(result.id_profesor, result);
        });
      }
    });
  }
  
  actualizarProfesor(id: number, profesorData: Partial<Profesor>) {
    delete profesorData.id_profesor;
    this.profesorService.updateProfesor(id, profesorData).subscribe(
      (updatedProfesor) => {
        this.getProfesores();
        this.mensajeService.mostrarMensajeExito("Exito!!!","Se actualizo correctamente al profesor!!")
      },
      (error) => {
        console.error('Error al actualizar el profesor:', error);
        this.mensajeService.mostrarMensajesError("Error!!",error.error.message);
      }
    );
  }
  filtrarProfesores(): void {
    const termino = this.terminoBusqueda.toLowerCase(); 
    this.profesoresFiltrados = this.profesores.filter(profesor =>
      profesor.nombre.toLowerCase().includes(termino) ||
      profesor.apellido.toLowerCase().includes(termino) 
    );
  }
 
  cancelarEdicion() {
    this.profesorSeleccionado = null;
  }
  crearProfesor() {
    const nuevoProfesor: Partial<Profesor> = {  nombre: '', apellido: '', email: ''};
    const dialogRef = this.dialog.open(FormCrearProfesorComponent, {
      width: '300px',
      data: nuevoProfesor
    });

    dialogRef.afterClosed().subscribe((result: Profesor | undefined) => {
      if (result) {
        this.mensajeService.mostrarMensajeConfirmacion("Confirmacion.","Estas seguro que quieres agregar al profesor?",()=>{
        this.profesorService.addProfesor(result).subscribe(
          () => {
            this.getProfesores();
            this.mensajeService.mostrarMensajeExito("Exito!!!","Se agrego correctamente al profesor!!")
          }
            ,
          (error) => {
            console.error('Error al añadir el profesor:', error)
            this.mensajeService.mostrarMensajesError("Error!!",error.error.message);
          }
        );
      });

      }
    });
  }
  eliminarProfesor(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este profesor?')) {
      this.profesorService.deleteProfesor(id).subscribe({
        next: () => {
          this.getProfesores();
        },
        error: (error) => {
          console.error('Error al eliminar el profesor:', error);
        },
      });
    }
  }
  
  
}
