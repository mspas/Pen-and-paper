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
  f: NgForm;

  showAlert: boolean = false;
  alertMessage: string;
  isSuccess: boolean = false;

  constructor(private _api: ApiService) {}

  ngOnInit() {}

  onSavePassword(form: NgForm) {
    if (form.value.password === form.value.repeatpassword && form.value.password.length > 0) {
      let data = new ChangePasswordModel(
        form.value.password,
        form.value.oldpassword
      );
      this._api.editPassword(data).subscribe(data => {
        if (data.success) {
          this.showAlert = true;
          this.isSuccess = true;
          this.alertMessage = "Password has been successfully changed!"
        }
        else {
          this.showAlert = true;
          this.isSuccess = false;
          this.alertMessage = data.messsage;
        }
      });
    }
    else {
      this.showAlert = true;
      this.isSuccess = false;
      this.alertMessage = "Passwords are not the same!"
    }
  }
}
