import { Component, OnInit } from '@angular/core';
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
    
  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
      this.isLoggedIn = !!this.tokenStorage.getToken();

      if(this.isLoggedIn){
          const user = this.tokenStorage.getUser();
          this.roles = user.roles;

          this.showAdmin = this.roles.includes('ROLE_ADMIN');
          this.showMod = this.roles.includes('MODERATOR');
          this.username= user.username;
      }
  }

}
