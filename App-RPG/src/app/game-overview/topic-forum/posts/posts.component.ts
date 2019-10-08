import { Component, OnInit, Input } from '@angular/core';
import { TopicModel, PostModel } from '../../../models/forum.model';
import { PersonalDataModel } from '../../../models/personaldata.model';
import { ApiService } from '../../../services/api.service';
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
        this._api.getImage(post.user.photoName).subscribe(data => {
          this.createImageFromBlob(data, index % 10);
          this.isImageLoading = false;
        }, error => {
          this.isImageLoading = false;
          console.log(error);
        });
      }
      else {
        this.posts.push(post);  
      }
      
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
  
  
  createImageFromBlob(image: Blob, id: number) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      console.log(id + " " + reader.result);
       this.posts[id].photo = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
 }

}
