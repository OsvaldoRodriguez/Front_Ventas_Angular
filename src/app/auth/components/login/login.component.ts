import { Component } from '@angular/core';
// importando cosas del formlario reactivo
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
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
  constructor(private authService: AuthService, private router : Router) {}

  ingresar() {
    let datos = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.authService.loginConNode(datos).subscribe(
      (res: any) => {
        // aqui llega el token
        console.log(res);
        // guardar el token, en este caso se guardara en el navegador
        // para guardar en local storage
        localStorage.setItem('access_token', res.access_token);        
        this.router.navigate(['/admin/perfil']); // para redireccionar

      },
      (error: any) => {
        console.log(error);
        alert('Credenciales Incorrectas');
      }
    );
  }
}
