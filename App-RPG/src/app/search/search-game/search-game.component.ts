import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { GameAppModel, GameListModel } from '../../models/game.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-game',
  templateUrl: './search-game.component.html',
  styleUrls: ['./search-game.component.css']
})
export class SearchGameComponent implements OnInit {

  gameCategories: any[] = [
            {name: "Fantasy", checked: false, urlImage: "assets/fantasy1.png"},
            {name: "SciFi", checked: false, urlImage: "assets/scifi.png"},
            {name: "Mafia", checked: false, urlImage: "assets/mafia1.png"},
            {name: "Cyberpunk", checked: false, urlImage: "assets/fantasy1.png"},
            {name: "Steampunk", checked: false, urlImage: "assets/fantasy1.png"},
            {name: "PostApo", checked: false, urlImage: "assets/fantasy1.png"},
            {name: "Zombie", checked: false, urlImage: "assets/fantasy1.png"},
            {name: "AltHistory", checked: false, urlImage: "assets/fantasy1.png"},
            {name: "Other", checked: false, urlImage: "assets/fantasy1.png"}
          ];
  statusOfGame: string[] = ["Active", "Ongoing", "Ended"];
  
  urlMafia: string = "assets/mafia1.png";
  urlFantasy: string = "assets/fantasy1.png";
  urlSciFi: string = "assets/scifi.png";
  imageUrl: string = "";
  
  foundData: GameAppModel[] = [];
  foundGames: GameListModel[] = [];
  wasSearched: boolean = false;
  join: boolean;
  end: boolean;
  isImageLoading: boolean;

  constructor(private route: ActivatedRoute, private _api: ApiService, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe((profiledata: { profiledata: any }) => {
      this.foundData = profiledata.profiledata;
    });
    this.prepareData(this.foundData);
  }

  prepareData(data) {
    this.foundData = data;
    this.foundGames = [];
    let i = 0;
    let j = 0;
    this.foundData.forEach(game => {
      const foundGame = new GameListModel(game, false, null, null);
      this.foundGames.push(foundGame);
      if (game.photoName != null && game.photoName != "unknown.png") {
        this.isImageLoading = true;
        this._api.getImage(game.photoName).subscribe(data => {
          this.createImageFromBlob(data, i, false);
          this.isImageLoading = false;
          i++;
        }, error => {
          this.isImageLoading = false;
          console.log(error);
        });
      }
      else
        this.setDefaultImage(j);
      j++;
    });

    let index2 = 0;
    this.foundData.forEach(game => {
      if (game.gameMaster.photoName != null && game.photoName != "unknown.png") {
        this.isImageLoading = true;
        this._api.getImage(game.gameMaster.photoName).subscribe(data => {
          this.createImageFromBlob(data, index2, true);
          this.isImageLoading = false;
          index2++;
        }, error => {
          this.isImageLoading = false;
          console.log(error);
        });
      }
    });
  }

  createImageFromBlob(image: Blob, index: number, photoGM: boolean) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      if (!photoGM)
        this.foundGames[index].photo = reader.result;
      else {
        this.foundGames[index].photoGM = reader.result;
      }
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
 }

 setDefaultImage(index: number) {
    this.foundGames[index].defaultImage = true;
    this.gameCategories.forEach(element => {
      if (this.foundGames[index].data.category == element.name) {
        this.foundGames[index].photo = element.urlImage;
      }
    });
 }

  onBoxJoin(value: boolean) {
    this.join = value;
    this.end = false;
  }
  onBoxEnd(value: boolean) {
    this.end = value;
  }

  categoryClick(index: number) {
    const checked = !this.gameCategories[index].checked;
    this.gameCategories[index].checked = checked;
    if (checked)
      document.getElementById("category"+index.toString()).setAttribute("class", "category-name text-default focus");
    else
      document.getElementById("category"+index.toString()).setAttribute("class", "category-name text-default");
  }

  async onSearch(form: NgForm) {
    let searchValue = "";

    let title = form.value.title;
    if (title.length > 0) 
      searchValue += title;
    searchValue += ".";
    console.log(searchValue);

    this.gameCategories.forEach(category => {
      if (category.checked)
        searchValue += category.name + "&";
    });
    if (searchValue.length > 1)
      searchValue = searchValue.slice(0, -1);
    searchValue += ".";

    if (this.join) 
      searchValue += "Yes.";
    else
      searchValue += "No.";

    if (this.end) 
      searchValue += "Yes";
    else
      searchValue += "No";

    var res = await this.router.navigate(['search-game/' + searchValue]);
    window.location.reload();
  }

}
