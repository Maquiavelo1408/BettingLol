import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Competition } from 'src/app/models/competition.model';
import { Match } from 'src/app/models/match.model';
import { Region } from 'src/app/models/region.model';
import { Team } from 'src/app/models/team.model';
import { CollectionService } from 'src/app/_services/collection.service';
import { LolService } from 'src/app/_services/lol.service';

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
    idCompetition: '',
    competition: ''
  }
  submitted = false;
  constructor(private collectionService: CollectionService, private lolService: LolService) { }
  regionControl = new FormControl('', Validators.required);
  compControl = new FormControl('', Validators.required);
  team1Control = new FormControl('', Validators.required);
  team2Control = new FormControl('', Validators.required);
  regions: Region[] = [
    { name:'Brazil', abbreviation: 'BR'},
    { name: 'Europe Nordic & East', abbreviation: 'EUNE'},
    { name: 'Europe Weds', abbreviation: 'EUW'},
    { name: 'Latin America North', abbreviation: 'LAN'},
    { name: 'Latin America South', abbreviation: 'LAS'},
    { name:'North Ameria', abbreviation:'NA'},
    {name:'Oceania', abbreviation:'OCE'},
    { name: 'Russia', abbreviation: 'RU'},
    { name: 'Turkey', abbreviation: 'TR'},
    { name: 'Japan', abbreviation: 'JP'},
    { name: 'Republic of Korea', abbreviation: 'KR'},
    { name:'China', abbreviation:'CHN'},
    {name:'Internation', abbreviation: 'INT'}
  ];

  competitions: Competition[]=[
  ];
  teams: Team[]=[];
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
  getCompetitions(region: any):void {
    this.collectionService.getCompetitionsByRegion(region)
    .subscribe(
      res=>{
        console.log(res);
        this.competitions = res;
      },
      err=>{
        console.log(err);
      }
    );
  }
  getTeams(regionT: any): void {
    this.lolService.getTeamsByRegion(regionT)
    .subscribe(
      res=>{
        this.teams = res;
      },
      err=>{
        console.log(err);
      }
    );
  }

  regionChange(region: any): void{
    this.getTeams(region);
    this.getCompetitions(region);
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
