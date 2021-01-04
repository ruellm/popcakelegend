/**
  *  objectiveWindow.js
  *  Before start of level window
  *  Author: Ruell Magpayo <ruellm@yahoo.com>
  *  Created: November 06, 2014
  * 
*/


function ObjectiveWindow() {
    //...
    this.state = 0;
    this._X = 0;
    this._Y = 0;
    this.targetY = 0;
    this.image = null;
    this.fnClose = null;
    this.message = null;

}

ObjectiveWindow.prototype = new SlideWindow;


ObjectiveWindow.prototype.Load = function () {
    this._uimanager = new UIManager();

    this.image = new ImageObject();
    this.image.Load("images/pop_ups/Popup-window.png");

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
    this.targetY = (DEFAULT_WINDOW_HEIGHT / 2) - (this.image._image.height / 2)-10;
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
    close._X = 770;;
    close._Y = 190;
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

    this.LoadInternal();
}

ObjectiveWindow.prototype.LoadInternal = function ()
{
    //...
}

ObjectiveWindow.prototype.Update = function (elapsed) {
    this.UpdateBase(elapsed);
    this._uimanager.Update(elapsed);

    this.backImage.Update(elapsed);
}

ObjectiveWindow.prototype.Show = function () {
    this._X = (DEFAULT_WINDOW_WIDTH / 2) - (this.image._image.width/2);   
    this._Y = 0;
    this.state = SLIDE_WINDOW_STATE_IN;

    this.UpdateOffsets();
}

ObjectiveWindow.prototype.Draw = function (gfx) {
    gfx.FillRect(0, 0, DEFAULT_WINDOW_WIDTH, DEFAULT_WINDOW_HEIGHT,
          "rgb(0,0,0)", 0.4);

    this.backImage._X = this._X + (this.image._image.width / 2) - (this.backImage._frameWidth / 2) + 30;
    this.backImage._Y = this._Y - this.backImage._image.height;
    this.backImage.Draw(gfx);

    this.image.Draw(gfx, this._X, this._Y);

    this._uimanager.Draw(gfx);

    if(this.state !=0) return;
    if (this.msg != null) {

        style = "22pt DJBCHALKITUP";
        var ygap = 35;
        var centerY = this._Y + 180;
        var y = centerY - ((this.msg.length * ygap) / 2);
                
        for (var i = 0; i < this.msg.length; i++) {
            var ctx = gfx._canvasBufferContext;
            
            ctx.font = style;

            // Render Text header
            text = this.msg[i];
            var textWidth = ctx.measureText(text);
            var x = (DEFAULT_WINDOW_WIDTH / 2);
            
            gfx.DrawText(text,
               x - (textWidth.width / 2), y,
               "rgb(255,255,255)",
               style);

            y += ygap;
        }        
    }
}

/**/
/**/
function DOUWinnerWindow()
{ }


DOUWinnerWindow.prototype = new ObjectiveWindow;

DOUWinnerWindow.prototype.LoadInternal = function ()
{

    switch (g_gameData.theme) {
        case THEME_TYPE_DEFAULT:
            this.p1 = new ImageObject();
            this.p1.Load("images/pop_ups/male-small-image.png");

            this.p2 = new ImageObject();
            this.p2.Load("images/pop_ups/female-small-image.png");
            break;
        case THEME_TYPE_SAMPLE:
            this.p1 = new ImageObject();
            this.p1.Load( "images/themes/sample/small-Elephant-face-For-DUO.png");

            this.p2 = new ImageObject();
            this.p2.Load("images/themes/sample/small-Squrrel-face-For-DUO.png");
            break;
    }

}

/**/
/*Must be common, Due to interest of time this was copied from LevelCompleteWnd*/
DOUWinnerWindow.prototype.DrawValues = function (gfx, x, y, text) {
    var ctx = gfx._canvasBufferContext;
    style = "25pt DJBCHALKITUP";
    ctx.font = style;

    // Render Text header
    var textWidth = ctx.measureText(text);
    gfx.DrawText(text,
       x - (textWidth.width / 2), y,
       "rgb(255,255,255)",
       style);

}


