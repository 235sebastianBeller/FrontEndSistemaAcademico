// formulario-agregar-contenido.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; // Importa MatButtonModule
import { SelectionColorService } from '../../servicios/selection-color.service';

@Component({
  selector: 'app-formulario-agregar-contenido',
  standalone: true,
  templateUrl: './formulario-agregar-contenido.component.html',
  styleUrls: ['./formulario-agregar-contenido.component.sass'],
  imports: [CommonModule, FormsModule, MatDialogModule, MatButtonModule] // Añade MatDialogModule y MatButtonModule aquí
})
export class FormularioAgregarContenidoComponent {
  selectedColor: string = '';
  newModuleName: string;
  newModuleImageUrl: string;

  constructor(
    private colorService: SelectionColorService,
    public dialogRef: MatDialogRef<FormularioAgregarContenidoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.newModuleName = data.name || '';
    this.newModuleImageUrl = data.imageUrl || '';
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

  onAdd() {
    this.dialogRef.close({
      name: this.newModuleName,
      imageUrl: this.newModuleImageUrl,
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
