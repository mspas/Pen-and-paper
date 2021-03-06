import { NgModule } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CommonModule } from "@angular/common";
import { GameComponent } from "./game/game.component";
import { RouterModule } from "@angular/router";
import { GameViewComponent } from "./game/game-view/game-view.component";
import { SharedModule } from "../../shared/shared.module";
import { ForumComponent } from "./game/forum/forum.component";
import { TopicListComponent } from "./game/forum/topic-list/topic-list.component";
import { TopicComponent } from "./game/forum/topic/topic.component";
import { CreateTopicComponent } from "./game/forum/create-topic/create-topic.component";
import { PostsComponent } from "./game/forum/topic/posts/posts.component";
import { ReplyPostComponent } from "./game/forum/topic/reply-post/reply-post.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    GameComponent,
    GameViewComponent,
    ForumComponent,
    TopicListComponent,
    TopicComponent,
    CreateTopicComponent,
    PostsComponent,
    ReplyPostComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class GameModule {}
