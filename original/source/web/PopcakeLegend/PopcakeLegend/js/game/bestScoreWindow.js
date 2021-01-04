/**
  *  bestScoreWindow.js
  *  Best score window before video ads
  *  Author: Ruell Magpayo <ruellm@yahoo.com>
  *  Created: January 08, 2016
  * 
*/

function BestScoreWindow() {
    //...
    this.state = 0;
    this._X = 0;
    this._Y = 0;
    this.targetY = 0;
    this.image = null;
    this.fnClose = null;
    this.message = null;

    //0: Best Score
    //1: no more chococoins
    //2: no more life
    this.type = 0;

    this.substate = 0;

}

BestScoreWindow.prototype = new SlideWindow;

BestScoreWindow.prototype.Load = function () {
    this._uimanager = new UIManager();

    this.image = new ImageObject();
    this.image.Load("images/pop_ups/BOARD.png");

    this.backImage = new AnimatedObject();

    switch (g_gameData.theme) {
        case THEME_TYPE_DEFAULT:
            this.backImage.Load("images/themes/default/baker-on-top-3FPS.png");
            this.backImage.Set(4, 3.0, true);
            this.backImage._frameWidth = 882 / 4;
            break;
        case THEME_TYPE_SAMPLE:
            this.backImage.Load("images/themes/sample/Elephant-on-top-5FPS.png");
            this.backImage.Set(6, 5.0, true);
            this.backImage._frameWidth = 2238 / 6;

            break;
    }

    this.observer = new Array();
    this.observer_origY = new Array();
    this._X = (DEFAULT_WINDOW_WIDTH / 2) - (this.image._image.width / 2);
    this.targetY = (DEFAULT_WINDOW_HEIGHT / 2) - (this.image._image.height / 2) - 10;
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
    close._X = 760;;
    close._Y = 190;
    close._fnMouseDownEvnt = (function () {
        context.CloseMe();
    });

    var close_offset = close._Y - this._Y;
    this._uimanager.Add(close);
    this.observer.push(close);
    this.observer_origY.push(close_offset);

    this.LoadInternal();

    var header = ["images/pop_ups/daily_bunos/HEADING.png"];
    this.header = new ImageObject();
    this.header.Load(header[this.type]);

    var yesbutn = new Button;
    yesbutn.LoadImages(
           "images/pop_ups/daily_bunos/tick mark.png",
           "images/pop_ups/daily_bunos/tick mark hover.png",
           "images/pop_ups/daily_bunos/tick mark.png");

    yesbutn._Y = 434;
    yesbutn._width = 74;
    yesbutn._height = 74;
    yesbutn._X = (DEFAULT_WINDOW_WIDTH / 2) - (yesbutn._width / 2);
    yesbutn._fnMouseDownEvnt = (function () {

        if (AFFIZ_ADS_LOADED) {
            AFFIZVIDEO.show();
            ToggleSounds(false);
        } else {

           /* if(context.type == 0 || context.type == 1){
                var message = ["SURPRISE! YOU GET " + VIDEO_CHOCOCOINS + " FREE",
                    "CHOCOCOINS WITHOUT AD!"];
				Debit_Coins(VIDEO_CHOCOCOINS);
            }else{
                var message = ["SURPRISE! YOU GET " + VIDEO_LIFE + " FREE",
                    "LIFE WITHOUT AD!"];
				Update_Life(VIDEO_LIFE);
			}
			
	        context.MessageBox(message);
            */
            // May 14, 2016 - Happy Neutron Integration
            // If video Ad is NOT available (due to poor fill-in rate ), then HAPPY NEURON screen appears
            context.objectiveWindow = new HappyNeutronWindow();
            context.objectiveWindow.Load();
            context.objectiveWindow.Show();

            context.objectiveWindow.fnClose = function () {
                bestwindow_context.objectiveWindow = 0;
                bestwindow_context.CloseMe();
            };

            AFFIZ_InitAds();
        }
    });

    var _offset = yesbutn._Y - this._Y;
    this._uimanager.Add(yesbutn);
    this.observer.push(yesbutn);
    this.observer_origY.push(_offset);

 /*   var nobtn = new Button;
    nobtn.LoadImages(
        "images/pop_ups/daily_bunos/RED BUTTON.png",
        "images/pop_ups/daily_bunos/RED BUTTON HOVER.png",
        "images/pop_ups/daily_bunos/RED BUTTON.png");

    nobtn._Y = yesbutn._Y + yesbutn._height + 20;
    nobtn._width = 287;
    nobtn._height = 45;
    nobtn._X = (DEFAULT_WINDOW_WIDTH / 2) - (nobtn._width / 2);
    nobtn._fnMouseDownEvnt = (function () {
        context.CloseMe();
    });

    var _offset = nobtn._Y - this._Y;
    this._uimanager.Add(nobtn);
    this.observer.push(nobtn);
    this.observer_origY.push(_offset);
    */
    GLOBAL_CURRENT_WINDOW = this;

    this.objectiveWindow = null;
    // this.objectiveWindow.Show();
    bestwindow_context = this;
}

