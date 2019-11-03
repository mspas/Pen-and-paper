import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransformYesNoBooleanPipe } from './transform-yes-no-boolean.pipe';
import { PlayersListDirective } from './players-list.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TransformYesNoBooleanPipe,
    PlayersListDirective
  ],
  exports: [
    TransformYesNoBooleanPipe,
    PlayersListDirective
  ]
})
export class SharedModule { }
