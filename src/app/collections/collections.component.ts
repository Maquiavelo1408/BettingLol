import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LolService } from '../_services/lol.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service'

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {
  private roles: string[]= [];
  isLoggedIn = false;
  showAdmin = false;
  showMod = false;
  username?: string;
  gameList = [];
  date= new Date();
  constructor(private tokenStorage: TokenStorageService, private lol: LolService, private router: Router) { }
  startDate= new Date(this.date.getFullYear(), this.date.getMonth() - 1, 0)
  endDate = new Date();
  // new Date(this.date.getFullYear(), this.date.getMonth() - 1, 0)
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  displayedColumns: string[] = ['date','redTeam', 'blueTeam','competition'];
  ngOnInit(): void {
    
      this.isLoggedIn = !!this.tokenStorage.getToken();
      this.range.controls['start'].setValue(this.startDate);
    this.range.controls['end'].setValue(this.endDate);
      if(this.isLoggedIn){
          const user = this.tokenStorage.getUser();
          this.roles = user.roles;

          this.showAdmin = this.roles.includes('ROLE_ADMIN');
          this.showMod = this.roles.includes('MODERATOR');
          this.username= user.username;
      }
      this.getMatches();
  }
  getMatches(){
    this.startDate = this.range.controls['start'].value;
    this.endDate = this.range.controls['end'].value;
    this.lol.getMatches(this.startDate.toString(), this.endDate.toString())
      .subscribe(data=>{
        this.gameList = data;
      });
  }
  clickedRows = [] as any;
  goToMatch(row: any){
    this.router.navigate(["result", row.id]);
  }
}
