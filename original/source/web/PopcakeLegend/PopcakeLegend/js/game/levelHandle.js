/**
  *  levelHandle.js
  *  levelhandler object
  *  Author: Ruell Magpayo <ruellm@yahoo.com>
  *  Created: November 16, 2014
  * 
*/

function LevelHandle()
{
    this.type = 0; //0: locked, 1: single, 2:dou
    this.id = -1;
    this.origX = 0;
    this.origY = 0;
    this.trophy_type = -1;
    this.selected = false;
    this.isDou = false;
    this.stars_count = 0;
	this.picture = null;
	this.picture_ready = false;
}

LevelHandle.prototype = new Button;

LevelHandle.prototype.LoadBase = function ()
{

    this.star = new ImageObject();
    this.star.Load("images/general-level/star.png");

    var trophy_arr = ["images/general-level/bronze-trophy.png",
         "images/general-level/silver-trophy.png",
        "images/general-level/gold-trophy.png"];

    this.trophy = new Array();

    for (i = 0; i < trophy_arr.length; i++) {
        var image = new ImageObject();
        image.Load(trophy_arr[i]);
        this.trophy.push(image);
    }
    
    this.profile_pic = new ImageObject();
    this.profile_pic.Load("images/general-level/profile-pic-background.png");
	
    // Get TOP scorer, show picture in DUO		
    if (this.isDou) { 
        if (g_playersList[this.id].players &&
            g_playersList[this.id].players.length > 0) {

            if (typeof (g_DBUserInfo) == 'undefined') {
                // we are in local development mode			
                return;
            }

            var playerInfo = g_playersList[this.id].players[0];
            var context = this;
            FBAccess_GetPicture(playerInfo.fbid,
                   function (url) {
                       context.PictureLoad(url);
                   });
        }
    }
}

LevelHandle.prototype.PictureLoad = function(url)
{
	this.picture = new Image();
    this.picture.src = url;

	var ctx = this;
    this.picture.onload = (function () {
		ctx.picture_ready = true;
    });
}

LevelHandle.prototype.Load = function () {
    this.images = new Array();
  
    var images_arr = [
        "images/themes/default/lock-level.png",
        "images/themes/default/unlock-solo-level.png",
        "images/themes/default/unlock-duo-level.png" ];

    this._width = 103;
	this._height = 80;
	
    
	if (!this.isDou) { 
		this._height = 105;
	    images_arr = [
			"images/themes/default/lock-level-BIG.png",
			"images/themes/default/solo-box-BIG.png"];
	}

	 
    for (i = 0; i < images_arr.length; i++) {
        var image = new ImageObject();
        image.Load(images_arr[i]);
        this.images.push(image);
    }

    this.LoadBase();

   /* this.label = new Array();
    label_arr = [
        "images/general-level/locker.png",
         "images/themes/default/solo.png",
         "images/themes/default/duo.png" ];

    for (i = 0; i < label_arr.length; i++) {
        var image = new ImageObject();
        image.Load(label_arr[i]);
        this.label.push(image);
    }*/
    this.lockImg = new ImageObject();
    this.lockImg.Load("images/general-level/locker.png");

}

LevelHandle.prototype.Update = function (elapsed) {    
    this.UpdateBase(elapsed);
}

LevelHandle.prototype.UpdateBase = function (elapsed)
{
    // Levels are saved and DOU is unlocked
    /*if (g_myRecord[this.id].saved && !this.isDou) {
        this.type = 1;
    }*/

    if (g_gameData.max_level >= this.id) {
        this.type = (this.isDou) ? 2 : 1;
    } else {
        //check if level has been unlocked        
        if (g_myRecord[this.id].unlocked) {
            this.type = (this.isDou) ? 2 : 1;
        }
    }

    this.trophy_type = g_myRecord[this.id].trophy - 1;
    this.stars_count = g_myRecord[this.id].stars;
}

