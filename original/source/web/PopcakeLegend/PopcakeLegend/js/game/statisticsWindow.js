/**
  *  statisticsWindow.js
  *  The window that shows graphs of stats
  *  Author: Ruell Magpayo <ruellm@yahoo.com>
  *  Created: May 09, 2015
  * 
*/

function StatisticsWindow() {
    //...
    this.state = 0;
    this._X = 0;
    this._Y = 0;
    this.targetY = 0;
    this.image = null;
    this.fnClose = null;

    this.internal_state = 0; //0: normal, 1: loading theme, 2: messagebox

    this.current_tab = 0; //0: score, 1: stars, 2: errors
}

StatisticsWindow.prototype = new SlideWindow;

StatisticsWindow.prototype.Load = function () {
    this._uimanager = new UIManager();

    this.image = new ImageObject();
   // this.image.Load("images/pop_ups/Popup-window.png");
    this.image.Load("images/pop_ups/statistics-window.png");
   

    this.observer = new Array();
    this.observer_origY = new Array();
    this._X = (DEFAULT_WINDOW_WIDTH / 2) - (this.image._image.width / 2);
    this.targetY = (DEFAULT_WINDOW_HEIGHT / 2) - (this.image._image.height / 2) /*- 100*/;
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
    close._X = 838;
    close._Y = 143;
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

    this.loading_icon = new AnimatedObject();
    this.loading_icon.Load("images/customization/loading-image.png");
    this.loading_icon.Set(9, 5.0, true);
    this.loading_icon._frameWidth = 339.33;
	
	/////////////////////////////////////////////////////
	// NOTE that statistics and graph will be using the "base"
	// number for each level. Example: base 0 is levels 1-10 
	// this will be supported later on!
	/////////////////////////////////////////////////////
	this.upto_level = g_gameData.max_level;
	
	/////////////////////////////////////////////
	// TO BE USED LATER!
	// THIS WILL BE COMPUTED BASED ON g_gameData.curr_level_idx
    // (level 11) = 10/10 = 1 (zero index based)
    // all records like g_myRecord is indexed from 0 to total level
	this.level_base = Math.floor(g_gameData.curr_level_idx/10) * 10;					
	/////////////////////////////////////////////
	
	if(g_myRecord[g_gameData.max_level].score == 0 &&
		g_myRecord[g_gameData.max_level].stars == 0 &&
		g_myRecord[g_gameData.max_level].errors == 0){
		
		//Player has not played the level yet
	    this.upto_level = g_gameData.max_level - 1;
	}
		
	this.GetFriendsAverage();
	this.GetData();
}

StatisticsWindow.prototype.GetFriendsAverage = function()
{
	this.friends_average_score = new Array();
	this.friends_average_stars = new Array();
	this.friends_average_errors = new Array();

	for (var i = this.level_base; i <= this.upto_level; i++) {
		var average_score = 0;
		var average_stars = 0;
		var average_error = 0;
		for( var p =0; p < g_perLevelFriendsData[i].players.length; p++){
			average_score +=  g_perLevelFriendsData[i].players[p].score;
			average_stars +=  g_perLevelFriendsData[i].players[p].stars;
			average_error +=  g_perLevelFriendsData[i].players[p].errors;
		}
		
		if( average_score != 0 ) 
			average_score /= g_perLevelFriendsData[i].players.length;

		if( average_stars != 0 ) 
			average_stars /= g_perLevelFriendsData[i].players.length;

		if( average_error != 0 ) 
			average_error /= g_perLevelFriendsData[i].players.length;
		
		
		if( average_score == 0 && 
			average_stars == 0 && 
			average_error == 0){
			
			average_score = average_stars = average_error = -1;			
		}
			
		this.friends_average_score.push(average_score);
		this.friends_average_stars.push(average_stars);
		this.friends_average_errors.push(average_error);
	}
}

