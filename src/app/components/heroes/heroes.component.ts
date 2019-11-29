import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

  heroes: any[] = [];
  loading: boolean = false;

  constructor(private heroesService: HeroesService) {
    this.heroesService.getHeroes()
      .subscribe(data => {
        console.log(data);
        this.heroes = data;
        this.loading = true;
        // for( let key$ in data ){
        //   console.log(data[key$])
        //   let h = data[key$];
        //   h.key$ = key$;
        //   this.heroes.push(data[key$])
        // }
      });
  }

  ngOnInit() {
  }

  borrarHeroe( key$:string ){
    this.heroesService.deleteHeroe(key$)
    .subscribe( respuesta=>{
      if(respuesta){
        console.error(respuesta)
      }else{
        //todo bien
        delete this.heroes[key$];
      }
    })
  }

}
