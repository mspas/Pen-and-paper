import { Component, OnInit } from "@angular/core";
import {
  PersonalDataModel,
  PersonalDataListModel,
} from "src/app/core/models/personaldata.model";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/core/services/api.service";
import { NgForm } from "@angular/forms";
import { FriendListModel } from "src/app/core/models/friend.model";

@Component({
  selector: "app-search-profile",
  templateUrl: "./search-profile.component.html",
  styleUrls: ["./search-profile.component.sass"],
})
export class SearchProfileComponent implements OnInit {
  foundData: PersonalDataModel[] = [];
  profilePhotoList: PersonalDataListModel[] = [];
  wasSearched: boolean = false;
  isImageLoading: boolean;

  constructor(
    private route: ActivatedRoute,
    private _api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.data.subscribe((profiledata: { profiledata: any }) => {
      this.foundData = profiledata.profiledata;
    });

    if (this.foundData != null) {
      this.wasSearched = true;
      this.foundData.forEach((element) => {
        this.profilePhotoList.push(new PersonalDataListModel(element, null));
      });

      this.profilePhotoList.forEach((element) => {
        if (
          element.data.photoName != null &&
          element.data.photoName != "unknown.png"
        ) {
          this.isImageLoading = true;
          this._api.getImage(element.data.photoName).subscribe(
            (data) => {
              this.createImageFromBlob(
                data,
                this.profilePhotoList.indexOf(element)
              );
              this.isImageLoading = false;
            },
            (error) => {
              this.isImageLoading = false;
              console.log(error);
            }
          );
        }
      });
    }
  }

  createImageFromBlob(image: Blob, id: number) {
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        this.profilePhotoList[id].photo = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  async onSearch(form: NgForm) {
    let searchValue = "";
    let login = form.value.login;
    let firstname = form.value.firstname;
    let lastname = form.value.lastname;
    if (firstname.length > 0) searchValue += firstname;
    searchValue += ".";
    if (lastname.length > 0) searchValue += lastname;
    searchValue += ".";
    if (login.length > 0) searchValue += login;

    console.log(searchValue);

    let res = await this.router.navigate(["search-profile/" + searchValue]);
    window.location.reload();
  }
}
