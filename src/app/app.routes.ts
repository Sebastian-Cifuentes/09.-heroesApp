import { Routes, RouterModule } from '@angular/router';
import { HeroeComponent } from '../app/components/heroes/heroe.component';
import { HeroesComponent } from '../app/components/heroes/heroes.component';

const APP_ROUTER: Routes = [
  { path: 'heroe/:id', component:HeroeComponent },
  { path: 'heroes', component:HeroesComponent },
  { path: '**', pathMatch:'full', redirectTo:'heroes' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTER);
