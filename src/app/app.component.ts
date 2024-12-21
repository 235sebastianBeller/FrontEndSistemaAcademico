import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { SelectionColorService } from './servicios/selection-color.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'sistema-estudiantil-ia';
  selectedColor: string = 'azul';

  constructor(
    private colorService: SelectionColorService
  ) {}

  ngOnInit(): void {
    this.colorService.currentColor$.subscribe((color) => {
      this.selectedColor = color;
      this.updateCSSVariables(color);
    });
  }

  onColorChange(color: string): void {
    this.selectedColor = color;
    this.colorService.changeColor(this.selectedColor);
  }

  updateCSSVariables(color: string): void {
    let backgroundColorFooter: string;
    let colorFooter: string;
    let backgroundColor: string;

    switch (color) {
      case 'amarillo':
        backgroundColorFooter = 'rgb(255, 204, 0)';
        colorFooter = 'rgb(0,0,0)';
        backgroundColor = 'rgb(245, 245, 245)';
        break;
      case 'verde':
        backgroundColorFooter = 'rgb(42, 122, 86)';
        colorFooter = 'rgb(255,255,255)';
        backgroundColor = 'rgb(255,255,255)';
        break;
      default:
        backgroundColorFooter = 'rgb(13, 71, 161)';
        colorFooter = 'rgb(255,255,255)';
        backgroundColor = 'rgb(255,255,255)';
        break;
    }
    document.documentElement.style.setProperty('--background-color-footer', backgroundColorFooter);
    document.documentElement.style.setProperty('--color-footer', colorFooter);
    document.documentElement.style.setProperty('--background-color', backgroundColor);
  }
}
