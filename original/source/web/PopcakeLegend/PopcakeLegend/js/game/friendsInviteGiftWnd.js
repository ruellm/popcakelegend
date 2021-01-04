/**
  *  friendsInviteGiftWnd.js
  *  Friends Invite and Gifts window
  *  Author: Ruell Magpayo <ruellm@yahoo.com>
  *  Created: January 10, 2014
  * 
*/

function FriendsInviteGiftWnd() {
    //...
}

FriendsInviteGiftWnd.prototype = new SlideWindow;

FriendsInviteGiftWnd.prototype.Close = function () {
    this.targetY = DEFAULT_WINDOW_HEIGHT;
    this.state = SLIDE_WINDOW_STATE_OUT;

    this.fnAnimDone = function () {
        if (this.fnClose) {
            this.fnClose();
        }
    }
}


FriendsInviteGiftWnd.prototype.Load = function () {
    var context = this;
    this.observer = new Array();
    this.observer_origY = new Array();

    this._uimanager = new UIManager();

    this.image = new ImageObject();
    this.image.Load("images/gifts/window-art.png");

    this._X = (DEFAULT_WINDOW_WIDTH / 2) - (this.image._image.width / 2);
    this.targetY = (DEFAULT_WINDOW_HEIGHT / 2) - (this.image._image.height / 2);
    this._Y = this.targetY;

    var close = new Button;
    close.LoadImages(
         "images/pop_ups/close-button.png",
        "images/pop_ups/close-hover-button.png",
	    "images/pop_ups/close-button.png");

    close._Y = 145;
    close._width = 41;
    close._height = 39;
    close._X = (DEFAULT_WINDOW_WIDTH / 2) + 255;
    close._fnMouseDownEvnt = (function () {
        context.Close();
    });

    var close_offset = close._Y - this._Y;
    this._uimanager.Add(close);
    this.observer.push(close);
    this.observer_origY.push(close_offset);

    this.bg = new ImageObject();
    this.bg.Load("images/invite_gifts/gifts-&-invitatons-background.png");

    this.heading = new ImageObject();
    this.heading.Load("images/invite_gifts/gifts-invitatons-heading.png");

    this.condition = new ImageObject();
    this.condition.Load("images/invite_gifts/conditions-background.png");

    var send = new Button;
    send.LoadImages(
        "images/invite_gifts/send-button.png",
        "images/invite_gifts/send-button-hover.png",
        "images/invite_gifts/send-button.png");

    send._Y = 540;
    send._width = 65;
    send._height = 64;
    send._X = (DEFAULT_WINDOW_WIDTH / 2) - (send._width/2);
    send._fnMouseDownEvnt = (function () {
        context.Send();
    });

    var offset = send._Y - this._Y;
    this._uimanager.Add(send);
    this.observer.push(send);
    this.observer_origY.push(offset);

    var radiobutonY = [192, 308];
    this.radioGroup = new RadioButtonGroup();

    for (j = 0; j < 2; j++) {
        // The radio buttons
        var radio1 = new RadioButton;
        radio1._X = this._X + 58;
        radio1._Y = this._Y + radiobutonY[j];
        radio1._width = 18;
        radio1._height = 18;
        radio1.Load("rgb(101,40,21)", //background
            "rgb(255,255,255)", // mouse hover highlight
            "rgb(239,106,39)" // selected color
            );

        var offset = radio1._Y - this._Y;
        this._uimanager.Add(radio1);
        this.observer.push(radio1);
        this.observer_origY.push(offset);

        this.radioGroup.Add(radio1);
    }
    
    this.substate = 0;
}

FriendsInviteGiftWnd.prototype.Send = function ()
{
    var index = this.radioGroup.index;
    switch (index) {
        case 0:
            /*var currDate = GetDateFormatted();
            if (currDate == g_gameData.gift_give_date) {

                var msg = ["",
                        "You can only send gifts",
                        "once per day!",
                        "",
                        "Try again Tommorow!"];

                this.MessageBox(msg);
                return;
            }
			*/
            FB_X_FriendSelect();
            break;
        case 1:
			var context = this;
			FBAccess_InviteFriend(context.InviteFriendsCallback);
            break;
    }
 }

