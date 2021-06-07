import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GamesRoutingModule } from './games-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ListGamesComponent } from './pages/list-games/list-games.component';
import { FormGameComponent } from './pages/form-game/form-game.component';
import { CardGameComponent } from './components/card-game/card-game.component';


@NgModule({
  declarations: [
    ListGamesComponent,
    FormGameComponent,
    CardGameComponent
  ],
  imports: [
    CommonModule,
    GamesRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class GamesModule { }
