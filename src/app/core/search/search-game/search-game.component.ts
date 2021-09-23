import { Component, OnInit } from "@angular/core";
import { GameAppModel, GameListModel } from "src/app/core/models/game.model";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/core/services/api.service";
import { NgForm } from "@angular/forms";
import { DataService } from "../../services/data.service";

@Component({
  selector: "app-search-game",
  templateUrl: "./search-game.component.html",
  styleUrls: ["./search-game.component.sass"],
})
export class SearchGameComponent implements OnInit {
  gameCategories: any[] = [];
  statusOfGame: string[] = ["Active", "Ongoing", "Ended"];

  imageUrl: string = "";

  isLoading = false;
  foundData: GameAppModel[] = [];
  foundGames: GameListModel[] = [];
  allCategoriesChecked: boolean = true;
  availableFlag: boolean = false;
  isImageLoading: boolean;
  pageSize: number = 50;

  constructor(
    private route: ActivatedRoute,
    private _api: ApiService,
    private _data: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.pageSize = this._data.getPageSizeForum();
    let categories = this._data.getGameCategories();
    categories.forEach(category => {
      this.gameCategories.push({
        name: category.name,
        urlImage: category.urlImage,
        checked: false
      });
    });

    this.route.queryParams.subscribe((params) => {
      let query = { ...params.keys, ...params };

      if (Object.keys(query).length > 0)
        this._api.searchGames(query).subscribe((data) => {
          this.isLoading = true;
          this.foundData = data.gamesResult;
          if (this.foundData.length < 1) this.isLoading = false;
          
          this.prepareData(data.gamesResult);
        });
    });
  }

  prepareData(responseGames) {
    this.foundGames = [];
    for (let i = 0; i < responseGames.length; i++) {
      const game = responseGames[i];
      this.foundGames.push(new GameListModel(game, false, null, null));
      
      if (game.photoName != null && game.photoName != "unknown.png") {
        this.isImageLoading = true;
        this._api.getImage(game.photoName).subscribe(
          (data) => {
            this.createImageFromBlob(data, i, false);
            this.isImageLoading = false;
          },
          (error) => {
            this.isImageLoading = false;
            console.log(error);
          }
        );
      } else this.setDefaultImage(i);
      
      if (
        game.gameMaster.photoName != null &&
        game.photoName != "unknown.png"
      ) {
        this.isImageLoading = true;
        this._api.getImage(game.gameMaster.photoName).subscribe(
          (data) => {
            this.createImageFromBlob(data, i, true);
            this.isImageLoading = false;
          },
          (error) => {
            this.isImageLoading = false;
            console.log(error);
          }
        );
      }

      if (i === responseGames.length - 1) this.isLoading = false;
    }
  }

  createImageFromBlob(image: Blob, index: number, photoGM: boolean) {
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        if (!photoGM) this.foundGames[index].photo = reader.result;
        else this.foundGames[index].photoGM = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  setDefaultImage(index: number) {
    this.foundGames[index].defaultImage = true;
    this.gameCategories.forEach((element) => {
      if (this.foundGames[index].data.category == element.name) {
        this.foundGames[index].photo = element.urlImage;
      }
    });
  }

  onBoxAvaliable(value: boolean) {
    this.availableFlag = value;
  }

  categoryClick(index: number) {
    if (index === -1) {
      this.uncheckAllCategories();
      this.allCategoriesChecked = true;
      return true;
    }
    this.allCategoriesChecked = false;
    this.gameCategories[index].checked = !this.gameCategories[index].checked;
  }

  uncheckAllCategories() {
    this.gameCategories.forEach(category => {
      category.checked = false;
    });
  }

  async onSearch(form: NgForm) {
    let selectedCategories = [];
    this.gameCategories.forEach((category) => {
      if (category.checked) selectedCategories.push(category.name);
    });

    let params = {
      title: form.value.title,
      selectedCategories: JSON.stringify(selectedCategories),
      showOnlyAvailable: this.availableFlag,
      pageSize: this.pageSize,
      pageNumber: 1,
    }
    
    this.router.navigate(["search-game"], { queryParams: params });
  }
}
