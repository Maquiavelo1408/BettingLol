import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LolService } from 'src/app/_services/lol.service';

@Component({
  selector: 'app-betting',
  templateUrl: './betting.component.html',
  styleUrls: ['./betting.component.scss']
})
export class BettingComponent implements OnInit {

  constructor(private lolService: LolService, private router: Router) { }
  date = new Date();
  
  startDate= new Date();
  endDate = new Date(this.date.getFullYear(), this.date.getMonth() +1, 0);
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  ngOnInit(): void {
    console.log(new Date(this.date.getFullYear(), this.date.getMonth() +1, 0));
    this.range.controls['start'].setValue(this.startDate);
    this.range.controls['end'].setValue(this.endDate);
    this.getMatches();
  }
  displayedColumns: string[] = ['date','redTeam', 'blueTeam','competition'];
  dataSource = [];
  getMatches(){
    this.startDate = this.range.controls['start'].value;
    this.endDate = this.range.controls['end'].value;
    this.lolService.getMatches(this.startDate.toString(), this.endDate.toString()).subscribe(data=>{
      console.log(data);
      this.dataSource = data;
    });
  }

  
  clickedRows = [] as any;
  goToMatch(row: any){
    this.router.navigate(["match", row.id]);
  }
}

export interface LolMatch {
  date: string;
  redTeam: string;
  blueTeam: string;
  competition: string;
  data: Date;
}