DOUWinnerWindow.prototype.Draw = function (gfx) {
    gfx.FillRect(0, 0, DEFAULT_WINDOW_WIDTH, DEFAULT_WINDOW_HEIGHT,
          "rgb(0,0,0)", 0.4);

    this.backImage._X = this._X + (this.image._image.width / 2) - (this.backImage._frameWidth / 2) + 30;
    this.backImage._Y = this._Y - this.backImage._image.height;
    this.backImage.Draw(gfx);

    this.image.Draw(gfx, this._X, this._Y);
    this._uimanager.Draw(gfx);

    if (this.state != 0) return;

    var baseY = this._Y - 100;
    var baseX = this._X + 30;

    gfx.DrawText("Challenges",
               baseX + 160, baseY + 190,
              "rgb(255,255,255)",
              "Bold 25pt DJBCHALKITUP");

   // gfx.DrawText(" Challenges",
      //         baseX + 138, baseY + 240,
      ////        "rgb(255,255,255)",
            //  "Bold 25pt DJBCHALKITUP");


    this.p1.Draw(gfx, baseX + 49,
        baseY + 278 - 48);

    this.DrawValues(gfx, baseX + 232, baseY + 260, g_DOU_players[0].challengedWon);

    this.p2.Draw(gfx,
        baseX + 49,
        baseY + 323 - 38);

    this.DrawValues(gfx, baseX + 232, baseY + 310, g_DOU_players[1].challengedWon);

    gfx.DrawText("------------------------------------ ",
          baseX + 110, baseY + 340,
         "rgb(255,255,255)",
         "15pt DJBCHALKITUP");

    var win = 1;
    var text = "Player 1 is the winner!";
    if (g_DOU_players[0].challengedWon < g_DOU_players[1].challengedWon) {
        text = "Player 2 is the winner!";
    } else if (g_DOU_players[0].challengedWon == g_DOU_players[1].challengedWon) {
        text = "You are both Champions !";
    }

    if (win < 2) {
        gfx.DrawText(text,
              baseX + 100, baseY + 380,
            "rgb(255,255,255)",
            "18pt DJBCHALKITUP");
    }
}


/**/
/**/
function DailyBunosWindow()
{
    this.chococoins = 0;
}

DailyBunosWindow.prototype = new ObjectiveWindow;

DailyBunosWindow.prototype.LoadInternal = function () {
    this.backgroundImage = new ImageObject();
    this.backgroundImage.Load("images/pop_ups/Board-Background.png");
    this.label = new ImageObject();
    this.label.Load("images/pop_ups/new=best-score-title.png");
}

DailyBunosWindow.prototype.Draw = function (gfx) {
    gfx.FillRect(0, 0, DEFAULT_WINDOW_WIDTH, DEFAULT_WINDOW_HEIGHT,
          "rgb(0,0,0)", 0.4);

    this.backImage._X = this._X + (this.image._image.width / 2) - (this.backImage._frameWidth / 2) + 30;
    this.backImage._Y = this._Y - this.backImage._image.height;
    this.backImage.Draw(gfx);

    this.image.Draw(gfx, this._X, this._Y);
    this._uimanager.Draw(gfx);

    if (this.backgroundImage != null) {
        this.backgroundImage.Draw(gfx, this._X + 22, this._Y + 20);
    }

    this.label.Draw(gfx,
        (DEFAULT_WINDOW_WIDTH / 2) - (this.label._image.width / 2),
        this._Y + 30);

    if (this.state != 0) return;


    var msg = [
            "YOU WIN",
            VIDEO_CHOCOCOINS + " CHOCOCOINS",
            "PLAY MORE, GET MORE!"];
			
    var stylearr = [
            "14pt Androgyne_TB",
            "Bold 22pt Androgyne_TB",
            "12pt Androgyne_TB",
    ];
    var yarr = [135, 180, 223];
    var ctx = gfx._canvasBufferContext;

    for (var i = 0; i < 3; i++) {
        style = stylearr[i];;
        var ygap = 30;
        var centerY = this._Y + 180;
        var y = this._Y + yarr[i];

        ctx.font = style;

        // Render Text header
        text = msg[i];
        var textWidth = ctx.measureText(text);
        var x = (DEFAULT_WINDOW_WIDTH / 2);

        gfx.DrawText(text,
             x - (textWidth.width / 2), y,
             "rgb(255,255,255)",
             style);
    }
}