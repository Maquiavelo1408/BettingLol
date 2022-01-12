import { CloneVisitor } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { Player } from 'src/app/models/player.model';
import { LolService } from 'src/app/_services/lol.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {
  gameResults: FormGroup;
  secondaryResults: FormGroup;
  constructor(private route: ActivatedRoute, private lol: LolService, private token: TokenStorageService,
    private snackBar: MatSnackBar, private userSerive: UserService, private fb: FormBuilder) { 
      this.gameResults = fb.group({
        0: '',
        1: '',
        2:'',
        3:'',
        4:''
      });
        this.secondaryResults = this.fb.group({
       games: fb.array([
        this.fb.group({
          gameDuration: ['', Validators.required],
          topKill1: ['', Validators.required],
          topKill2:['', Validators.required],
          dragonSoul: ['', Validators.required],
          topDeath1: ['', Validators.required],
          topDeath2:['', Validators.required]
        }),
        this.fb.group({
          gameDuration: ['', Validators.required],
          topKill1: ['', Validators.required],
          topKill2:['', Validators.required],
          dragonSoul: ['', Validators.required],
          topDeath1: ['', Validators.required],
          topDeath2:['', Validators.required]
        }),
        this.fb.group({
          gameDuration: ['', Validators.required],
          topKill1: ['', Validators.required],
          topKill2:['', Validators.required],
          dragonSoul: ['', Validators.required],
          topDeath1: ['', Validators.required],
          topDeath2:['', Validators.required]
        }),
        this.fb.group({
          gameDuration: ['', Validators.required],
          topKill1: ['', Validators.required],
          topKill2:['', Validators.required],
          dragonSoul: ['', Validators.required],
          topDeath1: ['', Validators.required],
          topDeath2:['', Validators.required]
        }),
        this.fb.group({
          gameDuration: ['', Validators.required],
          topKill1: ['', Validators.required],
          topKill2:['', Validators.required],
          dragonSoul: ['', Validators.required],
          topDeath1: ['', Validators.required],
          topDeath2:['', Validators.required]
        }),
      ])
    });
    }
  matchId = "";
  matchData: any = [];
  currentUser: any;
  matchType= 1;
  noGames = 0;
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.matchId = params["matchId"]);
    this.lol.getMatchById(this.matchId).subscribe(data=>{
      console.log(data);
      this.matchData = data;
      this.matchType = data.match_type;
      switch(this.matchType){
        case 1:
          this.noGames = 1;
          break;
          case 2:
            this.noGames = 3;
            break;
            case 3:
              this.noGames = 5;
              break;
              default:
                this.noGames = 1;
                break;
      }
      this.getPlayersByTeam();
    });
    this.currentUser = this.token.getUser();
    this.formGroup.controls['betAmount'].markAsDirty();
    

  }

  displayedColumns: string[]= ['BlueTeam', 'RedTeam'];
  statusSelected = 'not-active';
  statusRedTeam = false;
  statusBlueTeam = false;
  team1Wins =0;
  team2Wins= 0;
  playersTeam1: Player[] =[];
  playersTeam2: Player[] = [];
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
    console.log(this.secondaryResults);
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
    this.formGroup.controls['teamSelect'].setValue(1);
  }
  activateBlueTeam(){
    this.statusRedTeam = false;
    this.statusBlueTeam = true;
    this.formGroup.controls['teamSelect'].setValue(2);
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
  displayWinner(i: number){
    if(this.gameResults.controls[i.toString()].value == '1'){
      return true;
    } else{
      return false;
    }
  }
  checkMatchResults(){
    switch(this.matchType){
      case 1:
        
        break;
        case 2:
          if((this.gameResults.controls[0].value == this.gameResults.controls[1].value)){
            this.gameResults.controls[2].disable();
          } else{
            this.gameResults.controls[2].enable();
          }
          break;
          case 3:
            this.team1Wins = 0;
            this.team2Wins = 0;
            for(let i = 0; i < 5; i++){
              if(this.gameResults.controls[i].value=='1'){
                this.team1Wins++;
              }else if(this.gameResults.controls[i].value == '2'){
                this.team2Wins++;
              }
              if(this.team1Wins >= 3 || this.team2Wins >= 3){
                if(i < 4){
                  this.gameResults.controls[i+1].setValue(0);
                  this.gameResults.controls[i+1].disable();
                }
              } else{
                if(i < 4)
                  this.gameResults.controls[i+1].enable();
                  else{
                    this.gameResults.controls[i].enable();
                  }
              }
            }
            
            break;

    }
  }
  showGameResult(index: number){
    if(this.gameResults.controls[index].value > 0){
      return true;
    }
    return false;
  }
  displayMissingGamePredictionError(){
    if(this.team1Wins < 3 && this.team2Wins < 3){
      return true;
    }
    return false;
  }
  displayMatchingSelectionWinnerError(){
    if(this.formGroup.controls['teamSelect'].value == 1){
      if(this.team1Wins != 3){
        return true;
      }
      else if(this.team1Wins ==3){
        return false;
      }
    }
    if(this.formGroup.controls['teamSelect'].value == 2){
      if(this.team2Wins != 3){
        return true;
      } else if(this.team2Wins == 3){
        return false;
      }
    }
    return false;
  }
  getPlayersByTeam(){
    this.lol.getPlayersByTeam(this.matchData.team1.id)
    .subscribe(
      data=>{
        console.log(data);
        this.playersTeam1 = data;
      },
      err=>{
        console.log(err);
      }
    );
    this.lol.getPlayersByTeam(this.matchData.team2.id)
    .subscribe(
      data=>{
        this.playersTeam2 = data;
      },
      err=>{
        console.log(err);
      }
    );
  }
}

export interface MatchTeam {
  name: string,
  color: string
}


