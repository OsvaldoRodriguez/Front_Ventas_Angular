import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  url_servidor = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}

  listar(){
    return this.http.get(`${this.url_servidor}/v1/categoria`);
  }

  guardar(datos : any){
    return this.http.post(`${this.url_servidor}/v1/categoria`, datos);
  }

  mostrar(id : number){
    // se puede enviar el id por body utilizando post
    return this.http.get(`${this.url_servidor}/v1/categoria/${id}`);
  }

  modificar(id : number, datos : any){
    return this.http.put(`${this.url_servidor}/v1/categoria/${id}`, datos);
  }

  eliminar(id : number){
    return this.http.delete(`${this.url_servidor}/v1/categoria/${id}`);
  }
}
