import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


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

  url_servidor = environment.servidor;
  // en este caso es una interfaz
  loginConNode(datos: User) {
    return this.http.post(`${this.url_servidor}/auth/login`, datos);
  }

  
  getPerfil(){
    return this.http.get(`${this.url_servidor}/auth/perfil`); // es la ruta del backend
  }
}
