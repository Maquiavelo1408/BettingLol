import { Component, OnInit } from '@angular/core';
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
  submitted = false;
  constructor(private collectionService: CollectionService) { }

  ngOnInit(): void {
  }

  saveTeam():void{
    const data = {
      name: this.team.name,
      color: this.team.color,
      region: this.team.region
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
