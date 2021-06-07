import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';


import { GamesService } from '../../services/games.service';
import { Game } from '../../interfaces/games-response.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-game',
  templateUrl: './form-game.component.html',
  styleUrls: ['./form-game.component.css']
})
export class FormGameComponent implements OnInit {

  game!: Game;
  regex = new RegExp(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);

  myForm: FormGroup = this.fb.group({
    name: [ '', [Validators.required] ],
    description: [ '', [Validators.required] ],
    imageURL: [ '', [Validators.required, Validators.pattern(this.regex)] ]
  });

  get errorMessage(): string {
    const errors = this.myForm.get('imageURL')?.errors;

    if (errors?.required) return 'Field is required';
    else if (errors?.pattern) return 'Please enter a valid URL';
    else return '';
  };


  constructor( private gamesService: GamesService,
               private activatedRoute: ActivatedRoute,
               private router: Router,
               private fb: FormBuilder ) { }

  ngOnInit(): void {
    if ( this.router.url.includes('update') ) {
       this.activatedRoute.params
           .pipe(
             switchMap( params => this.gamesService.getGame(params['idGame']) )
           ).subscribe( resp => {
             console.log(resp);
             this.game = resp;
             this.myForm.reset({
               name: resp.name,
               description: resp.description,
               imageURL: resp.imageURL
             });
           }, (err) => {
             this.router.navigateByUrl('/games/list');
           })
    };
  };


  submitForm() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    };

    this.showSpinnerFromSweetalert();

    // Aprovecho que mis valores de form tienen la forma de la data que necesito
    const dataToSend: Game = this.myForm.value;

    if (!this.game) {
      this.gamesService.postGame(dataToSend)
          .subscribe( resp => {
              console.log(resp);
              Swal.close();
              this.router.navigateByUrl('/games/list');
          }, (err) => {
            this.showErrorMessageSweetalert(err.error.error.message);
          });

    } else {
      this.gamesService.putGame(this.game._id!, dataToSend)
          .subscribe( resp => {
            console.log(resp);
            Swal.close();
            this.router.navigateByUrl('/games/list');
          }, (err) => {
            this.showErrorMessageSweetalert(err.error.error.message);
          });
    };
  };


  fieldIsInvalid( controlName: string ) {
    return this.myForm.get(controlName)?.invalid && this.myForm.get(controlName)?.touched;
  };


  showSpinnerFromSweetalert() {
    Swal.fire({
      title: (this.game) ? 'Updating Hero...' : 'Creating Hero...',
      allowOutsideClick: false
    });

    Swal.showLoading();
  };

  showErrorMessageSweetalert( errorMessage: string ) {
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: errorMessage
    });
  };

};


// NOTA: EN ESTE CASO NO RESETEE EL FORMULARIO UNA VEZ QUE ACTUALIZO O CREO, YA QUE
// LO PROBÉ Y NO SE REGISTRA DOS VECES SI HAGO DOBLE CLIK, DEBE SER PORQUE NO MANDO
// A LA LISTA PRINCIPAL
