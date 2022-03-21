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
        this.alumno_recibido = this.router.getCurrentNavigation().extras.state.alumno;
        this.alumno.id = this.alumno_recibido.id;
      } else {
        this.router.navigate(['alumnos']);
      }
    });
  }

  updateAlumno () {
    this.restService.ejecutar_put('alumnos/api/alumnos', this.alumno).subscribe(res => {
      console.log(this.alumno);
      console.log(res);
      this.router.navigate(['alumnos']);
    })
  }
}
