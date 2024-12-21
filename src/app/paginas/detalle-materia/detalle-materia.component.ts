import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Unidad } from '../../interfaces/unidad';
import { MateriaAsignadaDocente } from '../../interfaces/materia-asignada-docente';
import { UnidadService } from '../../servicios/unidad.service';
import { MateriasProfesorService } from '../../servicios/materias-profesor.service';
import { MatDialog } from '@angular/material/dialog';
import { SelectionColorService } from '../../servicios/selection-color.service';

@Component({
  selector: 'app-detalle-materia',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './detalle-materia.component.html',
  styleUrls: ['./detalle-materia.component.sass']
})
export class DetalleMateriaComponent implements OnInit {
  selectedColor: string = '';
  cardCounter = 1;
  unidades: Unidad[] = [];
  showForm = false;
  newModuleName = '';
  newModuleImageUrl = '';

  materiaAsiganda?:MateriaAsignadaDocente;
  id_dicta:number;
  unidadServicio:UnidadService = inject(UnidadService)
  materiaAsignadaServicio:MateriasProfesorService = inject(MateriasProfesorService)

  route:ActivatedRoute=inject(ActivatedRoute)

  constructor(private colorService: SelectionColorService,private dialog: MatDialog, private router: Router) {
    this.id_dicta=this.route.snapshot.params['id_dicta']
  }

  ngOnInit(): void {

    if (this.id_dicta) { 
      this.materiaAsignadaServicio.obtenerMateriaAsignada(this.id_dicta).subscribe(
        response => {
          this.materiaAsiganda = response;
        },
        error => {
          console.error('Error en la petición GET:', error);
        }
      );

      this.unidadServicio.getUnidadesDeMateriAsignada(this.id_dicta).subscribe(
        response => {
          this.unidades = response;
        },
        error => {
          console.error('Error en la petición GET:', error);
        }
      );
    } else {
      console.error('ID Dicta es undefined');
    }
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
