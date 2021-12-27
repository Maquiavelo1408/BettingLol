import { Component, OnInit } from '@angular/core';
import { Match } from 'src/app/models/match.model';
import { CollectionService } from 'src/app/_services/collection.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  match: Match = {
    team1: '',
    team2: '',
    date: new Date(),
    idCompetition: ''
  }
  submitted = false;
  constructor(private collectionService: CollectionService) { }

  ngOnInit(): void {
  }
  saveMatch(): void{
    const data = {
      team1: this.match.team1,
      team2: this.match.team2,
      date: this.match.date,
      idCompetition: this.match.idCompetition
    }
    this.collectionService.createMatch(data)
    .subscribe(
      res=> {
        console.log(res);
        this.submitted = true;
      },
      err=>{
        console.log(err);
      }
    );
  }

  newMatch(): void {
    this.submitted = false;
    this.match = {
      date: new Date(),
      team1: '',
      team2: '',
      idCompetition: ''
    }
  }
}
