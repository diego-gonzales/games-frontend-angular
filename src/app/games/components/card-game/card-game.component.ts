import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game } from '../../interfaces/games-response.interface';
import { GamesService } from '../../services/games.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-card-game',
  templateUrl: './card-game.component.html',
  styleUrls: ['./card-game.component.css']
})
export class CardGameComponent implements OnInit {

  @Input('gameChild') game!: Game;
  @Output() idGameToDeleted = new EventEmitter<string>();


  constructor( private gamesService: GamesService ) { }

  ngOnInit(): void { }


  deleteGame() {
    Swal.fire({
      title: 'Are you sure?',
      text: `${this.game.name.toLocaleUpperCase()} will be deleted`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.gamesService.deleteGame(this.game._id!)
            .subscribe( resp => {
              this.idGameToDeleted.emit(this.game._id);
            });

        Swal.fire(
          'Deleted!',
          'The game has been deleted.',
          'success'
        )
      }
    });

  };
}
