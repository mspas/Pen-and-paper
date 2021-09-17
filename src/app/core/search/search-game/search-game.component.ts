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

  isLoading = true;
  foundData: GameAppModel[] = [];
  foundGames: GameListModel[] = [];
  allCategoriesChecked: boolean = true;
  wasSearched: boolean = false;
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
      console.log(query)

      if (Object.keys(query).length > 0)
        this._api.searchGames(query).subscribe((data) => {
          this.foundData = data.gamesResult;
          this.prepareData(data.gamesResult);
        });
    });
    /*this.gameCategories = this._data.getGameCategories();
    this.route.params.subscribe((params) => {
      this.isLoading = true;
      let searchValue = params["searchValue"] ? params["searchValue"] : "...";
      if (searchValue) {
        this._api.searchGames(searchValue).subscribe((date) => {
          
        })
      }
    });*/
  }

  prepareData(responseGames) {
    this.foundGames = [];
    let i = 0;
    let j = 0;
    responseGames.forEach((game) => {
      const foundGame = new GameListModel(game, false, null, null);
      this.foundGames.push(foundGame);
      if (game.photoName != null && game.photoName != "unknown.png") {
        this.isImageLoading = true;
        this._api.getImage(game.photoName).subscribe(
          (data) => {
            this.createImageFromBlob(data, i, false);
            this.isImageLoading = false;
            i++;
          },
          (error) => {
            this.isImageLoading = false;
            console.log(error);
          }
        );
      } else this.setDefaultImage(j);
      j++;
    });

    let index2 = 0;
    responseGames.forEach((game) => {
      if (
        game.gameMaster.photoName != null &&
        game.photoName != "unknown.png"
      ) {
        this.isImageLoading = true;
        this._api.getImage(game.gameMaster.photoName).subscribe(
          (data) => {
            this.createImageFromBlob(data, index2, true);
            this.isImageLoading = false;
            index2++;
          },
          (error) => {
            this.isImageLoading = false;
            console.log(error);
          }
        );
      }
    });
  }

  createImageFromBlob(image: Blob, index: number, photoGM: boolean) {
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        if (!photoGM) this.foundGames[index].photo = reader.result;
        else {
          this.foundGames[index].photoGM = reader.result;
        }
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
      categories: JSON.stringify(selectedCategories),
      showOnlyAvailable: this.availableFlag,
      pageSize: this.pageSize,
      pageNumber: 1,
    }
    
    this.router.navigate(["search-game"], { queryParams: params });
  }
}
