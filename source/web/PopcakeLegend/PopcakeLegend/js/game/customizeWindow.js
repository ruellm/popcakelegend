/**
    customImageButton.js
    Customization window
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created Dec 31, 2014
*/

var CUSTOMIZE_WINDOW_STATE_NORMAL = 0;
var CUSTOMIZE_WINDOW_STATE_POPUP = 1631;
var CUSTOMIZE_WINDOW_STATE_LOADTHEME = CUSTOMIZE_WINDOW_STATE_POPUP + 1;
var CUSTOMIZE_WINDOW_STATE_END = CUSTOMIZE_WINDOW_STATE_LOADTHEME + 1;
var CUSTOMIZE_WINDOW_STATE_MSGBOX = CUSTOMIZE_WINDOW_STATE_LOADTHEME + 1;

function CustomizeWindow()
{
    //...
    this.state = 0;
}

CustomizeWindow.prototype = new SlideWindow;

CustomizeWindow.prototype.Load = function () {
    var context = this;
    this.observer = new Array();
    this.observer_origY = new Array();

    this._uimanager = new UIManager();

    this.image = new ImageObject();
    this.image.Load("images/pop_ups/600x500-window-screen.png");

    this._X = (DEFAULT_WINDOW_WIDTH / 2) - (this.image._image.width / 2);
    this.targetY = (DEFAULT_WINDOW_HEIGHT / 2) - (this.image._image.height / 2) - 25;
    this._Y = this.targetY;

    var close = new Button;
    close.LoadImages(
         "images/pop_ups/close-button.png",
        "images/pop_ups/close-hover-button.png",
	    "images/pop_ups/close-button.png");

    close._Y = 115;
    close._width = 41;
    close._height = 39;
    close._X = (DEFAULT_WINDOW_WIDTH / 2) + 258;
    close._fnMouseDownEvnt = (function () {

        context.targetY = DEFAULT_WINDOW_HEIGHT;
        context.state = SLIDE_WINDOW_STATE_OUT;
        context.fnAnimDone = function () {
            if (context.fnClose) {
                context.fnClose();
            }
        }
    });

    var offset = close._Y - this._Y;
    this.observer.push(close);
    this.observer_origY.push(offset);
    this._uimanager.Add(close);

    this.heading = new ImageObject();
    this.heading.Load("images/customization/customization-heading.png");

    var left = new Button;
    left.LoadImages(
        "images/customization/left-arrow.png",
        "images/customization/left-arrow-hover.png",
	    "images/customization/left-arrow.png");

    left._Y = 375;
    left._width = 29;
    left._height = 27;
    left._X = this._X +25;
    left._fnMouseDownEvnt = (function () {
        //...
    });

    var offset = left._Y - this._Y;
    this.observer.push(left);
    this.observer_origY.push(offset);
    this._uimanager.Add(left);

    var right = new Button;
    right.LoadImages(
         "images/customization/right-arrow.png",
         "images/customization/right-arrow-hover.png",
	     "images/customization/right-arrow.png");

    right._Y = 375;
    right._width = 29;
    right._height = 27;
    right._X = this._X + 533;
    right._fnMouseDownEvnt = (function () {
           //...
    });

    var offset = right._Y - this._Y;
    this.observer.push(right);
    this.observer_origY.push(offset);
    this._uimanager.Add(right);

    this.LoadOptions();
    
}

CustomizeWindow.prototype.LoadOptions = function ()
{
    this.customize_icons = new Array();
    var icons_list = [
         "images/themes/default/theme-1.png",
         "images/themes/sample/theme-2.png"
    ];




    for (var m = 0; m < icons_list.length; m++) {
        this.customize_icons[m] = new ImageObject();
        this.customize_icons[m].Load(icons_list[m]);
    }

    var x = this._X + 58;
    var context = this;
    for (var i = 0; i < 2; i++) {
        /*var btn1 = new ImageButtonBorder;
        btn1.Load(
            icons_list[i],
            233, 182, "rgb(233,209,156)");*/
        var btn1 = new ZoomButton;
        btn1.Load(icons_list[i]);

        btn1._Y = 285;
        btn1._X = x;
        btn1.alpha = 0.3;
        btn1.id = i;
        btn1.scaledUp = 1.05;
        btn1._fnMouseDownEvnt = (function () {
            context.OnClickItem(this.id);
        });

        var _offset = btn1._Y - this._Y;
        this._uimanager.Add(btn1);
        this.observer.push(btn1);
        this.observer_origY.push(_offset);

        x += 240;
    }
}


CustomizeWindow.prototype.OnClickItem = function (id)
{
    var context = this;
    this.targetY = DEFAULT_WINDOW_HEIGHT;
    this.state = SLIDE_WINDOW_STATE_OUT;
    this.fnAnimDone = function () {
        context.state = CUSTOMIZE_WINDOW_STATE_POPUP;
        context.customize = new CustomizeDetailPopUp();
        context.customize.id = id;
        context.customize.Load();
        context.customize.Show();
        context.customize.fnClose = function () {

            if (context.customize.status != 0) {
                context.state = CUSTOMIZE_WINDOW_STATE_MSGBOX;
                context.objectiveWindow = new ObjectiveWindow;
                context.objectiveWindow.Load();
                context.objectiveWindow.Show();
                context.objectiveWindow.msg = context.customize.status;
                context.objectiveWindow.fnClose = function () {
                    context.state = 0;
                    context.Load();
                    context.Show();
                };
            } else {
                    context.state = 0;
                 context.Load();
                 context.Show();
            }
        };
    };
}

