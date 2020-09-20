import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.sass"],
})
export class HomeComponent implements OnInit {
  constructor(private _auth: AuthService, private _router: Router) {
    if (this._auth.isAuthenticated)
      this._router.navigate([`/profile/${this._auth.getLogin()}`]);
  }

  ngOnInit() {}

  flipCard(event) {
    if (event.target.id.slice(0, 2) == "hp") {
      let id = event.target.id.slice(0, 3);
      let e_back = document.getElementById(id + "-back");
      let e = document.getElementById(id);
      let c = e.getAttribute("class");
      if (c.indexOf("flip") == -1) {
        e.setAttribute("class", c + " flip");
        e_back.style.backfaceVisibility = "visible";
      }
    }
  }
}
