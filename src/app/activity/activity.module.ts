import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivityComponent } from "./activity/activity.component";
import { MyFriendsComponent } from "./activity/my-friends/my-friends.component";
import { MyGamesComponent } from "./activity/my-games/my-games.component";
import { MyMessagesComponent } from "./activity/my-messages/my-messages.component";
import { AccountSettingsComponent } from "./activity/account-settings/account-settings.component";
import { ChatComponent } from "./chat/chat.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../core/auth/auth-guard.service";

const routes: Routes = [
  {
    path: "my-account",
    component: ActivityComponent,
    canActivate: [AuthGuardService]
  }
]

@NgModule({
  declarations: [
    ActivityComponent,
    MyFriendsComponent,
    MyGamesComponent,
    MyMessagesComponent,
    AccountSettingsComponent,
    ChatComponent
  ],
  imports: [CommonModule, FontAwesomeModule, FormsModule, ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [ChatComponent],
})
export class ActivityModule {}
