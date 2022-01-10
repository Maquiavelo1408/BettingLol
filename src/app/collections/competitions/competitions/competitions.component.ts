import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Competition } from 'src/app/models/competition.model';
import { Region } from 'src/app/models/region.model';
import { CollectionService } from 'src/app/_services/collection.service';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit {
  control = new FormControl();
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  })
  regionControl = new FormControl('', Validators.required);
  competition: Competition = {
    name: '',
    startDate: '',
    endDate: '',
    region: '',
    organizer: '',
    country: ''
  }
  submitted = false;
  constructor(private collectionService: CollectionService) { }
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
  ngOnInit(): void {
  }

  saveCompetition(): void{
    console.log(this.range);
    const data = {
       name: this.competition.name,
       start_date: this.range.controls['start'].value,
       end_date: this.range.controls['end'].value,
       region: this.regionControl.value?.abbreviation,
       organizer: this.competition.organizer,
       country: this.competition.country
    }
    this.collectionService.createCompetition(data)
    .subscribe(
      response =>{
        console.log(response);
        this.submitted = true;
      },
      error=>{
        console.log(error);
      });
  }
  newCompetition(): void{
    this.submitted = false;
    this.competition={
      country: '',
      name: '',
      organizer: '',
      region: '',
      startDate: '',
      endDate: ''
    }
  }

}
