import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-update-ubicacion',
  templateUrl: './update-ubicacion.page.html',
  styleUrls: ['./update-ubicacion.page.scss'],
})
export class UpdateUbicacionPage implements OnInit {

  ubicacion_recibida = {
    id: "",
    nombre: "",
    direccion: ""
  }

  ubicacion = {
    id: this.ubicacion_recibida.id,
    nombre: "",
    direccion: ""
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private restService: RestService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(res => {
      if ( this.router.getCurrentNavigation().extras.state ) {
        this.ubicacion_recibida = this.router.getCurrentNavigation().extras.state.ubicacion;
      } else {
        this.router.navigate(['ubicaciones']);
      }
    });
  }

  updateUbicacion () {
    let formulario = new FormData();

    formulario.append("id", this.ubicacion_recibida.id);
    formulario.append("nombre", this.ubicacion.nombre);
    formulario.append("direccion", this.ubicacion.direccion);

    this.restService.subida_ficheros_y_datos('ubicaciones/api/ubicaciones', formulario).subscribe(res => {
      console.log(res);
      this.router.navigate(['ubicaciones']);
    })
  }
}
