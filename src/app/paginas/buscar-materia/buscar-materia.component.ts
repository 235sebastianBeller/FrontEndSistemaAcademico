import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscar-materia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buscar-materia.component.html',
  styleUrls: ['./buscar-materia.component.sass']
})
export class BuscarMateriaComponent {
  materias = [
    { nombre: 'Matemáticas', id: 1, profesor: 'Juan Pérez' },
    { nombre: 'Historia', id: 2, profesor: 'Ana Gómez' },
    { nombre: 'Ciencias', id: 3, profesor: 'Luis Martínez' }
  ];

  profesores = [
    { nombre: 'Juan Pérez', materia: 'Matemáticas' },
    { nombre: 'Ana Gómez', materia: 'Historia' },
    { nombre: 'Luis Martínez', materia: 'Ciencias' },
    { nombre: 'Márco Aurelio', materia: 'Ciencias' }
  ];

  resultado: string[] = [];
  busquedaRealizada = false;
  tipoBusqueda: 'materia' | 'profesor' = 'materia'; // Valor predeterminado

  buscar() {
    const inputValue = (document.getElementById('buscar-materia') as HTMLInputElement).value;


    if (this.tipoBusqueda === 'materia') {
      this.resultado = this.materias.filter(m => 
        !inputValue || m.nombre.toLowerCase().includes(inputValue.toLowerCase())
      ).map(m => `Materia: ${m.nombre}, Profesor: ${m.profesor}`);
    } else {
      // Filtrar correctamente por profesores
      this.resultado = this.profesores.filter(p => 
        !inputValue || p.nombre.toLowerCase().includes(inputValue.toLowerCase())
      ).map(p => `Profesor: ${p.nombre}, Materia: ${p.materia}`);
    }

    this.busquedaRealizada = true; // Actualizar estado de búsqueda
  }
}
