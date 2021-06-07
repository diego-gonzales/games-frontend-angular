import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { GamesResponse, Game } from '../interfaces/games-response.interface';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private _apiURL: string = environment.apiURLGames;


  constructor( private http: HttpClient) { }


  postGame( game: Game ): Observable<Game> {
    return this.http.post<GamesResponse>(`${this._apiURL}/games`, game)
                .pipe(
                  map( resp => resp.game!)
                )
  };

  getGames(): Observable<Game[]> {
    return this.http.get<GamesResponse>(`${this._apiURL}/games`)
                .pipe(
                  delay(200),
                  map( resp => resp.games!)
                )
  };

  getGame( idGame: string ): Observable<Game> {
    return this.http.get<GamesResponse>(`${this._apiURL}/games/${idGame}`)
                .pipe(
                  map( resp => resp.game!)
                )
  };

  putGame( idGame: string, game: Game ): Observable<GamesResponse> {
    return this.http.put<GamesResponse>(`${this._apiURL}/games/${idGame}`, game)
  };

  deleteGame( idGame: string ): Observable<GamesResponse> {
    return this.http.delete<GamesResponse>(`${this._apiURL}/games/${idGame}`);
  };
}
