import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FriendModel } from './models/friend.model';

@Injectable()
export class FriendsService {

    friendsAll: FriendModel[] = [];

    constructor(private route: ActivatedRoute){
        this.route.data.subscribe((profiledata: { profiledata: any }) => {
            this.friendsAll = profiledata.profiledata;
            console.log("in service: " + this.friendsAll);
        });
        
    }

    getFriends(): FriendModel[] {
        return this.friendsAll;
    }
}