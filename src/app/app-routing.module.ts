import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./core/home/home.component";
import { ProfileComponent } from "./core/profile/profile/profile.component";
import { AuthGuardService } from "./core/auth/auth-guard.service";
import { GameComponent } from "./core/game/game/game.component";
import { SearchGameComponent } from "./core/search/search-game/search-game.component";
import { SearchGameResolve } from "./core/search/search-game/search-game.resolve.service";
import { SearchProfileComponent } from "./core/search/search-profile/search-profile.component";
import { SearchProfileResolve } from "./core/search/search-profile/search-profile.resolve.service";
import { ActivityComponent } from "./core/activity/activity/activity.component";
import { ActivityResolve } from "./core/activity/activity.resolve.service";
import { SignInComponent } from "./core/auth/sign-in/sign-in.component";
import { SignUpComponent } from "./core/auth/sign-up/sign-up.component";

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", component: HomeComponent },
      { path: "sign-in", component: SignInComponent },
      { path: "sign-up", component: SignUpComponent },
      {
        path: "profile/:login",
        component: ProfileComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: "game",
        component: GameComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: "search-game",
        component: SearchGameComponent,
        resolve: {
          profiledata: SearchGameResolve,
        },
      },
      {
        path: "search-game/:searchValue",
        component: SearchGameComponent,
        resolve: {
          profiledata: SearchGameResolve,
        },
      },
      {
        path: "search-profile/:value",
        component: SearchProfileComponent,
        resolve: {
          profiledata: SearchProfileResolve,
        },
      },
      {
        path: "my-account/:value",
        component: ActivityComponent,
        canActivate: [AuthGuardService],
        resolve: {
          profiledata: ActivityResolve,
        },
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
