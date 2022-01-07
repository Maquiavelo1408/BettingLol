import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Competition } from 'src/app/models/competition.model';
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

  ngOnInit(): void {
  }

  saveCompetition(): void{
    console.log(this.range);
    const data = {
       name: this.competition.name,
       start_date: this.range.controls['start'].value,
       end_date: this.range.controls['end'].value,
       region: this.competition.region,
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
