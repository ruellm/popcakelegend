/**
  *  levelCompleteWnd.js
  *  Window showed every level complete
  *  shows total score achieved
  *  Author: Ruell Magpayo <ruellm@yahoo.com>
  *  Created: October 19, 2014
  * 
*/

function LevelCompleteWnd() {
    this._X = 0;
    this._Y = 0;
    this.targetY = 0;
    this.image = null;

    this.score = 0;
    this.extra_points = 0;
    this.total_score = 0;
    this.stars = 0;
    this.trophy = 0;
    this.time_to_complete = "00:00";
    this.number_of_errors = 0;

    // Use levelID to get record per level
    this.levelID = -1;
    this.fnClose = null;
    this.fnNext = null;

    //type
    this.type = 0; //0: complete, 1: fail

    this.succmsg = ["Congratulations! Continue to next Level"];
	this.msg_style = "11pt Androgyne_TB";

    this.internal_state = 0; //0: normal, 1: statistics window has been opened
	
}

LevelCompleteWnd.prototype = new SlideWindow;


LevelCompleteWnd.prototype.Load = function () {
    this._uimanager = new UIManager();
    this.observer = new Array();
    this.observer_origY = new Array();

    this.LoadBaseWindow();

    var buttongap = 62 + 14;
    var buttonXLoc = (DEFAULT_WINDOW_WIDTH / 2) - ((buttongap * 3) / 2);
    var buttonYLoc = 425;
    var context = this;
    var retry = new Button;
    retry.LoadImages(
        "images/pop_ups/level_complete/retry-button.png",
        "images/pop_ups/level_complete/retry-button-hover.png",
        "images/pop_ups/level_complete/retry-button.png");

    retry._width = 62;
    retry._height = 35;
    retry._X = buttonXLoc;
    retry._Y = buttonYLoc;
    retry._fnMouseDownEvnt = (function () {
        g_gameData.curr_challenge_idx = 0;
        ReCreateLevel(g_gameData.curr_level_idx);
        g_Engine.SetState(GAME_STATE);
    });

    var offset = retry._Y - this._Y;
    this._uimanager.Add(retry);
    this.observer.push(retry);
    this.observer_origY.push(offset);

    buttonXLoc += buttongap;

    var share = new Button;
    share.LoadImages(
        "images/pop_ups/level_complete/share-button.png",
        "images/pop_ups/level_complete/share-button-hover.png",
        "images/pop_ups/level_complete/share-button.png"
        );

    share._width = 62;
    share._height = 35;
    share._X = buttonXLoc;
    share._Y = buttonYLoc;
    share._fnMouseDownEvnt = (function () {

		var trophy_str =  " and won a " + GetTrophyStrings(context.trophy) + " trophy!";
		if( context.trophy == NONE_TROPHY_STARS)
		{
			trophy_str="";			
		}
        FBAcceess_Share(
             "Hi Friends, Popcake Legend is really a great brain game!" +
             "I just completed Level " + (context.levelID + 1) + ", scored " + context.total_score +
             trophy_str + 
             "So much fun ;-)");
    });

    var offset = share._Y - this._Y;
    this._uimanager.Add(share);
    this.observer.push(share);
    this.observer_origY.push(offset);

    buttonXLoc += buttongap;

    var save = new Button;
    save.LoadImages(
        "images/pop_ups/level_complete/next-button.png",
        "images/pop_ups/level_complete/next-button-hover.png",
        "images/pop_ups/level_complete/next-button.png"
    );

    save._width = 62;
    save._height = 35;
    save._X = buttonXLoc;
    save._Y = buttonYLoc;
    save._fnMouseDownEvnt = (function () {
        if (context.fnNext) {
            context.fnNext();
        }
    });

    var offset = save._Y - this._Y;
    this._uimanager.Add(save);
    this.observer.push(save);
    this.observer_origY.push(offset);

    buttonXLoc += buttongap;           

    if (this.type == 0) {
        this.header1 = new ImageObject();
        this.header1.Load("images/pop_ups/level-completed-heading.png");

    } else {        
        this.header1 = new ImageObject();
        this.header1.Load("images/pop_ups/level-failed-heading.png");
    }      

    this.LoadTheme();

    this.buttonGlow = new GlowImage();
    this.buttonGlow.Load("images/pop_ups/level_complete/next-retry-share-button-glow.png", 60);
}

