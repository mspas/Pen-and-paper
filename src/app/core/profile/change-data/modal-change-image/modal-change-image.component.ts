import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { ApiService } from "src/app/core/services/api.service";
import { NgForm } from "@angular/forms";
import { PersonalDataModel } from "src/app/core/models/personaldata.model";
import { DataService } from "src/app/core/services/data.service";

@Component({
  selector: "app-modal-change-image",
  templateUrl: "./modal-change-image.component.html",
  styleUrls: ["./modal-change-image.component.sass"],
})

export class ModalChangeImageComponent implements OnInit {
  @Input("myProfileData") myProfileData: PersonalDataModel;
  @ViewChild("fileInput", { static: false }) fileInput: ElementRef;
  f: NgForm;

  acceptedImageExtensions: string[] = [];

  showAlert: boolean = false;
  alertMessage: string;

  constructor(private _api: ApiService, private _data: DataService) {}

  ngOnInit() {
    this.acceptedImageExtensions = this._data.getAcceptedImageExtensions();
  }

  onSaveImage(form: NgForm) {
    this.showAlert = false;
    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    if (!nativeElement.files[0]) {
      this.showAlert = true;
      this.alertMessage = "You need to select an image to upload!"
      return false;
    }
    
    let fileNameArray = nativeElement.files[0].name.split(".");
    if (!this.acceptedImageExtensions.includes(fileNameArray[fileNameArray.length - 1])) {
      this.showAlert = true;
      this.alertMessage = `Wrong file! Accepted image types: ${this.acceptedImageExtensions.join(", ")}.`;
      return false;
    }

    this._api.uploadPhoto(1, this.myProfileData.id, false, nativeElement.files[0]).subscribe(data => {
      if (data.success) 
        window.location.reload();
      else {
        this.showAlert = true;
        this.alertMessage = "Error occured!"
      }
    });
  }
}