CustomizeWindow.prototype.Update = function (elapsed) {

    if (this.state == CUSTOMIZE_WINDOW_STATE_POPUP) {
        this.customize.Update(elapsed);
        return;
    } else if (this.state == CUSTOMIZE_WINDOW_STATE_MSGBOX) {
        this.objectiveWindow.Update(elapsed);
        return;
    }

    this.UpdateBase(elapsed);
    this._uimanager.Update(elapsed);
        
}

CustomizeWindow.prototype.Draw = function (gfx) {
    gfx.FillRect(0, 0, DEFAULT_WINDOW_WIDTH, DEFAULT_WINDOW_HEIGHT,
       "rgb(0,0,0)", 0.4);

    this.image.Draw(gfx, this._X, this._Y);
    this._uimanager.Draw(gfx);

    this.heading.Draw(gfx,
        (DEFAULT_WINDOW_WIDTH / 2) - (this.heading._image.width / 2),
        this._Y + 50);


    if (this.state != 0 && this.state < CUSTOMIZE_WINDOW_STATE_POPUP) {
        return;
    }

    var ctx = gfx._canvasBufferContext;
    style = "17pt DJBCHALKITUP";
    ctx.font = style;
    var message = ["Track your progress and see your friends’ statistics!",
        CUSTOM_THEME_PRICE + " Chococoins only"];

    var y = this._Y + 390;
    for (var i = 0; i < message.length; i++) {
        var text = message[i]

        // Render Text header
        var textWidth = ctx.measureText(text);
        gfx.DrawText(text,
           (DEFAULT_WINDOW_WIDTH / 2) - (textWidth.width / 2),
           y,
           "rgb(255,255,255)",
           style);

        y += 33;
    }

    if (this.state == CUSTOMIZE_WINDOW_STATE_POPUP) {
        this.customize.Draw(gfx);
    } else if (this.state == CUSTOMIZE_WINDOW_STATE_MSGBOX) {
        this.objectiveWindow.Draw(gfx);
    }
}

CustomizeWindow.prototype.Show = function () {
    this._X = (DEFAULT_WINDOW_WIDTH / 2) - (this.image._image.width / 2);
    this._Y = -this.image._image.height;
    this.state = SLIDE_WINDOW_STATE_IN;

    this.UpdateOffsets();
}


CustomizeWindow.prototype.EventHandler = function (e) {

    if (this.state == CUSTOMIZE_WINDOW_STATE_POPUP) {
        this.customize.EventHandler(e);
        return;
    } else if (this.state == CUSTOMIZE_WINDOW_STATE_MSGBOX) {
        this.objectiveWindow.EventHandler(e);
        return;
    }
    this.EventHandlerBase(e);
}

/**/
/**/
/**/
function CustomizeDetailPopUp()
{
    this.id = 0;
    this.state = 0;
}

CustomizeDetailPopUp.prototype = new SlideWindow;

CustomizeDetailPopUp.prototype.Close = function ()
{
    var context = this;
    this.targetY = DEFAULT_WINDOW_HEIGHT;
    this.state = SLIDE_WINDOW_STATE_OUT;
    this.fnAnimDone = function () {
        if (this.fnClose) {
            this.fnClose();
        }
    }
}

CustomizeDetailPopUp.prototype.Load = function () {
    var context = this;
    this.observer = new Array();
    this.observer_origY = new Array();

    this._uimanager = new UIManager();

    this.image = new ImageObject();
    this.image.Load("images/pop_ups/600x500-window-screen.png");

    this._X = (DEFAULT_WINDOW_WIDTH / 2) - (this.image._image.width / 2);
    this.targetY = (DEFAULT_WINDOW_HEIGHT / 2) - (this.image._image.height / 2) - 25;
    this._Y = this.targetY;

    var close = new Button;
    close.LoadImages(
         "images/pop_ups/close-button.png",
        "images/pop_ups/close-hover-button.png",
	    "images/pop_ups/close-button.png");

    close._Y = 115;
    close._width = 41;
    close._height = 39;
    close._X = (DEFAULT_WINDOW_WIDTH / 2) + 258;
    close._fnMouseDownEvnt = (function () {
        context.Close();        
    });

    var offset = close._Y - this._Y;
    this.observer.push(close);
    this.observer_origY.push(offset);
    this._uimanager.Add(close);

    var gap = 84;
    var x = (DEFAULT_WINDOW_WIDTH / 2) - ((gap * 2) / 2);
    var y = 540;
    
    var yes = new Button;
    yes.LoadImages(
         "images/customization/yes-button.png",
        "images/customization/yes-button-hover.png",
	    "images/customization/yes-button.png");

    yes._Y = y;
    yes._width = 47;
    yes._height = 47;
    yes._X = x;
    yes._fnMouseDownEvnt = (function () {
        context.DoLoad();
    });

    var offset = yes._Y - this._Y;
    this.observer.push(yes);
    this.observer_origY.push(offset);
    this._uimanager.Add(yes);

    x += gap;

    var no = new Button;
    no.LoadImages(
        "images/customization/no-button.png",
        "images/customization/no-button-hover.png",
	    "images/customization/no-button.png");

    no._Y = y;
    no._width = 47;
    no._height = 47;
    no._X = x;
    no._fnMouseDownEvnt = (function () {
        context.Close();
    });

    var offset = no._Y - this._Y;
    this.observer.push(no);
    this.observer_origY.push(offset);
    this._uimanager.Add(no);

    var image = [
        "images/themes/default/theme-1-large.png",
        "images/themes/sample/theme-2-large.png"
    ];
    this.icon = new ImageObject();
    this.icon.Load(image[this.id]);

    this.status = 0; //0: no error, 1: not enough coin, 2: already using the theme


    this.loading_icon = new AnimatedObject();
    this.loading_icon.Load("images/customization/loading-image.png");
    this.loading_icon.Set(9, 5.0, true);
    this.loading_icon._frameWidth = 339.33;
}

