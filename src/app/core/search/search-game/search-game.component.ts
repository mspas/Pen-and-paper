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
        this._api.searchGames(query).subscribe(async (data) => {
          this.isLoading = true;
          this.foundData = data.gamesResult;
          if (this.foundData.length < 1) this.isLoading = false;
          
          await this.prepareData(data.gamesResult);
        });
    });
  }

  async prepareData(responseGames) {
    this.foundGames = [];
    for (let i = 0; i < responseGames.length; i++) {
      const game = responseGames[i];
      let photoGameMaster = null;
      let photoGame = null;
      let isDefaultImage = true;
      
      if (game.photoName != null && game.photoName != "unknown.png") {
        this.isImageLoading = true;

        let blob = await this._api.getImage(game.photoName).toPromise();
        let image = await this.blobToImage(blob);
        photoGame = image.src;

        this.isImageLoading = false;
        isDefaultImage = false;
      }
      
      if (
        game.gameMaster.photoName != null &&
        game.gameMaster.photoName != "unknown.png"
      ) {
        this.isImageLoading = true;

        let blob = await this._api.getImage(game.gameMaster.photoName).toPromise();
        let image = await this.blobToImage(blob);
        photoGameMaster = image.src;

        this.isImageLoading = false;
      }

      game.nofparticipants = game.participants.length;

      for (let j = 0; j < game.participants.length; j++) {
        const relation = game.participants[j];
        if (relation.isGameMaster || !relation.isAccepted) 
          game.nofparticipants--;
      }
      
      if (isDefaultImage) photoGame = this.setDefaultImage(game.category);

      this.foundGames.push(new GameListModel(game, isDefaultImage, photoGame, photoGameMaster));

      if (i === responseGames.length - 1) this.isLoading = false;
    }
  }

  blobToImage = (blob: Blob): Promise<HTMLImageElement> => {
    return new Promise(resolve => {
      let reader = new FileReader();
      let dataURI;
      reader.addEventListener(
        "load",
        () => {
          dataURI = reader.result;
          const img = document.createElement("img");
          img.src = dataURI;
          resolve(img);
        },
        false
      );
      if (blob) {
        reader.readAsDataURL(blob);
      }
    })
  }

  setDefaultImage(category: string) {
    for (let i = 0; i < this.gameCategories.length; i++)
      if (category === this.gameCategories[i].name)
        return this.gameCategories[i].urlImage;
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
