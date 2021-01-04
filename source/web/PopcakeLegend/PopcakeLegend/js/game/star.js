/**
    star.js
    The star object during challenge complete
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created Oct 18, 2012
*/

var STAR_STATE_NORMAL = 0;
var STAR_STATE_COMMING_IN= 1;

var STAR_NORMAL_WIDTH = 70;
var STAR_NORMAL_HEIGHT = 70;

function Star() {
    this._width = 0;
    this._height = 0;
    this.image = new ImageObject();
    this.image.Load("images/ingame/star.png");

    this.state = STAR_STATE_NORMAL;
    this.newX = 0;
    this.newY = 0;

    this._width = STAR_NORMAL_WIDTH;
    this._height = STAR_NORMAL_HEIGHT;

    this.targetWidth = STAR_NORMAL_WIDTH;
    this.targetHeight = STAR_NORMAL_HEIGHT;

    this.fnAnimateComplete = null;

    this.visible = true;
}

Star.prototype = new BaseObject;

Star.prototype.EnterAnimate = function () {
    this._width = 300;
    this._height = 300;

    this.targetWidth = STAR_NORMAL_WIDTH;
    this.targetHeight = STAR_NORMAL_HEIGHT;
    this.state = STAR_STATE_COMMING_IN;
    this.visible = true;
}

Star.prototype.Update = function (elapsed) {
    var count = 0;
    if (this.state == STAR_STATE_COMMING_IN) {
        var ACCEL = 500;
        if (this._width > this.targetWidth) {
            this._width -= (ACCEL * elapsed);
        } else {
            this._width = this.targetWidth;
            count++;
        }

        if (this._height > this.targetHeight) {
            this._height -= (ACCEL * elapsed);
        } else {
            this._height = this.targetHeight;
            count++;
        }

        if (count >= 2) {
            this.state = STAR_STATE_NORMAL;
            if (this.fnAnimateComplete) {
                this.fnAnimateComplete();
            }
        }

    }

    //COmpute the X and the Y
    //this should be at center
    if (this.state != STAR_STATE_NORMAL) {
        // compute center
        var centerX = this._X + (STAR_NORMAL_WIDTH / 2);
        var centerY = this._Y + (STAR_NORMAL_HEIGHT / 2);

        this.newX = centerX - (this._width / 2);
        this.newY = centerY - (this._height / 2);
    } else {
        this.newX = this._X;
        this.newY = this._Y;

    }
}

Star.prototype.Draw = function (gfx) {

    if (this.visible == false) return;
    gfx.DrawImage(this.image._image, 0, 0,
          this.image._image.width, this.image._image.height,
           this.newX, this.newY,
           this._width, this._height, 1.0);
}