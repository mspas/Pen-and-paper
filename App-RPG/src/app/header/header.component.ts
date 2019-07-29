import { AuthGuardService } from './../auth/auth-guard.service';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  private isLoggedIn : boolean;
  private auth : AuthService;

  constructor(_auth : AuthService) {
    this.auth = _auth; 
    this.isLoggedIn = false;
  }

  ngOnInit() {
    this.isLoggedIn = this.auth.isAuthenticated();
  }

  onLogout() {
    this.auth.logout();
  }

  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    
    this.isLoggedIn = this.auth.isAuthenticated();
  }

}
