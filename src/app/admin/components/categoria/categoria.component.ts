import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
})
export class CategoriaComponent implements OnInit {
  categorias: any = [];
  visible: boolean = false;
  select_id = 0; // para el id a eliminar o editar
  // formGroup!: FormGroup; // para que no sea obligatorio
  constructor(private servicio: CategoriaService) {
    this.listar_categorias();
  }

  categoriaForm: FormGroup = new FormGroup({
    // basicamente serian los inputs pero son formControl
    nombre: new FormControl('', [Validators.required]),
    detalle: new FormControl('', [Validators.required]),
  });

  showDialog() {
    this.visible = true;
  }

  hideDialog() {
    this.visible = false;
    this.categoriaForm.reset();
    this.select_id = 0;
  }

  editarCategoria(cat: any) {
    this.select_id = cat.id;
    // this.categoriaForm.setValue({nombre: cat.nombre, detalle: cat.detalle});
    this.categoriaForm.patchValue(cat);
    this.showDialog();
  }
  guardarCategoria() {
    // si eseta en 0 es guardar
    if (this.select_id > 0) {
      // editar
      // el select_id es el id del formulario
      this.servicio
        .modificar(this.select_id, this.categoriaForm.value)
        .subscribe(
          (res: any) => {
            // alert("Categoria registrada")
            this.hideDialog();
            this.listar_categorias();
          },
          (err: any) => {
            alert('Ocurrió un error al modificar la categoria');
          }
        );
    } else {
      this.servicio.guardar(this.categoriaForm.value).subscribe(
        (res: any) => {
          alert('categoria registrada');
          this.listar_categorias();
          this.hideDialog();
        },
        (error: any) => {
          alert('error al registrar categoria');
        }
      );
    }
  }
  ngOnInit() {}

  listar_categorias() {
    // el tipo de res tiene que se una interfaz
    this.servicio.listar().subscribe(
      (res: any) => {
        console.log(res);
        this.categorias = res;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  eliminarCategoria(id: any) {
    console.log('llega');
    
    if (confirm('Esta seguro de eliminar la categoria?')) {
      this.servicio.eliminar(id).subscribe(
        (res: any) => {
          console.log("entra aqui");
          
          // alert("Categoria registrada")
          this.hideDialog();
          this.listar_categorias();
        },
        (err: any) => {
          alert('Ocurrió un error al eliminar la categoria');
        }
      );
    }
  }
}
