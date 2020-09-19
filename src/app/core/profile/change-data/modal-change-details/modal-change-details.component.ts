import { Component, OnInit, Input } from "@angular/core";
import { PersonalDataModel } from "src/app/core/models/personaldata.model";
import { ApiService } from "src/app/core/services/api.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-modal-change-details",
  templateUrl: "./modal-change-details.component.html",
  styleUrls: ["./modal-change-details.component.sass"],
})
export class ModalChangeDetailsComponent implements OnInit {
  @Input("myProfileData") myProfileData: PersonalDataModel;

  constructor(private _api: ApiService) {}

  ngOnInit() {}

  onSaveChanges(form: NgForm) {
    var profile = this.myProfileData;
    if (form.value.email.length > 0) profile.email = form.value.email;
    if (form.value.firstname.length > 0)
      profile.firstname = form.value.firstname;
    if (form.value.lastname.length > 0) profile.lastname = form.value.lastname;
    if (form.value.city.length > 0) profile.city = form.value.city;
    if (parseInt(form.value.age) > 0) profile.age = parseInt(form.value.age);
    this._api.editPersonalData(profile);
  }
}
