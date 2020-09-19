import { Component, OnInit, Input } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ChangePasswordModel } from "src/app/core/models/changepassword.model";
import { ApiService } from "src/app/core/services/api.service";
import { PersonalDataModel } from "src/app/core/models/personaldata.model";

@Component({
  selector: "app-modal-change-password",
  templateUrl: "./modal-change-password.component.html",
  styleUrls: ["./modal-change-password.component.sass"],
})
export class ModalChangePasswordComponent implements OnInit {
  @Input("myProfileData") myProfileData: PersonalDataModel;

  constructor(private _api: ApiService) {}

  ngOnInit() {}

  onSavePassword(form: NgForm) {
    if (form.value.password == form.value.repeatpassword) {
      let data = new ChangePasswordModel(
        form.value.password,
        form.value.oldpassword
      );
      this._api.editPassword(data);
    }
  }
}
