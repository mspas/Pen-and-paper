import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

import { ActivityComponent } from './activity.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AccountMessagesComponent } from './account-messages/account-messages.component';
import { AccountFriendsComponent } from './account-friends/account-friends.component';
import { AccountGamesComponent } from './account-games/account-games.component';
import { ActivityResolve } from './activity.resolve.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    ActivityComponent,
    AccountSettingsComponent,
    AccountMessagesComponent,
    AccountFriendsComponent,
    AccountGamesComponent
  ],
  providers: [
    ActivityResolve
  ]
})
export class ActivityModule { }
