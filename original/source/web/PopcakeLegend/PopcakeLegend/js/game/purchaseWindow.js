/**
  *  purchaseWindow.js
  *  Base class for purchase window  
  *  Author: Ruell Magpayo <ruellm@yahoo.com>
  *  Created: October 19, 2014
  * 
*/

function PurchaseWindow()
{
    this.fnClose = null;
    this.header = null;
}

PurchaseWindow.prototype = new SlideWindow;

PurchaseWindow.prototype.Load = function () {
    this.LoadBase();
}

PurchaseWindow.prototype.LoadBase = function () {
    var context = this;
    this._uimanager = new UIManager();

    //this.LoadImage("images/pop_ups/600x500-window-screen.png");

    this.image = new ImageObject();
    this.image.Load("images/pop_ups/600x500-window-screen.png");

    this.observer = new Array();
    this.observer_origY = new Array();
    this._X = (DEFAULT_WINDOW_WIDTH / 2) - (this.image._image.width / 2);
    this.targetY = (DEFAULT_WINDOW_HEIGHT / 2) - (this.image._image.height / 2);
    this._Y = this.targetY;


    this.strip = new ImageObject();
    this.strip.Load("images/pop_ups/strip-show.png");

 //   this.bottom = new ImageObject();
  //  this.bottom.Load("images/pop_ups/payments-image.png");


    // Setup Callback

    this.coins = new Array();
    var startY = 260;
    for (var i = 0; i < 3; i++) {
        var image = new ImageObject();
        image.Load("images/pop_ups/" + (i + 1) + ".png");
        this.coins.push(image);

        var buy = new Button;
        buy.LoadImages(
            "images/pop_ups/buy-button.png",
            "images/pop_ups/buy-hover-button.png",
            "images/pop_ups/buy-button.png");

        buy._Y = startY + 34;
        buy._width = 38;
        buy._height = 38;
        buy._X = 715;
        buy.id = i;
        buy._fnMouseDownEvnt = function () {
            context.Buy(this.id);
        };

        this._uimanager.Add(buy);
        startY += 105;

        var offset = buy._Y - this._Y;
        this.observer.push(buy);
        this.observer_origY.push(offset);
    }

    var close = new Button;
    close.LoadImages(
         "images/pop_ups/close-button.png",
        "images/pop_ups/close-hover-button.png",
	    "images/pop_ups/close-button.png");

    close._Y = 145;
    close._width = 41;
    close._height = 39;
    close._X = (DEFAULT_WINDOW_WIDTH / 2) + 258;
    close._fnMouseDownEvnt = (function () {
        
        context.targetY = DEFAULT_WINDOW_HEIGHT;
        context.state = SLIDE_WINDOW_STATE_OUT;
        context.fnAnimDone = function () {
            if (context.fnClose) {
                context.fnClose();
            }
        };
    });

    var offset = close._Y - this._Y;
    this.observer.push(close);
    this.observer_origY.push(offset);

    this._uimanager.Add(close);
}

PurchaseWindow.prototype.Buy = function (index)
{ }

PurchaseWindow.prototype.Show = function () {
    this._X = (DEFAULT_WINDOW_WIDTH / 2) - (this.image._image.width / 2);
    this._Y = 0;
    this.state = SLIDE_WINDOW_STATE_IN;

    this.UpdateOffsets();
}
PurchaseWindow.prototype.Update = function (elapsed) {
    this.UpdateBase(elapsed);
    this._uimanager.Update(elapsed);
}

PurchaseWindow.prototype.DrawCommon = function (gfx)
{  
    gfx.FillRect(0, 0, DEFAULT_WINDOW_WIDTH, DEFAULT_WINDOW_HEIGHT,
       "rgb(0,0,0)", 0.4);

    this.image.Draw(gfx, this._X, this._Y);
 
    var startY = this._Y + 110;
    for (var i = 0; i < 3; i++) {
        this.strip.Draw(gfx, (DEFAULT_WINDOW_WIDTH / 2) - (this.strip._image.width / 2),
            startY);

        this.coins[i].Draw(gfx,(DEFAULT_WINDOW_WIDTH / 2) - (this.coins[i]._image.width / 2)-40,
            startY+20);

        startY += 105;
    }

   // this.bottom.Draw(gfx, (DEFAULT_WINDOW_WIDTH / 2) - (this.bottom._image.width / 2),
    //    startY);

    if (this.header) {
        this.header.Draw(gfx, (DEFAULT_WINDOW_WIDTH / 2) - (this.header._image.width / 2),
              this._Y + 50);
    }

    this._uimanager.Draw(gfx);
}

PurchaseWindow.prototype.Draw = function (gfx) {
    this.DrawCommon(gfx);
}

PurchaseWindow.prototype.EventHandler = function (e) {
    this.EventHandlerBase(e);
}

/**/
/* Purchase Extra Lives window*/
/**/

function PurchaseLifeWindow()
{ }

PurchaseLifeWindow.prototype = new PurchaseWindow;

PurchaseLifeWindow.prototype.Load = function () {
    this.LoadBase();

    this.header = new ImageObject();
    this.header.Load("images/pop_ups/purchase-extra-lives.png");
}

PurchaseLifeWindow.prototype.Buy = function (index)
{
    if (Credit_Coins(gLIFE_PRICES[index].coins)) {
        //g_gameData.life += gLIFE_PRICES[index].life;
        //g_Engine.SetState(GAME_STATE);
        Update_Life(gLIFE_PRICES[index].life);

        // SUper hack solution!
        this.targetY = DEFAULT_WINDOW_HEIGHT;
        this.state = SLIDE_WINDOW_STATE_OUT;
        this.fnAnimDone = function () {
            if (this.fnClose) {
                this.fnClose();
            }
        };
    }
}

PurchaseLifeWindow.prototype.Draw = function (gfx) {

    /*if (this.state != 0) {
        this.DrawBase(gfx);
        return;
    }*/

    this.DrawCommon(gfx);

    if (this.state != 0) return;

    var startY = this._Y + 325-150;
    gfx.DrawText(gLIFE_PRICES[0].life + " LIFE FOR",
          345, startY, "rgb(103,41,20)", "15pt Androgyne_TB");

    gfx.DrawText(gLIFE_PRICES[1].life + " LIVES FOR",
         345, startY + 105, "rgb(103,41,20)", "15pt Androgyne_TB");

    gfx.DrawText(gLIFE_PRICES[2].life + " LIVES FOR",
         345, startY + (105 * 2), "rgb(103,41,20)", "15pt Androgyne_TB");

    startY = this._Y + 325 - 150;
    for (var i = 0; i < 3; i++) {
        gfx.DrawText(gLIFE_PRICES[i].coins + " CHOCOCOINS",
          550, startY, "rgb(103,41,20)", "15pt Androgyne_TB");

        startY += 105;
    }
}

