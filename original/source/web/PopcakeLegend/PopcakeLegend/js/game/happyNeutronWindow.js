/**
  *  happyNeutronWindow.js
  *  Happy Neutron Ad window
  *  Author: Ruell Magpayo <ruellm@yahoo.com>
  *  Created: May 14, 2016
  * 
*/

function HappyNeutronWindow() {
    //...
    this.state = 0;
    this._X = 0;
    this._Y = 0;
    this.targetY = 0;
    this.image = null;
    this.fnClose = null;

}

HappyNeutronWindow.prototype = new SlideWindow;

HappyNeutronWindow.prototype.Load = function () {
    this._uimanager = new UIManager();

    this.image = new ImageObject();
    this.image.Load("images/pop_ups/happy_neutron/happy_neuron.png");

    this.backImage = new AnimatedObject();

    this.observer = new Array();
    this.observer_origY = new Array();
    this._X = (DEFAULT_WINDOW_WIDTH / 2) - (this.image._image.width / 2);
    this.targetY = (DEFAULT_WINDOW_HEIGHT / 2) - (this.image._image.height / 2) - 10;
    this._Y = this.targetY;

   /* var context = this;
    var close = new Button;
    close.LoadImages(
         "images/pop_ups/close-button.png",
        "images/pop_ups/close-hover-button.png",
	    "images/pop_ups/close-button.png");

    close._Y = 250;
    close._width = 41;
    close._height = 39;
    close._X = 760;;
    close._Y = 190;
    close._fnMouseDownEvnt = (function () {
        context.CloseMe();
    });

    var close_offset = close._Y - this._Y;
    this._uimanager.Add(close);
    this.observer.push(close);
    this.observer_origY.push(close_offset);
    */

    var context = this;
    var tick = new Button;
    tick.LoadImages(
        "images/pop_ups/happy_neutron/tick.png",
        "images/pop_ups/happy_neutron/tick_hover.png",
	    "images/pop_ups/happy_neutron/tick.png");

    tick._width = 54;
    tick._height = 51;
    tick._X = 707;;
    tick._Y = 553;
    tick._fnMouseDownEvnt = (function () {
        window.open('http://bit.ly/1TMtCfF', '_blank');
        window.focus();
    });

    var _offset = tick._Y - this._Y;
    this._uimanager.Add(tick);
    this.observer.push(tick);
    this.observer_origY.push(_offset);

    var cross = new Button;
    cross.LoadImages(
        "images/pop_ups/happy_neutron/cross.png",
        "images/pop_ups/happy_neutron/cross_hover.png",
	    "images/pop_ups/happy_neutron/cross.png");

    cross._width = 54;
    cross._height = 51;
    cross._X = tick._X + cross._width + 20;
    cross._Y = 553;
    cross._fnMouseDownEvnt = (function () {
        context.objectiveWindow = 0;
        context.CloseMe();
    });

    var _offset = cross._Y - this._Y;
    this._uimanager.Add(cross);
    this.observer.push(cross);
    this.observer_origY.push(_offset);

    
    this.LoadInternal();
   
}

HappyNeutronWindow.prototype.LoadInternal = function () {
    //...
}

HappyNeutronWindow.prototype.CloseMe = function () {
    this.targetY = DEFAULT_WINDOW_HEIGHT;
    this.state = SLIDE_WINDOW_STATE_OUT;
    this.fnAnimDone = function () {
        if (this.fnClose) {
            this.fnClose();
        }
    }
}

HappyNeutronWindow.prototype.Update = function (elapsed) {

    if (this.objectiveWindow) {
        this.objectiveWindow.Update(elapsed);
        return;
    }

    this.UpdateBase(elapsed);
    this._uimanager.Update(elapsed);

    this.backImage.Update(elapsed);
}

HappyNeutronWindow.prototype.Show = function () {
    this._X = (DEFAULT_WINDOW_WIDTH / 2) - (this.image._image.width / 2);
    this._Y = 0;
    this.state = SLIDE_WINDOW_STATE_IN;

    this.UpdateOffsets();
}

HappyNeutronWindow.prototype.Draw = function (gfx) {
    gfx.FillRect(0, 0, DEFAULT_WINDOW_WIDTH, DEFAULT_WINDOW_HEIGHT,
          "rgb(0,0,0)", 0.4);

    this.image.Draw(gfx, this._X, this._Y);

    this._uimanager.Draw(gfx);
}

HappyNeutronWindow.prototype.EventHandler = function (e) {

    if (this.objectiveWindow) {
        this.objectiveWindow.EventHandler(e);
        return;
    }

    // Pass to base class
    this.EventHandlerBase(e);
    this.EventHandlerBase(e, this._uiManagerLocal);
}

