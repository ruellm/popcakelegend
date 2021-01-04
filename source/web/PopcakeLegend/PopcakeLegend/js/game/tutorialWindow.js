/**
  *  tutorialWindow.js
  *  Tutorial Window for early/tutorial levels
  *  Author: Ruell Magpayo <ruellm@yahoo.com>
  *  Created: Oct 18, 2015
*/

var TUTORIAL_STATE_SHOWTEXT = 10;
var TUTORIAL_STATE_SHOWDONE = 11;

function TutorialWindow() {
    //...
    this.state = 0;
    this._X = 0;
    this._Y = 0;
    this.targetY = 0;
    this.image = null;
    this.fnClose = null;
    this.fnPlay = null;
}

TutorialWindow.prototype = new SlideWindow;

TutorialWindow.prototype.Close = function () {
    var context = this;
    this.targetY = DEFAULT_WINDOW_HEIGHT;
    this.state = SLIDE_WINDOW_STATE_OUT;
    this.fnAnimDone = function () {
        if (context.fnClose) {
            context.fnClose();
        }
    };
}

TutorialWindow.prototype.Load = function () {
    var context = this;
    this.observer = new Array();
    this.observer_origY = new Array();

    this._uimanager = new UIManager();

    this.image = new ImageObject();
    this.image.Load("images/pop_ups/Board-background501x624.png");

    this._X = (DEFAULT_WINDOW_WIDTH / 2) - (this.image._image.width / 2);
    this.targetY = (DEFAULT_WINDOW_HEIGHT / 2) - (this.image._image.height / 2);
    this._Y = this.targetY;

    var close = new Button;
    close.LoadImages(
         "images/pop_ups/close-button.png",
        "images/pop_ups/close-hover-button.png",
	    "images/pop_ups/close-button.png");

    close._Y = 80;
    close._width = 41;
    close._height = 39;
    close._X = (DEFAULT_WINDOW_WIDTH / 2) + 220;
    close._fnMouseDownEvnt = (function () {
        context.Close();
    });

    var close_offset = close._Y - this._Y;
    this._uimanager.Add(close);
    this.observer.push(close);
    this.observer_origY.push(close_offset);

    //this.professor = new ImageObject();
    // this.professor.Load("images/mailing_list/professor.png");

    this.header = new ImageObject();
    this.header.Load("images/tutorial/how-to-play-title.png");

    this.mascot = new ImageObject();
    this.mascot.Load("images/tutorial/mascot.png");

    this.displayText = [false, false, false, false, false];
    //this.displayText = [true, true, true, true, true];
    this.currentIndex = 0;
    this.zone = new Array();
    this.xarr = null;
    this.yarr = null;
    this.LoadInternal();

}

TutorialWindow.prototype.LoadInternal = function ()
{
    // Template pattern
}

TutorialWindow.prototype.Update = function (elapsed) {
    this.UpdateBase(elapsed);
    this._uimanager.Update(elapsed);

    if (this.state == 0) {
        //animation is done
        this.timeStart = new Date().getTime();
        this.state = TUTORIAL_STATE_SHOWTEXT;
    }

    if (this.state == TUTORIAL_STATE_SHOWTEXT) {
        var currTime = new Date().getTime();
        var elapsed = (currTime - this.timeStart) / 1000;
        if (elapsed > 1.2) {
            this.timeStart = currTime;
            if (this.currentIndex < 5)
                this.displayText[this.currentIndex++] = true;
            else {
                this.state = TUTORIAL_STATE_SHOWDONE;
            }
        }
    }
}

