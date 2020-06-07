import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchGameComponent } from "./search-game/search-game.component";
import { SearchProfileComponent } from "./search-profile/search-profile.component";
import { SearchGameResolve } from "./search-game/search-game.resolve.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SearchProfileResolve } from "./search-profile/search-profile.resolve.service";

@NgModule({
  declarations: [SearchGameComponent, SearchProfileComponent],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  providers: [SearchGameResolve, SearchProfileResolve],
})
export class SearchModule {}
