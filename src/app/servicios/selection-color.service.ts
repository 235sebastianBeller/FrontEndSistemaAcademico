import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectionColorService {
  private colorKey = 'selectedColor'; 
  private defaultColor = 'azul'; 
  private colorSubject = new BehaviorSubject<string>(this.getSavedColor());
  currentColor$ = this.colorSubject.asObservable(); 

  constructor() {}

  changeColor(color: string): void {
    this.saveColor(color);
    this.colorSubject.next(color); 
  }

  private getSavedColor(): string {
    return localStorage.getItem(this.colorKey) || this.defaultColor;
  }

  private saveColor(color: string): void {
    localStorage.setItem(this.colorKey, color);
  }
}
