/**
    iconBox.js
    the game card icon
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created Oct 16, 2012
*/

// iconBox States
var ICONBOX_STATE_OUT = 0;      // not visible, yet to comeout, used for animation for "shuffle", MAYBE not needed
var ICONBOX_STATE_NORMAL = 1;
var ICONBOX_STATE_ZOOMING = 2;   // for animation shuffle from out to normal size
var ICONBOX_STATE_MOUSEHOVER = 3;
var ICONBOX_STATE_FLIP = 4;
var ICONBOX_STATE_MOVING = 5;
var ICONBOX_STATE_ROTATE = 6;

var ICONBOX_WIDTH = 100;
var ICONBOX_HEIGHT = 100;
//var SIZE_ACCEL = 500;
var DEFAULT_ALPHA = 0.5;
var BORDER_OFFSETX = 2;
var BORDER_OFFSETY = 1;

function IconBox() {
    
    this.id = -1;       // ID index during the game itself

    this.type = 0;      // the face of each Card
    this.isOpen = false;

    this.fnAnimationDone = null;
    this.fnAnimateComplete = null;

    this.boxImage = null;
    this.faceImage = null;
    this.borderImage = null;
    this.newX = 0;
    this.newY = 0;

    this._width = ICONBOX_WIDTH;
    this._height = ICONBOX_HEIGHT;
    this.fixwid = ICONBOX_WIDTH;
    this.fixhei = ICONBOX_HEIGHT;

    this.state = ICONBOX_STATE_NORMAL;

    this.zooming_flag = 0; // 0: increase, 1: decrease
    this.selected = false;

    this.visible = false;

    // Hack!
    this.done = false;
    this.freeze = false;

    this.SIZE_ACCEL = 500;

    this.angle = 0;
    this.target_angle = 0;

    this.dirX = 0; //0: none, 1: positive, 2: negative
    this.dirY = 0; //0: none, 1: positive, 2: negative
    this.targetX = 0;
    this.targetY = 0;
    this.audio = null;
}

IconBox.prototype = new Button;

IconBox.prototype.Load = function () {
    this.boxImage = new ImageObject();
    this.boxImage.Load("images/ingame/icon-box.png");

    this.borderImage = new ImageObject();
    this.borderImage.Load("images/ingame/icon-border.png");

    this.canvas = document.createElement('canvas');
    this.canvas.width = ICONBOX_WIDTH + BORDER_OFFSETX;
    this.canvas.height = ICONBOX_HEIGHT + BORDER_OFFSETY;
    this.context = this.canvas.getContext('2d');

}

IconBox.prototype.LoadFace = function (type) {
    var images = [
    // The icon definitions
        "images/ingame/icon-pink-popcake.png",
        "images/ingame/icon-pink-cupcake.png",
        "images/ingame/icon-pink-eclair.png",

        "images/ingame/icon-green-popcake.png",
        "images/ingame/icon-green-cupcake.png",
        "images/ingame/icon-green-eclair.png",

        "images/ingame/icon-white-popcake.png",
        "images/ingame/icon-white-cupcake.png",
        "images/ingame/icon-white-eclair.png",

        "images/ingame/icon-neutral.png",
        "images/ingame/icon-brown-popcake.png",
        "images/ingame/icon-brown-cupcake.png",
        "images/ingame/icon-brown-eclair.png",

        "images/ingame/football-pink.png",
        "images/ingame/football-green.png",
        "images/ingame/football-white.png",
        "images/ingame/football-brown.png",

        "images/ingame/marmalade-pink.png",
        "images/ingame/marmalade-green.png",
        "images/ingame/marmalade-white.png",
        "images/ingame/marmalade-brown.png",


     ];

    this.faceImage = new ImageObject();
    this.faceImage.Load(images[type]);
    this.type = type;
}

IconBox.prototype.InitialState = function () {
    this._width = 2;
    this._height = 2;
    this.visible = false;
}

IconBox.prototype.In = function () {
    this.state = ICONBOX_STATE_ZOOMING;

    // default size if state is OUT
    this.InitialState();
    this.zooming_flag = 0;
    this.visible = true;
    //SIZE_ACCEL = 30;

    var bounce_offset = 10;
    this.targetWidth = ICONBOX_WIDTH + bounce_offset;
    this.targetHeight = ICONBOX_HEIGHT + bounce_offset;
  
    //lets set this to something
    var context = this;
    this.fnAnimationDone = function () {
        this.targetWidth = ICONBOX_WIDTH;
        this.targetHeight = ICONBOX_HEIGHT;
          
        LoadAndPlay("Build-Board");

        context.fnAnimationDone = function () {
            context.state = ICONBOX_STATE_NORMAL;

            if (context.fnAnimateComplete) {
                context.fnAnimateComplete();
            }
        }
    };
}
 