StatisticsWindow.prototype.GetData = function ()
{
    this.your_score = new Array();
    this.your_stars = new Array();
    this.your_trohpies = new Array();
    this.your_errors = new Array();

    for (var i = this.level_base; i <= this.upto_level; i++) {
        var score = g_myRecord[i].score;
        var stars = g_myRecord[i].stars;
        var trophies = g_myRecord[i].trophy;
        var errors = g_myRecord[i].errors
        if (score == 0 &&
            stars == 0 &&
            errors == 0) {
            score = -1;
            stars = -1;
            errors = -1;
        }

        this.your_score.push(score);
        this.your_stars.push(stars);
        this.your_trohpies.push(trophies);
        this.your_errors.push(errors);
        
    }


}

StatisticsWindow.prototype.LoadInternal = function () {
    var context = this;
    switch (g_gameData.theme) {
        case THEME_TYPE_DEFAULT:

            if (1/*g_gameData.spv_flag == 0*/) {
                this.bgimage = new ImageObject();
                this.bgimage.Load("images/themes/default/DEFAULT_STAT_SCREEN.png");

                var buy = new Button;
                buy.LoadImages(
                    "images/themes/default/30-chococoins-button.png",
                    "images/themes/default/30-chococoins-button-hover.png",
                    "images/themes/default/30-chococoins-button.png");

                buy._width = 125;
                buy._height = 70;
                buy._X = (DEFAULT_WINDOW_WIDTH / 2) - (buy._width / 2);
                buy._Y = 519;
                buy._fnMouseDownEvnt = (function () {
                    context.DoLoadSPV();
                });

                var _offset = buy._Y - this._Y;
                this._uimanager.Add(buy);
                this.observer.push(buy);
                this.observer_origY.push(_offset);
            }
            break;
        case THEME_TYPE_SAMPLE:

            var header = ["images/themes/sample/stats/best-scores-title.png",
                "images/themes/sample/stats/stars-and-trophies-title.png",
                "images/themes/sample/stats/Errors-title.png"];
            this.headerImg = new Array();
            for (var i = 0; i < 3; i++) {
                var hbj = new ImageObject();
                hbj.Load(header[i]);
                this.headerImg.push(hbj);
            }

            this.radioGroup = new RadioButtonGroup();

            var buttonX = 30;
            var buttonGap = 142 + 10;

            var buttons_otg = [
                [
                    "images/themes/sample/stats/best-score-button.png",
                    "images/themes/sample/stats/best-score-button-ACTIVE.png",
                    "images/themes/sample/stats/best-score-button-ACTIVE.png"
                ],

                [
                    "images/themes/sample/stats/star&trophies-button.png",
                    "images/themes/sample/stats/star&trophies-button-ACTIVE.png",
                    "images/themes/sample/stats/star&trophies-button-ACTIVE.png"
                ],

                [
                    "images/themes/sample/stats/errors-button.png",
                    "images/themes/sample/stats/errors-button-ACTIVE.png",
                    "images/themes/sample/stats/errors-button-ACTIVE.png",
                ],

            ];
            var startX = 344;

            for (var i = 0; i < 3; i++) {
                var togle1 = new ToggleButton();
                togle1.Load(
                    buttons_otg[i][0],
                    buttons_otg[i][1],
                    buttons_otg[i][2]);

                togle1._width = 142;
                togle1._height = 40;
                togle1._X = startX;
                togle1._Y = 570;

                var _offset = togle1._Y - this._Y;
                this._uimanager.Add(togle1);
                this.observer.push(togle1);
                this.observer_origY.push(_offset);

                this.radioGroup.Add(togle1);

                startX += buttonGap;
            }

            // Create the graphs
            //this.graphObjects = new Array();

            this.graphObject = new GraphObject;
            this.graphObject.baseX = 375; //foot of Graph line
            this.graphObject.baseY = 530;

            //this.graphObject.gy_margin_value = 1000;
            //this.graphObject.gy_count = 5;
            this.graphObject.gx_margin_value = 1;
            this.graphObject.gx_count = 10;

            //this.graphObject.gy_ycoord_distance = 35;
            this.graphObject.gx_xcoord_distance = 35;
        

            break;
    }
}

