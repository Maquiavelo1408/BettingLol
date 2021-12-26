import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;

  constructor(private token: TokenStorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }
  addMoney(){
    console.log(this.currentUser);
    console.log(this.currentUser.balance);
    this.currentUser.balance = parseFloat(this.currentUser.balance) + 10;
    console.log(this.currentUser.balance);
    this.userService.modifyUser(this.currentUser.id, this.currentUser).subscribe(
      data=>{
        console.log(data);
      },
      err=>{
        console.log(err);
      }
    );
  }

}
