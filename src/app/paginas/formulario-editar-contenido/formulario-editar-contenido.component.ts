import { Component } from '@angular/core';
import {FormularioAgregarContenidoComponent} from '../formulario-agregar-contenido/formulario-agregar-contenido.component'
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-formulario-editar-contenido',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatButtonModule],
  templateUrl: './formulario-editar-contenido.component.html',
  styleUrl: '../formulario-agregar-contenido/formulario-agregar-contenido.component.sass'
})
export class FormularioEditarContenidoComponent extends FormularioAgregarContenidoComponent {

}
