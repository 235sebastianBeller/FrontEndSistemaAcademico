import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  template: `
    <div class="min-h-[64px] bg-green-500 text-white p-4">
      <a class="text-2xl" routerLink="/">Ver Material</a>
    </div>
  `,
  styles: ``
})
export class NavbarComponent {

}
