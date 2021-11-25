import { NgModule } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CommonModule } from "@angular/common";
import { GameComponent } from "./game/game.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { GameViewComponent } from "./game/game-view/game-view.component";
import { ForumComponent } from "./game/forum/forum.component";
import { TopicListComponent } from "./game/forum/topic-list/topic-list.component";
import { TopicComponent } from "./game/forum/topic/topic.component";
import { CreateTopicComponent } from "./game/forum/create-topic/create-topic.component";
import { PostsComponent } from "./game/forum/topic/posts/posts.component";
import { ReplyPostComponent } from "./game/forum/topic/reply-post/reply-post.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CreateGameComponent } from './create-game/create-game.component';
import { ManagePlayersComponent } from './game/forum/manage-game/manage-players/manage-players.component';
import { AuthGuardService } from "../core/auth/auth-guard.service";

const routes: Routes = [
  {
    path: "",
    component: GameComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "create-game",
    component: CreateGameComponent,
    canActivate: [AuthGuardService],
  },
]

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
    CreateGameComponent,
    ManagePlayersComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [],
})
export class GameModule {}
