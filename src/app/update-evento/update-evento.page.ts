import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../services/rest.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-update-evento',
  templateUrl: './update-evento.page.html',
  styleUrls: ['./update-evento.page.scss'],
})
export class UpdateEventoPage implements OnInit {
  instructores = [];
  cursos = [];
  ubicaciones = [];

  evento_recibido = {
    id: "",
    fecha_inicio: "",
    fecha_fin: "",
    id_instructor: "",
    id_curso: "",
    id_ubicacion: ""
  }

  evento = {
    id: this.evento_recibido.id,
    fecha_inicio: "",
    fecha_fin: "",
    id_instructor: "",
    id_curso: "",
    id_ubicacion: ""
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private restService: RestService,
    private loadingController: LoadingController
  ) { }

  async ngOnInit() {
    this.activatedRoute.queryParams.subscribe(res => {
      if ( this.router.getCurrentNavigation().extras.state ) {
        this.evento_recibido = this.router.getCurrentNavigation().extras.state.evento;
      } else {
        this.router.navigate(['eventos']);
      }
    });

    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
      duration: 2000
    });

    await loading.present();

    this.restService.ejecutar_get('instructores/api/instructores', {}).subscribe(res => {
      this.instructores = res.datos;
    }, error => {
      loading.dismiss();
      console.log(error);
    });

    this.restService.ejecutar_get('cursos/api/cursos', {}).subscribe(res => {
      this.cursos = res.datos;
    }, error => {
      loading.dismiss();
      console.log(error);
    });

    this.restService.ejecutar_get('ubicaciones/api/ubicaciones', {}).subscribe(res => {
      this.ubicaciones = res.datos;
    }, error => {
      loading.dismiss();
      console.log(error);
    });
  }

  updateEvento () {
    let formulario = new FormData();

    formulario.append("id", this.evento_recibido.id);
    formulario.append("fecha_inicio", this.evento.fecha_inicio);
    formulario.append("fecha_fin", this.evento.fecha_fin);
    formulario.append("id_instructor", this.evento.id_instructor);
    formulario.append("id_curso", this.evento.id_curso);
    formulario.append("id_ubicacion", this.evento.id_ubicacion);

    this.restService.subida_ficheros_y_datos('eventos/api/eventos', formulario).subscribe(res => {
      console.log(res);
      this.router.navigate(['eventos']);
    })
  }

}
