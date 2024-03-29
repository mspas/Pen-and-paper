import { timer as observableTimer } from "rxjs";

import { first } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Router } from "@angular/router";
import { DataService } from "../services/data.service";
import { CheckNotificationModel } from "../models/notification.model";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.sass"],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  dropIsDown: boolean = false;
  private collapsedMyAccount: boolean = false;
  private timerSubscription: any;
  private newNotificationSet: CheckNotificationModel;
  private notificationSet: CheckNotificationModel = new CheckNotificationModel(
    false,
    false,
    false
  );

  @ViewChild("dropdownMenu", { static: false }) dropdownMenu: ElementRef;
  @ViewChild("accountDropdown", { static: false }) accountDropdown: ElementRef;
  faBars = faBars;
  faTimes = faTimes;

  constructor(
    private _auth: AuthService,
    private router: Router,
    private _data: DataService
  ) {
    this.isLoggedIn = _auth.isAuthenticated();
  }

  ngOnInit() {
    this.isLoggedIn = this._auth.isAuthenticated();
    //this.refreshData();
    this._data.currentNotificationSet.subscribe((data) => {
      this.newNotificationSet = data;
      //this.subscribeToData();
    });
  }

  showNavbarMobile() {
    this.dropIsDown = !this.dropIsDown;
    this.collapsedMyAccount = false;
  }

  collapseMyAccountDropdown() {
    this.collapsedMyAccount = !this.collapsedMyAccount;
  }

  onLogout() {
    this._auth.logout("/home");
  }

  goToMyProfile() {
    this.dropIsDown = false;
    this.collapsedMyAccount = false;
    this.router.navigate(["/profile", localStorage.getItem("nick")]);
  }

  goToActivity(subpage: string) {
    this.dropIsDown = false;
    this.collapsedMyAccount = false;
    this.router.navigate(["my-account"], { queryParams: { page: subpage } });
  }

  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.

    /*if (this.newNotificationSet.friend == true) 
      this.notificationSet.friend = true;
    if (this.newNotificationSet.game == true) 
      this.notificationSet.game = true;
    if (this.newNotificationSet.message == true) 
      this.notificationSet.message = true;*/

    this.notificationSet.message = this.newNotificationSet.message;
    this.notificationSet.friend = this.newNotificationSet.friend;
    this.notificationSet.game = this.newNotificationSet.game;

    this.isLoggedIn = this._auth.isAuthenticated();
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async refreshData() {
    //this._api.getConversation(this.conversationData.relationId).subscribe(data => this.conversation = data);
    //await this.delay(4000);
    await this._data.currentNotificationSet.subscribe((data) => {
      this.newNotificationSet = data;
      //this.subscribeToData();
    });

    await this.delay(3000);

    //console.log(JSON.stringify(this.newNotificationSet));

    if (this.newNotificationSet.friend == true)
      this.notificationSet.friend = true;
    if (this.newNotificationSet.game == true) this.notificationSet.game = true;
    if (this.newNotificationSet.message == true)
      this.notificationSet.message = true;

    this.refreshData();
  }

  private subscribeToData(): void {
    this.timerSubscription = observableTimer(4000)
      .pipe(first())
      .subscribe(() => this.refreshData());
  }

  goToMyAccount(event: Event) {
    let elementId: string = (event.target as Element).id;
    this.router.navigate(["/my-account", elementId]);
  }

  checkActiveNotifications(): boolean {
    if (
      this.notificationSet.message ||
      this.notificationSet.friend ||
      this.notificationSet.game
    ) {
      document
        .getElementById("accountDropdown")
        .setAttribute("class", "notification-active");
      document
        .getElementById("dropdown-menu")
        .setAttribute("class", "dropdown-list drop-opt drop-opt-ext");
      return true;
    }
    document.getElementById("accountDropdown").setAttribute("class", "");
    document
      .getElementById("dropdown-menu")
      .setAttribute("class", "dropdown-list drop-opt");
    return false;
  }
}
