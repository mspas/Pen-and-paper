import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { ApiService } from "src/app/core/services/api.service";
import { NgForm } from "@angular/forms";
import { PersonalDataModel } from "src/app/core/models/personaldata.model";
import { DataService } from "src/app/core/services/data.service";

const MAX_HEIGHT = 200;
const MAX_WIDTH = 200;

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
  imageDataPreview: any = null;

  showAlert: boolean = false;
  alertMessage: string;

  constructor(private _api: ApiService, private _data: DataService) {}

  ngOnInit() {
    this.acceptedImageExtensions = this._data.getAcceptedImageExtensions();
  }

  async imageSelectHandler(event) {
    let file = event.target.files[0];
    let imageData = await this.getImageData(file);

    console.log(imageData)

    if (imageData.height > MAX_HEIGHT && imageData.width > MAX_WIDTH) {
      this.showAlert = true;
      this.alertMessage = "Wrong size of the selected image! Maximum size - 200x200px."
      this.imageDataPreview = null;
    } else {
        this.imageDataPreview = imageData.data;
    }
  };

  async getImageData(file): Promise<{data: any, height: number, width: number}> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        var img = new Image();
        img.src = URL.createObjectURL(file);
        console.log(event)
        img.onload = () => {
          resolve({ data: reader.result, height: img.height, width: img.width });
        }
      };
      reader.onerror = (err) => {
        reject(err);
      };
      reader.readAsDataURL(file);
    });
  };

  onSaveImage(form: NgForm) {
    this.showAlert = false;
    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    if (!nativeElement.files[0] && !this.imageDataPreview) {
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
