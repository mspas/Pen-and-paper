export class ButtonManager {
  public topic: boolean;
  public topicList: boolean;
  public managePlayers: boolean;
  public gameSettings: boolean;
  public userAccess: boolean;
  public createTopic: boolean;
  public yourCharacter: boolean;

  constructor() {
    this.topicList = false;
    this.managePlayers = false;
    this.gameSettings = false;
    this.userAccess = false;
    this.createTopic = false;
    this.yourCharacter = false;
  }

  showTopic() {
    this.setFalse();
    this.topic = true;
  }

  showTopicList() {
    this.setFalse();
    this.topicList = true;
  }

  showManagePlayers() {
    this.setFalse();
    this.managePlayers = true;
  }

  showGameSettings() {
    this.setFalse();
    this.gameSettings = true;
  }

  showUserAccess() {
    this.setFalse();
    this.userAccess = true;
  }

  showCreateTopic() {
    this.setFalse();
    this.createTopic = true;
  }

  showYourCharacter() {
    this.setFalse();
    this.yourCharacter = true;
  }

  private setFalse() {
    this.topicList = false;
    this.managePlayers = false;
    this.gameSettings = false;
    this.userAccess = false;
    this.createTopic = false;
    this.yourCharacter = false;
  }
}
