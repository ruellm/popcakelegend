/**
  *  popupLivesWindow.js
  *  window that pop-ups when 0 hits remaining or clock expired
  *  Author: Ruell Magpayo <ruellm@yahoo.com>
  *  Created: October 19, 2014
  * 
*/
var POPUPLIVES_PURCHASE_LIFE = 100;

function PopUpLivesWindow() {
    this.type = 0; // 0: Hits, 1: life, 2: game over

    this.fnDoNothing = null;
    this.fnInviteConfirm = null;
}

PopUpLivesWindow.prototype = new SlideWindow;


PopUpLivesWindow.prototype.Load = function (type) {
    var context = this;
    this._uimanager = new UIManager();

    this.image = new ImageObject();
    this.image.Load("images/pop_ups/600x500-window-screen.png");

    this.observer = new Array();
    this.observer_origY = new Array();
    this._X = (DEFAULT_WINDOW_WIDTH / 2) - (this.image._image.width / 2);
    this.targetY = (DEFAULT_WINDOW_HEIGHT / 2) - (this.image._image.height / 2);
    this._Y = this.targetY;

    //this.LoadImage("images/pop_ups/600x500-window-screen.png");
    this.header = new ImageObject()
    this.header.Load("images/pop_ups/run-out-of-lives.png");

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
            if (context.fnDoNothing) {
                context.fnDoNothing();
            }
        }
    });

    var offset = close._Y - this._Y;
    this.observer.push(close);
    this.observer_origY.push(offset);

    var startY = 310;
    var invite = new Button;
    invite.LoadImages(
         "images/pop_ups/invite-friend-button.png",
        "images/pop_ups/invite-friend-hover-button.png",
	    "images/pop_ups/invite-friend-button.png");

    invite._Y = startY;
    invite._width = 200;
    invite._height = 54;
    invite._X = (DEFAULT_WINDOW_WIDTH / 2) - (200 / 2);
    invite._fnMouseDownEvnt = (function () {
        FBAccess_InviteFriend(context.TriggerConfirm);
    });

    var offset = invite._Y - this._Y;
    this.observer.push(invite);
    this.observer_origY.push(offset);

    // startY += 80;

    startY += 90;

    var purchase = new Button;
    purchase.LoadImages(
        "images/pop_ups/purchase-life-button.png",
        "images/pop_ups/purchase-life-hover-button.png",
	    "images/pop_ups/purchase-life-button.png");

    purchase._Y = startY;
    purchase._width = 200;
    purchase._height = 54;
    purchase._X = (DEFAULT_WINDOW_WIDTH / 2) - (200 / 2);
    purchase._fnMouseDownEvnt = (function () {

        context.targetY = DEFAULT_WINDOW_HEIGHT;
        context.state = SLIDE_WINDOW_STATE_OUT;
        context.fnAnimDone = function () {
            context.state = POPUPLIVES_PURCHASE_LIFE; //popup purchase window
            context.purchase = new PurchaseLifeWindow();
            context.purchase.fnClose = function () {
                context.Show();
                context.fnAnimDone = null;
            };
            context.purchase.Load();
            context.purchase.Show();
        }
    });

    var offset = purchase._Y - this._Y;
    this.observer.push(purchase);
    this.observer_origY.push(offset);

    startY += 80;

    /*  var nothing = new Button;
      nothing.LoadImages(
           "images/pop_ups/do-nothing-button.png",
          "images/pop_ups/do-nothing-hover-button.png",
           "images/pop_ups/do-nothing-button.png");
  
      nothing._Y = startY;
      nothing._width = 200;
      nothing._height = 54;
      nothing._X = (DEFAULT_WINDOW_WIDTH / 2) - (200 / 2);
      nothing._fnMouseDownEvnt = (function () {
          if (context.fnDoNothing) {
              context.fnDoNothing();
          }
      });
      */
    this._uimanager.Add(close);
    this._uimanager.Add(invite);
    this._uimanager.Add(purchase);
    //this._uimanager.Add(nothing);
}

PopUpLivesWindow.prototype.Show = function () {
    this._X = (DEFAULT_WINDOW_WIDTH / 2) - (this.image._image.width / 2);
    this._Y = 0;
    this.state = SLIDE_WINDOW_STATE_IN;
    this.targetY = (DEFAULT_WINDOW_HEIGHT / 2) - (this.image._image.height / 2);
    this.UpdateOffsets();
}
PopUpLivesWindow.prototype.TriggerConfirm = function () {
    if (this.fnInviteConfirm()) {
        this.fnInviteConfirm();
    }
}

PopUpLivesWindow.prototype.Update = function (elapsed) {
    this.UpdateBase(elapsed);
    this._uimanager.Update(elapsed);
    if (this.state == POPUPLIVES_PURCHASE_LIFE) {
        this.purchase.Update(elapsed);
    }
}

PopUpLivesWindow.prototype.Draw = function (gfx) {

    //this.DrawBase(gfx);
    //if (this.state != 0) return;
    gfx.FillRect(0, 0, DEFAULT_WINDOW_WIDTH, DEFAULT_WINDOW_HEIGHT,
          "rgb(0,0,0)", 0.4);

    this.image.Draw(gfx, this._X, this._Y);

    this._uimanager.Draw(gfx);

    this.header.Draw(gfx, (DEFAULT_WINDOW_WIDTH / 2) - (this.header._image.width / 2),
        this._Y + 80);

    if (this.state == POPUPLIVES_PURCHASE_LIFE) {
        this.purchase.Draw(gfx);
        //    return;
    }

}

PopUpLivesWindow.prototype.EventHandler = function (e) {
    if (this.state == POPUPLIVES_PURCHASE_LIFE) {
        this.purchase.EventHandler(e);
        return;
    }
    this.EventHandlerBase(e);
}