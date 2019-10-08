import { ApiService } from '../services/api.service';
import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    ActivatedRouteSnapshot
} from '@angular/router';
import { PersonalDataModel } from '../models/personaldata.model';
import { Observable } from 'rxjs';


@Injectable()
export class ActivityResolve implements Resolve<PersonalDataModel[]> {

    
    profileData: PersonalDataModel[];
    userID: number;

    constructor(private api: ApiService, private router: Router) {
     }

    resolve(route: ActivatedRouteSnapshot) {
        let login = localStorage.getItem('nick');
        //return this.api.getData_LoggedWithView(nick);
        return this.api.getAllDataProfile(login, login);
    }
}