StatisticsWindow.prototype.DoLoadSPV = function ()
{
    if(g_gameData.coins - CUSTOM_THEME_PRICE < 0 
		&& g_gameData.spv_flag == 0)
    {        
		var msg = ["Not Enough Chococoins!"];
		this.MessageBox(msg);
		return;
    } else if (g_gameData.spv_flag == 1) {
        var msg = ["You already purchased", "Super Premium Version!"];
        this.MessageBox(msg);
        return;

    }

    if (LoadTheme(THEME_TYPE_SAMPLE)) {
        this.SwitchTheme();
    } else {
        this.internal_state = 1;
        this.animator = new Animator();
        this.animator.Set(5);
        loading_dots = 0;
    }
}

StatisticsWindow.prototype.Update = function (elapsed) {

    if (this.internal_state == 1) {
        this.loading_icon.Update(elapsed);
        if (this.animator.Update(elapsed)) {
            loading_dots = (loading_dots + 1) % 4;

            if (g_imageResourceList.length + g_errorImageList.length >=
                g_resourceLoadCount) {
                this.SwitchTheme();
                //this.state = CUSTOMIZE_WINDOW_STATE_END;
            }
        }
        return;
    }else if(this.internal_state == 2){
		this.objectiveWindow.Update(elapsed);
		return;
	}

    this.UpdateBase(elapsed);
    this._uimanager.Update(elapsed);
}

StatisticsWindow.prototype.Show = function () {
    this._X = (DEFAULT_WINDOW_WIDTH / 2) - (this.image._image.width / 2);
    this._Y = 0;
    this.state = SLIDE_WINDOW_STATE_IN;

    this.UpdateOffsets();
}

