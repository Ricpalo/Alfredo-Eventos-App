import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-add-ubicacion',
  templateUrl: './add-ubicacion.page.html',
  styleUrls: ['./add-ubicacion.page.scss'],
})
export class AddUbicacionPage implements OnInit {
  ubicacion = {
    nombre: "",
    direccion: ""
  }

  constructor(
    private restService: RestService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async addUbicacion() {
    let formulario = new FormData();

    formulario.append("nombre", this.ubicacion.nombre);
    formulario.append("direccion", this.ubicacion.direccion);

    this.restService.subida_ficheros_y_datos('ubicaciones/api/ubicaciones', formulario).subscribe(res => {
      console.log(res);
      this.router.navigate(['ubicaciones']);
    });
  }
}
