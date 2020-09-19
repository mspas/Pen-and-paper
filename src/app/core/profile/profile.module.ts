import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfileComponent } from "./profile/profile.component";
import { PersonalDataResolve } from "./profile.resolve.service";
import { ProfileGamesComponent } from "./profile/profile-games/profile-games.component";
import { ProfileFriendsComponent } from "./profile/profile-friends/profile-friends.component";
import { RouterModule } from "@angular/router";
import { ModalChangeDetailsComponent } from "./change-data/modal-change-details/modal-change-details.component";
import { ModalChangePasswordComponent } from "./change-data/modal-change-password/modal-change-password.component";
import { ModalChangeImageComponent } from "./change-data/modal-change-image/modal-change-image.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileGamesComponent,
    ProfileFriendsComponent,
    ModalChangeDetailsComponent,
    ModalChangePasswordComponent,
    ModalChangeImageComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule],
  providers: [PersonalDataResolve],
})
export class ProfileModule {}