LevelCompleteWnd.prototype.LoadTheme = function () {
    switch (g_gameData.theme) {
        case THEME_TYPE_DEFAULT:
           
            if (this.type == 0) {
                this.bakerImg = new ImageObject();
                this.bakerImg.Load("images/themes/default/Level-Completed-baker.png");

                this.backImage = new BlinkSprite();
                this.backImage.Load("images/themes/default/default-level-completed-baker-2fps.png",
                    4, 2, 1498 / 4);

            } else {
                this.bakerImg = new AnimatedObject();
                this.bakerImg.Load("images/themes/default/Level-Failed-wheeping-baker-Sprite.png");
                this.bakerImg.Set(4, 8.0, true);
                this.bakerImg._frameWidth = 196;
   
                this.backImage = new BlinkSprite();
                this.backImage.Load("images/themes/default/default-level-failed-baker.png",
                    4, 3, 1484 / 4);
                this.backImage.blink_sec = 1;
            }

            break;
        case THEME_TYPE_SAMPLE:

            if (this.type == 0) {
                this.bakerImg = new ImageObject();
                this.bakerImg.Load("images/themes/sample/Level-Completed-male-baker.png");

                this.backImage = new BlinkSprite();
                this.backImage.Load("images/themes/sample/SPV-Level-completed-squrrel.png",
                    6, 2, 1828 / 6);
                this.backImage.blink_sec = 1;
            } else {
                this.bakerImg = new ImageObject();
                this.bakerImg.Load("images/themes/sample/Level-Failed-male-baker.png");

                this.backImage = new BlinkSprite();
                this.backImage.Load("images/themes/sample/level-failed-squrrel.png",
                    4, 2, 1256 / 4);
                this.backImage.blink_sec = 1;
            }

            break;
    }
}

