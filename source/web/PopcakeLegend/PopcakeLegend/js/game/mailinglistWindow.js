/**
  *  mailinglistWindow.js
  *  The mailing list window
  *  Author: Ruell Magpayo <ruellm@yahoo.com>
  *  Created: Oct 10, 2015
  * 
*/

function MailingListWindow() {
    //...
    this.state = 0;
    this._X = 0;
    this._Y = 0;
    this.targetY = 0;
    this.image = null;
    this.fnClose = null;
}

MailingListWindow.prototype = new SlideWindow;

MailingListWindow.prototype.Close = function () {
    var context = this;
    this.targetY = DEFAULT_WINDOW_HEIGHT;
    this.state = SLIDE_WINDOW_STATE_OUT;
    this.fnAnimDone = function () {
        if (context.fnClose) {
            context.fnClose();
        }
    };
}

MailingListWindow.prototype.Load = function () {
    var context = this;
    this.observer = new Array();
    this.observer_origY = new Array();

    this._uimanager = new UIManager();

    this.image = new ImageObject();
    this.image.Load("images/pop_ups/chalkboard589x589.png");

    this._X = (DEFAULT_WINDOW_WIDTH / 2) - (this.image._image.width / 2);
    this.targetY = (DEFAULT_WINDOW_HEIGHT / 2) - (this.image._image.height / 2)-50;
    this._Y = this.targetY;

  /*  var close = new Button;
    close.LoadImages(
         "images/pop_ups/close-button.png",
        "images/pop_ups/close-hover-button.png",
	    "images/pop_ups/close-button.png");

    close._Y = 190;
    close._width = 41;
    close._height = 39;
    close._X = (DEFAULT_WINDOW_WIDTH / 2) + 170;
    close._fnMouseDownEvnt = (function () {

        if (context.checkbox.checked == true) {
            // the player opts out of the mailing list
            Ajax_SetEmail("opt-out");
            g_gameData.mail_list_subscribe = 1;
        }

        context.Close();
    });

    var close_offset = close._Y - this._Y;
    this._uimanager.Add(close);
    this.observer.push(close);
    this.observer_origY.push(close_offset);

    this.professor = new ImageObject();
    this.professor.Load("images/mailing_list/professor.png");
*/
    this.header = new ImageObject();
    this.header.Load("images/mailing_list/Subscribe Text.png");

    this.newsletter = new ImageObject();
    this.newsletter.Load("images/mailing_list/Newsletter Icon.png");

    this.textMsg = new ImageObject();
    this.textMsg.Load("images/mailing_list/Join Text.png");

  /*  var join = new Button;
    join.LoadImages(
         "images/mailing_list/button-join.png",
         "images/mailing_list/join-button-hover.png",
	    "images/mailing_list/button-join.png");

    join._Y = 440;
    join._width = 71;
    join._height = 35;
    join._X = (DEFAULT_WINDOW_WIDTH / 2) - (join._width / 2);
    join._fnMouseDownEvnt = (function () {
		FBAccess_GetEmail();
        g_gameData.mail_list_subscribe = 1;
		context.Close();
    });

    var join_offset = join._Y - this._Y;
    this._uimanager.Add(join);
    this.observer.push(join);
    this.observer_origY.push(join_offset);

    this.checkbox = new CheckBoxCtrl;
    this.checkbox.Load(
        20,20,
        "rgb(255,255,255)",
        "rgb(243,113,36)",
        "Do not ask me again.",
        "rgb(255, 255, 255)",
         "15pt DJBCHALKITUP"
        );
    this.checkbox._X = this._X + 77;
    this.checkbox._Y = 405;
    this.checkbox.textDistance = 10;

    var _offset = this.checkbox._Y - this._Y;
    this._uimanager.Add(this.checkbox);
    this.observer.push(this.checkbox);
    this.observer_origY.push(_offset);
	*/
	
	var button_list = [
		[
			"images/mailing_list/join button.png",
			"images/mailing_list/join button hover.png",
		],
		[
			"images/mailing_list/maybe later button.png",
			"images/mailing_list/maybe later button hover.png",		
		],
		[
			"images/mailing_list/no thanks button.png",
			"images/mailing_list/no thanks button hover.png",
		]
	];
	
	var buttonDist = 40;
	var buttonWidt = 113 + buttonDist;
	var buttonX = (DEFAULT_WINDOW_WIDTH / 2) - (((buttonWidt) * 3)/2);
	
	for(var i=0; i < 3;i++){
		
		var button = new Button;
		button.LoadImages(
			button_list[i][0],
			button_list[i][1],
			button_list[i][0]);

		button._Y = 510;
		button._width = 113;
		button._height = 57;
		button._X = buttonX;
		
		if( i ==0 ) {
			button._fnMouseDownEvnt = (function () {
				FBAccess_GetEmail();
				g_gameData.mail_list_subscribe = 1;
				context.Close();
			});
		}else if (i==1){
			button._fnMouseDownEvnt = (function () {
				context.Close();
			});
			
		}else if (i==2)
		{
			button._fnMouseDownEvnt = (function () {
				 // the player opts out of the mailing list
				Ajax_SetEmail("opt-out");
				g_gameData.mail_list_subscribe = 1;
				context.Close();
			});			
		}

		var butt_offset = button._Y - this._Y;
		this._uimanager.Add(button);
		this.observer.push(button);
		this.observer_origY.push(butt_offset);
		
		buttonX += buttonWidt;
	}
}

MailingListWindow.prototype.Update = function (elapsed) {
    this.UpdateBase(elapsed);
    this._uimanager.Update(elapsed);
}

MailingListWindow.prototype.Draw = function (gfx) {
    gfx.FillRect(0, 0, DEFAULT_WINDOW_WIDTH, DEFAULT_WINDOW_HEIGHT,
       "rgb(0,0,0)", 0.4);

 //   this.professor.Draw(gfx, this._X - this.professor._image.width, this._Y);
    this.image.Draw(gfx, this._X, this._Y);
    this._uimanager.Draw(gfx);

    this.header.Draw(gfx, (DEFAULT_WINDOW_WIDTH / 2) - (this.header._image.width / 2), this._Y + 78);
    this.textMsg.Draw(gfx, this._X + 65, this._Y + 200);
    this.newsletter.Draw(gfx, this._X + 410, this._Y + 225);
//    if (this.state != 0) return;
}

MailingListWindow.prototype.Show = function () {
    this._X = (DEFAULT_WINDOW_WIDTH / 2) - (this.image._image.width / 2);
    this._Y = 200;//-this.image._image.height;
    this.state = SLIDE_WINDOW_STATE_IN;

    this.UpdateOffsets();
}


MailingListWindow.prototype.EventHandler = function (e) {
    this.EventHandlerBase(e);
}