StatisticsWindow.prototype.Draw = function (gfx) {
    gfx.FillRect(0, 0, DEFAULT_WINDOW_WIDTH, DEFAULT_WINDOW_HEIGHT,
          "rgb(0,0,0)", 0.7);

    this.image.Draw(gfx, this._X, this._Y);
    
    switch (g_gameData.theme) {
        case THEME_TYPE_DEFAULT:
            if (1/*g_gameData.spv_flag == 0*/) {
                this.bgimage.DrawScaled(gfx,
                    (DEFAULT_WINDOW_WIDTH / 2) - (this.bgimage._image.width / 2)-65, this._Y,
                    1.4,
                    1.4);


                var textarr = ["TRACK YOUR PERFORMANCES", "SEE YOUR FRIENDS STATISTICS", "GREAT DESIGN"];
                var ctx = gfx._canvasBufferContext;
                //var y = this._Y + 188;
                var y = [this._Y + 188, this._Y + 242, this._Y + 286];

                for (var i = 0; i < textarr.length; i++) {                   
                    var style = "20pt DJBCHALKITUP";
                    ctx.font = style;
                    var text = textarr[i];

                    // Render Text header
                    var textWidth = ctx.measureText(text);
                    gfx.DrawText(text,
                       (DEFAULT_WINDOW_WIDTH / 2) - (textWidth.width / 2) +10, y[i],
                       "rgb(255,255,255)",
                       style);

                   // y += 60;
                }

              
      

            } else {

                var message = ["Statistics is only available", "in Premium Version"];
                var y = this._Y + 158;

                for (var bbq = 0; bbq < message.length; bbq++) {
                    var ctx = gfx._canvasBufferContext;
                    var style = "25pt DJBCHALKITUP";
                    ctx.font = style;
                    var text = message[bbq];

                    // Render Text header
                    var textWidth = ctx.measureText(text);
                    gfx.DrawText(text,
                       (DEFAULT_WINDOW_WIDTH / 2) - (textWidth.width / 2) + 20, y,
                       "rgb(255,255,255)",
                       style);

                    y += 38;
                }
            }
            break;
        case THEME_TYPE_SAMPLE:
            
            var image = this.headerImg[this.radioGroup.index];
            image.Draw(gfx,
                (DEFAULT_WINDOW_WIDTH / 2) - (image._image.width / 2)+20,
                this._Y + 35);
            break;
    }

    this._uimanager.Draw(gfx);

    if (g_gameData.theme == THEME_TYPE_DEFAULT) {
        var textarr = [CUSTOM_THEME_PRICE, "CHOCOCOINS"];
        var ctx = gfx._canvasBufferContext;
        //var y = this._Y + 188;
        var y = [this._Y + 380, this._Y + 395];

        for (var i = 0; i < textarr.length; i++) {
            var style = "11pt Androgyne_TB";
            ctx.font = style;
            var text = textarr[i];

            // Render Text header
            var textWidth = ctx.measureText(text);
            gfx.DrawText(text,
               (DEFAULT_WINDOW_WIDTH / 2) - (textWidth.width / 2), y[i],
               "rgb(255,0,0)",
               style);

        }
    }

    if (this.internal_state == 1) {
        /***************************************************/
        // Temporary! to be replaced with aniamted image
        var text = "Loading Theme";
        for (var i = 0; i < loading_dots; i++) {
            text += ".";
        }

        gfx.FillRect(0, 0, DEFAULT_WINDOW_WIDTH, DEFAULT_WINDOW_HEIGHT,
            "rgb(0,0,0)", 0.7);

        gfx.DrawText(text,
               400,
               620,
               "rgb(255,255,255)",
               "30pt Androgyne_TB");

        this.loading_icon._X = (DEFAULT_WINDOW_WIDTH / 2) - (this.loading_icon._frameWidth / 2);
        this.loading_icon._Y = (DEFAULT_WINDOW_HEIGHT / 2) - (339 / 2);
        this.loading_icon.Draw(gfx);
        /***************************************************/
        return;
    } else if(this.internal_state == 2){
		this.objectiveWindow.Draw(gfx);
		return;
	}

    if (this.state != 0) return;

    if(g_gameData.theme == THEME_TYPE_SAMPLE)
        this.ShowGraph(gfx);

}

