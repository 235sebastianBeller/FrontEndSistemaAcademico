import { Component,inject } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {DatePipe} from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { MaterialService } from '../../servicios/material.service';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-lista-materiales',
  standalone: true,
  imports: [MatListModule, MatIconModule, MatDividerModule, DatePipe,RouterModule],
  templateUrl: './lista-materiales.component.html',
  styleUrl: './lista-materiales.component.sass'
})
export class ListaMaterialesComponent {
  materialesServicio:MaterialService=inject(MaterialService) 
}
