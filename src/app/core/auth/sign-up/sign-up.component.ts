import { NgForm } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { AccountModel, AccountCreateModel } from "../../models/account.model";
import {
  PersonalDataModel,
  PersonalDataCreateModel,
} from "../../models/personaldata.model";
import { AuthService } from "../auth.service";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Router } from "@angular/router";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.sass"],
})
export class SignUpComponent implements OnInit {
  showAlert: boolean = false;
  alertMessage: string = "";
  isLoading: boolean = false;

  faSpinner = faSpinner;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  validateInput(login, email, firstname, lastname, city, age, password, password2) {
    let check = login.length < 1 || email.length < 1 || firstname.length < 1 || lastname.length < 1 || city.length < 1 || age.length < 1 || password.length < 1 ? false : true;

    if (password !== password2) { 
      this.alertMessage = "Error! Inputted passwords are different!";
      return false;
    }

    if (!check) this.alertMessage = "Error! Fill all the inputs to sign up!";
    return check;
  }

  onSignUp(form: NgForm) {
    this.showAlert = !this.validateInput(form.value.login, form.value.email, form.value.firstname, form.value.lastname, form.value.city, form.value.age, form.value.password, form.value.password2);
    if (this.showAlert) return false;

    const pd: PersonalDataCreateModel = new PersonalDataCreateModel(
      form.value.login,
      form.value.email,
      form.value.firstname,
      form.value.lastname,
      form.value.city,
      form.value.age,
      null,
      false
    );
    const account: AccountCreateModel = new AccountCreateModel(
      form.value.login,
      form.value.password,
      form.value.email,
      pd
    );

    this.isLoading = true;
    this.authService.createAccount(account).subscribe(
      (data) => {
        this.router.navigate(["/sign-in"]);
        this.isLoading = false;
      },
      (error) => {
        this.showAlert = true;
        this.isLoading = false;
        this.alertMessage = "Error! Login or password incorrect!";
      });

    this.authService.currentAccMsg.subscribe((data) => {
      this.showAlert = data;
      if (!data) this.alertMessage = "Sorry! An error occured! Account was not created!";
    });
  }
}
