export class ButtonManager {
    constructor(
        public manageRequests: boolean,
        public setScheme: boolean,
        public newSession: boolean,
        public showPlayers: boolean,
        public setCard: boolean,
        public showSessions: boolean
    ) {}

    onManageRequests() {
        this.manageRequests = true;
        this.setScheme = false;
        this.newSession = false;
        this.showPlayers = false;
        this.setCard = false;
        this.showSessions = false;
    }

    onSetScheme() {
        this.manageRequests = false;
        this.setScheme = true;
        this.newSession = false;
        this.showPlayers = false;
        this.setCard = false;
        this.showSessions = false;
    }

    onNewSession() {
        this.manageRequests = false;
        this.setScheme = false;
        this.newSession = true;
        this.showPlayers = false;
        this.setCard = false;
        this.showSessions = false;
    }

    onShowPlayers() {
        this.manageRequests = false;
        this.setScheme = false;
        this.newSession = false;
        this.showPlayers = true;
        this.setCard = false;
        this.showSessions = false;
    }

    onSetCard() {
        this.manageRequests = false;
        this.setScheme = false;
        this.newSession = false;
        this.showPlayers = false;
        this.setCard = true;
        this.showSessions = false;
    }

    onShowSessions() {
        this.manageRequests = false;
        this.setScheme = false;
        this.newSession = false;
        this.showPlayers = false;
        this.setCard = false;
        this.showSessions = true;
    }
}