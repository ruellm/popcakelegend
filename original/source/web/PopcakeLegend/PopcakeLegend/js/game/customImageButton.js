/**
    customImageButton.js
    Definitions of different button types
    without the mouse hover functionality
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created Oct 16, 2012
*/

function CustomImageButton() {
    this.color = "rgb(255,255,255)";
    this.icon = null;
    this.alpha = 0.5;
    this.selected = false;
}

CustomImageButton.prototype = new Button;

CustomImageButton.prototype.Load = function (imagepath, width, height, color) {
    this.icon = new ImageObject();
    this.icon.Load(imagepath);

    this._width = width;
    this._height = height;
    this.color = color;
}

CustomImageButton.prototype.Update = function (elapsed) {
    //...
}

CustomImageButton.prototype.Draw = function (gfx) {

    gfx.roundRect(
            this._X, this._Y, this._width, this._height, 6,
            this.color);

    if (this.selected) {
        gfx.roundRect(
            this._X, this._Y, this._width, this._height, 6,
            "rgb(255,255,255)", this.alpha);
    }

    this.icon.Draw(gfx, this._X, this._Y);
}

CustomImageButton.prototype.Select = function () {
    this.selected = true;

    if (this.hoverAudioPath != null) {
        LoadAndPlay(this.hoverAudioPath);
    }
}

CustomImageButton.prototype.UnSelect = function () {
    this.selected = false;
}

///////////////////////////
// Override !!
// for hightlight use Text instead

function CustomButtonTextHover()
{
    this.color = "rgb(255,255,255)";
    this.icon = null;

    this.selected = false;
    this.textArray = null;
}

CustomButtonTextHover.prototype = new CustomImageButton;

CustomButtonTextHover.prototype.Draw = function (gfx) {

    gfx.roundRect(this._X, this._Y,
        this._width, this._height, 6,
        this.color);

    if (this.selected) {
        gfx.roundRect(
            this._X, this._Y, this._width, this._height, 6,
            "rgb(255,255,255)", 0.5);

        var textDistance = 16;
        var center = this._X + (this._width / 2);
        var centerY = this._Y + (this._height / 2) + 12;
        var y = centerY - ((this.textArray.length * textDistance) / 2);

        for (var i = 0; i < this.textArray.length; i++) {

            var ctx = gfx._canvasBufferContext;
            var style = "8pt Androgyne_TB";
            ctx.font = style;
            var text = this.textArray[i];

            // Render Text header
            var textWidth = ctx.measureText(text);
            gfx.DrawText(text,
               center - (textWidth.width / 2),
               y,
               "rgb(0,0,0)",
               style);

            y += textDistance;
        }
    } else {
        this.icon.Draw(gfx, this._X, this._Y);
    }

 
}

/**/
function ImageButtonBorder() {
    
}

ImageButtonBorder.prototype = new CustomImageButton;


ImageButtonBorder.prototype.Update = function (elapsed) {
    //...
}

ImageButtonBorder.prototype.Draw = function (gfx) {

    this.icon.Draw(gfx, this._X, this._Y);
    if (this.selected) {
        gfx.roundRect(
            this._X, this._Y, this._width, this._height, 6,
            "rgb(255,255,255)", this.alpha);
    }
}

ImageButtonBorder.prototype.Select = function () {
    this.selected = true;
}

ImageButtonBorder.prototype.UnSelect = function () {
    this.selected = false;
}

/**/
/* Button that zoomed up during mouse hover*/
/* Created Jan 3, 2015*/
/* Note on Update, Zoom functionality is same as Iconbox class*/
/* They must be placed on the same or common module */
/**/
function ZoomButton()
{
    this.selected = false;
    this.scaledUp = 1.2;
    
    this.zooming_flag = -1; // 0: increase, 1: decrease,-1 normal
    this.state = 0; //0: normal, 1: zoomed, 2: zooming

    this.highlight = true;
    this.hightlightColor = "rgb(233,209,156)";
    this.alpha = 0.5;
}

ZoomButton.prototype = new Button;
ZoomButton.prototype.Load = function (imagepath)
{
    this.selected = false;
    this.icon = new ImageObject();
    this.icon.Load(imagepath);

    this.originalWidth = this.icon._image.width;
    this.originalHeight = this.icon._image.height;
    this._width = this.originalWidth;
    this._height = this.originalHeight;

    this.SIZE_ACCEL = 300;
}

ZoomButton.prototype.Update = function (elapsed) {
    var count = 0;

    //
    //NOTE: Zoom functionality must be placed in a common class or handler
    // SAME as the other animation
    //
    if (this.zooming_flag == 0) {
        if (this._width < this.targetWidth) {
            this._width += (this.SIZE_ACCEL * elapsed);
        } else {
            this._width = this.targetWidth;
            count++;
        }

        if (this._height < this.targetHeight) {
            this._height += (this.SIZE_ACCEL * elapsed);
        } else {
            this._height = this.targetHeight;
            count++;
        }
    } else if (this.zooming_flag ==1){
        var thewidth = this._width - (this.SIZE_ACCEL * elapsed);
        var theheight = this._height - (this.SIZE_ACCEL * elapsed);
        if (thewidth >= this.targetWidth) {
            this._width = thewidth;
        } else {
            this._width = this.targetWidth;
            count++;
        }

        if (theheight > this.targetHeight) {
            this._height = theheight;
        } else {
            this._height = this.targetHeight;
            count++;
        }
    }

    if (count >= 2 && this.zooming_flag != -1) {
 
        if (this.state == 2 && this.zooming_flag == 0)
            this.state = 1; //zoomed
        else if (this.state == 2 && this.zooming_flag == 1) {
            this.state = 0;
        }

        this.zooming_flag = -1;
    }

    if (/*this.zooming_flag != -1*/1) {
        // compute center
        var centerX = this._X + (this.originalWidth / 2);
        var centerY = this._Y + (this.originalHeight/ 2);

        this.newX = centerX - (this._width / 2);
        this.newY = centerY - (this._height / 2);
    } else {
        this.newX = this._X;
        this.newY = this._Y;
    }
}

ZoomButton.prototype.Draw = function (gfx) {

    gfx.DrawImage(this.icon._image, 0, 0,
          this.originalWidth,
          this.originalHeight,
         this.newX, this.newY,
         this._width, this._height, 1.0);

    if (this.selected) {
        if (this.highlight) {
            gfx.roundRect(
                this.newX, this.newY, this._width, this._height, 6,
                this.hightlightColor, this.alpha);
        }
    }
}

ZoomButton.prototype.Select = function () {
    this.selected = true;

    if (this.zooming_flag != 0 && this.state == 0) {
        this.zooming_flag = 0;

        this.targetWidth = this.originalWidth * this.scaledUp;
        this.targetHeight = this.originalHeight * this.scaledUp;

        this.state = 2;
    }

    if (this.hoverAudioPath != null) {
        LoadAndPlay(this.hoverAudioPath);
    }
}

ZoomButton.prototype.UnSelect = function () {
    this.selected = false;

    if (this.zooming_flag != 1 && this.state == 1) {
        this.zooming_flag = 1;

        this.targetWidth = this.originalWidth;
        this.targetHeight = this.originalHeight;
        this.state = 2;
    }
}