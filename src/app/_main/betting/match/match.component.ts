import { CloneVisitor } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { LolService } from 'src/app/_services/lol.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  
  constructor(private route: ActivatedRoute, private lol: LolService, private token: TokenStorageService,
    private snackBar: MatSnackBar, private userSerive: UserService) { }
  matchId = "";
  matchData: any = [];
  currentUser: any;
  matchType= 1;
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.matchId = params["matchId"]);
    this.lol.getMatchById(this.matchId).subscribe(data=>{
      console.log(data);
      this.matchData = data;
      this.matchType = data.match_type;

    });
    this.currentUser = this.token.getUser();
    this.formGroup.controls['betAmount'].markAsDirty();

  }

  displayedColumns: string[]= ['BlueTeam', 'RedTeam'];
  statusSelected = 'not-active';
  statusRedTeam = false;
  statusBlueTeam = false;
  formGroup = new FormGroup({
    teamSelect: new FormControl('-1', [Validators.required, Validators.min(1), Validators.max(2)]),
    betAmount: new FormControl('0', [Validators.required, Validators.min(5)]),
    matchId: new FormControl(),
    userId: new FormControl()
  });

  get f(){
    return this.formGroup.controls;
  }

  submit(){
    if(this.formGroup.status == 'VALID')
    {
      this.formGroup.controls['matchId'].setValue(this.matchId);
      this.formGroup.controls['userId'].setValue(this.token.getUser().id);

      this.lol.createBet(this.formGroup.value, this.currentUser).subscribe(data=>{
        this.snackBar.open('Bet created successfully', 'Close',{
          duration: 2000,
          panelClass: ['mat-toolbar', 'mat-primary']
        });
        console.log(data);
      },
      err=>{
        this.snackBar.open(err.error.message, 'Close',{
          duration: 2000,
          panelClass: ['mat-toolbar', 'mat-warn']
        });
        console.log(err);
      });
      console.log(this.formGroup.value);
    } else{
      //this.snackBar.open(this.formGroup.)
    }
  }
  setActive(){
    this.statusSelected = 'active';
  }
  activateRedTeam(){
    this.statusRedTeam = true;
    this.statusBlueTeam = false;
    this.formGroup.controls['teamSelect'].setValue(2);
  }
  activateBlueTeam(){
    this.statusRedTeam = false;
    this.statusBlueTeam = true;
    this.formGroup.controls['teamSelect'].setValue(1);
  }

  blueStyle(): Object{
    if(!this.statusRedTeam && this.statusBlueTeam){
      return {
        //'background': 'rgb(36,0,5)',
        'background': this.matchData.team1.color
        //'background': '-moz-linear-gradient(rigth' this.matchData.team1.color,

      }
    }
    return {};
  }
  redStyle():Object{
    if(this.statusRedTeam && !this.statusBlueTeam){
      return {
        //'background': 'rgb(255,87,3)';
        'background': this.matchData.team2.color
      }
    }
    return {};
  }
  counter(i:number){
    return new Array(i);
  }
}

export interface MatchTeam {
  name: string,
  color: string
}


