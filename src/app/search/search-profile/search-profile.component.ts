import { Component, OnInit } from "@angular/core";
import {
  PersonalDataModel,
  PersonalDataListModel,
} from "src/app/core/models/personaldata.model";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/core/services/api.service";
import { NgForm } from "@angular/forms";
import { FriendListModel } from "src/app/core/models/friend.model";
import { DataService } from "../../core/services/data.service";

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
        this._api.searchProfiles(query).subscribe(async (data) => {
          this.isLoading = true;
          this.foundData = data.profilesResult;
          if (this.foundData.length < 1) this.isLoading = false;
          
          await this.prepareData(data.profilesResult);
        });
    });
  }

  async prepareData(responseProfiles: any) {
    this.foundProfiles = [];
    for (let i = 0; i < responseProfiles.length; i++) {
      const profile = responseProfiles[i];
      let photo = null;
      
      if (
        profile.photoName != null &&
        profile.photoName != "unknown.png"
      ) {
        this.isImageLoading = true;

        let blob = await this._api.getImage(profile.photoName).toPromise();
        let image = await this.blobToImage(blob);
        photo = image.src;

        this.isImageLoading = false;
      }

      this.foundProfiles.push(new PersonalDataListModel(profile, photo));
      if (i === responseProfiles.length - 1) this.isLoading = false;
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
