import { ApiService } from './../api.service';
import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    ActivatedRouteSnapshot
} from '@angular/router';
import { PersonalDataModel } from '../models/personaldata.model';
import { Observable } from 'rxjs';


@Injectable()
export class PersonalDataResolve implements Resolve<PersonalDataModel[]> {

    
    profileData: PersonalDataModel[];
    userID: number;

    constructor(private api: ApiService, private router: Router) {
     }
    
    /*resolve(route: ActivatedRouteSnapshot): Promise<any> | boolean {
        let id = +route.params['id'];
        return this.api.getProfile(id).toPromise().then(profiledata => {
            if (profiledata) {
                return profiledata;
            } else { // id not found
                this.router.navigate(['/my-profile']);
                return false;
            }
        });
    }*/

    resolve(route: ActivatedRouteSnapshot) {
        let nick = route.params['login'];
        console.log("ej login " + nick);
        return this.api.getData_LoggedWithView(nick);
    }
}