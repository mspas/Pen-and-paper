export class ButtonManager {
  public topic: boolean;
  public topicList: boolean;
  public managePlayers: boolean;
  public gameSettings: boolean;
  public userAccess: boolean;
  public createTopic: boolean;
  public yourCharacter: boolean;

  constructor() {
    this.topic = false;
    this.topicList = false;
    this.managePlayers = false;
    this.gameSettings = false;
    this.userAccess = false;
    this.createTopic = false;
    this.yourCharacter = false;
  }

  showChildComponent(subpage: string) {
    switch (subpage) {
      case "user-access":
        this.showUserAccess();
        break;
      case "game-settings":
        this.showGameSettings();
        break;
      case "create-topic":
        this.showCreateTopic();
        break;
      case "manage-players":
        this.showManagePlayers();
        break;
      case "players":
        this.showManagePlayers();
        break;
      case "my-character":
        this.showYourCharacter();
        break;
      default:
        this.showTopicList();
        break;
    }
  }

  showTopic() {
    this.setFalse();
    this.topic = true;
  }

  showTopicList() {
    this.setFalse();
    this.topicList = true;
  }

  private showManagePlayers() {
    this.setFalse();
    this.managePlayers = true;
  }

  private showGameSettings() {
    this.setFalse();
    this.gameSettings = true;
  }

  private showUserAccess() {
    this.setFalse();
    this.userAccess = true;
  }

  private showCreateTopic() {
    this.setFalse();
    this.createTopic = true;
  }

  private showYourCharacter() {
    this.setFalse();
    this.yourCharacter = true;
  }

  private setFalse() {
    this.topic = false;
    this.topicList = false;
    this.managePlayers = false;
    this.gameSettings = false;
    this.userAccess = false;
    this.createTopic = false;
    this.yourCharacter = false;
  }
}
