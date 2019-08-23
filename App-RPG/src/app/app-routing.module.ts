import { SearchFriendComponent } from './search-friend/search-friend.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { PersonalDataResolve } from './profile-view/page-view.resolve.service';
import { ProfileViewFriendsComponent } from './profile-view/view-friends/profile-view-friends.component';
import { FriendResolve } from './profile-page/profile-page.resolve';
import { FriendViewResolve } from './profile-view/view-friends/profile-view-friends.resolve.service';
import { SearchFriendResolve } from './search-friend/search-friend.resolve.service';
import { CreateGameComponent } from './create-game/create-game.component';
import { GamesViewResolve } from './profile-view/view-games/profile-view-games.resolve.service';
import { ProfileViewGamesComponent } from './profile-view/view-games/profile-view-games.component';
import { GameResolve } from './game-view/game.resolve.service';
import { GameViewComponent } from './game-view/game-view.component';
import { SearchGameComponent } from './search-game/search-game.component';
import { SearchGameResolve } from './search-game/search-game.resolve.service';
import { InviteToGameComponent } from './game-view/invite-to-game/invite-to-game.component';
import { GameInviteResolve } from './game-view/invite-to-game/invite-resolver.service';
import { SideBarComponent } from './side-bar/side-bar.component';
import { StartPageComponent } from './start-page/start-page.component';
import { ActivityComponent } from './activity/activity.component';
import { ActivityResolve } from './activity/activity.resolve.service';
import { GameOverviewComponent } from './game-overview/game-overview.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SideBarComponent },
      { 
        path: 'start', 
        component: StartPageComponent, 
        canActivate: [AuthGuardService],
        resolve: {
          profiledata: FriendResolve
        },
      },
      { 
        path: 'search-game/:value', 
        component: SearchGameComponent,
        resolve: {
          profiledata: SearchGameResolve
        }, 
      },
      { 
        path: 'create-game', 
        component: CreateGameComponent, 
        canActivate: [AuthGuardService] 
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
        path: 'my-profile', 
        component: ProfilePageComponent, 
        canActivate: [AuthGuardService],
        resolve: {
          profiledata: FriendResolve
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
          path: 'profile/friends-list/:login', 
          component: ProfileViewFriendsComponent,
          canActivate: [AuthGuardService],
          resolve: {
            profiledata: FriendViewResolve
          },
      },
      {
          path: 'profile/games-list/:login', 
          component: ProfileViewGamesComponent,
          canActivate: [AuthGuardService],
          resolve: {
            profiledata: GamesViewResolve
          },
      },
      {
          path: 'game/:id', 
          component: GameViewComponent,
          canActivate: [AuthGuardService],
          resolve: {
            profiledata: GameResolve
          },
      },
      {
          path: 'invite-to-game/:id', 
          component: InviteToGameComponent,
          canActivate: [AuthGuardService],
          resolve: {
            profiledata: GameInviteResolve
          },
      },
      {
          path: 'my-account/:value', 
          component: ActivityComponent,
          canActivate: [AuthGuardService],
          resolve: {
            profiledata: ActivityResolve
          },
      },
      {
          path: 'game/:id/overview', 
          component: GameOverviewComponent,
          canActivate: [AuthGuardService],
          resolve: {
            profiledata: GameResolve
          },
      }
  ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