CustomizeDetailPopUp.prototype.Update = function (elapsed) {
    if (this.state == CUSTOMIZE_WINDOW_STATE_LOADTHEME) {
        this.loading_icon.Update(elapsed);
        if (this.animator.Update(elapsed)) {
            loading_dots = (loading_dots + 1) % 4;

            if (g_imageResourceList.length + g_errorImageList.length >=
                g_resourceLoadCount) {
                this.SwitchTheme();
                this.state = CUSTOMIZE_WINDOW_STATE_END;
            }
        }
        return;
    }
    this.UpdateBase(elapsed);
    this._uimanager.Update(elapsed);

}

var loading_dots = 0;
CustomizeDetailPopUp.prototype.Draw = function (gfx) {
    gfx.FillRect(0, 0, DEFAULT_WINDOW_WIDTH, DEFAULT_WINDOW_HEIGHT,
       "rgb(0,0,0)", 0.4);

    this.image.Draw(gfx, this._X, this._Y);
    this._uimanager.Draw(gfx);

    this.icon.Draw(gfx, (DEFAULT_WINDOW_WIDTH / 2) - (this.icon._image.width/2),
        this._Y + 35);

    if (this.state != 0 &&
        this.state < CUSTOMIZE_WINDOW_STATE_POPUP
        /*&&
        this.state != CUSTOMIZE_WINDOW_STATE_LOADTHEME && 
        this.state != CUSTOMIZE_WINDOW_STATE_END*/ )
        return;

    var ctx = gfx._canvasBufferContext;
    style = "20pt DJBCHALKITUP";
    ctx.font = style;
    var text = "Do you want to customize?";

        // Render Text header
   var textWidth = ctx.measureText(text);
    gfx.DrawText(text,
           (DEFAULT_WINDOW_WIDTH / 2) - (textWidth.width / 2),
           this._Y + 404,
           "rgb(255,255,255)",
           style);

    if (this.state == CUSTOMIZE_WINDOW_STATE_LOADTHEME) {
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
    } 
}

CustomizeDetailPopUp.prototype.Show = function () {
    this._X = (DEFAULT_WINDOW_WIDTH / 2) - (this.image._image.width / 2);
    this._Y = -this.image._image.height;
    this.state = SLIDE_WINDOW_STATE_IN;

    this.UpdateOffsets();
}

CustomizeDetailPopUp.prototype.DoLoad = function ()
{

    if(g_gameData.coins - CUSTOM_THEME_PRICE < 0 
		&& g_gameData.spv_flag == 0)
    {        
        this.status = ["Not Enough Chococoins!"];
    } else if (g_gameData.theme == this.id)
    {
        this.status = ["You are already using","the selected theme"];
    }

    if (this.status != 0)
    {
        this.Close();
        return;
    }

    if (LoadTheme(this.id)) {
        this.SwitchTheme();
    } else {
        this.state = CUSTOMIZE_WINDOW_STATE_LOADTHEME;
        this.animator = new Animator();
        this.animator.Set(5);
    }
}

CustomizeDetailPopUp.prototype.SwitchTheme = function ()
{
    // IF player already purchased
    // we dont credit it back
	if( g_gameData.spv_flag == 0) {
		Credit_Coins(CUSTOM_THEME_PRICE);
	}
    
	SetTheme(this.id);
    g_Engine.SetState(MAIN_MENU_STATE);
    
    //Hack solution - May 3, 2015 - Floyd vs Pac
    g_Engine.GetState(GENERAL_LEVEL_STATE).LoadTheme();
}

CustomizeDetailPopUp.prototype.EventHandler = function (e) {
    if (this.state == CUSTOMIZE_WINDOW_STATE_LOADTHEME) {
        return;
    }

    this.EventHandlerBase(e);
}

