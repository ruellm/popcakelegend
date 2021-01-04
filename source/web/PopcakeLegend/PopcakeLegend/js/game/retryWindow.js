/**
  *  retryWindow.js
  *  Retry window when target is not reached  
  *  Author: Ruell Magpayo <ruellm@yahoo.com>
  *  Created: October 19, 2014
  * 
*/


function RetryWindow() {
    this.fnRetry = null;
    
    this.message = null;
}

RetryWindow.prototype = new PopUpWindow;


RetryWindow.prototype.Load = function () {
    var context = this;
    this._uimanager = new UIManager();
    //this.Create(500, 300, "rgb(0,0,0)", "rgb(255,255,255)");
    this.LoadImage("images/pop_ups/retry-window-screen.png");

  /*  var button = new RoundButtonText;
    button.Create(140, 50,
        "rgb(241,104,34)",
        "rgb(255,255,255)",
        "rgb(255,255,255)",
        "rgb(255,0,0)",
        "Retry",
        "CurlzMTRegular",
        18);

    button._X = (DEFAULT_WINDOW_WIDTH / 2) - (140 / 2);
    button._Y = 480;

    this._uimanager.Add(button);

    var context = this;
    button._fnMouseDownEvnt = function () {
        if (context.fnRetry) {
            context.fnRetry();
        }
    };*/

    this.failedHeader = new ImageObject()
    this.failedHeader.Load("images/pop_ups/failed-level.png");

    var backtomain = new Button;   
    backtomain.LoadImages(
        "images/pop_ups/retry-button.png",
        "images/pop_ups/retry-hover-button.png",
	    "images/pop_ups/retry-button.png");

    backtomain._Y = 465;
    backtomain._width = 140;
    backtomain._height = 50;
    backtomain._X = (DEFAULT_WINDOW_WIDTH / 2) - (140 / 2);
    backtomain._fnMouseDownEvnt = (function () {
        if (context.fnRetry) {
            context.fnRetry();
        }
    });

    var close = new Button;
    close.LoadImages(
         "images/pop_ups/close-button.png",
        "images/pop_ups/close-hover-button.png",
	    "images/pop_ups/close-button.png");

    close._Y = 250;
    close._width = 41;
    close._height = 39;
    close._X = (DEFAULT_WINDOW_WIDTH / 2) + 180;
    close._fnMouseDownEvnt = (function () {
        if (context.fnClose) {
            context.fnClose();
        }
    });

    this._uimanager.Add(close);
    this._uimanager.Add(backtomain);
}


RetryWindow.prototype.Update = function (elapsed) {
    this.UpdateBase(elapsed);
    this._uimanager.Update(elapsed);
}

RetryWindow.prototype.Draw = function (gfx) {
    this.DrawBase(gfx);
    if (this.state != 0) return;

   /* var style = "40pt CurlzMTRegular";
    var ctx = gfx._canvasBufferContext;
    ctx.font = style;
    var text = "Failed";

    // Render Text header
    var textWidth = ctx.measureText(text);
    gfx.DrawText(text,
         (DEFAULT_WINDOW_WIDTH / 2) - (textWidth.width / 2),
          310,
          "rgb(241,104,34)",
          "Bold " + style);
*/
    

    if (this.message) {
        var y = (DEFAULT_WINDOW_HEIGHT / 2) - ((this.message.length/2)*(34/2));
        for (var i = 0; i < this.message.length; i++) {
            var style = "25pt CurlzMTRegular";
            var ctx = gfx._canvasBufferContext;
            ctx.font = style;
            var text = this.message[i];

            // Render Text header
            var textWidth = ctx.measureText(text);
            gfx.DrawText(text,
                 (DEFAULT_WINDOW_WIDTH / 2) - (textWidth.width / 2),
                  y,
                  "rgb(0,0,0)",
                  "Bold " + style);

            y += 34;
        }
    }
    
    this.failedHeader.Draw(gfx, (DEFAULT_WINDOW_WIDTH / 2) -
        (191 / 2), 280);

    this._uimanager.Draw(gfx);
}

RetryWindow.prototype.EventHandler = function (e) {
    this.EventHandlerBase(e);
}