StatisticsWindow.prototype.ShowGraph = function (gfx)
{
    //Draw the graph
    var you_values = 0;
    var friends_values = 0;

    var image = new ImageObject();
    this.graphObject.level_base = this.level_base;

    if (this.radioGroup.index == 0) {

        image.Load("images/pop_ups/level_complete/chocolate-stars-icon.png");

        this.graphObject.gy_margin_value = 2000;
        this.graphObject.gy_count = 5;
        this.graphObject.gy_ycoord_distance = 55;

        //Scores 

       // you_values= new Array();
       // for (var i = this.level_base; i <= this.upto_level; i++) {
       //     you_values.push(g_myRecord[i].score);
       // }
		
        friends_values = this.friends_average_score;
        you_values = this.your_score;
       /**/
        
        // USE TEMPORARY DATA!!
      /*  var score = [
            1000, 500,
            2500, 3000,
            1000, 5000,

            800, 900,
            2300, 3000                
        ];

        var fubuscore = [
            500, 800,
            1500, 2300,
            2600, 1000, 
            1500, 2800,
            3500, 2300
        ];

        you_values = score;
        friends_values = fubuscore;
       /* */

    } else if (this.radioGroup.index == 1) {
        //Stars
        this.graphObject.gy_margin_value = 5;
        this.graphObject.gy_count = 6;
        this.graphObject.gy_ycoord_distance = 40;

        /**********************************************/
      /*  var mystarTemp = [
            30,20,10,23,11,16,4,0,0,0
        ];

        var mytrophiesTemp = [
            3, 2, 1, 3, 3, 3, 2, 0, 0, 0
        ];

        var friends_star = [
              10,
              20,
              30,
              20,
              10
        ];
        
		/**********************************************/
        
		//var mystarTemp = new Array();
      //  var mytrophiesTemp = new Array();
      //  for (var i = this.level_base; i <= this.upto_level; i++) {
       //     mystarTemp.push(g_myRecord[i].stars);
       //     mytrophiesTemp.push(g_myRecord[i].trophy);
      //  }		
        //this.graphObject.DrawTrophy(gfx, mystarTemp, mytrophiesTemp);
        this.graphObject.DrawTrophy(gfx, this.your_stars, this.your_trohpies);
        friends_values = this.friends_average_stars;
        you_values = 0;

    } if (this.radioGroup.index == 2) {
        //errors
        image.Load("images/pop_ups/level_complete/error-icon.png");

        this.graphObject.gy_margin_value = 5;
        this.graphObject.gy_count = 6;
        this.graphObject.gy_ycoord_distance = 40;

       // var errors = new Array();
       /// for (var i = this.level_base; i <= this.upto_level; i++) {
       //     errors.push(g_myRecord[i].errors);
      //  }

        you_values = this.your_errors;
		 friends_values = this.friends_average_errors;
    }


    this.graphObject.DrawBase(gfx);
    if (you_values != 0) {
       
		 var value = you_values[g_gameData.curr_level_idx];
		 if( value > 0) {
			var coord = this.graphObject.DetectCurrentLevel(gfx, you_values);
			this.graphObject.DrawValue(gfx, you_values, "YOU", "rgb(233,38,42)");
		
			gfx.DrawResized(image._image,
				   coord.x - (25/2),
				   coord.y - (25/2),
				   25, 25);
		   
			var style = "8pt Androgyne_TB";

			gfx._canvasBufferContext.font = style;
			var textWidth = gfx._canvasBufferContext.measureText(value);
			textX = coord.x- (textWidth.width / 2);

			gfx.DrawText(value,
				 textX,
				 coord.y-10,
				 "rgb(0,255,0)",
				 style);
		}
    }

    if (friends_values != 0) {
        this.graphObject.DrawValue(gfx, friends_values, "FRIENDS", "rgb(39,170,226)");
    }

}

StatisticsWindow.prototype.MessageBox = function(msg)
{
	this.internal_state = 2;
	this.objectiveWindow = new ObjectiveWindow;
	this.objectiveWindow.Load();
    this.objectiveWindow.Show();
    this.objectiveWindow.msg = msg;
    
	var context = this;
	this.objectiveWindow.fnClose = function () {
		context.internal_state = 0;
	};
}

StatisticsWindow.prototype.SwitchTheme = function () {

    // IF player already purchased
    // we dont credit it back
	if( g_gameData.spv_flag == 0) {
		Credit_Coins(CUSTOM_THEME_PRICE);
	}

    SetTheme(THEME_TYPE_SAMPLE);
    g_Engine.SetState(MAIN_MENU_STATE);

    //Hack solution - Load this back
    this.Load();
}

StatisticsWindow.prototype.EventHandler = function (e) {

    if (this.internal_state == 2) {
        this.objectiveWindow.EventHandler(e);
        return;
    } 
		
    this.EventHandlerBase(e);
}

/**Graph Drawing class**/
/* NOTE: THIS GRAPH OBJECT cannot detect ranges yet */
function GraphObject()
{
    this.baseX = 0; //foot of Graph line
    this.baseY = 0;

    this.gy_margin_value = 0;
    this.gy_count = 0;
    this.gx_margin_value = 1;
    this.gx_count = 0;

    this.gy_ycoord_distance = 0;
    this.gx_xcoord_distance = 0;
    this.bar_thicknes = 4;

    this.textStyle = "10pt Androgyne_TB";
    this.level_base = 0;
}

