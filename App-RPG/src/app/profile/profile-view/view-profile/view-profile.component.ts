import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { PersonalDataModel } from '../../../models/personaldata.model';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  @Input() userProfileData : PersonalDataModel;

  constructor() {}

  ngOnInit() {
  }

}
