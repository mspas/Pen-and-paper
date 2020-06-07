import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { faUnderline } from "@fortawesome/free-solid-svg-icons";
import { faItalic } from "@fortawesome/free-solid-svg-icons";
import { faBold } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { faAlignCenter } from "@fortawesome/free-solid-svg-icons";
import { faAlignRight } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-text-editor",
  templateUrl: "./text-editor.component.html",
  styleUrls: ["./text-editor.component.sass"],
})
export class TextEditorComponent implements OnInit {
  @Output() getMsgHTML = new EventEmitter<string>();

  faUnderline = faUnderline;
  faItalic = faItalic;
  faBold = faBold;
  faImage = faImage;
  faAlignLeft = faAlignLeft;
  faAlignCenter = faAlignCenter;
  faAlignRight = faAlignRight;

  msgId: number = -1;
  error: boolean = false;
  files: any;
  editorContent: any;

  ngOnInit() {
    this.editorContent = document.querySelector(".editor");
  }

  getImage() {
    this.files = document.querySelector("input[type=file]");
    var file = <Blob>this.files.files[0];
    var reader = new FileReader();
    let dataURI;
    reader.addEventListener(
      "load",
      function () {
        dataURI = reader.result;
        const editorContent = document.querySelector(".editor");
        const img = document.createElement("img");
        img.src = dataURI;
        editorContent.appendChild(img);
      },
      false
    );
    if (file) {
      console.log("s");
      reader.readAsDataURL(file);
    }
  }

  getHTML() {
    const editorContent = document.querySelector(".editor");
    var s = editorContent.innerHTML;
    this.getMsgHTML.emit(s);
  }
}