LevelCompleteWnd.prototype.LoadBaseWindow = function () {
    this.image = new ImageObject();
    this.image.Load("images/pop_ups/blank-window.png");

    this._X = (DEFAULT_WINDOW_WIDTH / 2) - (this.image._image.width / 2);
    this.targetY = (DEFAULT_WINDOW_HEIGHT / 2) - (this.image._image.height / 2) - 20;
    this._Y = this.targetY;

    var context = this;
    var close = new Button;
    close.LoadImages(
         "images/pop_ups/close-button.png",
        "images/pop_ups/close-hover-button.png",
	    "images/pop_ups/close-button.png");

    close._width = 41;
    close._height = 39;
    close._X = 765;
    close._Y = 50;
    close._fnMouseDownEvnt = (function () {
        context.targetY = DEFAULT_WINDOW_HEIGHT;
        context.state = SLIDE_WINDOW_STATE_OUT;

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

    this.LoadLeaderBoards();

    this.iconList = new Array();
    var iconFile = [
        "images/pop_ups/level_complete/total-score-icon.png",
        "images/pop_ups/level_complete/chocolate-stars-icon.png",
        "images/pop_ups/level_complete/trophy-icon.png",
        "images/pop_ups/level_complete/time-icon.png",
        "images/pop_ups/level_complete/error-icon.png",
    ];

    for (var x = 0; x < iconFile.length; x++) {
        var icon = new ImageObject()
        icon.Load(iconFile[x]);
        this.iconList.push(icon);
    }

    this.header2 = new ImageObject();
    this.header2.Load("images/pop_ups/level_complete/best-score-heading.png");

    var stat = new Button;
    stat.LoadImages(
         "images/pop_ups/level_complete/stats-button.png",
        "images/pop_ups/level_complete/stats-button-hover.png",
        "images/pop_ups/level_complete/stats-button.png"
    );

    stat._width = 153;
    stat._height = 35;
    stat._X = (DEFAULT_WINDOW_WIDTH / 2) - (stat._width / 2);
    stat._Y = 660;
    stat._fnMouseDownEvnt = (function () {
        context.ShowStatsWindow();
    });

    var offset = stat._Y - this._Y;
    this._uimanager.Add(stat);
    this.observer.push(stat);
    this.observer_origY.push(offset);

    this.glow = new GlowImage();
    this.glow.Load("images/pop_ups/level_complete/stats-button-glow.png", 60);
    this.glow._width = 245;
    this.glow._height = 75;
}

LevelCompleteWnd.prototype.LoadLeaderBoards = function () {
    if (this.levelID != -1) {
        this.bestData = GetMyRecord(this.levelID);

        this.bestRecord = new Array();
        var loopcnt = (g_playersList[this.levelID].players.length > 3) ? 3 :
			g_playersList[this.levelID].players.length;

        for (var i = 0; i < loopcnt; i++) {
            this.bestRecord.push(g_playersList[this.levelID].players[i]);
        }

        if (!IsMeExist(this.levelID)) {
            if (g_myRecord[this.levelID].unlocked) {
                this.bestRecord.push(g_myRecord[this.levelID]);
            }
        }

        this.bestRecord.sort(SortData);
    }
}

LevelCompleteWnd.prototype.Update = function (elapsed) {
    this.UpdateBase(elapsed);
    this._uimanager.Update(elapsed);
    this.bakerImg.Update(elapsed);

    if (this.internal_state == 1) {
        this.statWindow.Update(elapsed);
    }

    this.backImage.Update(elapsed);

    if (this.glow) {
        this.glow.Update(elapsed);
    }

    if (this.buttonGlow) {
        this.buttonGlow.Update(elapsed);
    }
}

LevelCompleteWnd.prototype.Show = function () {
    this._X = (DEFAULT_WINDOW_WIDTH / 2) - (this.image._image.width / 2);
    this._Y = -this.image._image.height;
    this.state = SLIDE_WINDOW_STATE_IN;

    this.UpdateOffsets();
}

LevelCompleteWnd.prototype.DrawValues = function (gfx, x, y, text, style) {
    var ctx = gfx._canvasBufferContext;

    if (typeof (style) == 'undefined') {
        style = "13pt DJBCHALKITUP";
    }

    ctx.font = style;

    // Render Text header
    var textWidth = ctx.measureText(text);
    gfx.DrawText(text,
       x - (textWidth.width / 2), y,
       "rgb(255,255,255)",
       style);

}

LevelCompleteWnd.prototype.Draw = function (gfx) {

    gfx.FillRect(0, 0, DEFAULT_WINDOW_WIDTH, DEFAULT_WINDOW_HEIGHT,
          "rgb(0,0,0)", 0.4);

    this.backImage._X = this._X - 180;
    this.backImage._Y = this._Y + 122;
    this.backImage.Draw(gfx);

    this.image.Draw(gfx, this._X, this._Y);

    this.glow._X = 425;
    this.glow._Y = this._Y + 575;
    this.glow.DrawResize(gfx);

    for (var i = 2; i < this.observer.length; i++) {
        var button = this.observer[i];
        var centerX = button._X + (button._width / 2);
        var centerY = button._Y + (button._height / 2);
        this.buttonGlow._X = centerX - (108 / 2);
        this.buttonGlow._Y = centerY - (81 / 2);
        this.buttonGlow.Draw(gfx);
    }

    this._uimanager.Draw(gfx);

    this.header1.Draw(gfx, (DEFAULT_WINDOW_WIDTH / 2) - (this.header1._image.width / 2), this._Y + 28);

    /*if (g_gameData.theme == THEME_TYPE_DEFAULT) {
        if (this.type == 0) {
            this.bakerImg.Draw(gfx, (DEFAULT_WINDOW_WIDTH / 2) - (this.bakerImg._image.width / 2), this._Y + 2);
        } else {
            this.bakerImg._X = (DEFAULT_WINDOW_WIDTH / 2) - (196 / 2);
            this.bakerImg._Y = this._Y + 2;
            this.bakerImg.Draw(gfx);
        }
    } else if (g_gameData.theme == THEME_TYPE_SAMPLE) {
        this.bakerImg.Draw(gfx, (DEFAULT_WINDOW_WIDTH / 2) - (this.bakerImg._image.width / 2), this._Y + 35);
    }*/


   /* var lineY = this._Y + 310;
    gfx.DrawLine(
        (DEFAULT_WINDOW_WIDTH / 2) - 2,
        lineY,
        (DEFAULT_WINDOW_WIDTH / 2) - 2,
        lineY + 200,
        4,
        "rgb(255,255,255)");
        */
    // Draw the icons
    var sx = 359;
    var sy = 133;
    var values = [
         this.total_score,
         this.stars,
         GetTrophyStrings(this.trophy),
         this.time_to_complete,
         this.number_of_errors
    ];

    for (var i = 0; i < 5; i++) {

        var icon = this.iconList[i];
        icon.DrawScaled(gfx,
             sx,
             this._Y + sy,
             1,
             1);

        gfx.DrawText(values[i],
             sx + 80,
             this._Y + sy + 40,
            "rgb(255,255,255)",
            "18pt DJBCHALKITUP");

        sy += 70;
        if (i+1 == 3) {
            sx = 605;
            sy = 153;
        }
    }

    this.DrawLeaders(gfx);

   // if (this.state != 0) return;
    var lineY = this._Y + 120;
    var text = ["CONGRATULATIONS, YOU HAVE UNLOCKED NEXT LEVEL!"];
    if (this.type == 1) {
        text = this.succmsg;//"SORRY, YOU FAIL TO COMPLETE THIS LEVEL..."
		 this._Y + 126;
    }

    var ctx = gfx._canvasBufferContext;
    style = this.msg_style;
    ctx.font = style;

    // Render Text header
    /*var textWidth = ctx.measureText(text);
    gfx.DrawText(text,
       (DEFAULT_WINDOW_WIDTH / 2) - (textWidth.width / 2),
       this._Y + 96,
       "rgb(255,255,255)",
       style);
	*/
	
	var y = this._Y + 96;
    for (var i = 0; i < text.length; i++) {	
		var textWidth = ctx.measureText(text[i]);
		gfx.DrawText(text[i],
			(DEFAULT_WINDOW_WIDTH / 2) - (textWidth.width / 2),
			y,
			"rgb(255,255,255)",
			style);
			y += 20;
	}

    gfx.DrawLine(
        332,
        lineY,
        760,
        lineY,
        2,
        "rgb(255,255,255)");

    if (this.internal_state == 1) {
        this.statWindow.Draw(gfx);
    }

}

LevelCompleteWnd.prototype.DrawLeaders = function (gfx) {

    this.header2.Draw(gfx, (DEFAULT_WINDOW_WIDTH / 2) - (this.header2._image.width / 2), this._Y + 408);

    var xcoord = 410;
    for (var j = 0; j < this.iconList.length; j++) {
        var icon = this.iconList[j];
        var offsetY = 0;
        if (j == 2 || j == 3) {
            offsetY = 5;
        } else if (j == 0) {
            offsetY = -2;
        }

        var scale = 0.68;

        icon.DrawScaled(gfx,
             xcoord,
             this._Y + 455 - offsetY,
             scale,
             scale);

        xcoord += 70;
    }

    var lineY = this._Y + 460;
    gfx.DrawLine(
        389,
        lineY,
        389,
        lineY + 122,
        2,
        "rgb(255,255,255)");
    
    gfx.DrawLine(
       350,
       lineY + 30,
       725,
       lineY + 30,
       2,
       "rgb(255,255,255)");

    if (this.state != 0) return;


    if (this.levelID != -1 && (typeof (g_DBUserInfo) != 'undefined')) {
        var y = 580;
        var loopcunt = (this.bestRecord.length > 3) ?
			3 : this.bestRecord.length;

        for (var i = 0; i < loopcunt; i++) {
            var player = this.bestRecord[i];
           //var name = "#" + (i + 1);
            var name = truncate_string(player.name, 6);
			if (g_DBUserInfo && player.fbid == g_DBUserInfo.fbid) {
                name = "You";
            }

            gfx.DrawText(name,
				330, y, "rgb(255,255,255)",
				"12pt DJBCHALKITUP");

            this.DrawValues(gfx, 420, y, player.score + player.extra);
            this.DrawValues(gfx, 495, y, player.stars);
            this.DrawValues(gfx, 560, y, GetTrophyStrings(player.trophy));
            this.DrawValues(gfx, 630, y, FormatTimeStr(player.time));
            this.DrawValues(gfx, 705, y, player.errors);
            y += 30;
        }
    } else {

        /* Test Values*/
        var y = 580;
        gfx.DrawText("You",
                   350, y, "rgb(255,255,255)",
                   "12pt DJBCHALKITUP");

        this.DrawValues(gfx, 420, y, 0);
        this.DrawValues(gfx, 495, y, 0);
        this.DrawValues(gfx, 560, y, "None");
        this.DrawValues(gfx, 630, y, "00:00");
        this.DrawValues(gfx, 705, y, 0);
    }

   
}

LevelCompleteWnd.prototype.ShowStatsWindow = function ()
{
    this.internal_state = 1;

    this.statWindow = new StatisticsWindow;
    this.statWindow.Load();
    this.statWindow.Show();
    var context = this;
    this.statWindow.fnClose = function () {
        context.internal_state = 0;
    };
}

LevelCompleteWnd.prototype.EventHandler = function (e) {
    if (this.internal_state == 1)
    {
        this.statWindow.EventHandler(e);
        return;
    }

    this.EventHandlerBase(e);
}


/**/
/**/
/**/
function LevelObjectiveWnd() {
    this.msg = null;
	this.fnPlay = null;
}

LevelObjectiveWnd.prototype = new LevelCompleteWnd;

LevelObjectiveWnd.prototype.Load = function () {
    this._uimanager = new UIManager();
    this.observer = new Array();
    this.observer_origY = new Array();

    this.LoadBaseWindow();

  //  this.bakerImg = new ImageObject();
    //this.bakerImg.Load("images/pop_ups/Level-Completed-baker.png");
    this.LoadTheme();

	switch (g_gameData.theme) {
        case THEME_TYPE_DEFAULT:
            this.backImage = new ImageObject();
            this.backImage.Load("images/themes/default/Male-baker-behind-Artboard.png");
                
			if (g_gameMode == GAME_MODE_DOU) {
				this.douImage = new ImageObject;
				this.douImage.Load("images/themes/default/instruction-image.png");
			}
				
			break;
        case THEME_TYPE_SAMPLE:
			if (g_gameMode == GAME_MODE_DOU) {
				this.douImage = new ImageObject;
				this.douImage.Load("images/themes/sample/instruction-image.png");
			}
		break;
    }

    if (g_gameMode == GAME_MODE_DOU) {
        this.douLabel = new ImageObject;
        this.douLabel.Load("images/pop_ups/duo-game-heading.png");
    }
	
    var topHeader = [
        "images/pop_ups/level_objective/title-Tutorial.png",
        "images/pop_ups/level_objective/taste-of-memory.png",
        "images/pop_ups/level_objective/title-Short-term-memory-.png",
        "images/pop_ups/level_objective/title-Procedural-memory.png",
        "images/pop_ups/level_objective/title-Spatial-memory.png",
        "images/pop_ups/level_objective/title-Sequential-memory.png",
        "images/pop_ups/level_objective/title-Stress-memory.png",
        "images/pop_ups/level_objective/title-Instant-memory.png",
        "images/pop_ups/level_objective/title-Procedural-memory.png",
        "images/pop_ups/level_objective/title-Instant-memory.png",
        "images/pop_ups/level_objective/title-Working-memory.png",

        // start Level 11
        "images/pop_ups/level_objective/title-soccer-memory.png",
        "images/pop_ups/level_objective/title-9-in-a-row-memory.png",
        "images/pop_ups/level_objective/title-dual-shapes-memory.png",
        "images/pop_ups/level_objective/title-Procedural-memory.png",
         "images/pop_ups/level_objective/title-Spatial-memory.png",
        "images/pop_ups/level_objective/title-inverted-memory.png",
        "images/pop_ups/level_objective/title-Sequential-memory.png",
        "images/pop_ups/level_objective/title-Spatial-memory.png",      // the moving level
        "images/pop_ups/level_objective/title-wonderful-memory.png",
    ];

    this.header1 = new ImageObject();
    this.header1.Load(topHeader[g_gameData.curr_level_idx]);

    var icons_obj_list = [
        "images/pop_ups/level_objective/seconds-icon.png",        
        "images/pop_ups/level_objective/hits-icon.png",
        "images/pop_ups/level_objective/minutes-icon.png"
    ];
   
    this.iconObj = new Array();
    for (var mld = 0; mld < icons_obj_list.length; mld++) {
        var icon = new ImageObject();
        icon.Load(icons_obj_list[mld]);
        this.iconObj.push(icon);
    }

    var todays_special = [
            "images/pop_ups/level_objective/Todays-special-Level-1.png",
            "images/pop_ups/level_objective/Todays-special-Level-1.png",
           "images/pop_ups/level_objective/Todays-special-Level-1.png",
           "images/pop_ups/level_objective/Todays-special-Level-3.png",
           "images/pop_ups/level_objective/Todays-special-Level-4.png",
           "images/pop_ups/level_objective/Todays-special-Level-5.png",
           "images/pop_ups/level_objective/Todays-special-Level-6.png",
           "images/pop_ups/level_objective/Todays-special-Level-7.png",
           "images/pop_ups/level_objective/Todays-special-Level-8.png",
           "images/pop_ups/level_objective/Todays-special-Level-9.png",
           "images/pop_ups/level_objective/Todays-special-Level-10.png",

           "images/pop_ups/level_objective/Level-11-todays-image.png",
           "images/pop_ups/level_objective/Level-12-todays-image.png",
           "images/pop_ups/level_objective/Level-13-todays-image.png",
           "images/pop_ups/level_objective/Level-14-todays-image.png",
           "images/pop_ups/level_objective/Level-15-todays-image.png",
           "images/pop_ups/level_objective/Level-16-todays-image.png",
           "images/pop_ups/level_objective/Level-17-todays-image.png",
           "images/pop_ups/level_objective/Level-18-todays-image.png",
           "images/pop_ups/level_objective/Level-19-todays-image.png",
    ];

    this.todays_special = new ImageObject();
    this.todays_special.Load(todays_special[g_gameData.curr_level_idx]);
	
	var context = this;
	var play = new Button;
    play.LoadImages(
        "images/pop_ups/level_objective/play-button.png",
        "images/pop_ups/level_objective/play-button-hover.png",
	    "images/pop_ups/level_objective/play-button.png");

    play.id = 1;
    play._width = 85;
    play._height = 42;
    play._X = (DEFAULT_WINDOW_WIDTH/2)-(62/2);
    play._Y = 421;
    play._fnMouseDownEvnt = (function () {
         context.targetY = DEFAULT_WINDOW_HEIGHT;
        context.state = SLIDE_WINDOW_STATE_OUT;
        /*context.targetY = 0;
        context.state = SLIDE_WINDOW_STATE_OUT;*/
       
        context.fnAnimDone = function () {
            if (context.fnPlay) {
                context.fnPlay();
            }
        }
    });

    var play_offset = play._Y - this._Y;
    this._uimanager.Add(play);
    this.observer.push(play);
    this.observer_origY.push(play_offset);

    this.buttonGlow = new GlowImage();
    this.buttonGlow.Load("images/pop_ups/level_objective/play-button-glow.png", 60);
}

/*
LevelObjectiveWnd.prototype.Update = function (elapsed)
{
    //...
}*/

LevelObjectiveWnd.prototype.Draw = function (gfx) {
    gfx.FillRect(0, 0, DEFAULT_WINDOW_WIDTH, DEFAULT_WINDOW_HEIGHT,
         "rgb(0,0,0)", 0.4);

    if (g_gameData.theme == THEME_TYPE_DEFAULT) {
        this.backImage.Draw(gfx, this._X - 180,
            this._Y + 122);
    } else if (g_gameData.theme == THEME_TYPE_SAMPLE) {
        //... not provided
    }

    this.image.Draw(gfx, this._X, this._Y);

    this.glow._X = 425;
    this.glow._Y = this._Y + 575;
    this.glow.DrawResize(gfx);

    if (this.buttonGlow)
    {
        var button = this._uimanager.GetByID(1);
        var centerX = button._X + (button._width / 2);
        var centerY = button._Y + (button._height / 2);
        this.buttonGlow._X = centerX - (132 / 2);
        this.buttonGlow._Y = centerY - (88/2);
        this.buttonGlow.Draw(gfx);
    }

    this._uimanager.Draw(gfx);

    this.header1.Draw(gfx,
        (DEFAULT_WINDOW_WIDTH / 2) - (this.header1._image.width / 2),
        this._Y + 34);

  /*  if (g_gameMode == GAME_MODE_SOLO) {
        this.header2.Draw(gfx, (DEFAULT_WINDOW_WIDTH / 2) - (this.header2._image.width / 2), this._Y + 408);
    }*/

   /* var bakerY = this._Y + 2;
    if (g_gameData.theme == THEME_TYPE_SAMPLE) {
        bakerY = this._Y + 35;
    }

    this.bakerImg.Draw(gfx, (DEFAULT_WINDOW_WIDTH / 2) - (this.bakerImg._image.width / 2), bakerY);
    */

    if (g_gameMode == GAME_MODE_DOU)
    {
        this.douLabel.Draw(gfx,
           (DEFAULT_WINDOW_WIDTH / 2) - (this.douLabel._image.width / 2),
            this._Y+ 410 );

        this.douImage.Draw(gfx,
                (DEFAULT_WINDOW_WIDTH / 2) - (this.douImage._image.width / 2),
                this._Y+ 450);
    }

    var ystart = this._Y + 82;
    var xstart = 440;

    var currentLevel = g_gameData.level_list[g_gameData.curr_level_idx];
    var clock_limit = currentLevel.clock_limit;
    if (g_gameMode == GAME_MODE_DOU) {
        clock_limit += 60;
    }

    var textvalue = [
        ":  " + currentLevel.seconds + " SECONDS",
        ":  " + currentLevel.number_of_hits + " HITS",
        ":  " + FormatTimeStr(clock_limit) + " MINUTES",

    ];

    for (var mld = 0; mld < this.iconObj.length; mld++) {
        this.iconObj[mld].Draw(gfx, xstart, ystart);

        gfx.DrawText(textvalue[mld],
              xstart + 50,
              ystart + 32,
             "rgb(255,255,255)",
             "15pt DJBCHALKITUP");

        ystart += 42;
    }
    
    this.todays_special.Draw(gfx,
         (DEFAULT_WINDOW_WIDTH / 2) - (this.todays_special._image.width / 2),
            this._Y + 220);

    if (this.state != 0) return;

    if (g_gameMode == GAME_MODE_SOLO) {
        this.DrawLeaders(gfx);
    }

    if (this.internal_state == 1) {
        this.statWindow.Draw(gfx);
    }
}
