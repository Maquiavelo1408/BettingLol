import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Region } from 'src/app/models/region.model';
import { Team } from 'src/app/models/team.model';
import { CollectionService } from 'src/app/_services/collection.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  team: Team  ={
    name: '',
    color: '',
    region: ''
  }
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
  submitted = false;
  regionControl = new FormControl('', Validators.required);
  constructor(private collectionService: CollectionService) { }

  ngOnInit(): void {
  }

  saveTeam():void{
    const data = {
      name: this.team.name,
      color: this.team.color,
      region: this.regionControl.value?.abbreviation
    }

    this.collectionService.createTeam(data)
    .subscribe(
      response=> {
        console.log(response);
        this.submitted = true;
      },
      error=> {
        console.log(error);
      });
  }

  newTeam(): void{
    this.submitted = false;
    this.team = {
      name: '',
      color:'',
      region:''
    }
  }

}
