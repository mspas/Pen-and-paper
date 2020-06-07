import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./core/home/home.component";
import { ProfileComponent } from "./core/profile/profile/profile.component";
import { AuthGuardService } from "./core/auth/auth-guard.service";
import { PersonalDataResolve } from "./core/profile/profile.resolve.service";
import { GameComponent } from "./core/game/game/game.component";
import { GameResolve } from "./core/game/game.resolve.service";
import { SearchGameComponent } from "./core/search/search-game/search-game.component";
import { SearchGameResolve } from "./core/search/search-game/search-game.resolve.service";
import { SearchProfileComponent } from "./core/search/search-profile/search-profile.component";
import { SearchProfileResolve } from "./core/search/search-profile/search-profile.resolve.service";
import { ActivityComponent } from "./core/activity/activity/activity.component";
import { ActivityResolve } from "./core/activity/activity.resolve.service";

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", component: HomeComponent },
      {
        path: "profile/:login",
        component: ProfileComponent,
        canActivate: [AuthGuardService],
        resolve: {
          profiledata: PersonalDataResolve,
        },
      },
      {
        path: "game/:id",
        component: GameComponent,
        canActivate: [AuthGuardService],
        resolve: {
          profiledata: GameResolve,
        },
      },
      {
        path: "game/:id/topic/:topicId/:page",
        component: GameComponent,
        canActivate: [AuthGuardService],
        resolve: {
          profiledata: GameResolve,
        },
      },
      {
        path: "search-game/:value",
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