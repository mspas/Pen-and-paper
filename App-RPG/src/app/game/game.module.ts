import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GameComponent } from "./game/game.component";
import { RouterModule } from "@angular/router";
import { GameResolve } from "./game.resolve.service";
import { GameViewComponent } from "./game/game-view/game-view.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [GameComponent, GameViewComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  providers: [GameResolve]
})
export class GameModule {}
