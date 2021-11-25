import { Component, OnInit, Input } from "@angular/core";
import { PersonalDataModel } from "src/app/core/models/personaldata.model";

@Component({
  selector: "app-account-settings",
  templateUrl: "./account-settings.component.html",
  styleUrls: ["./account-settings.component.sass"],
})
export class AccountSettingsComponent implements OnInit {
  @Input("myProfileData") myProfileData: PersonalDataModel[] = [];

  constructor() {}

  ngOnInit() {}
}
