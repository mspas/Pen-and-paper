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
    this.gameId = this.route.snapshot.params.id;
    this.page = parseInt(this.route.snapshot.params.page);

    for (let i = 0; i < this.topicData.messages.length; i++) {
      const message = this.topicData.messages[i];
      let author;
      this.participants.forEach((user) => {
        if (message.senderId == user.id) author = user;
      });

      let post = new PostModel(message, author, null);

      if (post.user.photoName != null && post.user.photoName != "") {
        this.posts.push(post);
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
      } else {
        this.posts.push(post);
      }
    }

    /*let i = 0;
    let length = this.page * 10;
    if (length > this.topicData.messages.messagesResult.length)
      length = this.topicData.messages.messagesResult.length;

    for (let index = this.page * 10 - 10; index < length; index++) {
      const message = this.topicData.messages.messagesResult[index];

      let post = new PostModel(message, null, null);

      this.participants.forEach((user) => {
        if (message.senderId == user.id) {
          post.user = user;
        }
      });

      if (post.user.photoName != null && post.user.photoName != "") {
        this.posts.push(post);
        this.isImageLoading = true;

        this._api.getImage(post.user.photoName).subscribe(
          (data) => {
            //authors image
            this.createImageFromBlob(data, index % 10, false);
            this.isImageLoading = false;
          },
          (error) => {
            this.isImageLoading = false;
            console.log(error);
          }
        );
      } else {
        this.posts.push(post);
      }
      i++;*/

    //this.getPostImages(post.message.bodyMessage, i);
    /*let isImage = this.getFileNames(post.message.bodyMessage, i);
      if (isImage){
        let index = 0;
        this.postImages.forEach(post => {
          post.fileNames.forEach(fileName => {
            this.getPostImage(fileName, index);
          });
          index++;
        });
        this.delay(500);
        this.setUpPostHtml(this.postImages[index]);
      }
      else {
        document.getElementById("message" + i.toString()).innerHTML = post.message.bodyMessage;
      }*/
  }

  ngAfterViewInit() {
    //console.log(JSON.stringify(this.postImages));
    let i = 0;
    this.posts.forEach((post) => {
      let isImage = this.getFileNames(post.message.bodyMessage, i);
      //console.log(JSON.stringify(this.postImages));
      if (!isImage) {
        document.getElementById("message" + i.toString()).innerHTML =
          post.message.bodyMessage;
      }
      i++;
    });

    //console.log("elufka " + JSON.stringify(this.postImages));   //raz jest tylko, zle
    let index = 0;
    this.postImages.forEach(async (post) => {
      post.fileNames.forEach((fileName) => {
        this.getPostImage(fileName, index);
      });
      await this.delay(500);
      //console.log(index);
      //console.log(JSON.stringify(this.postImages[index]));
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
          //tab1.pop();
          console.log(tab1.length + JSON.stringify(tab1));

        //for (let j = 0; j < tab1.length; j++) {
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
        //console.log("tab1[0]" + tab1[0]);
        tab[i] = tab1[0];
        //console.log("tab[0]" + tab[0]);
        //}
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

    //sa dwa sposoby, albo przechowywac 20k znakow w stringu jako foto, albo z servera pobierac, w html jest pepe a w test doklejam bolka tera

    //console.log(JSON.stringify(this.posts[this.posts.length-2]));
    this.html +=
      "<img src='" + this.test + "' alt='Profile image' style='width:45px'>";
    //this.divID.nativeElement.innerHTML = this.html;
    document.getElementById("divs").innerHTML = this.html;
  }

  createImageFromBlob(image: Blob, id: number, isPost: boolean) {
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        //console.log(id + " " + reader.result);
        if (!isPost) {
          this.posts[id].photo = reader.result;
        } else {
          this.test = reader.result.toString();
          //console.log("test " + this.test)
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
