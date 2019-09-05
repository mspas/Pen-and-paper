import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class ForumService {
    
    private apiResponse = new BehaviorSubject<number>(-1);

    currentApiResponse = this.apiResponse.asObservable();


    constructor() { }

    
    changeIdResponse(id: number) {
        console.log(id);
        this.apiResponse.next(id);
    }

}