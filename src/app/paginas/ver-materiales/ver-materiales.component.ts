import { Component } from '@angular/core';
import {ListaMaterialesComponent} from '../../componentes/lista-materiales/lista-materiales.component'

@Component({
  selector: 'app-ver-materiales',
  standalone: true,
  imports: [ListaMaterialesComponent],
  templateUrl: './ver-materiales.component.html',
  styleUrl: './ver-materiales.component.sass'
})
export class VerMaterialesComponent {

}
