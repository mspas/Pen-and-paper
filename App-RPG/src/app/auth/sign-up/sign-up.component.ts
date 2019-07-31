import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AccountModel, AccountCreateModel } from '../../models/account.model';
import { PersonalDataModel, PersonalDataCreateModel } from '../../models/personaldata.model';
import { AuthService } from '../auth.service';
import { NotificationModel } from '../../models/notification.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  accMsg: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignUp(form: NgForm) {
    console.log(form.value.email + " " + form.value.password + " " + form.value.login);
    const notif: NotificationModel = new NotificationModel(null, null);
    const pd: PersonalDataCreateModel = new PersonalDataCreateModel(form.value.login, form.value.email, form.value.firstname, form.value.lastname, form.value.city, form.value.age, notif); 
    const account: AccountCreateModel = new AccountCreateModel(form.value.login, form.value.password, form.value.email, pd);
    this.authService.createAccountDB(account); 
    this.authService.currentAccMsg.subscribe(data => this.accMsg = data);
  }

}
