import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfileComponent } from "./profile/profile.component";
import { PersonalDataResolve } from "./profile.resolve.service";
import { ProfileGamesComponent } from "./profile/profile-games/profile-games.component";
import { ProfileFriendsComponent } from "./profile/profile-friends/profile-friends.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileGamesComponent,
    ProfileFriendsComponent
  ],
  imports: [CommonModule, RouterModule],
  providers: [PersonalDataResolve]
})
export class ProfileModule {}