GraphObject.prototype.DrawBase = function (gfx)
{

    var ctx = gfx._canvasBufferContext;
    var gwidth = (this.gx_count * this.gx_xcoord_distance) + (this.gx_xcoord_distance / 2);
    var gheight = (this.gy_count * this.gy_ycoord_distance) + (this.gy_ycoord_distance / 2);

    //Draw the X graph Line
    gfx.DrawLine(
      this.baseX,
      this.baseY,
      this.baseX + gwidth,
      this.baseY,
       2,
       "rgb(255,255,255)");

    //Draw the Y graph Line
    gfx.DrawLine(
      this.baseX,
      this.baseY,
      this.baseX,
      this.baseY - gheight,
       2,
       "rgb(255,255,255)");


    //Draw graph X bullet
    var startX = this.baseX + this.gx_xcoord_distance;
    var value = this.gx_margin_value + this.level_base;
    for (var hs = 0 ; hs < this.gx_count; hs++) {
        gfx.DrawLine(
            startX,
            this.baseY - this.bar_thicknes,
            startX,
            this.baseY + this.bar_thicknes,
             2,
             "rgb(255,255,255)");

        ctx.font = this.textStyle;
        var text = value;
        var textWidth = ctx.measureText(text);

        textX = startX - (textWidth.width / 2);
        gfx.DrawText(text,
             textX-2,
             this.baseY + this.bar_thicknes + 15,
             "rgb(255,255,255)",  this.textStyle);

        startX += this.gx_xcoord_distance;
        value += this.gx_margin_value;
    }

    //Draw graph Y bullet
    var startY = this.baseY - this.gy_ycoord_distance;
    var startY_mid = this.baseY - (this.gy_ycoord_distance/2);

    var value = this.gy_margin_value;
    for (var hs = 0 ; hs < this.gy_count; hs++) {
        gfx.DrawLine(
            this.baseX - this.bar_thicknes,
             startY,
            this.baseX + this.bar_thicknes,
             startY,
             2,
             "rgb(255,255,255)");

        ctx.font = this.textStyle;
        var text = value;
        var textWidth = ctx.measureText(text);

        textX = (this.baseX - this.bar_thicknes) - (textWidth.width + 12);
        gfx.DrawText(text,
             textX,
             startY + 7,
             "rgb(255,255,255)",  this.textStyle);

        value += this.gy_margin_value;
        startY -= this.gy_ycoord_distance;
        
    }

    //Draw Mid lines
    for (var hs = 0 ; hs < this.gy_count; hs++) {
        gfx.DrawLine(
           this.baseX - (this.bar_thicknes / 2),
            startY_mid,
           this.baseX + (this.bar_thicknes / 2),
            startY_mid,
            2,
            "rgb(255,255,255)");

        startY_mid -= (this.gy_ycoord_distance);
    }  
}

GraphObject.prototype.Draw = function (gfx)
{
    //...
}


