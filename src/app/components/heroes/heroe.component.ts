import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Heroe } from '../../interface/heroe.interface';

import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

  private heroe: Heroe = {
    id: '',
    nombre: '',
    poder: '',
    vivo: true
  };

  new = false;
  id: string;

  constructor( private heroesService: HeroesService,
               private router: Router,
               private activatedRoute: ActivatedRoute) {

                 this.activatedRoute.params
                  .subscribe( parametros => {
                    this.id = parametros['id'];
                    if ( this.id !== 'new') {
                      this.heroesService.obtenerHeroe( this.id )
                      .subscribe( data => this.heroe = data );
                    }
                  });
                  // console.log(parametros);
               }

  ngOnInit() {
  }

  guardar( formaHeroe: NgForm ) {
    if (formaHeroe.invalid ) {
      return;
    }
    console.log('Guardando datos...');
    console.log( this.heroe );
    if ( this.id == 'new') {
      this.heroesService.nuevoHeroe( this.heroe )
        .subscribe(data => {
          // console.log(data)
          this.router.navigate(['/heroe', data.nombre]);
          formaHeroe.reset();
        },
        error => console.error(error));
    } else {
      this.heroesService.actualizarHeroe( this.heroe, this.id )
        .subscribe(data => {
          console.log(data);
        },
        error => console.error(error));
    }
  }

  agregarNuevo(formaHeroe: NgForm) {
    this.router.navigate(['/heroe', 'new']);

    formaHeroe.reset({
      casa: 'Marvel'
    });
  }

}
