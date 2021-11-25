import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { ProfileModule } from "./profile/profile.module";
import { GameModule } from "./game/game.module";
import { SearchModule } from "./search/search.module";
import { ActivityModule } from "./activity/activity.module";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, CoreModule, RouterModule, ProfileModule, GameModule, SearchModule, ActivityModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),],
  bootstrap: [AppComponent],
})
export class AppModule {}
