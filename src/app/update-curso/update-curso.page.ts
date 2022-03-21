import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-update-curso',
  templateUrl: './update-curso.page.html',
  styleUrls: ['./update-curso.page.scss'],
})
export class UpdateCursoPage implements OnInit {
  curso_recibido = {
    id: "",
    titulo: "",
    duracion: "",
    precio: "",
    descripcion: ""
  }

  curso = {
    id: "",
    titulo: "",
    duracion: "",
    precio: "",
    descripcion: ""
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private restService: RestService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(res => {
      if ( this.router.getCurrentNavigation().extras.state ) {
        this.curso_recibido = this.router.getCurrentNavigation().extras.state.curso;
        this.curso.id = this.curso_recibido.id;
      } else {
        this.router.navigate(['cursos']);
      }
    });
  }

  updateCurso () {
    this.restService.ejecutar_put('cursos/api/cursos', this.curso).subscribe(res => {
      console.log(this.curso);
      console.log(res);
      this.router.navigate(['cursos']);
    })
  }
}
