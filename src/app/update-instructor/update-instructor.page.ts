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
    id: "",
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
        this.instructor.id = this.instructor_recibido.id;
      } else {
        this.router.navigate(['instructores']);
      }
    });
  }

  updateInstructor () {
    this.restService.ejecutar_put('instructores/api/instructores', this.instructor).subscribe(res => {
      console.log(this.instructor);
      console.log(res);
      this.router.navigate(['instructores']);
    })
  }

}
