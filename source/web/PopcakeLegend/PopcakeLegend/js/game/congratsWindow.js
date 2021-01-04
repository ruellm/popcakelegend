/*
    *  congratsWindow.js
    *  The window that appears after completing the TOP level
    *  Author: Ruell Magpayo <ruellm@yahoo.com>
    *  Created: May 30, 2015
    * 
*/

var CONGRATS_STATE_SHOWTEXT = 10;
var CONGRATS_STATE_SHOWDONE = 11;

function CongratsWindow() {
    
}

CongratsWindow.prototype = new SlideWindow;

CongratsWindow.prototype.Load = function () {
	
	  this._uimanager = new UIManager();

    this.image = new ImageObject();
   // this.image.Load("images/pop_ups/Popup-window.png");
    this.image.Load("images/pop_ups/Popup-window.png");
   

    this.observer = new Array();
    this.observer_origY = new Array();
    this._X = (DEFAULT_WINDOW_WIDTH / 2) - (this.image._image.width / 2);
    this.targetY = (DEFAULT_WINDOW_HEIGHT / 2) - (this.image._image.height / 2) /*- 100*/;
    this._Y = this.targetY;

    var context = this;
    var close = new Button;
    close.LoadImages(
         "images/pop_ups/close-button.png",
        "images/pop_ups/close-hover-button.png",
	    "images/pop_ups/close-button.png");

    close._Y = 250;
    close._width = 41;
    close._height = 39;
    close._X = 769;
    close._Y = 200;
    close._fnMouseDownEvnt = (function () {
        context.targetY = DEFAULT_WINDOW_HEIGHT;
        context.state = SLIDE_WINDOW_STATE_OUT;
        /*context.targetY = 0;
          context.state = SLIDE_WINDOW_STATE_OUT;*/

        context.fnAnimDone = function () {
            if (context.fnClose) {
                context.fnClose();
            }
        }
    });

    var close_offset = close._Y - this._Y;
    this._uimanager.Add(close);
    this.observer.push(close);
    this.observer_origY.push(close_offset);

    this.text = new ImageObject();
    this.text.Load("images/congrats/congratulations-heading.png");

    var imageArr = [        
        "images/congrats/elephant.png",
        "images/congrats/professor.png",
        "images/congrats/squrrel.png"];

    this.characters = new Array();
    for (var s = 0; s < imageArr.length;s++){
        var image = new ImageObject();
        image.Load(imageArr[s]);

        this.characters.push(image);
    }

    var textImg = [
        "images/congrats/professor-txt.png",
        "images/congrats/elephant-txt.png",        
        "images/congrats/squrrel-txt.png",
    ];

    this.textBubbles = new Array();
    for (var s = 0; s < textImg.length; s++) {
        var image = new ImageObject();
        image.Load(textImg[s]);

        this.textBubbles.push(image);
    }

    this.displayText = [false, false, false, false];
    this.currentIndex = 0;

}

CongratsWindow.prototype.Update = function (elapsed) {
    this.UpdateBase(elapsed);
    this._uimanager.Update(elapsed);

    if (this.state == 0) {
        //animation is done
        this.timeStart = new Date().getTime();
        this.state = CONGRATS_STATE_SHOWTEXT;
    }

    if (this.state == CONGRATS_STATE_SHOWTEXT) {
        var currTime = new Date().getTime();
        var elapsed = (currTime - this.timeStart) / 1000;
        if (elapsed > 0.6) {
            this.timeStart = currTime;
            if (this.currentIndex < 4)
                this.displayText[this.currentIndex++] = true;
            else {
                this.state = CONGRATS_STATE_SHOWDONE;
            }
        }
    }
}

CongratsWindow.prototype.Show = function () {
    this._X = (DEFAULT_WINDOW_WIDTH / 2) - (this.image._image.width / 2);
    this._Y = 0;
    this.state = SLIDE_WINDOW_STATE_IN;

    this.UpdateOffsets();
}

CongratsWindow.prototype.Draw = function (gfx) {
    gfx.FillRect(0, 0, DEFAULT_WINDOW_WIDTH, DEFAULT_WINDOW_HEIGHT,
          "rgb(0,0,0)", 0.4);

    this.image.Draw(gfx, this._X, this._Y);
    this._uimanager.Draw(gfx);

    this.text.Draw(gfx,
        (DEFAULT_WINDOW_WIDTH / 2) - (this.text._image.width / 2),
        this._Y + 38);

    var basey = this._Y + 341;
    var x = this._X + 30;
    var xOffset =[50, 30, 2,0]; //first index points to second character
    var xOffsetBub = [30, 60, 10, -5];
    var yOffsetBub = [0, 40, 0, 0];

    for (var i = 0; i < this.characters.length; i++) {

        var characterY = basey - this.characters[i]._image.height;
        if (this.displayText[i]) {
            this.textBubbles[i].Draw(gfx, x + xOffsetBub[i],
                characterY - this.textBubbles[i]._image.height + yOffsetBub[i]);
        }

        this.characters[i].Draw(gfx, x, characterY);
        x += (this.characters[i]._image.width + xOffset[i]);
    }
}