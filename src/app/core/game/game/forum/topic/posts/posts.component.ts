import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import {
  TopicModel,
  PostModel,
  PostImageModel,
} from "src/app/core/models/forum.model";
import { PersonalDataModel } from "src/app/core/models/personaldata.model";
import { ApiService } from "src/app/core/services/api.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.sass"],
})
export class PostsComponent implements OnInit {
  @Input() topicData: TopicModel;
  @Input() participants: PersonalDataModel[];
  @Input() iAmGameMaster: boolean;
  @ViewChild("divID", { static: true }) divID: ElementRef;

  html: string;
  test: string = "";
  page: number;
  gameId: number;
  posts: PostModel[] = [];
  postImages: PostImageModel[] = [];
  isImageLoading: boolean;

  constructor(private _api: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.gameId = this.route.snapshot.params.gameId;
    this.page = parseInt(this.route.snapshot.params.page);

    for (let i = 0; i < this.topicData.messages.length; i++) {
      const message = this.topicData.messages[i];
      let author = null;
      this.participants.forEach((user) => {
        if (message.senderId == user.id) author = user;
      });

      if (!author) author = new PersonalDataModel(-1, "unknown", "", "player", "left the game", "", -1, null, false);   // workaround for bug - errer when it tries to prepare post for a user that left, but let's be honst this whole component is the one big WORKAROUND

      let post = new PostModel(message, author, null);
        this.posts.push(post);

      if (post.user.photoName != null && post.user.photoName != "") {
        this.isImageLoading = true;

        this._api.getImage(post.user.photoName).subscribe(
          (data) => {
            //authors image
            this.createImageFromBlob(data, i, false);
            this.isImageLoading = false;
          },
          (error) => {
            this.isImageLoading = false;
            console.log(error);
          }
        );
      }
    }
  }

  ngAfterViewInit() {
    let i = 0;
    this.posts.forEach((post) => {
      let isImage = this.getFileNames(post.message.bodyMessage, i);
      if (!isImage) {
        document.getElementById("message" + i.toString()).innerHTML =
          post.message.bodyMessage;
      }
      i++;
    });

    let index = 0;
    this.postImages.forEach(async (post) => {
      post.fileNames.forEach((fileName) => {
        this.getPostImage(fileName, index);
      });
      await this.delay(500);
      this.setUpPostHtml(this.postImages[index]);
      index++;
    });
  }

  getFileNames(message: string, divId: number) {
    let tab = message.split('src="');
    let data = new PostImageModel([], divId, tab, [], []);
    if (tab.length > 1) {
      for (let i = 1; i < tab.length; i++) {
        const element = tab[i];
        let tab1 = element.split('">');

        //for (let j = 0; j < tab1.length; j++) {
        data.fileNames.push(tab1[0]);

        let pom: string[] = [];
        for (let j = 0; j < i * 2 - 1; j++) {
          pom.push(data.html[j]);
        }
        pom.push(tab1[0]);
        pom.push(tab1[1]);
        for (let j = i + 1; j < data.html.length; j++) {
          pom.push(data.html[j]);
        }
        data.html = pom;
        data.htmlsm = tab1;
      }
      this.postImages.push(data);
      return true;
    } else {
      return false;
    }
  }

  getPostImage(fileName: string, index: number) {
    this._api.getImage(fileName).subscribe(
      (data) => {
        //post images
        this.createImageFromBlobToPost(data, index);
        this.isImageLoading = false;
      },
      (error) => {
        this.isImageLoading = false;
        console.log(error);
      }
    );
  }

  createImageFromBlobToPost(image: Blob, index: number) {
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        this.postImages[index].photos.push(reader.result);
      },
      false
    );
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  setUpPostHtml(postImages: PostImageModel) {
    for (let i = 0; i < postImages.fileNames.length; i++) {
      postImages.html[i * 2 + 1] = 'src="' + postImages.photos[i] + '">';
    }
    let result = "";
    for (let i = 0; i < postImages.html.length; i++) {
      result += postImages.html[i];
    }
    document.getElementById(
      "message" + postImages.divId.toString()
    ).innerHTML = result;
  }

  async getPostImages(message: string, divId: number) {
    let fileName: string;
    let result = "";
    let tab = message.split('src="');
    console.log(tab.length + JSON.stringify(tab));
    if (tab.length > 1) {
      for (let i = 1; i < tab.length; i++) {
        const element = tab[i];
        let tab1 = element.split('">');
        let pom;
        if (tab1[tab1.length - 1] == "")
          console.log(tab1.length + JSON.stringify(tab1));

        fileName = tab1[0];

        this._api.getImage(fileName).subscribe(
          (data) => {
            //post images
            this.createImageFromBlob(data, -1, true);
            this.isImageLoading = false;
          },
          (error) => {
            this.isImageLoading = false;
            console.log(error);
          }
        );
        await this.delay(350);
        tab1[0] = 'src="' + this.test + '">' + tab1[1];
        tab[i] = tab1[0];
      }
      for (let j = 0; j < tab.length; j++) {
        result += tab[j];
      }
      document.getElementById("message" + divId.toString()).innerHTML = result;
    } else {
      await this.delay(5);
      document.getElementById("message" + divId.toString()).innerHTML = message;
    }
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  loadHtml() {
    this.html = this.posts[this.posts.length - 1].message.bodyMessage;

    // przechowywac 20k znakow w stringu jako foto not smart, z servera pobierac, tylko potem trzeba posklejac html posta

    this.html +=
      "<img src='" + this.test + "' alt='Profile image' style='width:45px'>";
    //this.divID.nativeElement.innerHTML = this.html;
    document.getElementById("divTemp").innerHTML = this.html;
  }

  createImageFromBlob(image: Blob, id: number, isPost: boolean) {
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        if (!isPost) {
          this.posts[id].photo = reader.result;
        } else {
          this.test = reader.result.toString();
        }
        //this.loadHtml();
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