IconBox.prototype.Flip = function () {

    if (this.state != ICONBOX_STATE_NORMAL) return;
    if (this.freeze) {
        if (this.fnAnimateComplete) {
            this.fnAnimateComplete();
        }
        return;
    }

    if (this.done) return;

    this.state = ICONBOX_STATE_ZOOMING;
    this.targetWidth = 1;
    this.zooming_flag = 1;
    var context = this;

    //if this is flipping back
    if(this.isOpen)
        LoadAndPlay("Flip-No-Success");

    //SIZE_ACCEL = 60;
    this.fnAnimationDone = function () {
        context.zooming_flag = 0;
        context.targetWidth = this.fixwid;
        context.isOpen = !context.isOpen;
        context.fnAnimationDone = function () {
            context.state = ICONBOX_STATE_NORMAL;
            if (context.fnAnimateComplete) {
                context.fnAnimateComplete();
            }
        }
    };
}
IconBox.prototype.Rotate = function (target_angle)
{
    this.target_angle = target_angle;

    if (this.angle > this.target_angle)
        this.dirX = 0;
    else
        this.dirX = 1;

    this.state = ICONBOX_STATE_ROTATE;
}

///////////////////////////////////////////////////////
IconBox.prototype.GoTo = function (targetX, targetY)
{
    if (targetX- this._X > 0) {
        this.dirX = 1;
    } else {
        this.dirX = 2;
    }
    
    if (targetY - this._Y > 0) {
        this.dirY = 1;
    } else {
        this.dirY = 2;
    }

    this.targetX = targetX;
    this.targetY = targetY;

    this.state = ICONBOX_STATE_MOVING;
}
///////////////////////////////////////////////////////

IconBox.prototype.Update_Zooming = function (elapsed) {
    var count = 0;

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
    } else {
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

    if (count >= 2) {
        if (this.fnAnimationDone) {
            this.fnAnimationDone();
        }
    }
}
IconBox.prototype.Update_Moving = function (elapsed)
{
    var count = 0;
    var MOVE_ACCEL = 400;
    if (this.dirX == 1) {
        if (this._X < this.targetX) {
            this._X += (MOVE_ACCEL * elapsed);
        } else {
            this._X = this.targetX;
            count++;            
        }
    } else if (this.dirX == 2) {
        if (this._X > this.targetX) {
            this._X -= (MOVE_ACCEL * elapsed);
        } else {
            this._X = this.targetX;
            count++;
        }
    }

    if (this.dirY == 1) {
        if (this._Y < this.targetY) {
            this._Y += (MOVE_ACCEL * elapsed);
        } else {
            this._Y = this.targetY;
            count++;
        }
    } else if (this.dirY == 2) {
        if (this._Y > this.targetY) {
            this._Y -= (MOVE_ACCEL * elapsed);
        } else {
            this._Y = this.targetY;
            count++;
        }
    }

    if (count >= 2) {
        this.state = ICONBOX_STATE_NORMAL;
        if (this.fnAnimateComplete) {
            this.fnAnimateComplete();
        }
    }
}
IconBox.prototype.Update_Rotate = function (elapsed)
{
    var ROTATE_FRICTION = 200;
    var done = false;
    if (this.dirX == 0) {
        this.angle -= (ROTATE_FRICTION * elapsed);
        if (this.angle <= this.target_angle) {
            done = true;
        }
    } else {
        this.angle += (ROTATE_FRICTION * elapsed);
        if (this.angle >= this.target_angle) {
            done = true;
        }
    }
    
    if (done) {
        this.state = ICONBOX_STATE_NORMAL;
        this.angle = this.target_angle;
        if (this.fnAnimateComplete) {
            this.fnAnimateComplete();
        }    
    }
}

