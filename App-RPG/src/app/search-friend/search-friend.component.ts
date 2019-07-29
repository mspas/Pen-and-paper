import { ApiService } from './../api.service';
import { PersonalDataModel } from './../models/personaldata.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-friend',
  templateUrl: './search-friend.component.html',
  styleUrls: ['./search-friend.component.css']
})
export class SearchFriendComponent implements OnInit {

  foundData: PersonalDataModel[] = [];
  wasSearched: boolean = false;
  asd: string;

  constructor(private route: ActivatedRoute, private _api: ApiService, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe((profiledata: { profiledata: any }) => {
      this.foundData = profiledata.profiledata;
    });

    if (this.foundData != null) {
      this.wasSearched = true;
    }

  }

  onSearch(form: NgForm) {
    let searchValue = "";
    let login = form.value.login;
    let firstname = form.value.firstname;
    let lastname = form.value.lastname;
    if (firstname.length > 0) 
      searchValue += firstname;
    searchValue += ".";
    if (lastname.length > 0) 
      searchValue += lastname;
    searchValue += ".";
    if (login.length > 0) 
      searchValue += login;

    this.router.navigate(['search-friends/' + searchValue]);
  }

}
