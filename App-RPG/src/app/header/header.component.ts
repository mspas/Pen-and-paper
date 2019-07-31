import { AuthGuardService } from './../auth/auth-guard.service';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  private isLoggedIn : boolean;
  private dropIsDown: boolean = false;
  private auth : AuthService;

  constructor(private _auth : AuthService, private router: Router) {
    this.auth = _auth; 
    this.isLoggedIn = false;
  }

  ngOnInit() {
    this.isLoggedIn = this.auth.isAuthenticated();
  }

  onLogout() {
    this.auth.logout();
  }

  fixDropdown() {
    if (this.dropIsDown == false)
      document.getElementById("workffs").setAttribute("class", "dropdown drop open drop-focus");
    else
      document.getElementById("workffs").setAttribute("class", "dropdown drop");

    this.dropIsDown = !this.dropIsDown
  }

  goToMyProfile() {
    this.router.navigate(['/profile', localStorage.getItem("nick")]);
  }

  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    
    this.isLoggedIn = this.auth.isAuthenticated();
  }

}
