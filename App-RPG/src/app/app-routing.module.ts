import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile/profile.component";
import { AuthGuardService } from "./auth/auth-guard.service";
import { PersonalDataResolve } from "./profile/profile.resolve.service";

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
      }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
