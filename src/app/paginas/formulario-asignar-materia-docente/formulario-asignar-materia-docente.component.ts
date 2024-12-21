import { Component ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; 
import {Profesor} from '../../interfaces/profesor';
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
  selector: 'app-formulario-asignar-materia-docente',
  standalone: true,
  imports: [CommonModule, 
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
  templateUrl: './formulario-asignar-materia-docente.component.html',
  styleUrl: './formulario-asignar-materia-docente.component.sass'
})
export class FormularioAsignarMateriaDocenteComponent {
  selectedColor: string = '';
  profesor?: Profesor;
  profesores: Profesor[];
  filteredProfesores?: Observable<string[]>;

  fecha:Date;

  myControl = new FormControl('');
  
  constructor(
    private colorService: SelectionColorService,
    public dialogRef: MatDialogRef<FormularioAsignarMateriaDocenteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private readonly mensajeService:MensajeService
  ) {
    this.profesores= data.profesores || '';
    this.fecha = data.fecha || new Date();
  }
  getNombreCompleto(profesor:Profesor){
    return profesor.nombre+" "+profesor.apellido;
}

  ngOnInit() {
    this.filteredProfesores = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );


    this.colorService.currentColor$.subscribe(color => {
      this.selectedColor = color; // Actualiza el color recibido
    });
  }

  private _filter(value: string): string[] {

    const filterValue = value.toLowerCase();
    let profs= this.profesores.filter(profe =>this.getNombreCompleto(profe).toLowerCase().includes(filterValue));
    if(value){
      this.profesor=profs[0];
    }

    return profs.map(
      profe =>this.getNombreCompleto(profe)
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
    if(!this.profesor){
      this.mensajeService.mostrarMensajesError("Error!!",["Debe asignar un profesor para la materia"]);
      return;
    }
    this.dialogRef.close({
      profesor: this.profesor,
      fecha: this.fecha,
    });
    this.mensajeService.mostrarMensajeExito("Exito!!","Se asigno al profesor con exito!!")
  }

  onCancel() {
    this.dialogRef.close();
  }


}
