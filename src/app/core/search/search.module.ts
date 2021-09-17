import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchGameComponent } from "./search-game/search-game.component";
import { SearchProfileComponent } from "./search-profile/search-profile.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [SearchGameComponent, SearchProfileComponent],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  providers: [],
})
export class SearchModule {}
