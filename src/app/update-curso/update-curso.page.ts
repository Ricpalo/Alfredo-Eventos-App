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
    id: this.curso_recibido.id,
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
      } else {
        this.router.navigate(['cursos']);
      }
    });
  }

  updateCurso () {
    let formulario = new FormData();

    formulario.append("id", this.curso_recibido.id);
    formulario.append("titulo", this.curso.titulo);
    formulario.append("duracion", this.curso.duracion);
    formulario.append("precio", this.curso.precio);
    formulario.append("descripcion", this.curso.descripcion);

    this.restService.subida_ficheros_y_datos('cursos/api/cursos', formulario).subscribe(res => {
      console.log(res);
      this.router.navigate(['cursos']);
    })
  }
}
