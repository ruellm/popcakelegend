/**
  *  unlockWndw.js
  *  Unlock Level window
  *  Author: Ruell Magpayo <ruellm@yahoo.com>
  *  Created: Dec 06, 2014
  * 
*/

function UnlockWindow()
{    
    this.id = -1;
    this.fnUnlock = null;
}

UnlockWindow.prototype = new SlideWindow;

UnlockWindow.prototype.Close = function ()
{
    var context = this;
    this.targetY = DEFAULT_WINDOW_HEIGHT;
    this.state = SLIDE_WINDOW_STATE_OUT;
    this.fnAnimDone = function () {
        if (context.fnClose) {
            context.fnClose();
        }
    };
}

UnlockWindow.prototype.Load = function ()
{
    var context = this;
    this.observer = new Array();
    this.observer_origY = new Array();

    this._uimanager = new UIManager();

    this.image = new ImageObject();
    this.image.Load("images/unlock/unlock-screen.png");

    this._X = (DEFAULT_WINDOW_WIDTH / 2) - (this.image._image.width / 2);
    this.targetY = (DEFAULT_WINDOW_HEIGHT / 2) - (this.image._image.height / 2)-25;
    this._Y = this.targetY;

    var close = new Button;
    close.LoadImages(
         "images/pop_ups/close-button.png",
        "images/pop_ups/close-hover-button.png",
	    "images/pop_ups/close-button.png");

    close._Y = 250;
    close._width = 41;
    close._height = 39;
    close._X = (DEFAULT_WINDOW_WIDTH / 2) + 125;
    close._fnMouseDownEvnt = (function () {
        context.Close();
    });

    var close_offset = close._Y - this._Y;
    this._uimanager.Add(close);
    this.observer.push(close);
    this.observer_origY.push(close_offset);

    this.heading = new ImageObject();
    this.heading.Load("images/unlock/unlock-heading.png");

    var gap = 66 * 2;
    var x = (DEFAULT_WINDOW_WIDTH / 2) - (gap/2);
    var y = 160;

    var unlock = new Button;
    unlock.LoadImages(
         "images/customization/yes-button.png",
        "images/customization/yes-button-hover.png",
	    "images/customization/yes-button.png");

    unlock._Y = this._Y+y;
    unlock._width = 47;
    unlock._height = 47;
    unlock._X = x;
    unlock._fnMouseDownEvnt = (function () {
        context.Close();
        if (context.fnUnlock) {
            context.fnUnlock();
        }
    });

    var offset = unlock._Y - this._Y;
    this._uimanager.Add(unlock);
    this.observer.push(unlock);
    this.observer_origY.push(offset);

    var cancel = new Button;
    cancel.LoadImages(
        "images/customization/no-button.png",
        "images/customization/no-button-hover.png",
	    "images/customization/no-button.png");

    cancel._Y = this._Y + y;
    cancel._width = 47;
    cancel._height = 47;
    cancel._X = x + 66 + (25/2);
    cancel._fnMouseDownEvnt = (function () {
        context.Close();
    });
    
    var offset = cancel._Y - this._Y;
    this._uimanager.Add(cancel);
    this.observer.push(cancel);
    this.observer_origY.push(offset);

    this.state = -1;
}

UnlockWindow.prototype.Update = function (elapsed)
{
    this.UpdateBase(elapsed);
    this._uimanager.Update(elapsed);
}

UnlockWindow.prototype.Draw = function (gfx)
{
    gfx.FillRect(0, 0, DEFAULT_WINDOW_WIDTH, DEFAULT_WINDOW_HEIGHT,
       "rgb(0,0,0)", 0.4);

    this.image.Draw(gfx, this._X, this._Y);
    this._uimanager.Draw(gfx);

    this.heading.Draw(gfx,
        (DEFAULT_WINDOW_WIDTH / 2) - (this.heading._image.width / 2),
        this._Y + 30);

    
    if (this.state != 0) return;

   // var message = ["You may only unlock ","the next level: " + (this.id + 1)/*"for " + UNLOCK_LEVEL_PRICE + " Chococoins?"*/];
    var message = ["Unlock level " + (this.id + 1), "for " + UNLOCK_LEVEL_PRICE + " Chococoins?"];
    var ctx = gfx._canvasBufferContext;
    style = "18pt DJBCHALKITUP";
    ctx.font = style;

    var y = this._Y + 106;
    for (var i = 0; i < message.length; i++) { 
        var text = message[i]

        // Render Text header
        var textWidth = ctx.measureText(text);
        gfx.DrawText(text,
           (DEFAULT_WINDOW_WIDTH / 2) - (textWidth.width / 2),
           y,
           "rgb(255,255,255)",
           style);

        y += 28;
    }
}

UnlockWindow.prototype.Show = function () {
    this._X = (DEFAULT_WINDOW_WIDTH / 2) - (this.image._image.width / 2);
    this._Y = 200;//-this.image._image.height;
    this.state = SLIDE_WINDOW_STATE_IN;

    this.UpdateOffsets();
}


UnlockWindow.prototype.EventHandler = function (e) {
    this.EventHandlerBase(e);
}
