import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-update-instructor',
  templateUrl: './update-instructor.page.html',
  styleUrls: ['./update-instructor.page.scss'],
})
export class UpdateInstructorPage implements OnInit {

  instructor_recibido = {
    id: "",
    nombre: "",
    email: ""
  }

  instructor = {
    id: this.instructor_recibido.id,
    nombre: "",
    email: ""
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private restService: RestService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(res => {
      if ( this.router.getCurrentNavigation().extras.state ) {
        this.instructor_recibido = this.router.getCurrentNavigation().extras.state.instructor;
      } else {
        this.router.navigate(['instructores']);
      }
    });
  }

  updateInstructor () {
    let formulario = new FormData();

    formulario.append("id", this.instructor_recibido.id);
    formulario.append("nombre", this.instructor.nombre);
    formulario.append("email", this.instructor.email);

    this.restService.subida_ficheros_y_datos('instructores/api/instructores', formulario).subscribe(res => {
      console.log(res);
      this.router.navigate(['instructores']);
    })
  }

}
