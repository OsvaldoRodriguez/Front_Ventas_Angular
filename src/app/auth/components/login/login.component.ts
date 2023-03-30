import { Component } from '@angular/core';
// importando cosas del formlario reactivo
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';


interface User {
  email : string | null,
  password : string | null,
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  // en loginForm se guarda los datos del form (es un grupo) -> para no manejar uno por uno
  loginForm: FormGroup = new FormGroup({
    // basicamente serian los inputs pero son formControl
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  // ya esta inyectado en login
  constructor(private authService: AuthService) {}

  ingresar() {
    let datos = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.authService.loginConNode(datos).subscribe(
      (res: any) => {
        console.log(res);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
