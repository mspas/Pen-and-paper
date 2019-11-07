import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { GameAppModel } from '../../models/game.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-game',
  templateUrl: './search-game.component.html',
  styleUrls: ['./search-game.component.css']
})
export class SearchGameComponent implements OnInit {

  gameCategories: any[] = [
            {name: "Fantasy", checked: false },
            {name: "SciFi", checked: false },
            {name: "Mafia", checked: false },
            {name: "Cyberpunk", checked: false },
            {name: "Steampunk", checked: false },
            {name: "PostApo", checked: false },
            {name: "Zombie", checked: false },
            {name: "AltHistory", checked: false },
            {name: "Other", checked: false }
          ];
  statusOfGame: string[] = ["Active", "Ongoing", "Ended"];
  foundData: GameAppModel[] = [];
  wasSearched: boolean = false;
  join: boolean;

  constructor(private route: ActivatedRoute, private _api: ApiService, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe((profiledata: { profiledata: any }) => {
      this.foundData = profiledata.profiledata;
    });
  }

  onBoxJoin(value: boolean) {
    this.join = value;
  }

  categoryClick(index: number) {
    const checked = !this.gameCategories[index].checked;
    this.gameCategories[index].checked = checked;
    if (checked)
      document.getElementById("category"+index.toString()).setAttribute("class", "category-name text-default focus");
    else
      document.getElementById("category"+index.toString()).setAttribute("class", "category-name text-default");
  }

  onSearch(form: NgForm) {
    let searchValue = "";

    let title = form.value.title;
    if (title.length > 0) 
      searchValue += title;
    searchValue += ".";

    let category = form.value.genre;
    if (category != null) 
      searchValue += category;
    searchValue += ".";

    let status = form.value.status;
    if (status != null) 
      searchValue += status;
    searchValue += ".";

    let dateFrom = form.value.datef;
    if (dateFrom.length > 0) 
      searchValue += dateFrom;
    searchValue += ".";

    let dateTo = form.value.datet;
    if (dateTo.length > 0) 
      searchValue += dateTo;
    searchValue += ".";

    let free = form.value.free;
    if (free == "Yes") 
      searchValue += "Yes";
    else
      searchValue += "No";

    this.router.navigate(['search-game/' + searchValue]);
  }

}
