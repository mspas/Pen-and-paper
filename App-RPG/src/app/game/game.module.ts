import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { GameViewComponent } from './game/game-view/game-view.component';
import { GameFreeViewComponent } from './game/game-free-view/game-free-view.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { CreateGameComponent } from './create-game/create-game.component';
import { ForumViewComponent } from './game/forum-view/forum-view.component';
import { TopicListComponent } from './game/forum-view/topic-list/topic-list.component';
import { CreateTopicComponent } from './game/forum-view/create-topic/create-topic.component';
import { TopicViewComponent } from './game/forum-view/topic-view/topic-view.component';
import { GameResolve } from './game.resolve.service';
import { PostsComponent } from './game/forum-view/topic-view/posts/posts.component';
import { ReplyComponent } from './game/forum-view/topic-view/reply/reply.component';
import { ReplyPostComponent } from './game/forum-view/topic-view/reply-post/reply-post.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
  ],
  declarations: [
    GameComponent, 
    GameViewComponent, 
    GameFreeViewComponent,
    CreateGameComponent,
    ForumViewComponent,
    TopicListComponent,
    CreateTopicComponent,
    TopicViewComponent,
    PostsComponent,
    ReplyComponent,
    ReplyPostComponent
  ],
  exports: [
  ],
  providers: [
    GameResolve
  ]
})
export class GameModule { }
