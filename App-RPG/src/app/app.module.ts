import { SearchGameResolve } from './search-game/search-game.resolve.service';
import { ApiService } from './services/api.service';
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
import { CreateGameDataService } from './services/create-game.service';
import { ProfileViewGamesComponent } from './profile-view/view-games/profile-view-games.component';
import { GamesViewResolve } from './profile-view/view-games/profile-view-games.resolve.service';
import { GameViewResolve } from './game-view/game.resolve.service';
import { SearchGameComponent } from './search-game/search-game.component';
import { InviteToGameComponent } from './game/game/game-view/invite-to-game/invite-to-game.component';
import { GameInviteResolve } from './game/game/game-view/invite-to-game/invite-resolver.service';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ProfileDataResolve } from './side-bar/side-bar.resolve.service';
import { DataService } from './services/data.service';
import { BphotoComponent } from './bphoto/bphoto.component';
import { ViewProfileComponent } from './profile-view/view-profile/view-profile.component';
import { ChatComponent } from './chat/chat.component';
import { ActivityComponent } from './activity/activity.component';
import { ActivityResolve } from './activity/activity.resolve.service';
import { AccountSettingsComponent } from './activity/account-settings/account-settings.component';
import { AccountMessagesComponent } from './activity/account-messages/account-messages.component';
import { AccountFriendsComponent } from './activity/account-friends/account-friends.component';
import { AccountGamesComponent } from './activity/account-games/account-games.component';
import { GameResolve } from './game-overview/game-overview.resolve.service';
import { TopicResolve } from './game-overview/topic-forum/topic.resolve.service';
import { ForumService } from './services/forum.service';
import { GameModule } from './game/game.module';

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
    ProfileViewGamesComponent,
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
    AccountGamesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    GameModule
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
