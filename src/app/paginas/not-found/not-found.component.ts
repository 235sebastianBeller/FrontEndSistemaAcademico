import { Component } from '@angular/core';
import {AuthService} from '../../servicios/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.sass'
})
export class NotFoundComponent {
  constructor(private authService:AuthService,private router:Router){
  }

  irAInicio(){
    if(this.authService.isAuthenticated()){
      this.router.navigate(["/home"])
    }else{
      this.router.navigate(["/"])
    }
  }

}
