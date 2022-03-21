import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-update-alumno',
  templateUrl: './update-alumno.page.html',
  styleUrls: ['./update-alumno.page.scss'],
})
export class UpdateAlumnoPage implements OnInit {

  alumno_recibido = {
    id: "",
    nombre: "",
    direccion: ""
  }

  alumno = {
    id: this.alumno_recibido.id,
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
        this.alumno_recibido = this.router.getCurrentNavigation().extras.state.alumno;
      } else {
        this.router.navigate(['alumnos']);
      }
    });
  }

  updateAlumno () {
    let formulario = new FormData();

    formulario.append("id", this.alumno_recibido.id);
    formulario.append("nombre", this.alumno.nombre);
    formulario.append("direccion", this.alumno.direccion);

    this.restService.subida_ficheros_y_datos('alumnos/api/alumnos', formulario).subscribe(res => {
      console.log(res);
      this.router.navigate(['alumnos']);
    })
  }
}