FriendsInviteGiftWnd.prototype.InviteFriendsCallback =function(count)
{
	// This is called when minimum number of friends invited are called
	var mystate = 0;
    for (var i = 0; i < g_Engine._stateList.length; i++) {
        if (g_Engine._stateList[i]._stateID == GENERAL_LEVEL_STATE) {
            mystate = g_Engine._stateList[i];
            break;
        }
    }
	
	/*var currDate = GetDateFormatted();
	if( currDate != g_gameData.fr_gift_date){
		var msg = ["",
					"You Invited 5 friends",
					"You get 1 free gift today!"];

		mystate.MessageBox(msg);
		Incr_Gift();
		Ajax_UpdateFrGiftDate();
		
	}*/
	//Ajax_UpdateFrGiftDate();
		
	for(var i=0; i < count; i++){
		if( g_gameData.gift_count + 1 < 5){
			g_gameData.gift_array[g_gameData.gift_count++] = true;
		}else{
			break;
		}
	}

    Ajax_UpdateGift();	
	mystate.state = 0;
}

FriendsInviteGiftWnd.prototype.Show = function () {
    this._X = (DEFAULT_WINDOW_WIDTH / 2) - (this.image._image.width / 2);
    this._Y = -this.image._image.height;
    this.state = SLIDE_WINDOW_STATE_IN;
}

FriendsInviteGiftWnd.prototype.MessageBox = function (message) {
    this.substate = 1;
    this.objectiveWindow = new ObjectiveWindow;
    this.objectiveWindow.Load();
    this.objectiveWindow.Show();
    this.objectiveWindow.msg = message;

    var context = this;
    this.objectiveWindow.fnClose = function () {
        context.substate = 0;
    };
}

FriendsInviteGiftWnd.prototype.Update = function (elapsed) {
 
    if (this.substate == 1) {
        this.objectiveWindow.Update(elapsed);
        return;
    }

    this.UpdateBase(elapsed);
    this._uimanager.Update(elapsed);
}

FriendsInviteGiftWnd.prototype.Draw = function (gfx) {
    gfx.FillRect(0, 0, DEFAULT_WINDOW_WIDTH, DEFAULT_WINDOW_HEIGHT,
         "rgb(0,0,0)", 0.4);

    this.image.Draw(gfx, this._X, this._Y);

    this.bg.Draw(gfx, this._X + 22, this._Y + 26);
  
    this.heading.Draw(gfx, (DEFAULT_WINDOW_WIDTH / 2) - (this.heading._image.width / 2),
        this._Y + 56);

    var y = this._Y + 148;
    for (var j = 0; j < 2; j++) {
        this.condition.Draw(gfx,
            (DEFAULT_WINDOW_WIDTH / 2) - (this.condition._image.width / 2),
            y);
        y += this.condition._image.height + 10;
    }

    this._uimanager.Draw(gfx);

    if (this.state != 0) return;

    var y = this._Y + 148;
    var text1 = ["Send 1 gift to 1 friend and receive 1 free gift!"];
    var text2 = ["Invite 1 new friend and receive 1 free gift!"];
        
    var textArray = [text1,text2];
    var y = this._Y + 210;
    for (var j = 0; j < 2; j++) {
        var currText = textArray[j];
        for (var m = 0; m < currText.length; m++) {
            var text = currText[m];
            gfx.DrawText(text, this._X + 96, y,
                "rgb(0,0,0)",
                "14pt Androgyne_TB");

            y += 20;
        }

        y = this._Y + 324;
    }

    if (this.substate == 1) {
        this.objectiveWindow.Draw(gfx);
    }
}

FriendsInviteGiftWnd.prototype.EventHandler = function (e) {
    if (this.substate == 1) {
        this.objectiveWindow.EventHandler(e);
        return;
    }

    this.EventHandlerBase(e);
}

