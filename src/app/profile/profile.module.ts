import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfileComponent } from "./profile/profile.component";
import { ProfileGamesComponent } from "./profile/profile-games/profile-games.component";
import { ProfileFriendsComponent } from "./profile/profile-friends/profile-friends.component";
import { RouterModule, Routes } from "@angular/router";
import { ModalChangeDetailsComponent } from "./change-data/modal-change-details/modal-change-details.component";
import { ModalChangePasswordComponent } from "./change-data/modal-change-password/modal-change-password.component";
import { ModalChangeImageComponent } from "./change-data/modal-change-image/modal-change-image.component";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActivityModule } from "../activity/activity.module";
import { AuthGuardService } from "../core/auth/auth-guard.service";

const routes: Routes = [
  {
    path: ":login",
    component: ProfileComponent,
    canActivate: [AuthGuardService],
  }
]

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileGamesComponent,
    ProfileFriendsComponent,
    ModalChangeDetailsComponent,
    ModalChangePasswordComponent,
    ModalChangeImageComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, SharedModule, FontAwesomeModule, ActivityModule,
    RouterModule.forChild(routes)
  ],
  providers: [],
})
export class ProfileModule {}
