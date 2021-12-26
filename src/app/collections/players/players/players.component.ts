import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Player } from 'src/app/models/player.model';
import { Team } from 'src/app/models/team.model';
import { CollectionService } from 'src/app/_services/collection.service';
import { map, startWith} from 'rxjs/operators'

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  control = new FormControl();
  player: Player = {
    name: '',
    role:'', 
    idTeam:''
  }
  submitted = false;
  constructor(private collectionService: CollectionService ) { 
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      map(team=> (team ? this._filter(team): this.options.slice())),
    )
  }
  options: Team[] =  [];

  filteredOptions: Observable<Team[]>;
  ngOnInit(): void {
    this.getTeams();
  }

  private _filter(value:string): Team[]{
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option?.name?.toLowerCase().includes(filterValue));
  }
  savePlayer() : void {
    console.log(this.control);
    const data = {
      name: this.player.name,
      role: this.player.role,
      idTeam: this.control.value['id']
    }
    this.collectionService.createPlayer(data)
    .subscribe(
      res=>{
        console.log(res);
        this.submitted = true;
      },
      err=>{
        console.log(err);
      }
    )
  }
  newPlayer(): void{
    this.submitted = false;
    this.player = {
      name: '',
      role: '',
      idTeam: ''
    }
  }

  getTeams(): void {
    this.collectionService.getTeams().subscribe(data=>{
      console.log(data);
      this.options = data;
      console.log(this.options);
    });
  }
  displayFn(team: Team): string{
    return team && team.name ? team.name : '';
  }
}
