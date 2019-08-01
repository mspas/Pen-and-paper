import { AuthGuardService } from './../auth/auth-guard.service';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { CheckNotificationModel } from '../models/notification.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private isLoggedIn : boolean;
  private dropIsDown: boolean = false;
  private auth : AuthService;
  private timerSubscription: any;
  private newNotificationSet: CheckNotificationModel;
  private notificationSet: CheckNotificationModel = new CheckNotificationModel(false, false, false);

  constructor(private _auth : AuthService, private router: Router, private _data: DataService) {
    this.auth = _auth; 
    this.isLoggedIn = false;
  }

  ngOnInit() {
    this.isLoggedIn = this.auth.isAuthenticated();
    this.refreshData();
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

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async refreshData() {
    //this._api.getConversation(this.conversationData.relationId).subscribe(data => this.conversation = data);
    //await this.delay(4000);
    await this._data.currentNotificationSet.subscribe(data => {
      this.newNotificationSet = data;
      //this.subscribeToData();
    });

    await this.delay(8000);

    console.log(JSON.stringify(this.newNotificationSet));

    if (this.newNotificationSet.friend == true) 
      this.notificationSet.friend = true;
    if (this.newNotificationSet.game == true) 
      this.notificationSet.game = true;
    if (this.newNotificationSet.message == true) 
      this.notificationSet.message = true;

    this.refreshData();
  }

  private subscribeToData(): void {
    this.timerSubscription = Observable.timer(4000).first().subscribe(() => this.refreshData());
  }

}
