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
  f: NgForm;

  showAlert: boolean = false;
  alertMessage: string;

  constructor(private _api: ApiService) {}

  ngOnInit() {}

  validateInput(value: string) {
    if (value.length < 1) return false;
    return true;
  }
  
  onSaveChanges(form: NgForm) {
    this.showAlert = false;
    let profile = this.myProfileData;

    if (this.validateInput(form.value.email)) 
      profile.email = form.value.email;
    if (this.validateInput(form.value.firstname))
      profile.firstname = form.value.firstname;
    if (this.validateInput(form.value.lastname)) 
      profile.lastname = form.value.lastname;
    if (this.validateInput(form.value.city)) 
      profile.city = form.value.city;
    if (parseInt(form.value.age) > 0) 
      profile.age = parseInt(form.value.age);
      
    this._api.editPersonalData(profile).subscribe(data => {
      if (data.success) 
        window.location.reload();
      else {
        this.alertMessage = "Error!";
        this.showAlert = true;
      }
    });
  }
}
