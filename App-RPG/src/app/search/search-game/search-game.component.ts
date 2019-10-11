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

  gameCategories: string[] = ["Fantasy", "Sci-fi", "Mafia"];
  statusOfGame: string[] = ["Active", "Ongoing", "Ended"];
  foundData: GameAppModel[] = [];
  wasSearched: boolean = false;

  constructor(private route: ActivatedRoute, private _api: ApiService, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe((profiledata: { profiledata: any }) => {
      this.foundData = profiledata.profiledata;
    });
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
