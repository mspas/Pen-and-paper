import { Component } from "@angular/core";
import { ApiService } from "./core/services/api.service";
import { DataService } from "./core/services/data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"],
})
export class AppComponent {
  title = "App-RPG";
  interval: any;

  constructor(private _data: DataService, private _api: ApiService) {}

  ngOnInit() {
    //this.subscribeToData();
    this.refreshData();
    this.interval = setInterval(() => { 
        this.refreshData(); 
    }, 5000);
  }

  async refreshData() {
    let loggedId = localStorage.getItem("id") ? parseInt(localStorage.getItem("id")) : null;

    if (!loggedId) return false;

    this._api.getNotificationData(loggedId).subscribe(data => {
      this._data.changeNotificationData(data);
    })
  }
}
