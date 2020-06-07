import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivityComponent } from "./activity/activity.component";
import { MyFriendsComponent } from "./activity/my-friends/my-friends.component";
import { MyGamesComponent } from "./activity/my-games/my-games.component";
import { MyMessagesComponent } from "./activity/my-messages/my-messages.component";
import { AccountSettingsComponent } from "./activity/account-settings/account-settings.component";
import { ActivityResolve } from "./activity.resolve.service";

@NgModule({
  declarations: [
    ActivityComponent,
    MyFriendsComponent,
    MyGamesComponent,
    MyMessagesComponent,
    AccountSettingsComponent,
  ],
  imports: [CommonModule],
  providers: [ActivityResolve],
})
export class ActivityModule {}
