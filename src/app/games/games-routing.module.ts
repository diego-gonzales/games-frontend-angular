import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListGamesComponent } from './pages/list-games/list-games.component';
import { FormGameComponent } from './pages/form-game/form-game.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListGamesComponent
      },
      {
        path: 'create',
        component: FormGameComponent
      },
      {
        path: 'update/:idGame',
        component: FormGameComponent
      },
      {
        path: '**',
        redirectTo: 'list'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
