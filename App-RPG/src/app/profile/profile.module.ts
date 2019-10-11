import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

import { ProfileViewComponent } from './profile-view/profile-view.component';
import { PersonalDataResolve } from './profile.resolve.service';
import { ProfileViewGamesComponent } from './profile-view/view-games/profile-view-games.component';
import { ViewProfileComponent } from './profile-view/view-profile/view-profile.component';
import { ProfileViewFriendsComponent } from './profile-view/view-friends/profile-view-friends.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    ProfileViewComponent,
    ProfileViewGamesComponent,
    ProfileViewFriendsComponent,
    ViewProfileComponent
  ],
  providers: [
    PersonalDataResolve
  ]
})
export class ProfileModule { }
