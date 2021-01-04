﻿/**
    The class for animated object in the game.
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created Oct 01, 2012
*/
function AnimatedObject() {
        // Total animation frames
        this._frameCount = 1.0;

        // current frame
        this._currentFrame = 0;

        // animation frame width
        this._frameWidth = 0;

        // the loop flag, if this animation should loop
        this._bLoop = true;

        // function callback once animation is done
        // this is not called if animation is loopeable
        this._fnCallback = null;

        //we use animator to interpolate animation frame
        this._animator = new Animator();

        this.called = false;
}

// inherit its attributes to Scene Object class
AnimatedObject.prototype = new ImageObject;

AnimatedObject.prototype.Set =
    function ( /**Number*/ frameCount, /**Number*/ fps,/**Bool*/loop) {
            this._bLoop = loop;
            this._animator.Set(fps);
            this._frameCount = frameCount;
            //this._frameWidth = this._image.width / frameCount;
    }

AnimatedObject.prototype.Reset = function () {
        if (this._currentFrame == this._frameCount - 1) {
                this._currentFrame = 0;
                this.called = false;
        }
}

AnimatedObject.prototype.Update = function (/**Number*/elapsed) {
        if (this._animator.Update(elapsed)) {
                ++this._currentFrame;
                if (this._bLoop) {
                        this._currentFrame %= this._frameCount;
                } else if (this._currentFrame >= this._frameCount) {
                        this._currentFrame = this._frameCount - 1;
                        if (this._fnCallback) {
                                //this._fnCallback();
                                if (this._bLoop == false && this.called == false) {
                                        //this._fnCallback.apply(AnimatedObject);
                                    this.called = true;
                                    this._fnCallback();                                    
                                }
                        }
                }
        }
}

AnimatedObject.prototype.Draw = function (/**Graphics*/gfx, x, y) {
        //get the current animation frame
        var sourceX = this._frameWidth * this._currentFrame;
        var XOff = this._X;
        var YOff = this._Y;

        //
        //TODO: TBD Decide on where to put this condition
        //
        if (!this._visible) return;

        if (x) { XOff = x; }
        if (y) { YOff = y; }

		if(this._image == null) return;
		
        //draw the frame
        gfx.DrawImage(this._image, sourceX, 0, this._frameWidth, this._image.height,
           XOff, YOff, this._frameWidth, this._image.height, this._alpha);
}


    // Added 06/01/2014
AnimatedObject.prototype.DrawRotate = function (gfx, angle) {
    //get the current animation frame
    var sourceX = this._frameWidth * this._currentFrame;
    var XOff = this._X;
    var YOff = this._Y;

    if (!this._visible) return;

    //draw Rotated frame
    gfx.DrawRotate(this._image,
            sourceX, 0, 
            this._frameWidth, this._image.height,
            XOff, YOff,
            this._frameWidth, this._image.height, 
            this._alpha,
            this._frameWidth / 2, 
            this._image.height/2, angle);
             
}


AnimatedObject.prototype.Destroy = function () {
        // objects destructor
        this.BaseDestroy();
        if (this._animator != null) {
                delete this._animator;
                this._animator = null;
        }
}