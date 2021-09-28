import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.sass"],
})
export class SignInComponent implements OnInit {
  showAlert: boolean = false;
  alertMessage: string = "";

  constructor(private auth: AuthService) {}

  ngOnInit() {}

  validateInput(login, password) {
    let check = login.length < 1 || password.length < 1 ? false : true;
    if (!check) this.alertMessage = "Error! Fill both inputs to sign in!";
    return check;
  }

  onSignIn(form: NgForm) {
    this.showAlert = !this.validateInput(form.value.login, form.value.password);
    if (this.showAlert) return false;
    
    this.auth.signInUser(form.value.login, form.value.password);
    this.auth.currentLoginError.subscribe((data) => {
      this.showAlert = data;
      if (!data) this.alertMessage = "Error! Login or password incorrect!";
    });
  }
}
