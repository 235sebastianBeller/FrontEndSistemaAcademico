import { Component,Inject, NgModule } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Profesor } from '../../interfaces/profesor';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProfesorService } from '../../servicios/profesor.service';
import { updateMetadata } from '@angular/fire/storage';
import { SelectionColorService } from '../../servicios/selection-color.service';
import * as bcrypt from 'bcryptjs'

@Component({
  selector: 'app-form-editar-profesor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './form-crear-profesor.component.html',
  styleUrl: './form-crear-profesor.component.sass'
})
export class FormCrearProfesorComponent {
  selectedColor: string = '';
  profesor: Profesor;
  profesores: Profesor[] = [];
  plainPassword: string = 'password123'; // Contraseña sin hashear por defecto
  editando = false;

  constructor(
    private colorService: SelectionColorService,
    public dialogRef: MatDialogRef<FormCrearProfesorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Profesor,
    private profesorService: ProfesorService
  ) {
    this.profesor = { ...data };
    this.profesorService.getProfesores().subscribe({
      next: (profesores) => (this.profesores = profesores),
      error: (error) => console.error('Error al obtener los profesores:', error),
    });
  }

  ngOnInit() {
    this.colorService.currentColor$.subscribe(color => {
      this.selectedColor = color; // Actualiza el color recibido
    });
    if (!this.profesor.password) {
      this.plainPassword = 'password123';
    }
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
  async generateDefaultPassword(): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.plainPassword, salt);
    return hashedPassword;
  }
  async guardar() {
    const profesorData = {
      nombre: this.profesor.nombre,
      apellido: this.profesor.apellido,
      email: this.profesor.email,
      password: this.plainPassword
    };
    this.dialogRef.close(profesorData);
  }
  cancelar() {
    this.dialogRef.close();
  }
  
}
