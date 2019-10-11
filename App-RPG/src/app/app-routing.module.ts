import { SearchFriendComponent } from './search/search-friend/search-friend.component';
import { ProfileViewComponent } from './profile/profile-view/profile-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { PersonalDataResolve } from './profile/profile.resolve.service';
import { SearchFriendResolve } from './search/search-friend/search-friend.resolve.service';
import { CreateGameComponent } from './game/create-game/create-game.component';
import { SearchGameComponent } from './search/search-game/search-game.component';
import { SearchGameResolve } from './search/search-game/search-game.resolve.service';
import { ActivityComponent } from './activity/activity.component';
import { ActivityResolve } from './activity/activity.resolve.service';
import { GameResolve } from './game/game.resolve.service';
import { GameComponent } from './game/game/game.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'sign-in', component: SignInComponent },
      { 
        path: 'create-game', 
        component: CreateGameComponent, 
        canActivate: [AuthGuardService] 
      },
      { 
        path: 'search-game/:value', 
        component: SearchGameComponent,
        resolve: {
          profiledata: SearchGameResolve
        }, 
      },
      { 
        path: 'search-friends/:value', 
        component: SearchFriendComponent, 
        canActivate: [AuthGuardService],
        resolve: {
          profiledata: SearchFriendResolve
        },
      },
      {
        path: 'profile/:login', 
        component: ProfileViewComponent,
        canActivate: [AuthGuardService],
        resolve: {
          profiledata: PersonalDataResolve
        },
      },
      {
          path: 'game/:id', 
          component: GameComponent,
          canActivate: [AuthGuardService],
          resolve: {
            profiledata: GameResolve
          },
      },
      {
          path: 'game/:id/topic/:topicId/:page', 
          component: GameComponent,
          canActivate: [AuthGuardService],
          resolve: {
            profiledata: GameResolve
          },
      },
      {
          path: 'my-account/:value', 
          component: ActivityComponent,
          canActivate: [AuthGuardService],
          resolve: {
            profiledata: ActivityResolve
          },
      }
  ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
