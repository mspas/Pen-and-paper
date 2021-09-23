import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./core/home/home.component";
import { ProfileComponent } from "./core/profile/profile/profile.component";
import { AuthGuardService } from "./core/auth/auth-guard.service";
import { GameComponent } from "./core/game/game/game.component";
import { SearchGameComponent } from "./core/search/search-game/search-game.component";
import { SearchProfileComponent } from "./core/search/search-profile/search-profile.component";
import { ActivityComponent } from "./core/activity/activity/activity.component";
import { SignInComponent } from "./core/auth/sign-in/sign-in.component";
import { SignUpComponent } from "./core/auth/sign-up/sign-up.component";
import { CreateGameComponent } from "./core/game/create-game/create-game.component";

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
      },
      {
        path: "search-profile",
        component: SearchProfileComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: "create-game",
        component: CreateGameComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: "my-account/:value",
        component: ActivityComponent,
        canActivate: [AuthGuardService]
      },
      { path: '**', redirectTo: 'home' }
    ], {
      onSameUrlNavigation: 'reload'
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
