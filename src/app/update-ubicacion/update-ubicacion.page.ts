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
    id: "",
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
        this.ubicacion.id = this.ubicacion_recibida.id;
      } else {
        this.router.navigate(['ubicaciones']);
      }
    });
  }

  updateUbicacion () {
    this.restService.ejecutar_put('ubicaciones/api/ubicaciones', this.ubicacion).subscribe(res => {
      console.log(this.ubicacion);
      console.log(res);
      this.router.navigate(['ubicaciones']);
    })
  }
}
