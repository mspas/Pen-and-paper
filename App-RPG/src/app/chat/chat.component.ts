import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../services/api.service';
import { DataService } from '../services/data.service';
import { ConversationDataModel, MessageModel, MessageCreateModel } from '../models/message.model';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FriendModel } from '../models/friend.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [DatePipe]
})
export class ChatComponent implements OnInit {

  //@Input("conversation") conversation: ConversationModel;

  minimalize: boolean = false;
  newConversation: boolean = false;
  conversationData: ConversationDataModel;
  conversation: MessageModel[] = [];
  relationData: FriendModel[] =[];
  timerSubscription: any;
  defaultValue: string = "";
  
  constructor(private _api: ApiService, private _data: DataService, private datePipe: DatePipe) { }

  ngOnInit() {
    //this._data.currentConversation.subscribe(data => this.conversation = data);
    this._data.currentConversationData.subscribe(data => this.conversationData = data);
    this._api.getConversation(this.conversationData.relation.id).subscribe(data => this.conversation = data);
    if (this.conversation.length < 1) 
      this.newConversation = true;
    else 
      this.newConversation = false;
      
    this.conversation.forEach(msg => {
      if (msg.senderId == this.conversationData.myProfile.id) {
        document.getElementById("msg" + msg.id.toString()).setAttribute("class", "my-message");
      }
    });
    this.subscribeToData();
  }

  ngAfterViewChecked() {
    this.conversation.forEach(msg => {
      var test = new Date();
      if (msg.senderId == this.conversationData.myProfile.id) {
        document.getElementById("msg" + msg.id.toString()).setAttribute("class", "my-message");
      }
    });
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  /*async ngAfterContentChecked() {
    //this._api.getConversation(this.conversationData.relationId).subscribe(data => this.conversation = data);
    await this.delay(7000);
    console.log("ngAfterContentChecked");
    console.log("relation " + this.conversationData.relation.id);
    await this._api.getRelationData(this.conversationData.relation.id).subscribe(data => this.relationData = data);
    await this.delay(4000);
    console.log("relation after " + JSON.stringify(this.relationData[0]));
    this.conversationData.relation = this.relationData[0];
    let lastDate = this.conversationData.relation.lastMessageDate;
    let length = this.conversation.length;
    if (lastDate > this.conversation[length-1].sendDdate) { //nowsza rzecz jest wieksza
      this._api.getConversation(this.conversationData.relation.id).subscribe(data => this.conversation = data);
    }
  }*/

  async refreshData() {
    //this._api.getConversation(this.conversationData.relationId).subscribe(data => this.conversation = data);
    //await this.delay(4000);
    await this._api.getRelationData(this.conversationData.relation.id).subscribe(data => {
      this.relationData = data;
      this.subscribeToData();
    });
    await this.delay(4000);
    this.conversationData.relation = this.relationData[0];
    let lastDate = this.conversationData.relation.lastMessageDate;
    let length = this.conversation.length;
    if (lastDate > this.conversation[length-1].sendDdate || this.conversation[length-1].sendDdate == null) { //nowsza rzecz jest wieksza
      this._api.getConversation(this.conversationData.relation.id).subscribe(data => this.conversation = data);
    }
  }

  private subscribeToData(): void {
    this.timerSubscription = Observable.timer(4000).first().subscribe(() => this.refreshData());
  }

  minimalizeClick() {
    document.getElementById("top").setAttribute("class", "content-top dunno");

    if (this.minimalize == false) {
      document.getElementById("chat-window").setAttribute("class", "window minimalized");
      //document.getElementById("top").setAttribute("class", "content-top minimalized");
    }
    else {
      document.getElementById("chat-window").setAttribute("class", "window full");
      //document.getElementById("top").setAttribute("class", "content-top full");
    }
    this.minimalize = !this.minimalize;
  }

  closeChat() {
    this._data.changeChatControl(false);
  }

  onSendMessage() {
    var body = (<HTMLInputElement>document.getElementById("message")).value;
    this.defaultValue = "";
    var myDate = new Date();
    var msg = new MessageCreateModel(
      myDate, false, body, this.conversationData.relation.id, this.conversationData.myProfile.id
    );
    this._api.sendMessage(msg);
    this.conversationData.relation.lastMessageDate = myDate;
    //this._api.editRelation(this.conversationData.relation);
    this.addMsgTemporary(msg);
  }

  addMsgTemporary(msg: MessageCreateModel) {
    this.conversation.push(new MessageModel(-1, null, false, msg.bodyMessage, msg.relationId, msg.senderId));
  }
}
