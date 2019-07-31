import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-bphoto',
  templateUrl: './bphoto.component.html',
  styleUrls: ['./bphoto.component.css']
})
export class BphotoComponent implements OnInit {

  constructor(private _data: DataService) { }

  ngOnInit() {
  }
  ngAfterContentChecked(){
    let name = "";
    this._data.currentBPhoto.subscribe(data => name = data);
    document.getElementById("bphoto").style.backgroundImage = name;
  }

}
