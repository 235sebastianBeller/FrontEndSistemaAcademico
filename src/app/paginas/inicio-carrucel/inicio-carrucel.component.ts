import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio-carrucel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio-carrucel.component.html',
  styleUrl: './inicio-carrucel.component.sass'
})
export class InicioCarrucelComponent {
  images: string[] = [
    '../../../assets/img/slide1.jpg',
    '../../../assets/img/slide2.jpg',
    '../../../assets/img/slide3.jpg'
  ];
  currentIndex = 0;

  constructor() {
    setInterval(() => {
      this.nextSlide();
    }, 5000); 
  }

  getTransform(): string {
    return `translateX(-${this.currentIndex * 100}%)`;
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
  }
}
