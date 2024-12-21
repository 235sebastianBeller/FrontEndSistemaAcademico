import { Component, OnInit ,inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MateriasProfesorService} from '../../servicios/materias-profesor.service'
import {Estudiante} from'../../interfaces/estudiante'
import { ActivatedRoute } from '@angular/router';
import { SelectionColorService } from '../../servicios/selection-color.service';
@Component({
  selector: 'app-lista-estudiantes-profesor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-estudiantes-profesor.component.html',
  styleUrl: './lista-estudiantes-profesor.component.sass'
})
export class ListaEstudiantesProfesorComponent implements OnInit {
  selectedColor: string = '';
  estudiantes: Estudiante[] = [];
  route:ActivatedRoute=inject(ActivatedRoute);
  id_dicta!:number;

  constructor(private colorService: SelectionColorService,private materiaAsignadaService: MateriasProfesorService) {
    this.id_dicta=this.route.snapshot.params["id_dicta"]
  }

  ngOnInit() {
    this.materiaAsignadaService.obtenerEstudiantesMateriaAsignada(this.id_dicta).subscribe(
      data => {
            this.estudiantes = data;
      }
    );
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
}
