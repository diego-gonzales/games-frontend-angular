import { Component, OnInit } from '@angular/core';

import { GamesService } from '../../services/games.service';
import { Game } from '../../interfaces/games-response.interface';

@Component({
  selector: 'app-list-games',
  templateUrl: './list-games.component.html',
  styleUrls: ['./list-games.component.css']
})
export class ListGamesComponent implements OnInit {

  games: Game[] = [];
  thereAreGames: boolean = true;


  constructor( private _gamesService: GamesService ) { }

  ngOnInit(): void {
    this._gamesService.getGames()
        .subscribe( resp => {
          if (resp.length === 0) this.thereAreGames = false;
          // console.log(resp);
          this.games = resp;
        })
  };


  removeGameDeletedOfArray( evento: string ) {
    this.games = this.games.filter( game => game._id !== evento );
  };

}