GraphObject.prototype.DrawValue = function (gfx, values, text, color)
{
    /**********************************************
     * This function works on the assumption that each
     * INDEX in the values array corresponds to ONE element/data
     * the Graph X (ie. Levels for Popcake Legend)
    **********************************************/
    gfx._canvasBufferContext.save();
    gfx._canvasBufferContext.lineWidth = 4;
    gfx._canvasBufferContext.beginPath();

    var current_xcoord = this.baseX + this.gx_xcoord_distance;
    var circle_list = new Array();
	
    for (var i = 0; i < values.length; i++) {
        var val = values[i];
	
		if( val == -1 ){
			gfx._canvasBufferContext.strokeStyle = color;
			gfx._canvasBufferContext.stroke();
			gfx._canvasBufferContext.beginPath();

			current_xcoord += this.gx_xcoord_distance;
			continue;
		}
		
        var factor = /*Math.floor*/(val / this.gy_margin_value) * this.gy_ycoord_distance;
        var current_ycorrd = this.baseY - factor;

        if (i == 0) {
            gfx._canvasBufferContext.moveTo(current_xcoord, current_ycorrd);
          
        } else {
            gfx._canvasBufferContext.lineTo(current_xcoord, current_ycorrd);
        }

        circle_list.push({ x: current_xcoord, y: current_ycorrd });
        current_xcoord += this.gx_xcoord_distance;
    }
	
    gfx._canvasBufferContext.strokeStyle = color;
    gfx._canvasBufferContext.stroke();
    gfx._canvasBufferContext.restore();

	if(circle_list.length > 0 ){
		gfx.DrawText(text,
              current_xcoord - this.gx_xcoord_distance + 10,
              current_ycorrd,
              color,
              "10pt Androgyne_TB");
	}
	
    for (var i = 0; i < circle_list.length; i++) {
        gfx.DrawCircle(circle_list[i].x,
            circle_list[i].y,
            4,
            color,
            color,
            2);
    }
}

GraphObject.prototype.DrawTrophy = function (gfx, values_star, values_trophy)
{
    var current_xcorrd = this.baseX + (this.gx_xcoord_distance/2);

    var trophy_arr = [
        "images/general-level/bronze-trophy.png",
         "images/general-level/silver-trophy.png",
        "images/general-level/gold-trophy.png"];

    for (var s = 0; s < values_star.length; s++) {
        var val = values_star[s];

        if (val > 0) {
            var factor = /*Math.floor*/(val / this.gy_margin_value) * this.gy_ycoord_distance;
            var current_ycorrd = this.baseY - factor;

            var color = "rgb(34,177,76)";
            if (values_trophy[s] == GOLD_TROPHY_STARS) {
                color = "rgb(255,215,0)";
            } else if (values_trophy[s] == SILVER_TROPHY_STARS) {
                color = "rgb(192,190,191)";
            } else if (values_trophy[s] == BRONZE_TROPHY_STARS) {
                color = "rgb(243,116,35)";
            }

            gfx._canvasBufferContext.save();
            gfx._canvasBufferContext.globalAlpha = 1;
            gfx._canvasBufferContext.beginPath();
            gfx._canvasBufferContext.rect(current_xcorrd, current_ycorrd,
                       this.gx_xcoord_distance - 2,
                       this.baseY - current_ycorrd);

            gfx._canvasBufferContext.fillStyle = color;
            gfx._canvasBufferContext.fill();

            gfx._canvasBufferContext.restore();

            var tropy = new ImageObject();
			var trophy_type = values_trophy[s]
			if(  trophy_type != 0 ) {;
				var imagepath = trophy_arr[ trophy_type - 1];
				tropy.Load(imagepath);

				gfx.DrawResized(tropy._image,
					current_xcorrd +5,
					current_ycorrd-25,
					25, 25);
			}
        }
        current_xcorrd += this.gx_xcoord_distance;
    }
}

GraphObject.prototype.DetectCurrentLevel = function (gfx, values)
{
    var factor = /*Math.floor*/(values[g_gameData.curr_level_idx] / this.gy_margin_value) * this.gy_ycoord_distance;
    var current_ycorrd = this.baseY - factor;

    var targetX = this.baseX + ((g_gameData.curr_level_idx+1) * this.gx_xcoord_distance);
     
    //Draw X graph crooked lines
    var x = this.baseX;
    while (x < targetX) {

        gfx.DrawLine(
          x, current_ycorrd,
          x+4, current_ycorrd,
          4,"rgb(255,255,255)");

        x += 6;
    }

    //Draw Y graph crooked lines
    var Y = this.baseY;
    while (Y > current_ycorrd) {

        gfx.DrawLine(
          targetX, Y,
          targetX, Y - 4,
          4, "rgb(255,255,255)");

        Y -= 6;
    }

    return { x: targetX, y: current_ycorrd };
}