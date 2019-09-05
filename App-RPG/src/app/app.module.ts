import { SearchGameResolve } from './search-game/search-game.resolve.service';
import { ApiService } from './api.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';

import { AuthService } from './auth/auth.service';
import { HeaderComponent } from './header/header.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { PersonalDataResolve } from './profile-view/page-view.resolve.service';
import { ProfileViewFriendsComponent } from './profile-view/view-friends/profile-view-friends.component';
import { FriendViewResolve } from './profile-view/view-friends/profile-view-friends.resolve.service';
import { SearchFriendComponent } from './search-friend/search-friend.component';
import { SearchFriendResolve } from './search-friend/search-friend.resolve.service';
import { CreateGameComponent } from './create-game/create-game.component';
import { CreateGameDataService } from './create-game/create-game.service';
import { ProfileViewGamesComponent } from './profile-view/view-games/profile-view-games.component';
import { GamesViewResolve } from './profile-view/view-games/profile-view-games.resolve.service';
import { GameViewComponent } from './game-view/game-view.component';
import { GameViewResolve } from './game-view/game.resolve.service';
import { SearchGameComponent } from './search-game/search-game.component';
import { InviteToGameComponent } from './game-view/invite-to-game/invite-to-game.component';
import { GameInviteResolve } from './game-view/invite-to-game/invite-resolver.service';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ProfileDataResolve } from './side-bar/side-bar.resolve.service';
import { DataService } from './data.service';
import { BphotoComponent } from './bphoto/bphoto.component';
import { ViewProfileComponent } from './profile-view/view-profile/view-profile.component';
import { ChatComponent } from './chat/chat.component';
import { ActivityComponent } from './activity/activity.component';
import { ActivityResolve } from './activity/activity.resolve.service';
import { AccountSettingsComponent } from './activity/account-settings/account-settings.component';
import { AccountMessagesComponent } from './activity/account-messages/account-messages.component';
import { AccountFriendsComponent } from './activity/account-friends/account-friends.component';
import { AccountGamesComponent } from './activity/account-games/account-games.component';
import { GameOverviewComponent } from './game-overview/game-overview.component';
import { GameResolve } from './game-overview/game-overview.resolve.service';
import { GameForumComponent } from './game-overview/game-forum/game-forum.component';
import { CreateTopicComponent } from './game-overview/create-topic/create-topic.component';
import { TopicAccessSettingComponent } from './game-overview/topic-forum/topic-access-setting/topic-access-setting.component';
import { TopicForumComponent } from './game-overview/topic-forum/topic-forum.component';
import { TopicResolve } from './game-overview/topic-forum/topic.resolve.service';
import { PostsComponent } from './game-overview/topic-forum/posts/posts.component';
import { CreatePostComponent } from './game-overview/topic-forum/create-post/create-post.component';
import { ForumService } from './forum.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    HeaderComponent,
    ProfileViewComponent,
    ProfileViewFriendsComponent,
    SearchFriendComponent,
    CreateGameComponent,
    ProfileViewGamesComponent,
    GameViewComponent,
    SearchGameComponent,
    InviteToGameComponent,
    SideBarComponent,
    BphotoComponent,
    ViewProfileComponent,
    ChatComponent,
    ActivityComponent,
    AccountSettingsComponent,
    AccountMessagesComponent,
    AccountFriendsComponent,
    AccountGamesComponent,
    GameOverviewComponent,
    GameForumComponent,
    CreateTopicComponent,
    TopicAccessSettingComponent,
    TopicForumComponent,
    PostsComponent,
    CreatePostComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    ApiService,
    PersonalDataResolve,
    FriendViewResolve,
    SearchFriendResolve,
    CreateGameDataService,
    GamesViewResolve,
    GameResolve,
    GameViewResolve,
    SearchGameResolve,
    GameInviteResolve,
    ProfileDataResolve,
    DataService,
    ActivityResolve,
    TopicResolve,
    ForumService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