TutorialWindow.prototype.Draw = function (gfx) {
    gfx.FillRect(0, 0, DEFAULT_WINDOW_WIDTH, DEFAULT_WINDOW_HEIGHT,
       "rgb(0,0,0)", 0.4);

    this.mascot.Draw(gfx, this._X - this.mascot._image.width, this._Y);
    this.image.Draw(gfx, this._X, this._Y);
    this._uimanager.Draw(gfx);

    this.header.Draw(gfx, (DEFAULT_WINDOW_WIDTH / 2) - (this.header._image.width / 2), this._Y + 28);
   // if (this.state != 0) return;

    var x = this.xarr;
    var y = this.yarr;
    for (var zen = 0; zen < this.zone.length; zen++) {
        if (this.displayText[zen]) {
            this.zone[zen].Draw(gfx, this._X + x[zen], this._Y + y[zen]);
        }

    }
}

TutorialWindow.prototype.Show = function () {
    this._X = (DEFAULT_WINDOW_WIDTH / 2) - (this.image._image.width / 2);
    this._Y = 200;//-this.image._image.height;
    this.state = SLIDE_WINDOW_STATE_IN;

    this.UpdateOffsets();
}


TutorialWindow.prototype.EventHandler = function (e) {
    this.EventHandlerBase(e);
}

//
// SOLO
//
function Tutorial_SOLO_Window() {
    //...
}

Tutorial_SOLO_Window.prototype = new TutorialWindow;

Tutorial_SOLO_Window.prototype.LoadInternal = function () {
    //...
    var context = this;
    var play = new Button;
    play.LoadImages(
        "images/tutorial/solo/solo-play-now-button.png",
        "images/tutorial/solo/solo-play-now-button-hover.png",
	    "images/tutorial/solo/solo-play-now-button.png");

    play._Y = 490;
    play._width = 172;
    play._height = 200;
    play._X = (DEFAULT_WINDOW_WIDTH / 2) - (play._width/2);
    play._fnMouseDownEvnt = (function () {
        if (context.fnPlay) {
            context.fnPlay();
        }
    });

    var _offset = play._Y - this._Y;
    this._uimanager.Add(play);
    this.observer.push(play);
    this.observer_origY.push(_offset);

    var zone_array = [
        "images/tutorial/solo/solo-zone-1.png",
        "images/tutorial/solo/solo-zone-2.png",
        "images/tutorial/solo/solo-zone-3.png",
        "images/tutorial/solo/solo-zone-4.png",
        "images/tutorial/solo/solo-zone-5.png"];

    for (var s = 0; s < zone_array.length; s++) {
        var image = new ImageObject();
        image.Load(zone_array[s]);

        this.zone.push(image);
    }

    this.xarr = [32, 32, 210, 250, 275];
    this.yarr = [290, 109, 75, 192, 381];
}

//
// DUO
//
function Tutorial_DUO_Window() {
    //...
}

Tutorial_DUO_Window.prototype = new TutorialWindow;

Tutorial_DUO_Window.prototype.LoadInternal = function () {
    //...
    var context = this;
    var play = new Button;
    play.LoadImages(
        "images/tutorial/duo/duo-play-now-button.png",
        "images/tutorial/duo/duo-play-now-button-hover.png",
        "images/tutorial/duo/duo-play-now-button.png");

    play._Y = 490;
    play._width = 172;
    play._height = 200;
    play._X = (DEFAULT_WINDOW_WIDTH / 2) - (play._width / 2);
    play._fnMouseDownEvnt = (function () {
        if (context.fnPlay) {
            context.fnPlay();
        }
    });

    var _offset = play._Y - this._Y;
    this._uimanager.Add(play);
    this.observer.push(play);
    this.observer_origY.push(_offset);

    var zone_array = [
        "images/tutorial/duo/duo-zone-1.png",
        "images/tutorial/duo/duo-zone-2.png",
        "images/tutorial/duo/duo-zone-3.png",
        "images/tutorial/duo/duo-zone-4.png",
        "images/tutorial/duo/duo-zone-5.png",
        ];

    for (var s = 0; s < zone_array.length; s++) {
        var image = new ImageObject();
        image.Load(zone_array[s]);

        this.zone.push(image);
    }

    this.xarr = [22, 32, 130, 238, 285];
    this.yarr = [325, 189, 70, 162, 290];
}
