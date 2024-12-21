import { Component ,inject} from '@angular/core';
import { SelectionColorService } from '../../servicios/selection-color.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MateriasProfesorService} from '../../servicios/materias-profesor.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-asignar-materia-estudiante',
  standalone: true,
  imports: [CommonModule,FormsModule,MatButtonModule, MatDividerModule, MatIconModule,],
  templateUrl: './asignar-materia-estudiante.component.html',
  styleUrl: './asignar-materia-estudiante.component.sass'
})
export class AsignarMateriaEstudianteComponent {
  selectedColor: string = '';
  profesoresAsignadosAMateria:any[]=[];
  id_materia:number=0;
  route:ActivatedRoute=inject(ActivatedRoute);
  asignacionesMateria:any[]=[];
  asignacionesMateriaFiltradas:any[]=[];
  anios:string[]=[];


  constructor(private colorService: SelectionColorService, private materiasProfesorService: MateriasProfesorService,private router: Router){
    this.id_materia=this.route.snapshot.params['id_materia']
  }

  selectedYear: number = new Date().getFullYear();

  filtrarProfesores(){
    this.profesoresAsignadosAMateria=this.asignacionesMateriaFiltradas.map((materiaAsignada)=>materiaAsignada.profesor)
  }

  filtrarMateriasAnio(){
    this.asignacionesMateriaFiltradas=this.asignacionesMateria.filter((materiaAsignada)=>materiaAsignada.materia?.id_materia==this.id_materia && materiaAsignada.anio==this.selectedYear);
  }
  filtrarAnios(){
    this.anios=[...new Set(this.asignacionesMateria.map((materia)=>materia.anio.toString()))]
    if(!this.anios.includes(new Date().getFullYear().toString())){
      this.anios.push(new Date().getFullYear().toString());
    }
  }
  
  onYearChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedYear = +selectElement.value;
    this.filtrarMateriasAnio()
    this.filtrarProfesores();
  }

  

  ngOnInit() {
    this.colorService.currentColor$.subscribe(color => {
      this.selectedColor = color; // Actualiza el color recibido
    });

            this.materiasProfesorService.obtenerMaterias().subscribe(
          response=>{
            this.asignacionesMateria=response.filter((materiaAsignada)=>materiaAsignada.materia?.id_materia==this.id_materia);
            this.profesoresAsignadosAMateria=this.asignacionesMateria.map((materiaAsignada)=>materiaAsignada.profesor)
            this.filtrarMateriasAnio()
            this.filtrarProfesores();
          },
            error=>{
              console.log(error)
            }
          )
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

  asignarEstudiante(id_profesor:number){
    let id_dicta=this.asignacionesMateria.filter((asignacion)=>asignacion.id_materia==this.id_materia && asignacion.profesor.id_profesor==id_profesor && asignacion.anio===this.selectedYear)[0].id_dicta;
    this.router.navigate(['/home/asignar-materia-asignada-a-estudiante', id_dicta,this.selectedYear]);

  }
    


}
