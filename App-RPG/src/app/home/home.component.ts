import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {

    constructor(private router: Router) {}

    isSignIn = true;
    isSignUp = false;
    isAbout = false;

    rootToSignIn() {
      this.router.navigate(['/sign-in']);
    }
  
    rootToSignUp() {
      this.router.navigate(['/sign-up']);    
    }

    btnClick(event) {
      var target = event.target || event.srcElement || event.currentTarget;
      var idAttr = target.attributes.id;
      var value = idAttr.nodeValue;
      if (value == "btn_in") {
        this.isSignIn = true;
        this.isSignUp = false;
        this.isAbout = false;
      }
      if (value == "btn_up") {
        this.isSignIn = false;
        this.isSignUp = true;
        this.isAbout = false;
      }
      if (value == "btn_about") {
        this.isSignIn = false;
        this.isSignUp = false;
        this.isAbout = true;
      }
    }
}