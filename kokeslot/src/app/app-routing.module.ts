import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { RuletaComponent } from './components/ruleta/ruleta.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'ruleta', component: RuletaComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
