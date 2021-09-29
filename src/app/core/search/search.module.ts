import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchGameComponent } from "./search-game/search-game.component";
import { SearchProfileComponent } from "./search-profile/search-profile.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SearchResultsGameComponent } from './search-results/search-results-game/search-results-game.component';
import { SearchResultsProfileComponent } from './search-results/search-results-profile/search-results-profile.component';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [SearchGameComponent, SearchProfileComponent, SearchResultsGameComponent, SearchResultsProfileComponent],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, FontAwesomeModule],
  providers: [],
})
export class SearchModule {}
