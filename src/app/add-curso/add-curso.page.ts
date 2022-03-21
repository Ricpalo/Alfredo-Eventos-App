import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-curso',
  templateUrl: './add-curso.page.html',
  styleUrls: ['./add-curso.page.scss'],
})
export class AddCursoPage implements OnInit {
  curso = {
    titulo: "",
    duracion: "",
    precio: "",
    descripcion: ""
  }

  constructor(
    private restService: RestService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async addCurso() {
    let formulario = new FormData();

    formulario.append("titulo", this.curso.titulo);
    formulario.append("duracion", this.curso.duracion);
    formulario.append("precio", this.curso.precio);
    formulario.append("descripcion", this.curso.descripcion);

    this.restService.subida_ficheros_y_datos('cursos/api/cursos', formulario).subscribe(res => {
      console.log(res);
      this.router.navigate(['cursos']);
    });
  }
}
