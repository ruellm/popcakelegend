/**
  *  addx.js
  *  addx advertise window
  *  Author: Ruell Magpayo <ruellm@yahoo.com>
  *  Created: Nov 03, 2016
  * 
*/


function ADDXWindow() {
    //...
    this.state = 0;
    this._X = 0;
    this._Y = 0;
    this.targetY = 0;
    this.image = null;
    this.fnClose = null;

    this.substate = 0;

}

ADDXWindow.prototype = new SlideWindow;

ADDXWindow.prototype.Load = function () {
    this._uimanager = new UIManager();

    this.image = new ImageObject();
    this.image.Load("images/addx/slicing 2 bg.png");

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
        "images/addx/play button.png",
        "images/addx/play button hover.png",
	    "images/addx/play button.png");

    go._Y = 430;
    go._width = 182;
    go._height = 60;
    go._X =this._X + 70;
    go._fnMouseDownEvnt = (function () {
        top.location = "http://bit.ly/PBMMtoADDX";
    });

    var _offset = go._Y - this._Y;
    this._uimanager.Add(go);
    this.observer.push(go);
    this.observer_origY.push(_offset);

    var no = new Button;
    no.LoadImages(
         "images/addx/maybe later button.png",
          "images/addx/maybe later button hover.png",
          "images/addx/maybe later button.png"
        );

    no._Y = go._Y + go._height + 10;
    no._width = 182;
    no._height = 60;
    no._X = this._X + 70;
    no._fnMouseDownEvnt = (function () {
        context.CloseMe();
    });

    var _offset = no._Y - this._Y;
    this._uimanager.Add(no);
    this.observer.push(no);
    this.observer_origY.push(_offset);


}

ADDXWindow.prototype.LoadInternal = function () {
    //...
}
ADDXWindow.prototype.CloseMe = function () {
    this.targetY = DEFAULT_WINDOW_HEIGHT;
    this.state = SLIDE_WINDOW_STATE_OUT;
    this.fnAnimDone = function () {
        if (this.fnClose) {
            this.fnClose();
        }
    }
}

ADDXWindow.prototype.Update = function (elapsed) {
    this.UpdateBase(elapsed);
    this._uimanager.Update(elapsed);
}

ADDXWindow.prototype.Show = function () {
    this._X = (DEFAULT_WINDOW_WIDTH / 2) - (this.image._image.width / 2);
    this._Y = 0;
    this.state = SLIDE_WINDOW_STATE_IN;

    this.UpdateOffsets();
}

ADDXWindow.prototype.Draw = function (gfx) {
    gfx.FillRect(0, 0, DEFAULT_WINDOW_WIDTH, DEFAULT_WINDOW_HEIGHT,
          "rgb(0,0,0)", 0.4);

    this.image.Draw(gfx, this._X, this._Y);

    this._uimanager.Draw(gfx);
}

ADDXWindow.prototype.EventHandler = function (e) {

    // Pass to base class
    this.EventHandlerBase(e);
}


