export class ButtonManager {
    constructor(
        public topicList: boolean,
        public managePlayers: boolean,
        public gameSettings: boolean,
        public userAccess: boolean,
        public createTopic: boolean,
        public yourCharacter: boolean
    ) {}
    
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