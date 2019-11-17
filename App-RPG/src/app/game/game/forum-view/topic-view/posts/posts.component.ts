import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { TopicModel, PostModel } from '../../../../../models/forum.model';
import { PersonalDataModel } from '../../../../../models/personaldata.model';
import { ApiService } from '../../../../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  @Input() topicData: TopicModel;
  @Input() participants: PersonalDataModel[];
  @Input() iAmGameMaster: boolean;
  @ViewChild('divID') divID: ElementRef;

  html: string;
  test: string = "";
  page: number;
  gameId: number;
  posts: PostModel[] = [];
  isImageLoading: boolean;

  constructor(private _api: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.gameId = this.route.snapshot.params.id;
    this.page = parseInt(this.route.snapshot.params.page);
    
    let i = 0;
    let length = this.page*10;
    if (length > this.topicData.messages.length)
      length = this.topicData.messages.length;

    for (let index = this.page*10 - 10; index < length; index++) {
      const message = this.topicData.messages[index];
      
      let post = new PostModel(message, null, null);

      this.participants.forEach(user => {
        if (message.senderId == user.id) {
          post.user = user;
        }
      });
        
      if (post.user.photoName != null && post.user.photoName != "") {
        this.posts.push(post);
        this.isImageLoading = true;

        this._api.getImage(post.user.photoName).subscribe(data => {   //authors image
          this.createImageFromBlob(data, index % 10, false);
          this.isImageLoading = false;
        }, error => {
          this.isImageLoading = false;
          console.log(error);
        });

      }
      else {
        this.posts.push(post);  
      }
      this.getPostImages(post.message.bodyMessage, i);
      i++;
    }


     /* this.topicData.messages.forEach(message => {
        let post = new PostModel(message, null, null);

        this.participants.forEach(user => {
          if (message.senderId == user.id) {
            post.user = user;
          }
        });
          
        if (post.user.photoName != null && post.user.photoName != "") {
          this.posts.push(post);
          this.isImageLoading = true;
          this._api.getImage(post.user.photoName).subscribe(data => {
            this.createImageFromBlob(data, this.posts.length - 1);
            this.isImageLoading = false;
          }, error => {
            this.isImageLoading = false;
            console.log(error);
          });
        }
        else {
          this.posts.push(post);  
        }
      });*/

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
        if (tab1[tab1.length-1] == "")
          //tab1.pop();
        console.log(tab1.length + JSON.stringify(tab1));

        //for (let j = 0; j < tab1.length; j++) {
          fileName = tab1[0];

          this._api.getImage(fileName).subscribe(data => {   //post images
            this.createImageFromBlob(data, -1, true);
            this.isImageLoading = false;
          }, error => {
            this.isImageLoading = false;
            console.log(error);
          });
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
    }
    else {
      await this.delay(5);
      document.getElementById("message" + divId.toString()).innerHTML = message;
    }
  }
  
  
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

loadHtml(){
    this.html = this.posts[this.posts.length-1].message.bodyMessage;

    //sa dwa sposoby, albo przechowywac 20k znakow w stringu jako foto, albo z servera pobierac, w html jest pepe a w test doklejam bolka tera

    //console.log(JSON.stringify(this.posts[this.posts.length-2]));
    this.html += "<img src='" + this.test + "' alt='Profile image' style='width:45px'>";
    //this.divID.nativeElement.innerHTML = this.html;
    document.getElementById("divs").innerHTML = this.html;
} 
  
  createImageFromBlob(image: Blob, id: number, isPost: boolean) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       //console.log(id + " " + reader.result);
       if (!isPost) {
        this.posts[id].photo = reader.result;
       }
       else {
        this.test = reader.result.toString();
        //console.log("test " + this.test)
       }
       //this.loadHtml();
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
 }

}
