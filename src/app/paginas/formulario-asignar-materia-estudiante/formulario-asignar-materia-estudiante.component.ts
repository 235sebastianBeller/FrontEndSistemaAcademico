import { Component ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; 
import {Estudiante} from '../../interfaces/estudiante';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MensajeService} from '../mensaje/mensaje.component'
import { SelectionColorService } from '../../servicios/selection-color.service';
import {OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@Component({
  selector: 'app-formulario-asignar-estudiantes',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatDialogModule, 
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './formulario-asignar-materia-estudiante.component.html',
  styleUrls: ['./formulario-asignar-materia-estudiante.component.sass'],
})
export class FormularioAsignarMateriaEstudianteComponent {
  selectedColor: string = '';
  estudiante?: Estudiante;
  estudiantees: Estudiante[];
  filteredEstudiantes?: Observable<string[]>;

  fecha:Date;

  myControl = new FormControl('');
  
  constructor(
    private colorService: SelectionColorService,
    public dialogRef: MatDialogRef<FormularioAsignarMateriaEstudianteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private readonly mensajeService:MensajeService
  ) {
    this.estudiantees= data.estudiantes || '';
    this.fecha = data.fecha || new Date();
  }

  ngOnInit() {
    this.filteredEstudiantes = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );


    this.colorService.currentColor$.subscribe(color => {
      this.selectedColor = color; // Actualiza el color recibido
    });
  }
  getNombreCompleto(estudiante:Estudiante){
      return estudiante.nombre+" "+estudiante.apellido;
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    let ests= this.estudiantees.filter(est => this.getNombreCompleto(est).toLowerCase().includes(filterValue));
    if(value){
      this.estudiante=ests[0];
    }

    return ests.map(
      est =>this.getNombreCompleto(est)
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
  
  onAdd() {
    if(!this.estudiante){
      this.mensajeService.mostrarMensajesError("Error!!",["Debe asignar un estudiante para la materia"]);
      return;
    }
    this.dialogRef.close({
      estudiante: this.estudiante,
      fecha: this.fecha,
    });
    this.mensajeService.mostrarMensajeExito("Exito!!","Se asigno al estudiante con exito!!")
  }

  onCancel() {
    this.dialogRef.close();
  }

}
