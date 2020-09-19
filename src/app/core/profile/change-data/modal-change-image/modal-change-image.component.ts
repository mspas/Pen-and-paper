import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { ApiService } from "src/app/core/services/api.service";
import { NgForm } from "@angular/forms";
import { PersonalDataModel } from "src/app/core/models/personaldata.model";

@Component({
  selector: "app-modal-change-image",
  templateUrl: "./modal-change-image.component.html",
  styleUrls: ["./modal-change-image.component.sass"],
})
export class ModalChangeImageComponent implements OnInit {
  @Input("myProfileData") myProfileData: PersonalDataModel;
  @ViewChild("fileInput", { static: false }) fileInput: ElementRef;

  constructor(private _api: ApiService) {}

  ngOnInit() {}

  onSaveImage(form: NgForm) {
    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    this._api.uploadPhoto(
      1,
      this.myProfileData.id,
      false,
      nativeElement.files[0]
    );
    window.location.reload();
  }
}
