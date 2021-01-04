/**
    glowImage.js
    the glowing image object
    alpha transition for image to get the glow effect
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created Oct 18, 2012
*/
var GLOW_ALPHA_ACCEL = 3;

function GlowImage() {

    this.image = null;
    this.speed = 0;
    this.alpha = 0;
    this.dir = 0;

    this._width = 0;
    this._height = 0;
}

GlowImage.prototype = new BaseObject;

GlowImage.prototype.Load = function (imgpath, speed) {
    this._animator = new Animator();
    this._animator.Set(speed);

    this.image = new ImageObject();
    this.image.Load(imgpath);
    
    this._width = this.image._image.width;
    this._height = this.image._image.height;

    this.alpha = 0;
    this.dir = 0;
}

GlowImage.prototype.Update = function (elapsed) {
    if (this._animator.Update(elapsed)) {

        if (this.dir == 0) {
            this.alpha += (GLOW_ALPHA_ACCEL * elapsed);

            if (this.alpha >= 1.0) {
                this.alpha = 1.0;
                this.dir = 1;
            }
        } else if (this.dir == 1) {
            this.alpha -= (GLOW_ALPHA_ACCEL * elapsed);

            if (this.alpha <= 0.5) {
                this.alpha = 0.5;
                this.dir = 0;
            }
        }
    }
}

GlowImage.prototype.Draw = function (gfx) {
    gfx.DrawImageFullA(this.image._image,
        this._X, this._Y, this.alpha);
}

GlowImage.prototype.DrawResize = function (gfx)
{
    gfx.DrawImage(this.image._image, 0, 0,
        this.image._image.width, this.image._image.height,
        this._X, this._Y, this._width, this._height,this.alpha);
}