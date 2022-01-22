import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { CollectionsComponent } from './collections/collections.component';
import { CompetitionsComponent } from './collections/competitions/competitions/competitions.component';
import { MatchesComponent } from './collections/matches/matches/matches.component';
import { PlayersComponent } from './collections/players/players/players.component';
import { TeamsComponent } from './collections/teams/teams/teams.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ResultComponent } from './result/result/result.component';
import { BettingComponent } from './_main/betting/betting.component';
import { BettingModule } from './_main/betting/betting.module';
import { MatchComponent } from './_main/betting/match/match.component';

const routes: Routes = [
  {path:'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  {path:'profile', component: ProfileComponent},
  {path:'user', component: BoardUserComponent},
  {path:'mod', component: BoardModeratorComponent},
  {path: 'admin', component: BoardAdminComponent},
  { path: 'match/:matchId', component: MatchComponent},
  { path: 'selectMatch', component: BettingComponent},
  {path:'collection/teams', component: TeamsComponent},
  { path: 'collection/players', component: PlayersComponent},
  { path: 'collection/matches', component: MatchesComponent},
  { path: 'collection/competitions', component: CompetitionsComponent},
  {path: 'collection', component: CollectionsComponent},
  { path: 'result/:matchId', component: ResultComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
