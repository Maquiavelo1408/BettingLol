import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsComponent } from './teams/teams/teams.component';
import { MatchesComponent } from './matches/matches/matches.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollectionsComponent } from './collections.component';
import { MatListModule } from '@angular/material/list';
import { PlayersComponent } from './players/players/players.component';
import { CompetitionsComponent } from './competitions/competitions/competitions.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    TeamsComponent,
    MatchesComponent,
    CollectionsComponent,
    PlayersComponent,
    CompetitionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatListModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  exports:[
    TeamsComponent,
    CollectionsComponent
  ]
})
export class CollectionsModule { }
