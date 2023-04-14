import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ConfirmationService,
  LazyLoadEvent,
  MessageService,
} from 'primeng/api';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { ProductoService } from 'src/app/core/services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
  providers: [MessageService, ConfirmationService], // es una alerta para mandar informacion del compoenente
})
export class ProductoComponent implements OnInit {
  productDialog: boolean = false;
  products!: any[]; // deberian ser interfaz
  product: any; // igual
  categorias: any;
  selectedProducts: any[] | null = [];
  submitted: boolean = false;
  statuses: any = [];
  loading: boolean = false; // es la animacion del cargado en la tabla lazy
  totalRecords: number = 0; // para controlar cuantos datos  son en total

  // imagen
  displayModalImage: boolean = false;
  uploadedFiles: any[] = [];

  productoForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    precio: new FormControl(0, [Validators.required]),
    stock: new FormControl(0, [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    categoriaId: new FormControl('', [Validators.required]),
  });

  constructor(
    private productService: ProductoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private categoriaService: CategoriaService
  ) {}

  showModalDialogImage(product: any) {
    this.product = { ...product };
    this.displayModalImage = true;
  }

  ngOnInit() {
    this.getProductos();
    this.getCategorias();
  }

  getCategorias() {
    this.categorias = [];
    this.categoriaService.listar().subscribe((res: any) => {
      this.categorias = res;
    });
  }
  getProductos(event?: LazyLoadEvent) {
    this.loading = true; // animacion para que muestre mientras carga los datos

    let page: any = 1;
    let limit: any;
    if (event?.first && event?.rows) {
      page = event.first / event.rows + 1;
      limit = event.rows;
    }
    this.productService.listar(page, limit).subscribe(
      (datos: any) => {
        this.products = datos.rows;
        // console.log(datos.rows);
        this.totalRecords = datos.count;
        this.loading = false;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.selectedProducts = null;
        // this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
      },
    });
  }

  editProduct(product: any) {
    this.product = { ...product };
    this.productDialog = true;
    this.productoForm.patchValue(product);
  }

  deleteProduct(product: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val) => val.id !== product.id);
        this.product = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.id) {
      //   alert('llega a editar');

      this.products[this.findIndexById(this.product.id)] = this.product;
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Product Updated',
        life: 3000,
      });
    } else {
      this.productService.guardar(this.productoForm.value).subscribe(
        (res: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Product Created',
            life: 3000,
          });
          this.getProductos();
        },
        (error: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al guardar',
            detail: 'Error al guardar producto',
            life: 3000,
          });
        }
      );
      // this.product.id = this.createId();
      // this.product.image = 'product-placeholder.svg';
      // this.products.push(this.product);
    }

    this.products = [...this.products];
    this.productDialog = false;
    this.product = {};
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  onUpload(event?: any) {
    for (let file of event.files) {
      console.log(file);
      this.uploadedFiles.push(file);
    }

    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });
  }


  
  myUploader(event? : any){
    let formData = new FormData();
    console.log(event.files)
    formData.append('imagen', event.files[0]);

    this.productService.actualizarImagen(this.product.id, formData).subscribe( (res : any) => {
      this.displayModalImage = false;
      this.getProductos();
      this.messageService.add({ severity: 'info', summary: 'Imagen Actualizada', detail: '' });
    }, (error : any) => {
      
      this.messageService.add({ severity: 'info', summary: 'Imagen No actualizada', detail: '' });
    } )
  }
}