BestScoreWindow.prototype.LoadInternal = function () {
    //...
}

var bestwindow_context = null;
BestScoreWindow.prototype.ShowAward = function ()
{
    this.objectiveWindow = new DailyBunosWindow;
    	
	if (bestwindow_context.type == 0 || bestwindow_context.type == 1) {
        Debit_Coins(VIDEO_CHOCOCOINS);
    }else{
		Update_Life(VIDEO_LIFE);
	}
	
    this.objectiveWindow.chococoins = (VIDEO_CHOCOCOINS);	
	this.objectiveWindow.Load();
    this.objectiveWindow.Show();
    
    this.objectiveWindow.fnClose = function () {
        //bestwindow_context.state = 0;
        bestwindow_context.objectiveWindow = 0;
        bestwindow_context.CloseMe();
    };
}

BestScoreWindow.prototype.MessageBox = function (message)
{
    this.objectiveWindow = new ObjectiveWindow;
    this.objectiveWindow.Load();
    this.objectiveWindow.Show();
    this.objectiveWindow.msg = message;

    var context = this;
    this.objectiveWindow.fnClose = function () {
        //...
        context.objectiveWindow = null;
        context.CloseMe();
    };
}

BestScoreWindow.prototype.CloseMe = function ()
{
    this.targetY = DEFAULT_WINDOW_HEIGHT;
    this.state = SLIDE_WINDOW_STATE_OUT;
    this.fnAnimDone = function () {
        if (this.fnClose) {
            this.fnClose();
        }
    }
}

BestScoreWindow.prototype.Update = function (elapsed) {

    if (this.objectiveWindow) {
        this.objectiveWindow.Update(elapsed);
        return;
    }

    this.UpdateBase(elapsed);
    this._uimanager.Update(elapsed);

    this.backImage.Update(elapsed);
}

BestScoreWindow.prototype.Show = function () {
    this._X = (DEFAULT_WINDOW_WIDTH / 2) - (this.image._image.width / 2);
    this._Y = 0;
    this.state = SLIDE_WINDOW_STATE_IN;

    this.UpdateOffsets();
}

BestScoreWindow.prototype.Draw = function (gfx) {
    gfx.FillRect(0, 0, DEFAULT_WINDOW_WIDTH, DEFAULT_WINDOW_HEIGHT,
          "rgb(0,0,0)", 0.4);

    this.backImage._X = this._X + (this.image._image.width / 2) - (this.backImage._frameWidth / 2) + 30;
    this.backImage._Y = this._Y - this.backImage._image.height;
    this.backImage.Draw(gfx);

    this.image.Draw(gfx, this._X, this._Y);

    this._uimanager.Draw(gfx);

    this.header.Draw(gfx, (DEFAULT_WINDOW_WIDTH / 2) - (this.header._image.width / 2),
        this._Y + 45);

 /*   var buttonText = ["YES, I LOVE CHOCOCOINS",
            "YES, I LOVE CHOCOCOINS",
            "YES, I LOVE LIFE"];

    var text = buttonText[this.type];

    var ctx = gfx._canvasBufferContext;
    var style = "14pt Androgyne_TB";
    ctx.font = style;

    var textWidth = ctx.measureText(text);
    gfx.DrawText(text,
       (DEFAULT_WINDOW_WIDTH / 2) - (textWidth.width / 2), this._Y +255,
       "rgb(255,255,255)",
       style);

    text = "NO, I HATE VIDEO";
    var ctx = gfx._canvasBufferContext;
    var style = "14pt Androgyne_TB";
    ctx.font = style;

    var textWidth = ctx.measureText(text);
    gfx.DrawText(text,
       (DEFAULT_WINDOW_WIDTH / 2) - (textWidth.width / 2), this._Y + 255+45+20,
       "rgb(255,255,255)",
       style);
*/
    text = "WATCH 1 VIDEO";
    var ctx = gfx._canvasBufferContext;
    var style = "20pt Androgyne_TB";
    ctx.font = style;

    var textWidth = ctx.measureText(text);
    gfx.DrawText(text,
       (DEFAULT_WINDOW_WIDTH / 2) - (textWidth.width / 2), this._Y + 146,
       "rgb(255,255,255)",
       style);

    text = "TO GET " + VIDEO_CHOCOCOINS + " CHOCOCOINS";
    if (this.type == 2) {
        text = "TO GET " + VIDEO_LIFE + " LIFE";
    }

    var textWidth = ctx.measureText(text);
    gfx.DrawText(text,
       (DEFAULT_WINDOW_WIDTH / 2) - (textWidth.width / 2), this._Y + 183,
       "rgb(255,255,255)",
       style);

    if (this.objectiveWindow) {
        this.objectiveWindow.Draw(gfx);
        return;
    }
}

BestScoreWindow.prototype.EventHandler = function (e) {

    if (this.objectiveWindow) {
        this.objectiveWindow.EventHandler(e);
        return;
    }

    // Pass to base class
    this.EventHandlerBase(e);
    this.EventHandlerBase(e, this._uiManagerLocal);
}

