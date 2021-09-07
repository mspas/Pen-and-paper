import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./header/header.component";
import { SignInComponent } from "./auth/sign-in/sign-in.component";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "../app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProfileModule } from "./profile/profile.module";
import { GameModule } from "./game/game.module";
import { SearchModule } from "./search/search.module";
import { ActivityModule } from "./activity/activity.module";
import { ApiService } from "./services/api.service";
import { AuthService } from "./auth/auth.service";
import { AuthGuardService } from "./auth/auth-guard.service";
import { DataService } from "./services/data.service";
import { ForumService } from "./services/forum.service";
import { CreateGameDataService } from "./services/create-game.service";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    SignInComponent,
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileModule,
    GameModule,
    SearchModule,
    ActivityModule,
    FontAwesomeModule
  ],
  providers: [
    ApiService,
    AuthService,
    AuthGuardService,
    DataService,
    ForumService,
    CreateGameDataService,
  ],
  exports: [HeaderComponent],
})
export class CoreModule {}