LevelHandle.prototype.Draw = function (gfx) {

    var ctx = gfx._canvasBufferContext;
    this.images[this.type].Draw(gfx, this._X, this._Y);

    if (this.type == 0) {
        //handle is locked

        centerX = (this._X + (this._width / 2)) - (this.lockImg._image.width / 2) + 3;
        centerY = (this._Y + (this._height / 2)) - (this.lockImg._image.height / 2) + 15;

        //this.lockImg.Draw(gfx, centerX, centerY);
		if (!this.isDou) { 
			centerY += 10;
		}
		
        gfx.DrawResized(this.lockImg._image, centerX,
          centerY, 35, 46);

    } else if (this.type == 1) {

        //Draw the star
        var star_x = this._X - 8;
        var star_y = this._Y + 35;
        gfx.DrawResized(this.star._image, star_x,
           star_y, 75, 76);

        style = "10pt Androgyne_TB";
        ctx.font = style;
        var textWidth = ctx.measureText(this.stars_count);
        
        var centerX = star_x + (75 / 2);
        var centerY = star_y + (76 / 2) + 5;
        gfx.DrawText(this.stars_count,
             centerX - (textWidth.width / 2), centerY,
             "rgb(0,0,0)",
             style);
       
        if (this.trophy_type != -1) {

            gfx.DrawResized(this.trophy[this.trophy_type]._image, 
                this._X + 60,
                 this._Y + 50,
                 32, 45);

        }

		textY = this._Y + 24;		
		var message = g_gameData.level_list[this.id].level_name;
		var textdff = 18;
		var textHeight = textdff * message.length;
		var txy = textY - (textHeight / 2) + 14;
		
		for (var i = 0; i < message.length; i++) {
			var text = message[i];

			var style = "10pt Androgyne_TB";
			var ctx = gfx._canvasBufferContext;
			ctx.font = style;
			var textWidth = ctx.measureText(text);
			var x = (this._X + (this._width/2));

			gfx.DrawText(text,
					  x - (textWidth.width / 2), txy,
					   "rgb(255,255,255)",
					 style);

			txy += textdff;
		}
		

        } else if (this.type == 2) {
			//.. DUO do not have stars and trophy records

			style = "15pt Androgyne_TB";
			ctx.font = style;
			var text = "DUO " + (this.id + 1);
			var textWidth = ctx.measureText(text);

			textX = (this._X + (this._width / 2)) - (textWidth.width / 2);
			textY = this._Y + 20;

			gfx.DrawText(text,
					textX, textY,
					"rgb(255,255,255)", style);


    }
	
	if (this.picture_ready && this.isDou) {
		var boxCenter = this._X + (this._width / 2);
		var x = boxCenter - (this.profile_pic._image.width / 2);
		var y = this._Y + 28;

		gfx.DrawImage(this.picture, 0, 0,
			this.picture.width, this.picture.height,
			x, y, this.profile_pic._image.width, this.profile_pic._image.height);
				
		this.profile_pic.Draw(gfx, x, y);
	}
			
    if (this.selected) {
        gfx.roundRect(this._X, this._Y, this._width, this._height,
            6, "rgb(0,0,0)", 0.2);
    }
    
}

LevelHandle.prototype.Select = function () {
    //...
    if (!this.enable) return;
    this.selected = true;
}

LevelHandle.prototype.UnSelect = function () {
    if (!this.enable) return;
    this.selected = false;
}

/*****************************************************/
/* SAMPLE THEME LEVEL HANDLE*/
/*****************************************************/
function SampleTheme_LvlHandle(/*profpic*/)
{
    this.color_type = 0;            //0: yellow, 1: green, 2: purple, 3: blue
    //this.prof_location = profpic;   //0: right, 1: left, 2: top, 3: bottom
}

SampleTheme_LvlHandle.prototype = new LevelHandle;

SampleTheme_LvlHandle.prototype.Load = function ()
{
    var solo_handles = [
        "images/themes/sample/custm-unlock-solo-level-yellow.png"
        //...
    ];

    var dou_handles = [
        "images/themes/sample/custm-unlock-duo-level-yellow.png"
        //...
    ];

    this.background = new ImageObject();
    if (this.isDou) {
        this.background.Load(dou_handles[this.color_type]);
        this._width = 140;
        this._height = 102;
    } else {
        this.background.Load(solo_handles[this.color_type]);
        this._width = 153;
        this._height = 123;
    }

    this.LoadBase();

    this.lockImg = new ImageObject();
    this.lockImg.Load("images/general-level/locker.png");
}

