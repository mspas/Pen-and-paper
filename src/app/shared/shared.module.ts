import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TransformYesNoBooleanPipe } from "./transform-yes-no-boolean.pipe";
import { PlayersListDirective } from "./players-list.directive";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TextEditorComponent } from "./text-editor/text-editor.component";
import { ModalComponent } from "./modal/modal.component";

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [
    TransformYesNoBooleanPipe,
    PlayersListDirective,
    TextEditorComponent,
    ModalComponent
  ],
  exports: [
    TransformYesNoBooleanPipe,
    PlayersListDirective,
    TextEditorComponent,
    ModalComponent
  ],
})
export class SharedModule {}
