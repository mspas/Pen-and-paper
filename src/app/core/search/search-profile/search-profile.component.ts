import { Component, OnInit } from "@angular/core";
import {
  PersonalDataModel,
  PersonalDataListModel,
} from "src/app/core/models/personaldata.model";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/core/services/api.service";
import { NgForm } from "@angular/forms";
import { FriendListModel } from "src/app/core/models/friend.model";
import { DataService } from "../../services/data.service";

@Component({
  selector: "app-search-profile",
  templateUrl: "./search-profile.component.html",
  styleUrls: ["./search-profile.component.sass"],
})
export class SearchProfileComponent implements OnInit {
  foundData: PersonalDataModel[] = [];
  foundProfiles: PersonalDataListModel[] = [];
  isImageLoading: boolean;
  pageSize: number;
  isLoading: boolean;

  constructor(
    private route: ActivatedRoute,
    private _api: ApiService,
    private _data: DataService,
    private router: Router
  ) {}

  ngOnInit() {  
    this.pageSize = this._data.getPageSizeForum();

    this.route.queryParams.subscribe((params) => {
      let query = { ...params.keys, ...params };

      if (Object.keys(query).length > 0)
        this._api.searchProfiles(query).subscribe((data) => {
          this.isLoading = true;
          this.foundData = data.profilesResult;
          if (this.foundData.length < 1) this.isLoading = false;
          
          this.prepareData(data.profilesResult);
        });
    });
  }

  prepareData(responseProfiles: any) {
    this.foundProfiles = [];
    for (let i = 0; i < responseProfiles.length; i++) {
      const profile = responseProfiles[i];
      this.foundProfiles.push(new PersonalDataListModel(profile, null));
      if (
        profile.photoName != null &&
        profile.photoName != "unknown.png"
      ) {
        this.isImageLoading = true;
        this._api.getImage(profile.photoName).subscribe(
          (data) => {
            this.createImageFromBlob(data, i);
            this.isImageLoading = false;
          },
          (error) => {
            this.isImageLoading = false;
            console.log(error);
          }
        );
      }
      if (i === responseProfiles.length - 1) this.isLoading = false;
    }
  }

  createImageFromBlob(image: Blob, index: number) {
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        this.foundProfiles[index].photo = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  async onSearch(form: NgForm) {
    if (form.value.login.length < 1 && form.value.firstname.length < 1 && form.value.lastname.length < 1) return false;

    let params = {
      login: form.value.login,
      firstName: form.value.firstname,
      lastName: form.value.lastname,
      pageSize: this.pageSize,
      pageNumber: 1,
    }
    
    this.router.navigate(["search-profile"], { queryParams: params });
  }
}
