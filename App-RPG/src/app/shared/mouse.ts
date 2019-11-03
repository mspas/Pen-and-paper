export class Mouse {

    _x: number = 0;
    _y: number = 0;
    x: number = 0;
    y: number = 0;

    updatePosition(clientX: number, clientY: number) {
        //var e = event || window.event;
        this.x = clientX - this._x;
        this.y = (clientY - this._y) * -1;
    }
    setOrigin(offsetLeft: number, offsetTop: number, offsetWidth: number, offsetHeight: number) {
        this._x = offsetLeft + Math.floor(offsetWidth / 2);
        this._y = offsetTop + Math.floor(offsetHeight / 2);
    }
    show() {
        return "(" + this.x + ", " + this.y + ")";
    }
}