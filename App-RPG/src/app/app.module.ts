import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { ApiService } from "./services/api.service";
import { DataService } from "./services/data.service";
import { ForumService } from "./services/forum.service";
import { CreateGameDataService } from "./services/create-game.service";
import { HeaderComponent } from "./header/header.component";
import { SignInComponent } from "./auth/sign-in/sign-in.component";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";
import { AuthService } from "./auth/auth.service";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProfileModule } from "./profile/profile.module";
import { AuthGuardService } from "./auth/auth-guard.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileModule
  ],
  providers: [
    ApiService,
    AuthService,
    AuthGuardService,
    DataService,
    ForumService,
    CreateGameDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
