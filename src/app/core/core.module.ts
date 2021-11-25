import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./header/header.component";
import { SignInComponent } from "./auth/sign-in/sign-in.component";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "../app-routing.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ApiService } from "./services/api.service";
import { AuthService } from "./auth/auth.service";
import { AuthGuardService } from "./auth/auth-guard.service";
import { DataService } from "./services/data.service";
import { ForumService } from "./services/forum.service";
import { CreateGameDataService } from "./services/create-game.service";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthInterceptor } from "./auth/auth-interceptor.service";
import { Routes } from "@angular/router";
import { StoreModule } from '@ngrx/store';
import * as fromUserData from '../state/reducers/user-data.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserDataEffects } from '../state/effects/user-data.effects';

const routes: Routes = [];

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    //StoreModule.forFeature(fromUserData.userDataFeatureKey, fromUserData.reducer),
    //EffectsModule.forFeature([UserDataEffects])
  ],
  providers: [
    ApiService,
    AuthService,
    AuthGuardService,
    {  provide: HTTP_INTERCEPTORS,
       useClass: AuthInterceptor,
       multi: true
    },
    DataService,
    ForumService,
    CreateGameDataService,
  ],
  exports: [HeaderComponent],
})
export class CoreModule {}