SampleTheme_LvlHandle.prototype.Update = function (elapsed)
{
    this.UpdateBase(elapsed);
}

SampleTheme_LvlHandle.prototype.Draw = function (gfx)
{
    this.background.Draw(gfx, this._X, this._Y);

    var ctx = gfx._canvasBufferContext;    
    var text = (this.id + 1);
    var textX = 0;
    var textY = 0;
    var centerX = 0;
    var centerY = 0;

    var color = "rgb(10,10,10)";
    if (this.selected) {
        color = "rgb(200,200,200)";

    } else {
        if (this.type == 1) {
            color = "rgb(99,47,147)";
        }else if (this.type ==2){
            color = "rgb(240,90,40)";
        }else{
            color = "rgb(0,0,0)";
        }
    }

    var width = 0;
    var height = 0;
    var x = 0;
    var y = 0;
    if (this.type == 0) {
        //handle is locked
        
        if (this.isDou) {
            width = 27;
            height = 35;
            centerX = (this._X + (this._width / 2)) - (this.lockImg._image.width / 2) + 30;
            centerY = (this._Y + (this._height / 2)) - (this.lockImg._image.height / 2);

        } else {
            width = 41;
            height = 54;
            centerX = (this._X + (this._width / 2)) - (this.lockImg._image.width / 2) + 15;
            centerY = (this._Y + (this._height / 2)) - (this.lockImg._image.height / 2)-10;
        }

        gfx.DrawResized(this.lockImg._image, centerX, centerY, width, height);

    } else if (this.type == 1) {

        swidth = 97;
        sheight = 98;
        sx = this._X + 25;
        sy = this._Y + 21;

        twidth = 41;
        theight = 53;
        tx = sx + 74;
        ty = this._Y + 41;

        //Draw the star
        gfx.DrawResized(this.star._image, sx,
           sy, swidth, sheight);

        style = "10pt Androgyne_TB";
        ctx.font = style;
        var textWidth = ctx.measureText(this.stars_count);

        var centerX = sx + (swidth / 2);
        var centerY = sy + (sheight / 2) + 5;
        gfx.DrawText(this.stars_count,
             centerX - (textWidth.width / 2), centerY,
             "rgb(0,0,0)",
             style);


        if (this.trophy_type != -1) {
            gfx.DrawResized(this.trophy[this.trophy_type]._image, tx,
                 ty, twidth, theight);

        }

        textY = this._Y + 25;
		
		var message = g_gameData.level_list[this.id].level_name;
		var textdff = 18;
		var textHeight = textdff * message.length;
		var txy = textY - (textHeight / 2) + 14;

		
		for (var i = 0; i < message.length; i++) {
			var text = message[i];

			var style = "10pt Androgyne_TB";
			var ctx = gfx._canvasBufferContext;
			ctx.font = style;
			var textWidth = ctx.measureText(text);
			var x = (this._X + 92);

			gfx.DrawText(text,
					  x - (textWidth.width / 2), txy,
					  color,
					 style);

			txy += textdff;
		}

    } else {
        //.. DUO do not have stars and trophy records

        style = "10pt Androgyne_TB";
        //style = ;
        ctx.font = style;
        var text = "DUO " + (this.id + 1);
        var textWidth = ctx.measureText(text);

        textX = (this._X + (this._width / 2)) - (textWidth.width / 2) + 25;
        textY = this._Y + 20;

        gfx.DrawText(text,
             textX, textY,
             color, style);

    }
  
    if (this.picture_ready && this.isDou) {
            var boxCenter = this._X + (this._width / 2) +25;

            var x = boxCenter - (this.profile_pic._image.width / 2);
            var y = this._Y + 23;

            gfx.DrawImage(this.picture, 0, 0,
				this.picture.width, this.picture.height,
				x, y, this.profile_pic._image.width, this.profile_pic._image.height);
            
            this.profile_pic.Draw(gfx, x, y);
        }
  }

