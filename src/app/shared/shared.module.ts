import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TransformYesNoBooleanPipe } from "./transform-yes-no-boolean.pipe";
import { PlayersListDirective } from "./players-list.directive";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TextEditorComponent } from "./text-editor/text-editor.component";

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [
    TransformYesNoBooleanPipe,
    PlayersListDirective,
    TextEditorComponent,
  ],
  exports: [
    TransformYesNoBooleanPipe,
    PlayersListDirective,
    TextEditorComponent,
  ],
})
export class SharedModule {}
