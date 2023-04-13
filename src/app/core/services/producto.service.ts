import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url_servidor = environment.servidor;
  
  constructor(private http : HttpClient) { }

  listar(page=1, limit=1, q=''){
    return this.http.get(`${this.url_servidor}/v1/producto?page=${page}&limit=${limit}&q=${q}`);
  }

  guardar(datos : any){
    return this.http.post(`${this.url_servidor}/v1/producto`, datos);
  }

  mostrar(id : number){
    // se puede enviar el id por body utilizando post
    return this.http.get(`${this.url_servidor}/v1/producto/${id}`);
  }

  modificar(id : number, datos : any){
    return this.http.put(`${this.url_servidor}/v1/producto/${id}`, datos);
  }

  eliminar(id : number){
    return this.http.delete(`${this.url_servidor}/v1/producto/${id}`);
  }
}
