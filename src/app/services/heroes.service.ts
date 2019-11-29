import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Heroe } from '../interface/heroe.interface';
// import { map } from 'rxjs/operators';
import 'rxjs/Rx';

@Injectable()
    export class HeroesService {

      heroesURL: string = 'https://heroesapp-96a5d.firebaseio.com/heroes.json';
      heroeURL: string = 'https://heroesapp-96a5d.firebaseio.com/heroes/';

     constructor( private http: Http ) { }

    nuevoHeroe( heroe: Heroe ) {
      let body = JSON.stringify( heroe );
      let headers = new Headers ({
       'Content-Type': 'application/json'
      });

        return this.http.post( this.heroesURL, body, { headers } )
        .map( (res: any) => {
          console.log(res.json() );
          heroe.id = res.name;
          return heroe;
        } );
    }

    actualizarHeroe( heroe: Heroe, key$: string ) {
      let body = JSON.stringify( heroe );
      let headers = new Headers ({
       'Content-Type': 'application/json'
      });

      let url = `${ this.heroeURL }/${ key$ }.json`

        return this.http.put( url, body, { headers } )
        .map( res => {
          console.log(res.json());
          return res.json();
        } );
    }

    obtenerHeroe( key$:string ){
      let headers = new Headers ({
       'Content-Type': 'application/json'
      });
      let url = `${ this.heroeURL }/${ key$ }.json`;

      return this.http.get( url, { headers } )
       .map(res => res.json());
    }

    getHeroes(){
      return this.http.get( this.heroesURL )
       .map(res => res.json());
    }

    deleteHeroe( key$:string ){
      let url = `${ this.heroeURL }/${ key$ }.json`;

      return this.http.delete( url )
      .map(res => res.json());
      }
}
