import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit {
  @Input("modalTitle") modalTitle: string;
  @Input("showModalFlag") showModalFlag: boolean;
  @Output() closeModalEvent = new EventEmitter<boolean>();

  faTimes = faTimes;
  
  constructor() { }

  ngOnInit() {
  }

  onCloseClick() {
    this.closeModalEvent.emit(false);
  }

}
