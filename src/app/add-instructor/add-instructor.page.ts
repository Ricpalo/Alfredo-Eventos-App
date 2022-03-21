import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-instructor',
  templateUrl: './add-instructor.page.html',
  styleUrls: ['./add-instructor.page.scss'],
})
export class AddInstructorPage implements OnInit {
  instructor = {
    nombre: "",
    email: ""
  }

  constructor(
    private restService: RestService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async addInstructor() {
    let formulario = new FormData();

    formulario.append("nombre", this.instructor.nombre);
    formulario.append("email", this.instructor.email);

    this.restService.subida_ficheros_y_datos('instructores/api/instructores', formulario).subscribe(res => {
      console.log(res);
      this.router.navigate(['instructores']);
    });
  }
}
