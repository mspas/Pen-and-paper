import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile/profile.component";
import { AuthGuardService } from "./auth/auth-guard.service";
import { PersonalDataResolve } from "./profile/profile.resolve.service";
import { GameComponent } from "./game/game/game.component";
import { GameResolve } from "./game/game.resolve.service";

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
          profiledata: PersonalDataResolve
        }
      },
      {
        path: "game/:id",
        component: GameComponent,
        canActivate: [AuthGuardService],
        resolve: {
          profiledata: GameResolve
        }
      },
      {
        path: "game/:id/topic/:topicId/:page",
        component: GameComponent,
        canActivate: [AuthGuardService],
        resolve: {
          profiledata: GameResolve
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
