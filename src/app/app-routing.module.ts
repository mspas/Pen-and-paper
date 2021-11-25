import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./core/home/home.component";
import { SignInComponent } from "./core/auth/sign-in/sign-in.component";
import { SignUpComponent } from "./core/auth/sign-up/sign-up.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", component: HomeComponent },
      { path: "sign-in", component: SignInComponent },
      { path: "sign-up", component: SignUpComponent },
      {
        path: "profile",
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: "game",
        loadChildren: () => import('./game/game.module').then(m => m.GameModule)
      },
      {
        path: "create-game",
        loadChildren: () => import('./game/game.module').then(m => m.GameModule)
      },
      {
        path: "search",
        loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
      },
      {
        path: "my-account",
        loadChildren: () => import('./activity/activity.module').then(m => m.ActivityModule),
      },
      { path: '**', redirectTo: 'home' }
    ], {
      onSameUrlNavigation: 'reload'
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
