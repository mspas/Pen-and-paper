import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.sass"]
})
export class HomeComponent implements OnInit {
  constructor() {}

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
