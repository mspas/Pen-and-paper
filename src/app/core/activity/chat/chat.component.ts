import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from "@angular/core";
import { NgForm } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { ConversationDataModel, MessageModel, MessageCreateModel } from "../../models/message.model";
import { ApiService } from "../../services/api.service";
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.sass"]
})
export class ChatComponent implements OnInit {
  @ViewChild("chatBody", {static: false}) chatBodyRef: ElementRef;
  
  @Input("conversationData") conversationData: ConversationDataModel;
  @Input("messageList") messageList: MessageModel[];
  @Input("isLoading") isLoading: boolean;
  @Output() closeChatEvent = new EventEmitter<boolean>();

  newConversation: boolean = false;
  oldNumberOfMesssages: number = 0;
  interval: any;

  defaultTextValue: string = '';
  faArrowCircleUp = faArrowCircleUp;
  faTimes = faTimes;

  constructor(
    private _api: ApiService,
  ) {}

  ngOnInit() {
    this.refreshData();
    this.interval = setInterval(() => { 
        this.refreshData();
    }, 5000);
  }

  ngOnChanges() {
    if (this.messageList.length < 1) this.newConversation = true;
    else this.newConversation = false;
  }

  async refreshData() {
    if (!this.conversationData.relation) return false;
    this._api
      .getRelationData(this.conversationData.relation.id)
      .subscribe(data => {
        this.conversationData.relation = data[0];

        let lastDate = this.conversationData.relation.lastMessageDate ? this.conversationData.relation.lastMessageDate : null;
        let length = this.messageList.length;

        if (this.messageList.length > 0)
          if (lastDate > this.messageList[length - 1].sendDate || this.messageList[length - 1].sendDate == null) {  // newer means bigger
            this._api
              .getConversation(this.conversationData.relation.id)
              .subscribe(data => {
                this.messageList = data;
                if (this.messageList.length > this.oldNumberOfMesssages)
                  this.scrollDown();
                this.oldNumberOfMesssages = this.messageList.length;
              });
      }
    });
  }

  scrollDown() {
    this.chatBodyRef.nativeElement.scrollTop = this.chatBodyRef.nativeElement.scrollHeight;
  }

  onCloseClick() {
    this.closeChatEvent.emit(false);
  }

  onSendMessage(form: NgForm) {
    var body = form.value.message;
    var now = new Date();
    console.log(this.conversationData)
    var msg = new MessageCreateModel(now, false, body, this.conversationData.relation.id, this.conversationData.myProfile.id, false);

    this._api.sendMessage(msg);
    this.conversationData.relation.lastMessageDate = now;
    
    this.addMsgTemporary(msg);
    this.defaultTextValue = ''; 
  }

  addMsgTemporary(msg: MessageCreateModel) {
    this.messageList.push(
      new MessageModel(
        -1,
        null,
        false,
        msg.bodyMessage,
        msg.relationId,
        msg.senderId,
        false
      )
    );
  }
}
