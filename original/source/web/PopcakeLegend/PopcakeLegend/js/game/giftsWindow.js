/**
  *  giftsWindow.js
  *  Gifts Window Pop-up
  *  Author: Ruell Magpayo <ruellm@yahoo.com>
  *  Created: November 16, 2014
  * 
*/

function GiftsWindow()
{
    //...
    this.fnGiftClicked = null;
}

GiftsWindow.prototype = new SlideWindow;

GiftsWindow.prototype.Close = function ()
{
    this.targetY = DEFAULT_WINDOW_HEIGHT;
    this.state = SLIDE_WINDOW_STATE_OUT;

    this.fnAnimDone = function () {
        if (this.fnClose) {
            this.fnClose();
        }
    }
}

GiftsWindow.prototype.Load = function () {
    var context = this;
    this.observer = new Array();
    this.observer_origY = new Array();
 
    this._uimanager = new UIManager();

    this.image = new ImageObject();
    this.image.Load("images/gifts/window-art.png");

    this._X = (DEFAULT_WINDOW_WIDTH / 2) - (this.image._image.width / 2);
    this.targetY = (DEFAULT_WINDOW_HEIGHT / 2) - (this.image._image.height / 2);
    this._Y = this.targetY;

    var close = new Button;
    close.LoadImages(
         "images/pop_ups/close-button.png",
        "images/pop_ups/close-hover-button.png",
	    "images/pop_ups/close-button.png");

    close._Y = 145;
    close._width = 41;
    close._height = 39;
    close._X = (DEFAULT_WINDOW_WIDTH / 2) + 255;
    close._fnMouseDownEvnt = (function () {
        context.Close();
    });

    var close_offset = close._Y - this._Y;
    this._uimanager.Add(close);
    this.observer.push(close);
    this.observer_origY.push(close_offset);
    
    this.bg = new ImageObject();
    this.bg.Load("images/gifts/free-gifts-screen-background.png");

    this.rectangle = new ImageObject();
    this.rectangle.Load("images/gifts/gift-icons-rectangle-box.png");

    this.heading = new ImageObject();
    this.heading.Load("images/gifts/free-gift-heading.png");

    
    var button = [
        "images/gifts/free-gift-icon-1.png",              
        "images/gifts/free-gift-icon-2.png",                   
        "images/gifts/free-gift-icon-3.png",                   
        "images/gifts/free-gift-icon-4.png",                   
        "images/gifts/free-gift-icon-5.png"          
    ];

    x = this._X + 22 + 40;    
    var count = (g_gameData.gift_array)?g_gameData.gift_array.length:0;
    for (var i = 0; i < count; i++) {
       // var btn = new CustomImageButton;
       // btn.Load(
        //    button[i],
         //   81, 82, "rgb(233,209,156)");

        var btn = new ZoomButton();
        btn.Load(button[i]);
        btn.highlight = false;
        btn.scaledUp = 1.2;

        btn._Y = 380;
        btn._X = x;
        btn._visible = g_gameData.gift_array[i];
        btn.id = i;
        btn._fnMouseDownEvnt = (function () {
            this._visible = false;
            g_gameData.gift_array[this.id] = false;
            Decr_Gift();

            if (context.fnGiftClicked) {
                context.fnGiftClicked();
            }
            
            context.Close();
        });

        var _offset = btn._Y - this._Y;
        this._uimanager.Add(btn);
        this.observer.push(btn);
        this.observer_origY.push(_offset);
        
        x += 95;
    }
}

GiftsWindow.prototype.Show = function () {
    this._X = (DEFAULT_WINDOW_WIDTH / 2) - (this.image._image.width / 2);
    this._Y = -this.image._image.height;
    this.state = SLIDE_WINDOW_STATE_IN;
}

GiftsWindow.prototype.Update = function (elapsed) {
    this.UpdateBase(elapsed);
    this._uimanager.Update(elapsed);
}

GiftsWindow.prototype.Draw = function (gfx) {
    gfx.FillRect(0, 0, DEFAULT_WINDOW_WIDTH, DEFAULT_WINDOW_HEIGHT,
         "rgb(0,0,0)", 0.4);

    this.image.Draw(gfx, this._X, this._Y);

    this.bg.Draw(gfx, this._X+22, this._Y+26);
    this.rectangle.Draw(gfx, (DEFAULT_WINDOW_WIDTH/2)-(525/2),
        (this._Y + 250) - (106 / 2) + 20);

    this.heading.Draw(gfx, (DEFAULT_WINDOW_WIDTH / 2) - (218 / 2),
        this._Y + 46);

    this._uimanager.Draw(gfx);

    if (this.state != 0) return;

    var textarr = ["everytime you invite and", "offer gifts to your friends!",
        "1 gift = 1 life + 10 seconds + 10 hits"];

    style = "Bold 20pt DJBCHALKITUP";
    var cx = (DEFAULT_WINDOW_WIDTH / 2);
    var ctx = gfx._canvasBufferContext;
    ctx.font = style;
    var y = this._Y + 130;
    for (var i = 0; i < textarr.length; i++) {
    
        var text = textarr[i];
        var textWidth = ctx.measureText(text);
        gfx.DrawText(text,
             cx - (textWidth.width / 2), y,
              "rgb(255,255,255)",
              style);
        y += 24;
    }
}

GiftsWindow.prototype.EventHandler = function (e) {
    this.EventHandlerBase(e);
}

