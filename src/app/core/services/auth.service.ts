import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface User {
  email : string | null,
  password : string | null,
}


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // una forma de inyectar es en el contructor
  constructor(private http: HttpClient) {}

  // ahora hay que hacer los metodos
  // indicando el formado de datos otra forma es poner datos : any

  // en este caso es una interfaz
  loginConNode(datos: User) {
    return this.http.post('http://127.0.0.1:3000/api/auth/login', datos);
  }

  
  getPerfil(){
    return this.http.get("http://127.0.0.1:3000/api/auth/perfil"); // es la ruta del backend
  }
}
