import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { LolService } from 'src/app/_services/lol.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  formGroup: FormGroup;
  matchId = "";
  constructor(private lol: LolService, private route: ActivatedRoute, private fb: FormBuilder) {
    this.formGroup = fb.group({
    results: fb.array([
      this.fb.group({
        gameDuration: [''],
        
        winner: [''],
        dragonSoul: [''],
        gameNumber: ['1'],
        topKill1: [''],
        topKill2: [''],
        topDeath1: [''],
        topDeath2: [''],
        minutes: [''],
        seconds: ['']
      }),
      this.fb.group({
        gameDuration: [''],
        winner: [''],
        dragonSoul: [''],
        gameNumber: ['2'],
        topKill1: [''],
        topKill2: [''],
        topDeath1: [''],
        topDeth2: [''],
        minutes: [''],
        seconds: ['']
      }),
      this.fb.group({
        gameDuration: [''],
        winner: [''],
        dragonSoul: [''],
        gameNumber: ['3'],
        topKill1: [''],
        topKill2: [''],
        topDeath1: [''],
        topDeth2: [''],
        minutes: [''],
        seconds: ['']
      }),
      this.fb.group({
        gameDuration: [''],
        winner: [''],
        dragonSoul: [''],
        gameNumber: ['4'],
        topKill1: [''],
        topKill2: [''],
        topDeath1: [''],
        topDeth2: [''],
        minutes: [''],
        seconds: ['']
      }),
      this.fb.group({
        gameDuration: [''],
        winner: [''],
        dragonSoul: [''],
        gameNumber: ['5'],
        topKill1: [''],
        topKill2: [''],
        topDeath1: [''],
        topDeth2: [''],
        minutes: [''],
        seconds: ['']
      }),
    ])
  });
   }
  matchData: any = [];
  matchType = 1;
  team1: any = [];
  team2: any = [];
  noGames = 0;
  topK1 =0;
  topK2 = 0;
  topD1=0;
  topD2=0;
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.matchId = params["matchId"]);
    this.lol.getMatchById(this.matchId).subscribe(data=>{
      this.matchData = data;
      this.matchType = data.match_type;
      switch(this.matchType){
        case 1:
          this.noGames = 1;
          this.formGroup = this.fb.group({
            matchId: this.fb.control(''),
                userId: this.fb.control(''),
            results: this.fb.array([
              this.fb.group({
                gameDuration: [''],
                winner: [''],
                dragonSoul: [''],
                gameNumber: ['1'],
                topKill1: [''],
                topKill2: [''],
                topDeath1: [''],
                topDeath2: [''],
                minutes: [''],
                seconds: ['']
              })
            ])
          });
          break;
          case 2:
            this.noGames = 3;
            this.formGroup = this.fb.group({
              matchId: this.fb.control(''),
                userId: this.fb.control(''),
              results: this.fb.array([
                this.fb.group({
                  gameDuration: [''],
                  winner: [''],
                  dragonSoul: [''],
                  gameNumber: ['1'],
                  topKill1: [''],
                  topKill2: [''],
                  topDeath1: [''],
                  topDeath2: [''],
                  minutes: [''],
                  seconds: ['']
                }),
                this.fb.group({
                  gameDuration: [''],
                  winner: [''],
                  dragonSoul: [''],
                  gameNumber: ['2'],
                  topKill1: [''],
                  topKill2: [''],
                  topDeath1: [''],
                  topDeath2: [''],
                  minutes: [''],
                  seconds: ['']
                }),
                this.fb.group({
                  gameDuration: [''],
                  winner: [''],
                  dragonSoul: [''],
                  gameNumber: ['3'],
                  topKill1: [''],
                  topKill2: [''],
                  topDeath1: [''],
                  topDeath2: [''],
                  minutes: [''],
                  seconds: ['']
                })
              ])
            });
            break;
            case 3:
              this.noGames = 5;
              this.formGroup = this.fb.group({
                matchId: this.fb.control(''),
                userId: this.fb.control(''),
                results: this.fb.array([
                  this.fb.group({
                    gameDuration: [''],
                    winner: [''],
                    dragonSoul: [''],
                    gameNumber: ['1'],
                    topKill1: [''],
                    topKill2: [''],
                    topDeath1: [''],
                    topDeath2: [''],
                    minutes: [''],
                    seconds: ['']
                  }),
                  this.fb.group({
                    gameDuration: [''],
                    winner: [''],
                    dragonSoul: [''],
                    gameNumber: ['2'],
                    topKill1: [''],
                    topKill2: [''],
                    topDeath1: [''],
                    topDeath2: [''],
                    minutes: [''],
                    seconds: ['']
                  }),
                  this.fb.group({
                    gameDuration: [''],
                    winner: [''],
                    dragonSoul: [''],
                    gameNumber: ['3'],
                    topKill1: [''],
                    topKill2: [''],
                    topDeath1: [''],
                    topDeath2: [''],
                    minutes: [''],
                    seconds: ['']
                  }),
                  this.fb.group({
                    gameDuration: [''],
                    winner: [''],
                    dragonSoul: [''],
                    gameNumber: ['4'],
                    topKill1: [''],
                    topKill2: [''],
                    topDeath1: [''],
                    topDeath2: [''],
                    minutes: [''],
                    seconds: ['']
                  }),
                  this.fb.group({
                    gameDuration: [''],
                    winner: [''],
                    dragonSoul: [''],
                    gameNumber: ['5'],
                    topKill1: [''],
                    topKill2: [''],
                    topDeath1: [''],
                    topDeath2: [''],
                    minutes: [''],
                    seconds: ['']
                  }),
                ])
              });
              break;
              default:
                this.noGames = 1;
                break;
      }
      this.lol.getPlayersByTeam(this.matchData.team1.id).subscribe(data=>{
        this.team1 = data;
      });
      this.lol.getPlayersByTeam(this.matchData.team2.id).subscribe(data=>{
        this.team2 = data;
      });
    });
  }
  displayedColumns: string[] = ['players'];
  counter(i:number){
    return new Array(i);
  }
  setResults(){
    console.log(this.formGroup.value);
    this.formGroup.controls['matchId'].setValue(this.matchId);
    this.lol.setResults(this.formGroup.value).subscribe(data=>{
      console.log(data);
    });
  }
}
