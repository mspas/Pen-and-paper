import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.sass"],
})
export class SignInComponent implements OnInit {
  loginError: boolean = false;

  constructor(private auth: AuthService) {}

  ngOnInit() {}

  onSignIn(form: NgForm) {
    this.loginError = false;
    const login = form.value.login;
    const password = form.value.password;
    console.log(login, password);
    this.auth.signInUser(login, password);
    this.auth.currentLoginError.subscribe((data) => (this.loginError = data));
  }

  onTest() {
    this.auth.getAccounts();
  }
}
