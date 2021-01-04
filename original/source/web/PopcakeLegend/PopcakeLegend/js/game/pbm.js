/**
  *  pbm.js
  *  PBM advertise window
  *  Author: Ruell Magpayo <ruellm@yahoo.com>
  *  Created: January 30, 2016
  * 
*/

function PBMWindow() {
    //...
    this.state = 0;
    this._X = 0;
    this._Y = 0;
    this.targetY = 0;
    this.image = null;
    this.fnClose = null;

    this.substate = 0;

}

PBMWindow.prototype = new SlideWindow;

PBMWindow.prototype.Load = function () {
    this._uimanager = new UIManager();

    this.image = new ImageObject();
    this.image.Load("images/pbm/PBM-PLAY board.png");

    this.observer = new Array();
    this.observer_origY = new Array();
    this._X = (DEFAULT_WINDOW_WIDTH / 2) - (this.image._image.width / 2);
    this.targetY = (DEFAULT_WINDOW_HEIGHT / 2) - (this.image._image.height / 2) - 5;
    this._Y = this.targetY;

    var context = this;
   /* var close = new Button;
    close.LoadImages(
         "images/pop_ups/close-button.png",
        "images/pop_ups/close-hover-button.png",
	    "images/pop_ups/close-button.png");

    close._Y = 40;
    close._width = 41;
    close._height = 39;
    close._X = 774;;    
    close._fnMouseDownEvnt = (function () {
        context.CloseMe();
    });

    var close_offset = close._Y - this._Y;
    this._uimanager.Add(close);
    this.observer.push(close);
    this.observer_origY.push(close_offset);
    */
    var go = new Button;
    go.LoadImages(
        "images/pbm/green button.png",
        "images/pbm/green button hover.png",
	    "images/pbm/green button.png");

    go._Y = 588;
    go._width = 170;
    go._height = 44;
    go._X = (DEFAULT_WINDOW_WIDTH / 2) - (go._width / 2);
    go._fnMouseDownEvnt = (function () {
        top.location = "http://bit.ly/professorbrainmemory";
    });

    var _offset = go._Y - this._Y;
    this._uimanager.Add(go);
    this.observer.push(go);
    this.observer_origY.push(_offset);

    var no = new Button;
    no.LoadImages(
        "images/pbm/maybe later button.png",
        "images/pbm/maybe later button hover.png",
	    "images/pbm/maybe later button.png");

    no._Y = go._Y + go._height +10;
    no._width = 170;
    no._height = 44;
    no._X = (DEFAULT_WINDOW_WIDTH / 2) - (no._width / 2);
    no._fnMouseDownEvnt = (function () {
        context.CloseMe();
    });

    var _offset = no._Y - this._Y;
    this._uimanager.Add(no);
    this.observer.push(no);
    this.observer_origY.push(_offset);

    this.glow = new GlowImage();
    this.glow.Load("images/pbm/flash button.png", 60);
    //this.glow._width = 261;
    //this.glow._height = 112;

}

PBMWindow.prototype.LoadInternal = function () {
    //...
}
PBMWindow.prototype.CloseMe = function () {
    this.targetY = DEFAULT_WINDOW_HEIGHT;
    this.state = SLIDE_WINDOW_STATE_OUT;
    this.fnAnimDone = function () {
        if (this.fnClose) {
            this.fnClose();
        }
    }
}

PBMWindow.prototype.Update = function (elapsed) {
    this.UpdateBase(elapsed);
    this._uimanager.Update(elapsed);
    this.glow.Update(elapsed);
}

PBMWindow.prototype.Show = function () {
    this._X = (DEFAULT_WINDOW_WIDTH / 2) - (this.image._image.width / 2);
    this._Y = 0;
    this.state = SLIDE_WINDOW_STATE_IN;

    this.UpdateOffsets();
}

PBMWindow.prototype.Draw = function (gfx) {
    gfx.FillRect(0, 0, DEFAULT_WINDOW_WIDTH, DEFAULT_WINDOW_HEIGHT,
          "rgb(0,0,0)", 0.4);

    this.image.Draw(gfx, this._X, this._Y);

    this.glow._X = (DEFAULT_WINDOW_WIDTH / 2) - (261 / 2);;
    this.glow._Y = this._Y + 512;
    this.glow.Draw(gfx);

    this._uimanager.Draw(gfx);
}

PBMWindow.prototype.EventHandler = function (e) {

    // Pass to base class
    this.EventHandlerBase(e);
}

