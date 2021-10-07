import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { faUnderline } from "@fortawesome/free-solid-svg-icons";
import { faItalic } from "@fortawesome/free-solid-svg-icons";
import { faBold } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { faAlignCenter } from "@fortawesome/free-solid-svg-icons";
import { faAlignRight } from "@fortawesome/free-solid-svg-icons";
import { DataService } from "src/app/core/services/data.service";

const MAX_SIZE = 2000000;

@Component({
  selector: "app-text-editor",
  templateUrl: "./text-editor.component.html",
  styleUrls: ["./text-editor.component.sass"],
})
export class TextEditorComponent implements OnInit {
  @Output() getMessageData = new EventEmitter<any>();

  acceptedImageExtensions: string[] = [];

  faUnderline = faUnderline;
  faItalic = faItalic;
  faBold = faBold;
  faImage = faImage;
  faAlignLeft = faAlignLeft;
  faAlignCenter = faAlignCenter;
  faAlignRight = faAlignRight;

  msgId: number = -1;
  input: any;
  editorContent: any;
  showAlert: boolean = false;
  alertMessage: string;
  filesArray: any[] = [];

  constructor(private _data: DataService) {}

  ngOnInit() {
    this.editorContent = document.querySelector(".editor");
    this.acceptedImageExtensions = this._data.getAcceptedImageExtensions();
  }

  getImage() {
    this.input = document.querySelector("input[type=file]");
    let file = this.input.files[0];

    let fileNameArray = file.name.split(".");
    if (!this.acceptedImageExtensions.includes(fileNameArray[fileNameArray.length - 1])) {
      this.showAlert = true;
      this.alertMessage = `Wrong file! Accepted image types: ${this.acceptedImageExtensions.join(", ")}.`;
      return false;
    }

    if (file.size > MAX_SIZE) {
      this.showAlert = true;
      this.alertMessage = `Image too large! Max. size: ${MAX_SIZE/1000000} MB.`;
      return false;
    }

    this.filesArray.push(file);

    var reader = new FileReader();
    let dataURI;
    reader.addEventListener(
      "load",
      () => {
        dataURI = reader.result;
        const editorContent = document.querySelector(".editor");
        const img = document.createElement("img");
        img.src = dataURI;
        img.alt = "findme"
        editorContent.appendChild(img);
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  getHTML() {
    const editorContent = document.querySelector(".editor");
    var s = editorContent.innerHTML;
    this.getMessageData.emit({ html: s, files: this.filesArray });
  }
}
