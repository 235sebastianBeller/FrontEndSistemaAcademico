import { Component,Input } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MensajeService } from '../mensaje/mensaje.component';
import { SelectionColorService } from '../../servicios/selection-color.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {
  selectedColor: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;
  passwordType: string = 'password';
  showPassword: boolean = false;
  eyeIcon: string = 'assets/img/ver.png';
  constructor(
    private colorService: SelectionColorService,
    private authService: AuthService,
    private router: Router,
    private mensajeService: MensajeService
  ) {}

  ngOnInit() {
    this.colorService.currentColor$.subscribe(color => {
      this.selectedColor = color; 
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

    login() {
      this.authService.login(this.email, this.password).subscribe({
        next: (response) => {
            if (response && response.usuario) {
                this.authService.saveUserData(response);
                this.router.navigate(['/home']);
            }
        },
        error: (err) => {
            console.error('Error en el login:', err);
            let mensajes:string[]=[err.error.message[0]];
            if(mensajes[0].length==1){
              this.mensajeService.mostrarMensajeError("¡Error!", err.error.message ||["Ocurrio un error, intentalo mas tarde!!"]);

            }else{
            this.mensajeService.mostrarMensajeError("¡Error!", mensajes[0] ||"Ocurrio un error, intentalo mas tarde!!");
            }
        }
    }); }

  togglePassword() {

    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.eyeIcon = 'assets/img/esconder.png';
    } else {
      this.passwordType = 'password';
      this.eyeIcon = 'assets/img/ver.png';
    }
  }


}

