import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { regionList } from 'src/app/constants/region';
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
    primary_color: '',
    secondary_color: '',
    region: ''
  }

  teamForm: FormGroup;
  isUpdate = false;
  regions = regionList;
  teams: MatTableDataSource<Team>;
  submitted = false;
  regionControl = new FormControl('', Validators.required);
  constructor(private collectionService: CollectionService, private fb: FormBuilder) {
    this.teamForm = fb.group({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      primary_color: new FormControl('', Validators.required),
      secondary_color: new FormControl('', Validators.required),
      region: new FormControl('', Validators.required)
    });
   }
  primary_color = '';
  secondary_color = '';
  updatingRow = new Team;
  public selectedColor: string = '';
  @ViewChild(MatTable) table: MatTable<Team>;
  displayedColumns: string[] = ['name', 'region', 'primary_color', 'secondary_color'];
  ngOnInit(): void {
    this.getTeams();
  }

  saveTeam():void{
    this.formatColor();
    const data = {
      name: this.teamForm.controls['name'].value,
      primary_color: this.primary_color,
      secondary_color: this.secondary_color,
      region: this.teamForm.controls['region'].value?.abbreviation
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
      primary_color: '',
      secondary_color: '',
      region:''
    }
  }

  formatColor(): string{
    
    let firstAlpha = this.primary_color.replace(")", ",0)");
    let secondAlpha = this.primary_color.replace(")", ",0.8)");
    let thirdAlpha = this.primary_color.replace(")", ",1)");
    let result = "radial-gradient(circle, " + firstAlpha + "0%, " + secondAlpha + "35%, " + thirdAlpha + "100%)";
    return result;
  }
  getTeams(): void{
    this.collectionService.getTeams()
    .subscribe(data=>{
      this.teams = new MatTableDataSource(data);
      this.table.renderRows();
    },  
    error=>{
      console.log(error)
    });
  }
  updateRow(row: Team): void{
    console.log(row);
    this.teamForm.controls['region'].setValue(this.regions.find(x=> x.abbreviation == row.region));
    this.primary_color = row.primary_color!;
    this.secondary_color = row.secondary_color!;
    this.updatingRow = row;
    this.teamForm.controls['name'].setValue(row.name);
    this.teamForm.controls['id'].setValue(row.id);
    this.isUpdate = true;
  }
  updateTeam(){
    this.teamForm.controls['primary_color'].setValue(this.primary_color);
    this.teamForm.controls['secondary_color'].setValue(this.secondary_color);
    this.teamForm.controls['region'].setValue(this.regions.find(x=> x.abbreviation == this.teamForm.controls['region'].value?.abbreviation)?.abbreviation);
    this.collectionService.updateTeam(this.teamForm.value)
    .subscribe(data=>{
      console.log(data);
      let index = this.teams.data.findIndex(x=> x.id == data.id);
      if(~index){
        this.teams.data[index] = data;
      }
      this.table.renderRows();
      this.resetTeamForm();
    this.isUpdate = false;
    },
    err=>{
      console.log(err);
    });
    
  }
  cancelUpdate(){
    this.isUpdate = false;
    this.resetTeamForm();
  }
  deleteRow(){
    this.collectionService.deleteTeam(this.updatingRow.id)
    .subscribe(data=>{
      console.log(data);
      this.resetTeamForm();
      this.isUpdate = false;
      this.getTeams();
    },
    err=>{
      console.log(err);
    });
  }

  resetTeamForm(){
    this.teamForm.controls['region'].setValue('');
    this.teamForm.controls['name'].setValue('');
    this.primary_color = '';
    this.secondary_color = '';
    this.teamForm.controls['primary_color'].setValue('');
    this.teamForm.controls['secondary_color'].setValue('');
    this.teamForm.controls['id'].setValue('');
  }
}
