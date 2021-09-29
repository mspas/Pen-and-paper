import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AccessToken } from "../../models/token.model";
import { AuthService } from "../auth.service";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.sass"],
})
export class SignInComponent implements OnInit {
  showAlert: boolean = false;
  alertMessage: string = "";
  isLoading: boolean = false;

  faSpinner = faSpinner;

  constructor(private _auth: AuthService, private router: Router) {}

  ngOnInit() {}

  validateInput(login, password) {
    let check = login.length < 1 || password.length < 1 ? false : true;
    if (!check) this.alertMessage = "Error! Fill both inputs to sign in!";
    return check;
  }

  onSignIn(form: NgForm) {
    this.showAlert = !this.validateInput(form.value.login, form.value.password);
    if (this.showAlert) return false;
    
    this.isLoading = true;

    this._auth.signInUser(form.value.login, form.value.password).subscribe(
      (token: AccessToken) => {
        let login = this._auth.decodeToken(token);
        this.router.navigate(["/profile", login]);
        this.isLoading = false;
      },
      (error) => {
        this.showAlert = true;
        this.isLoading = false;
        this.alertMessage = "Error! Login or password incorrect!";
      }
    );
  }
}
