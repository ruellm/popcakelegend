/**
    blink_sprite.js
    class for static and blinking only
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created May 8, 2015

    Base from China class for SpiritBubble FB game
*/
function BlinkSprite()
{
    //..
    this.blink = false;
    this.lastTime = 0;
    this.blink_sec = 3;
}

BlinkSprite.prototype = new BaseObject;

BlinkSprite.prototype.Load = function (spritepath, framecount, fps, framewidth)
{
    var context = this;
    this.sprite = new AnimatedObject();
    this.sprite.Load(spritepath);
    this.sprite.Set(framecount, fps, false);
    this.sprite._frameWidth = framewidth;
    this.sprite._fnCallback = (function () {
        context.blink = false;
        context.lastTime = new Date().getTime();
        this.Reset();
    });
}


BlinkSprite.prototype.Update = function (elapsed) {
    //...
    var currTime = new Date().getTime();
    var diff = (currTime - this.lastTime) / 1000;
    if (diff >= this.blink_sec && !this.blink)
        this.blink = true;

    if (this.blink) {
        this.sprite.Update(elapsed);
    }
}

BlinkSprite.prototype.Draw = function (gfx, x ,y) {

    var XOff = this._X;
    var YOff = this._Y;

    if (x) { XOff = x; }
    if (y) { YOff = y; }

    this.sprite._X = XOff;
    this.sprite._Y = YOff;
    this.sprite.Draw(gfx);
}