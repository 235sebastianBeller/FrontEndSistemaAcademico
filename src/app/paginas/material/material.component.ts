import { FormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PDFDocumentProxy } from 'pdfjs-dist';
import {
  ChangeDetectionStrategy,
  Component,
  signal,
  inject,OnInit
} from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import {PdfService} from '../../servicios/pdf.service'
import { MaterialService } from '../../servicios/material.service';
import {ActivatedRoute} from '@angular/router'
import { Material } from '../../interfaces/material';
import { CommonModule } from '@angular/common';
import { SelectionColorService } from '../../servicios/selection-color.service';

@Component({
  selector: 'app-material',
  standalone: true,
  imports: [FormsModule, PdfViewerModule, MatExpansionModule, CommonModule],
  templateUrl: './material.component.html',
  styleUrl: './material.component.sass',
})
export class MaterialComponent {
  selectedColor: string = '';
  isOpen?:boolean;
  readonly panelOpenState2 = signal(false);
  panelOpenState: boolean = false;
  private src!:string;
  materialesServicio:MaterialService=inject(MaterialService)
  route:ActivatedRoute=inject(ActivatedRoute)

  private pdfService=inject(PdfService)
  userPrompt: string = '';
  response?: string;
  messages: { user: string; responseIA: string }[] = [];

  material?:Material;

  id_material?:number;
  constructor(private colorService: SelectionColorService){

    this.id_material=this.route.snapshot.params['id'];

  }

  ngOnInit(): void {
    this.pdfService.askClear()
    this.isOpen = false;
    this.materialesServicio.encontrarMaterial(this.id_material).subscribe(
      (data)=>{
          this.material=data
          this.src=`${this.material?.url}`;
      },
      error => {
        console.error('Error en la petición GET:', error);
      }
    )
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

  getSrc():string{
    return this.src;
  }

  toggle() {
    this.messages = [];
    this.isOpen = !this.isOpen;
  }

  async readPdf(pdf: PDFDocumentProxy) {
    this.pdfService.readPdf(pdf,this.material?.tipo).then(
      (data)=>{
        this.response=data
      }
    ).catch(
      (e)=>console.log(e)
    );
  }
  async sendUserPrompt() {
    if (this.userPrompt.trim()) {
      const userMessage = this.userPrompt;
      const responseIA = await this.pdfService.askUserPrompt(this.userPrompt);
      this.messages.push({ user: userMessage, responseIA });
      this.userPrompt = '';
    }
  }


}