IconBox.prototype.Update = function (elapsed) {

    if (this.state == ICONBOX_STATE_ZOOMING) {
        this.Update_Zooming(elapsed);
    } else if (this.state == ICONBOX_STATE_MOVING) {
        this.Update_Moving(elapsed);
    } else if (this.state == ICONBOX_STATE_ROTATE) {
        this.Update_Rotate(elapsed);
    }

    //COmpute the X and the Y
    //this should be at center
    if (this.state != ICONBOX_STATE_NORMAL) {
        // compute center
        var centerX = this._X + (this.GetWidth() / 2);
        var centerY = this._Y + (this.GetHeight() / 2);

        this.newX = centerX - (this._width / 2);
        this.newY = centerY - (this._height / 2);
    } else {
        this.newX = this._X;
        this.newY = this._Y;
    }
}
IconBox.prototype.GetWidth = function () {
    return ICONBOX_WIDTH;
}
IconBox.prototype.GetHeight = function () {
    return ICONBOX_HEIGHT;
}
IconBox.prototype.Draw = function (gfx) {

    if (!this.visible) return;

    var context = gfx._canvasBufferContext;
    gfx._canvasBufferContext = this.context;

    this.context.clearRect(0, 0,
            ICONBOX_WIDTH + BORDER_OFFSETX,
            ICONBOX_HEIGHT + BORDER_OFFSETY);


    if (this.state == ICONBOX_STATE_NORMAL) {
        this.borderImage.Draw(gfx, BORDER_OFFSETX, BORDER_OFFSETY);
    }
        
    gfx.DrawImage(this.boxImage._image, 0, 0,
         ICONBOX_WIDTH, ICONBOX_HEIGHT,
         0, 0,
         ICONBOX_WIDTH, ICONBOX_HEIGHT, 1.0);

    // Draw the image here too 
    if (this.isOpen && this.faceImage) {
        // Draw content
        gfx.DrawRotateFull(0, 0,
            this.faceImage._image.width / 2,
             this.faceImage._image.height / 2,
             this.angle,
             this.faceImage._image,
             1.0);

        //this.faceImage.Draw(gfx, 0, 0);
    }

    if (this.selected) {
        gfx.FillRect(0, 0,
        ICONBOX_WIDTH, ICONBOX_HEIGHT,
        "rgb(241,104,34)"/*"rgb(99,36,111)"*/, 0.20);
    }

    gfx._canvasBufferContext = context;
    /*gfx.DrawImage(this.canvas, 0, 0,
           ICONBOX_WIDTH + BORDER_OFFSETX, 
           ICONBOX_HEIGHT + BORDER_OFFSETY,
           this.newX, this.newY,
           this._width, this._height, 1.0);*/

    gfx.DrawRotate(this.canvas, 0, 0,
       ICONBOX_WIDTH, ICONBOX_HEIGHT,
       this.newX, this.newY,
       this._width, this._height, 1.0,
       this.boxImage._image.width / 2,
       this.boxImage._image.height / 2,
       this.angle);
}

IconBox.prototype.Select = function () {
    this.selected = true;
}

IconBox.prototype.UnSelect = function () {
    this.selected = false;
}

/************************/
/****Small Icon box*****/
/**********************/
var SMALL_ICONBOX_WIDTH = 50;
var SMALL_ICONBOX_HEIGHT = 50;

function SmallIconBox () {
    this._width = SMALL_ICONBOX_WIDTH;
    this._height = SMALL_ICONBOX_HEIGHT;

    this.fixwid = SMALL_ICONBOX_WIDTH;
    this.fixhei = SMALL_ICONBOX_HEIGHT;
    this.isOpen = true;
}

SmallIconBox.prototype = new IconBox;


SmallIconBox.prototype.Resize = function (sizetype)
{
    if (sizetype == 0) {
        this._width = 60;
        this._height = 60;
    } else if (sizetype == 1) {
        this._width = 45;
        this._height = 45;

    }

    this.fixwid = this._width;
    this.fixhei = this._height;
}

SmallIconBox.prototype.In = function () {
    this.state = ICONBOX_STATE_ZOOMING;

    // default size if state is OUT
    this.InitialState();
    this.zooming_flag = 0;
    this.visible = true;

    var bounce_offset = 0;
    this.targetWidth = this.fixwid;
    this.targetHeight = this.fixhei;

    //lets set this to something
    var context = this;
    this.fnAnimationDone = function () {
        context.state = ICONBOX_STATE_NORMAL;

        if (context.fnAnimateComplete) {
            context.fnAnimateComplete();
        }
    };
}

SmallIconBox.prototype.GetWidth = function () {
    return this.fixwid;
}

SmallIconBox.prototype.GetHeight = function () {
    return SMALL_ICONBOX_HEIGHT;
}
