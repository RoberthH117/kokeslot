import { Component } from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent {
  players = [
    { nombre: "Jugador 1", apuesta: 500 },
    { nombre: "Jugador 2", apuesta: 900 },
  ];
}
