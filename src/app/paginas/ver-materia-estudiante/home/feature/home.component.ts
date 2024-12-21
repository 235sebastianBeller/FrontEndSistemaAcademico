import { Component, computed, inject, signal ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/ui/navbar/navbar.component';
import {
  Storage,
} from '@angular/fire/storage';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import {Material} from "../../../../interfaces/material"
import {MaterialService} from "../../../../servicios/material.service"
import { ActivatedRoute} from '@angular/router';
import { RouterModule } from '@angular/router';
import { SelectionColorService } from '../../../../servicios/selection-color.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class VerMaterialesEstudianteComponent implements OnInit{
  selectedColor: string = '';
  progress = signal('0%');
  downloadURL: string | undefined = undefined;
  file!: File;
  susbscription: Subscription | undefined = undefined;

  // Variables para el tipo de material y el título
  tipoMaterial: string = 'Teorico'; // Valor predeterminado
  nombreMaterial: string = '';

  showForm: boolean = false;
  materiales: Material[] = [];

  servicioMateriales:MaterialService = inject(MaterialService);

  id_unidad?:number;
  route:ActivatedRoute=inject(ActivatedRoute) 
  constructor(private colorService: SelectionColorService) {
    this.id_unidad=this.route.snapshot.params['id']
    // this.id_unidad=91
  }
  ngOnInit(): void {
    this.servicioMateriales.getMaterialesDeUnidad(this.id_unidad).subscribe(
      response => {
        console.log('Datos recibidos:', response);
        this.materiales = response; 
        console.log('Materia:', this.materiales);
      },
      error => {
        console.error('Error en la petición GET:', error);
      }
    )
    this.colorService.currentColor$.subscribe(color => {
      this.selectedColor = color; // Actualiza el color recibido
      console.log('Color recibido en Login:', this.selectedColor);
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
