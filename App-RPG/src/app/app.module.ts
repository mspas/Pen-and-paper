import { SearchGameResolve } from './search/search-game/search-game.resolve.service';
import { ApiService } from './services/api.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { GameModule } from './game/game.module';
import { ProfileModule } from './profile/profile.module';
import { ActivityModule } from './activity/activity.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BphotoComponent } from './bphoto/bphoto.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { HeaderComponent } from './header/header.component';
import { ChatComponent } from './chat/chat.component';
import { SearchFriendComponent } from './search/search-friend/search-friend.component';
import { SearchGameComponent } from './search/search-game/search-game.component';

import { GameInviteResolve } from './game/game/game-view/invite-to-game/invite-resolver.service';
import { SearchFriendResolve } from './search/search-friend/search-friend.resolve.service';
import { AuthService } from './auth/auth.service';
import { CreateGameDataService } from './services/create-game.service';
import { DataService } from './services/data.service';
import { ForumService } from './services/forum.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    HeaderComponent,
    SearchFriendComponent,
    SearchGameComponent,
    BphotoComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    GameModule,
    ProfileModule,
    ActivityModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    ApiService,
    SearchFriendResolve,
    CreateGameDataService,
    SearchGameResolve,
    GameInviteResolve,
    DataService,
    ForumService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
