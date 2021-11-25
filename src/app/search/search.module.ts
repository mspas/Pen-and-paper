import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchGameComponent } from "./search-game/search-game.component";
import { SearchProfileComponent } from "./search-profile/search-profile.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SearchResultsGameComponent } from './search-results/search-results-game/search-results-game.component';
import { SearchResultsProfileComponent } from './search-results/search-results-profile/search-results-profile.component';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AuthGuardService } from "../core/auth/auth-guard.service";

const routes: Routes = [
  {
    path: "game",
    component: SearchGameComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "profile",
    component: SearchProfileComponent,
    canActivate: [AuthGuardService],
  },
]

@NgModule({
  declarations: [SearchGameComponent, SearchProfileComponent, SearchResultsGameComponent, SearchResultsProfileComponent],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, FontAwesomeModule,
    RouterModule.forChild(routes)
  ],
  providers: [],
})
export class SearchModule {}
