import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  Input,
  HostListener
} from "@angular/core";
import { PersonalDataListModel } from "../models/personaldata.model";
import { Mouse } from "./mouse";

@Directive({
  selector: "[appPlayersList]"
})
export class PlayersListDirective implements OnInit {
  @Input() acceptedPlayers: PersonalDataListModel[];

  mouse: Mouse = new Mouse();
  counter: number = 0;
  updateRate: number = 10;
  inner: any;
  offsetWidth: number;
  offsetHeight: number;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    let div = this.el.nativeElement;
    if (this.acceptedPlayers.length < 1) {
      this.renderer.setAttribute(div, "class", "text-outline");
      div.innerHTML = "There are no players yet!";
    } else this.generateRows();
  }

  generateRows() {
    let index = 0;
    let playersInRow = 4;
    let noRows = 0;
    let reminder = this.acceptedPlayers.length % playersInRow;
    if (this.acceptedPlayers.length < 5) noRows = 1;
    else {
      noRows = this.acceptedPlayers.length / playersInRow;
      if (reminder > 0) noRows++;
    }

    console.log(this.acceptedPlayers.length + " " + noRows + " " + reminder);

    for (let i = 0; i < noRows; i++) {
      const row = this.renderer.createElement("div");
      this.renderer.setAttribute(row, "class", "row");
      this.renderer.appendChild(this.el.nativeElement, row);

      if (i == noRows - 1) playersInRow = reminder;

      for (let j = 0; j < playersInRow; j++, index++) {
        const cardContainer = this.renderer.createElement("div");
        let x = 12 / playersInRow;
        this.renderer.setAttribute(
          cardContainer,
          "class",
          "card-container col-xs-" + x.toString()
        );
        this.renderer.setAttribute(
          cardContainer,
          "id",
          "container" + index.toString()
        );

        const card = this.renderer.createElement("div");
        this.renderer.setAttribute(card, "class", "center player-card");
        this.renderer.setAttribute(card, "id", index.toString());

        const photo = this.renderer.createElement("img");
        if (this.acceptedPlayers[index].photo)
          this.renderer.setAttribute(
            photo,
            "src",
            this.acceptedPlayers[index].photo
          );
        else this.renderer.setAttribute(photo, "src", "assets/unknown.png");
        this.renderer.setStyle(photo, "width", "100px");
        this.renderer.setStyle(photo, "height", "100px");

        card.innerHTML = this.acceptedPlayers[index].data.login;

        this.renderer.appendChild(row, cardContainer);
        this.renderer.appendChild(cardContainer, card);
        this.renderer.appendChild(card, photo);
      }
    }
  }

  @HostListener("mouseover", ["$event.target", "$event"])
  onMouseEnter(target: HTMLElement, event: MouseEvent) {
    if (target.id && !isNaN(Number(target.id))) {
      this.inner = document.getElementById(target.id);
      var containerId = "container" + document.getElementById(target.id).id;
      var c = document.getElementById(containerId);
      this.offsetHeight = c.offsetHeight;
      this.offsetWidth = c.offsetWidth;
      this.mouse.setOrigin(
        c.offsetLeft,
        c.offsetTop,
        this.offsetWidth,
        this.offsetHeight
      );
      this.update(
        event.clientX,
        event.clientY,
        this.offsetWidth,
        this.offsetHeight
      );
    }
  }

  @HostListener("mouseleave", ["$event.target"])
  onMouseLeave(target: HTMLElement) {
    this.inner.removeAttribute("style");
  }

  @HostListener("mousemove", ["$event.target", "$event"])
  onMouseMove(target: HTMLElement, event: MouseEvent) {
    if (target.id && !isNaN(Number(target.id))) {
      if (this.isTimeToUpdate()) {
        this.update(
          event.clientX,
          event.clientY,
          this.offsetWidth,
          this.offsetHeight
        );
      }
    }
  }

  isTimeToUpdate() {
    return this.counter++ % this.updateRate === 0;
  }

  update(clientX: number, clientY: number, offsetWidth: number, offsetHeight) {
    this.mouse.updatePosition(clientX, clientY);
    this.updateTransformStyle(
      (this.mouse.y / offsetHeight / 2).toFixed(2),
      (this.mouse.x / offsetWidth / 2).toFixed(2)
    );
  }

  updateTransformStyle(x, y) {
    x = (Number(x) + 0.25).toString();
    y = (Number(y) + 0.25).toString();
    var style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
    this.inner.style.transform = style;
    this.inner.style.webkitTransform = style;
    this.inner.style.mozTransform = style;
    this.inner.style.msTransform = style;
    this.inner.style.oTransform = style;
  }
}
