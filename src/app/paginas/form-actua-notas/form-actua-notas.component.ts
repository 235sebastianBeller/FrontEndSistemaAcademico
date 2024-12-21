// import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { MatDialogModule, MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';

// @Component({
//   selector: 'app-form-actua-notas',
//   standalone: true,
//   imports: [
//     ReactiveFormsModule,
//     MatDialogModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule
//   ],
//   templateUrl: './form-actua-notas.component.html',
//   styleUrls: ['./form-actua-notas.component.sass']
// })
// export class FormActuaNotasComponent {
//   form: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private dialogRef: MatDialogRef<FormActuaNotasComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any
//   ) {
//     console.log(data.value.ser)
//     this.form = this.fb.group({
//       ser:     [data.value.ser],
//       saber:   [data.value.saber, Validators.required],
//       hacer:   [data.value.hacer, Validators.required],
//       decidir: [data.value.decidir, Validators.required]
//     });
//   }

//   actualizarNota() {
//     if (this.form.valid) {
//       console.log(this.form.value)
//       this.dialogRef.close(this.form.value);
//     }
//   }

//   cerrar() {
//     this.dialogRef.close();
//   }
// }
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MensajeService } from '../mensaje/mensaje.component';
import { SelectionColorService } from '../../servicios/selection-color.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-actua-notas',
  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './form-actua-notas.component.html',
  styleUrls: ['./form-actua-notas.component.sass']
})
export class FormActuaNotasComponent {
  selectedColor: string = '';
  form: FormGroup;
  serForm: FormGroup;
  saberForm: FormGroup;
  hacerForm: FormGroup;
  decidirForm: FormGroup;

  constructor(
    private colorService: SelectionColorService,
    private fb: FormBuilder,
    private mensajeService:MensajeService,

    private dialogRef: MatDialogRef<FormActuaNotasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      ser:     this.fb.group(data.value.ser[0]),
      saber:   this.fb.group(data.value.saber[0]),
      hacer:   this.fb.group(data.value.hacer[0]),
      decidir: this.fb.group(data.value.decidir[0])
    });

    this.serForm = this.form.get('ser') as FormGroup;
    this.saberForm = this.form.get('saber') as FormGroup;
    this.hacerForm = this.form.get('hacer') as FormGroup;
    this.decidirForm = this.form.get('decidir') as FormGroup;
  }

  ngOnInit() {
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

  actualizarNota() {

    if (this.form.valid) {

      this.mensajeService.mostrarMensajeExito("¡Éxito!","La nota se actualizó con éxito")


      this.dialogRef.close(this.form.value);
    }
    else{
      this.mensajeService.mostrarMensajeError("¡Error!","Algo salio mal")

    }
  }
  cerrar() {
    this.dialogRef.close();
  }
}
