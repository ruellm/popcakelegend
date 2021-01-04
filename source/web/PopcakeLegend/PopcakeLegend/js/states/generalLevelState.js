/**
    General Level State.
    Copyright (C) 2012 Salad Bowl Game Productions
    Date Created: November 16, 2014
*/
var mouse_down = false;
var mouse_cache_x = 0;
var mouse_cache_y = 0;

var movement_topx = 0;
var movement_topy = 0;

var GEN_LEVEL_STATE_NORMAL = 0;
var GEN_LEVEL_STATE_LIFE = 1;
var GEN_LEVEL_GIFTS_WND = 2;	/*defunct*/
var GEN_LEVEL_FRIENDS_SELECT = 3;
var GEN_LEVEL_STATE_MSG = 4;
var GEN_LEVEL_STATE_UNLOCK = 5;
var GEN_LEVEL_STATE_CUSTOMIZE = 6;
var GEN_LEVEL_STATE_MAILING_LIST = 7;
var GEN_LEVEL_STATE_ADDX = 8;

function GeneralLevelState() {

    //set this state ID
    this._stateID = GENERAL_LEVEL_STATE;   
}

// set base class to State
GeneralLevelState.prototype = new PopcakeBaseState;

GeneralLevelState.prototype.Load = function () {

    this.state = GEN_LEVEL_STATE_NORMAL;

    mouse_down = false;
    var context = this;

    this.LoadTheme();

    this.width = this.background._image.width;
    this.height = this.background._image.height;

    this.topX = 0;
    this.topY = this.background._image.height - DEFAULT_WINDOW_HEIGHT;



    this._uimanager = new UIManager();

    this.buttongap = 229 + 50;
    this.X = (DEFAULT_WINDOW_WIDTH / 2) - ((this.buttongap * 3) / 2);

    this.buttonText = ["Lives ", "",
        //"Invite Friends",
        "Gifts",
        "Super Premium Version"];

    /*var iconList = ["images/general-level/life-icon.png",
        "images/general-level/purchase-coins-icon.png",
        //"images/general-level/invite-friend-icon.png",
        "images/general-level/gift-icon.png",
        "images/general-level/customization-icon.png"];
        */

    this.life = new AnimatedObject();
    this.life.Load("images/general-level/hearts-15fps.png");
    this.life.Set(10, 15.0, true);
    this.life._frameWidth = 420/10;

    this.coinst = new AnimatedObject();
    this.coinst.Load("images/general-level/Coins.png");
    this.coinst.Set(4, 2.0, true);
    this.coinst._frameWidth = 120/4;

    this.customizeIcon = new AnimatedObject();
    this.customizeIcon.Load("images/general-level/SPV.png");
    this.customizeIcon.Set(6, 2.0, true);
    this.customizeIcon._frameWidth = 210 / 6;

    this.gifts = new AnimatedObject();
    this.gifts.Load("images/general-level/gifts.png");
    this.gifts.Set(3, 2.0, true);
    this.gifts._frameWidth = 115 / 3;

    //this.icons = new Array();

    this.fontStyle = "15pt Androgyne_TB";
    var X = this.X;
    for (var i = 0; i < 3; i++) {
        var life = new Button;
        life.LoadImages(
            "images/general-level/top-button.png",
             "images/general-level/top-button-hover.png",
             "images/general-level/top-button.png");

        life._X = X;
        life._Y = 20;
        life._width = 229;
        life._height = 71;

        if (i == 0 /*&& g_gameData.life == 0*/) {
            life._fnMouseDownEvnt = (function () {
                context.LivesWndow();
            });
        } else if (i == 1) {
            life._fnMouseDownEvnt = (function () {
                g_Engine.SetState(BAKERYSTORE_STATE);
            });
        } /*else if (i == 2) {
            life._fnMouseDownEvnt = (function () {
                FBAccess_InviteFriend();
            });
        } */else if (i == 2) {
            life._fnMouseDownEvnt = (function () {
                // context.TriggerGiftsWnd();
                context.TriggerFriendsIGWindow();
            });
        } else if (i == 3) {
            /*
			life._fnMouseDownEvnt = (function () {
                context.TriggerCustomize();
            });
			*/
        }


        this._uimanager.Add(life);
        X += this.buttongap;

        // var image = new ImageObject();
        //   image.Load(iconList[i]);
        //  this.icons.push(image);
    }

    this.LoadBase();
    this.coins_step = 0.25;

    var soundbutx = 1000;
    var soundbuty = 718;
    /*this.sound = new Button;

    this.sound.LoadImages(
        "images/general-level/sound-on-button.png",
         "images/general-level/sound-on-button.png",
         "images/general-level/sound-on-button.png");
         */
    this.sound = new ZoomButton();
    this.sound.Load("images/general-level/sound-on-button.png", 71, 71, "rgb(255,255,255)");

    this.sound._X = soundbutx;
    this.sound._Y = soundbuty;
    this.sound._width = 71;
    this.sound._height = 71;
    this.sound.highlight = false;
    this.sound.alpha = 1;
    this.sound._fnMouseDownEvnt = (function () {
        UpdateAudio(!VOLUME_BGMUSIC_FLAG, false);
        UpdateAudio(!VOLUME_SFX_FLAG, true);
    });

    /*this.soundOFF = new Button;
    this.soundOFF.LoadImages(
        "images/general-level/sound-off-button.png",
         "images/general-level/sound-off-button.png",
         "images/general-level/sound-off-button.png");
         */
    this.soundOFF = new ZoomButton();
    this.soundOFF.Load("images/general-level/sound-off-button.png", 71, 71, "rgb(255,255,255)");
    this.soundOFF.highlight = false;
    this.soundOFF.alpha = 1;
    this.soundOFF._X = soundbutx;
    this.soundOFF._Y = soundbuty;
    this.soundOFF._width = 71;
    this.soundOFF._height = 71;
    this.soundOFF._visible = false;
    this.soundOFF._fnMouseDownEvnt = this.sound._fnMouseDownEvnt;

    this._uimanager.Add(this.sound);
    this._uimanager.Add(this.soundOFF);



    /* if (!g_gameData.mail_list_subscribe && !mailing_list_presented) {
         var context = this;
         mouse_down = false;
         this.popupMailingList = new MailingListWindow();
         this.popupMailingList.fnClose = function () {
             context.state = 0;
         };
         this.popupMailingList.Load();
         this.popupMailingList.Show();
         this.state = GEN_LEVEL_STATE_MAILING_LIST;
         mailing_list_presented = true;
         
     }*/

    if (!addx_presented) {
        addx_presented = true;
        this.state = GEN_LEVEL_STATE_ADDX;
        this._popupAddX = new ADDXWindow();
        this._popupAddX.Load();
        this._popupAddX.Show();

        var context = this;
        this._popupAddX.fnClose = function () {
            if (!g_gameData.mail_list_subscribe && !mailing_list_presented) {
                context.PresentMailinList();          
            } else {
                context.state = GEN_LEVEL_STATE_NORMAL;
            }
        };
    } else if (!g_gameData.mail_list_subscribe && !mailing_list_presented) {
        this.PresentMailinList();
    }
}

GeneralLevelState.prototype.PresentMailinList = function ()
{
    var context = this;
    mouse_down = false;
    context.popupMailingList = new MailingListWindow();
    context.popupMailingList.fnClose = function () {
        context.state = 0;
    };
    context.popupMailingList.Load();
    context.popupMailingList.Show();
    context.state = GEN_LEVEL_STATE_MAILING_LIST;
    mailing_list_presented = true;
}

var mailing_list_presented = false;
var addx_presented = false;

GeneralLevelState.prototype.LoadTheme = function () {
    switch (g_gameData.theme) {
        case THEME_TYPE_DEFAULT:
            this.background = new ImageObject();
            this.background.Load("images/themes/default/general-level-background.png");

            this.bg_sky = new ImageObject();
            this.bg_sky.Load("images/themes/default/background-blue.png");

            this.bg_ray = new ImageObject();
            this.bg_ray.Load("images/themes/default/sunrays.png");
            this.angle = 0;

           /* this.cloudManager = new CloudManager();
            this.cloudManager.CLOUD_BORDER_Y = 230;
            this.cloudManager.imageList = [
                    "images/themes/default/cloud-1.png",
                    "images/themes/default/cloud-2.png",
                    "images/themes/default/cloud-3.png"];
            this.cloudManager.InitClouds();
            */

            //this.baker = new ImageObject();
            //this.baker.Load("images/themes/default/baker.png");
            //this.baker.origY = 5580;
            this.baker = new BlinkSprite();
            this.baker.Load("images/themes/default/Default-General-level-baker-3fps.png",
                4, 3, 882 / 4);
            this.baker.origY = 5580;
            

            this.house = new AnimatedObject();
            this.house.Load("images/themes/default/house-2fps.png");
            this.house.Set(4, 2.0, true);
            this.house._frameWidth = 1348 / 4;

            this.flower1 = new AnimatedObject();
            this.flower1.Load("images/themes/default/flower1-2fps.png");
            this.flower1.Set(4, 2.0, true);
            this.flower1._frameWidth = 448 / 6;

            this.flower2 = new AnimatedObject();
            this.flower2.Load("images/themes/default/flower2-2fps.png");
            this.flower2.Set(4, 2.0, true);
            this.flower2._frameWidth = 700 / 6;

            this.ropeImages = new Array();

            this.LoadHandles();

            break;
        case THEME_TYPE_SAMPLE:

            this.background = new ImageObject();
            this.background.Load("images/themes/sample/customised-general-levels-screen-bg.png");

            this.char1 = new BlinkSprite();
            this.char1.Load("images/themes/sample/elephant-Charactor_genlevel.png", 6, 10, 2238 / 6);
            this.char1.blink_sec = 5;
            this.char1.origY = 5815;

            this.char2 = new BlinkSprite();
            this.char2.Load("images/themes/sample/squirrel-Charactor_genlevel.png",6,10, 1528/6);
            this.char2.blink_sec = 2;
            this.char2.origY = 5926;


            this.lollipop = new AnimatedObject();
            this.lollipop.Load("images/themes/sample/Lollipop.png");
            this.lollipop.Set(4, 2.0, true);
            this.lollipop._frameWidth = 300/4;

            this.Olollipop = new AnimatedObject();
            this.Olollipop.Load( "images/themes/sample/Orange-Lollipop.png");
            this.Olollipop.Set(4, 2.0, true);
            this.Olollipop._frameWidth = 336/4;

            this.Ylollipop = new AnimatedObject();
            this.Ylollipop.Load( "images/themes/sample/Yellow-Lollipop.png");
            this.Ylollipop.Set(4, 2.0, true);
            this.Ylollipop._frameWidth = 300/4;


            this.icecream = new AnimatedObject();
            this.icecream.Load("images/themes/sample/ice-cream.png");
            this.icecream.Set(4, 2.0, true);
            this.icecream._frameWidth = 1740 / 4;
            
            this.LoadHandles_SampleTheme();
            break;
    }
}

GeneralLevelState.prototype.TriggerGiftsWnd = function () {
    /*this.state = GEN_LEVEL_GIFTS_WND;
    var context = this;
    this.popUpGifts = new GiftsWindow();
    this.popUpGifts.Load();
    this.popUpGifts.fnClose = function () {
        context.state = 0;
    };

    this.popUpGifts.PopShow();
    mouse_down = false;*/
    var currDate = GetDateFormatted();
    if (currDate == g_gameData.gift_give_date) {

        var msg = ["",
				"You can only send gifts",
				"once per day!",
				"",
				"Try again Tommorow!"];

        this.MessageBox(msg);

        return;
    }

    FB_X_FriendSelect();
    this.state = GEN_LEVEL_FRIENDS_SELECT;
    mouse_down = false;
}
GeneralLevelState.prototype.OnCloseMsgBox = function () {
    this.state = 0;
    mouse_down = false;
}

GeneralLevelState.prototype.TriggerCustomize = function () {
    this.state = GEN_LEVEL_STATE_CUSTOMIZE;
    this.customize = new CustomizeWindow();

    this.customize.Load();
    this.customize.Show();

    var context = this;
    this.customize.fnClose = function () {
        context.state = 0;
    };
}

GeneralLevelState.prototype.TriggerConfirm = function () {
    Update_Life(5);
    this.state = 0;
}
GeneralLevelState.prototype.TriggerFriendsIGWindow = function ()
{
    var context = this;
    this.popupLost = new FriendsInviteGiftWnd();
    this.popupLost.fnClose = function () {
        context.state = 0;
    };
    this.popupLost.Load();
    this.popupLost.Show();

    this.state = GEN_LEVEL_STATE_LIFE;
    mouse_down = false;
}

GeneralLevelState.prototype.LivesWndow = function () {
    var context = this;
    /* this.popupLost = new PopUpLivesWindow();
     this.popupLost.Load(2);
     this.popupLost.fnDoNothing = function () {
         context.state = 0;
     };
 
     this.popupLost.fnInviteConfirm = function () {
         Update_Life(5);
         g_Engine.SetState(GAME_STATE);
     };
 
     this.popupLost.Show();
     */

    this.popupLost = new PurchaseLifeWindow();
    this.popupLost.fnClose = function () {
        context.state = 0;

        // context.Show();
        //context.fnAnimDone = null;
    };
    this.popupLost.Load();
    this.popupLost.Show();

    /*
    this.popupLost = new PurchaseLifeWindow();
    this.popupLost.fnClose = function () {
        //context.state = 0;
        if (context.fnDoNothing) {
            context.fnDoNothing();
        }
    };
    this.popupLost.Load();
    this.popupLost.PopShow();
    */

    this.state = GEN_LEVEL_STATE_LIFE;
    mouse_down = false;
}

GeneralLevelState.prototype.UnlockLevel = function (id) {
    var context = this;

   /* if (id > g_gameData.max_level + 1) {
        var message = ["Unable to unlock level", "",
            "You may only unlock", "the next level : " + (g_gameData.max_level + 1 + 1),
            "", "Have fun !"];

        context.MessageBox(message);
        return;
    }*/

    this.state = GEN_LEVEL_STATE_UNLOCK;
    this.unlockWnd = new UnlockWindow();
    this.unlockWnd.id = g_gameData.max_level + 1;
    this.unlockWnd.Load();
    this.unlockWnd.Show();
    this.unlockWnd.fnClose = function () {
        context.state = 0;
    };

    this.unlockWnd.fnUnlock = function () {
        if (Credit_Coins(UNLOCK_LEVEL_PRICE)) {
            UnlockLevel(this.id);
            Ajax_UpdateMonetize(this.id, MONETIZATION_UNLOCK);

            g_gameData.curr_level_idx = this.id;
            g_gameData.curr_challenge_idx = 0;
            g_gameMode = GAME_MODE_SOLO;
            g_Engine.SetState(GAME_STATE);
        } else {
            //var message = ["Unable to unlock level", "", "Not enough Chococoins!"];
            // context.MessageBox(message); 

            context.state = POPCAKEBASE_STATE_MSGWINDOW;;
            context.objectiveWindow = new BestScoreWindow;;
            context.objectiveWindow.type = 1;
            context.objectiveWindow.Load();
            context.objectiveWindow.Show();

            context.objectiveWindow.fnClose = function () {
                context.OnCloseMsgBox();
            };
        }
    };
}

GeneralLevelState.prototype.AddHandle = function (type, level, x, y, isLock, id) {
    var context = this;
    //var level = new LevelHandle();

    level.origX = x;
    level.origY = y;
    level.type = (isLock) ? 0 : type + 1;
    level.id = id;
    level.isDou = (type == 1);
    level.Load();

    if (type == 0)//solo
    {
        this.solo_levels.push(level);
        level._fnMouseDownEvnt = (function () {
            if (this.type == 0) {
                context.UnlockLevel(this.id);
                return;
            };
            g_gameData.curr_level_idx = this.id;
            g_gameData.curr_challenge_idx = 0;
            g_gameMode = GAME_MODE_SOLO;
            g_Engine.SetState(GAME_STATE);
        });

    } else if (type == 1) {

        this.dou_levels.push(level);
        level._fnMouseDownEvnt = (function () {
            if (this.type == 0) {
                context.UnlockLevel(this.id);
                return;
            }
            g_gameData.curr_level_idx = this.id;
            g_gameData.curr_challenge_idx = 0;
            g_gameMode = GAME_MODE_DOU;
            g_DOU_turn = 0;
            g_Engine.SetState(GAME_STATE);
        });
    }

    this.levelHandleButtons.Add(level);
}

GeneralLevelState.prototype.LoadHandles = function () {
    this.levelHandleButtons = new UIManager();
    this.solo_levels = new Array();
    this.dou_levels = new Array();

    var x = 250;
    var y = 5830;
    var dou_y = 3120;
    var index = 0;
    var ydiff = [0, 10, 10, -20];
    for (var ix = 0; ix < 4; ix++) {

        this.AddHandle(0, new LevelHandle(), x, y+ydiff[ix], true, index);
        this.AddHandle(1, new LevelHandle(), x, y + ydiff[ix] + 120, true, index);

        var rope = new ImageObject();
        rope.Load("images/themes/default/level-short-rope.png");

        rope._X = x + ((103 / 2) - (6));
        rope._origY = y + ydiff[ix];
        this.ropeImages.push(rope);

        x += 190;
        y -= 35;
        dou_y -= 20;

        index++;
    }

    // level 5 DOU handle
    this.AddHandle(1, new LevelHandle(), 948, 5520, true, 4);

    var x = 822;
    var y = 5510;
    var ydiff = [0, -20, 30, 80];
    for (var ix = 0; ix < 4; ix++) {

        this.AddHandle(0, new LevelHandle(), x, y + ydiff[ix], true, index);

        if (ix != 0) {
            this.AddHandle(1, new LevelHandle(), x, y + ydiff[ix] + 120, true, index);

            var rope = new ImageObject();
            rope.Load("images/themes/default/level-short-rope.png");

            rope._X = x + ((103 / 2) - (6));
            rope._origY = y + ydiff[ix];
            this.ropeImages.push(rope);
        }

        index++;
        x -= 210;
        y -= 80;
    }

    var x = 203;
    var y = 5150;
    var ydiff = [-20, 0, 0, 0];
    for (var ix = 0; ix < 2; ix++) {

        this.AddHandle(0, new LevelHandle(), x, y + ydiff[ix], true, index);
        this.AddHandle(1, new LevelHandle(), x, y + ydiff[ix] + 120, true, index);

        var rope = new ImageObject();
        rope.Load("images/themes/default/level-short-rope.png");

        rope._X = x + ((103 / 2) - (6));
        rope._origY = y + ydiff[ix];
        this.ropeImages.push(rope);

        index++;
        x += 210;
        y -= 80;
    }
}

GeneralLevelState.prototype.LoadHandles_SampleTheme = function () {
    //5976
    this.levelHandleButtons = new UIManager();
    this.solo_levels = new Array();
    this.dou_levels = new Array();

    var y = 5976;
    var x = (DEFAULT_WINDOW_WIDTH / 2) - (153 / 2);
    var dist = 130;
    var context = this;
    id = 0;

    /* Profile Pics type */
    var profidx = 0;
    var profpic = [
        0, 1, 0, 1, 0,
        3, 1, 0, 1, 1];
    
    for (var p = 0; p < 5; p++) {
        this.AddHandle(0, new SampleTheme_LvlHandle(0), x, y, true, id++);
        y -= dist;
    }

    x -= 153;
    this.AddHandle(0, new SampleTheme_LvlHandle(0), x, y + dist, true, id++);
    for (var p = 0; p < 3; p++) {
        this.AddHandle(0, new SampleTheme_LvlHandle(0), x, y, true, id++);
        y -= dist;
    }


    /////////////////////////////////////////
    //TODO: Change this later on
    /////////////////////////////////////////
    var solo = [
        { x: 459, y: 4930 },
        { x: 459, y: 4800 },
        { x: 459, y: 4670 - 350},     // Level 11
        { x: 625, y: 4590 - 350 },                    //{ x: 459, y: 4540 },
        { x: 625, y: 4460 - 350 }, //.
        { x: 459, y: 4380 - 350 }, //.
        { x: 459, y: 4250 - 350 }, //.    // level 15
        { x: 377, y: 4120 - 350 }, //.
        { x: 565, y: 4120 - 350 }, //.
        { x: 670, y: 3990 - 350 },    // level 18 - moving level
        { x: 670, y: 3860 - 350 },    // level 19 - end of milestone 6 level

    ];

    for (var n = 0; n < solo.length; n++) {
        var color_type = 0;
        if (n > 1)
            color_type = 1;
        this.AddHandle(0, new SampleTheme_LvlHandle(color_type), solo[n].x, solo[n].y, true, id++);
    }


    // DOU handles
    // levels 1-4
    id = 0;
    y = 5969
    for (var p = 0; p < 4; p++) {
        x = (p % 2) ? 624 : 320;
        this.AddHandle(1, new SampleTheme_LvlHandle(0), x, y, true, id++);
        y -= 130;
    }

    //Other levels DOU    
    var dou = [
        { x: 615, y: 5390 },    // level 5
        { x: 176, y: 5450 },
        { x: 480, y: 5303 },
        { x: 176, y: 5190 },    // level 8
        { x: 176, y: 4977 },
        { x: 633, y: 4930 },
        { x: 280, y: 347 + 4469 },    // Level 10

        { x: 280, y: 179 + 4469 - 350 },    // Level 11
        { x: 780, y: 483 + 4220 - 350 },    // Level 12
        { x: 808, y: 140 + 4295 - 350 },    // Level 13
        { x: 280, y: 330 + 4070 - 350 },    // Level 14
        { x: 650, y: 190 + 4070 - 350 },    // Level 15
        { x: 214, y: 186 + 3945 - 350 },    // Level 16
        { x: 760, y: 185 + 3945 - 350 },    // Level 17
        { x: 500, y: 359 + 3620 - 350 },    // Level 18
        { x: 851, y: 231 + 3620 - 350 },    // Level 19

    ];
    var type = 0;
    for (var n = 0; n < dou.length; n++) {

        if (n > 6) type = 1;
        this.AddHandle(1, new SampleTheme_LvlHandle(type), dou[n].x, dou[n].y, true, id++);
    }
}

GeneralLevelState.prototype.Update = function (/**Number*/ elapsed) {

    g_globalAudio.Update();

    if (VOLUME_BGMUSIC_FLAG || VOLUME_SFX_FLAG) {
        this.sound._visible = true;
        this.soundOFF._visible = false;
    } else {
        this.sound._visible = false;
        this.soundOFF._visible = true;

    }

    if (this.state == GEN_LEVEL_STATE_LIFE) {
        this.popupLost.Update(elapsed);
        return;
    } else if (this.state == GEN_LEVEL_GIFTS_WND) {
        this.popUpGifts.Update(elapsed);
        return;
    } else if (this.state == GEN_LEVEL_STATE_CUSTOMIZE){
        this.customize.Update(elapsed);
    } else if (this.state == GEN_LEVEL_STATE_UNLOCK) {
        this.unlockWnd.Update(elapsed);
        return;
    } else if( this.state == GEN_LEVEL_STATE_ADDX){
        this._popupAddX.Update(elapsed);
       // return;
    } else if (this.state == GEN_LEVEL_STATE_MAILING_LIST) {
        this.popupMailingList.Update(elapsed);
    } else if (this.state != 0) {
        this.BaseSubStateUpdate(elapsed);
        return;
    }

    //...
    if (this.topX < 0)
        this.topX = 0;
    if (this.topY < 0)
        this.topY = 0

    if (this.topX + DEFAULT_WINDOW_WIDTH >= this.width) {
        this.topX = this.width - DEFAULT_WINDOW_WIDTH;
    }

    if (this.topY + DEFAULT_WINDOW_HEIGHT >= this.height) {
        this.topY = this.height - DEFAULT_WINDOW_HEIGHT;
    }

    this._uimanager.Update(elapsed);

    for (var i = 0; this.solo_levels && i < this.solo_levels.length; i++) {
        this.solo_levels[i]._X = this.solo_levels[i].origX - this.topX;
        this.solo_levels[i]._Y = this.solo_levels[i].origY - this.topY;
        this.solo_levels[i].Update(elapsed);

    }

    for (var i = 0; this.dou_levels && i < this.dou_levels.length; i++) {

        this.dou_levels[i]._X = this.dou_levels[i].origX - this.topX;
        this.dou_levels[i]._Y = this.dou_levels[i].origY - this.topY;
        this.dou_levels[i].Update(elapsed);
    }

    if (this.levelHandleButtons)
        this.levelHandleButtons.Update(elapsed);

    if (this.coins > g_gameData.coins) {
        this.coins--;
    } else if (this.coins < g_gameData.coins) {
        this.coins++;
    }

    this.UpdateBase(elapsed);

    this.life.Update(elapsed);
    this.coinst.Update(elapsed);
    this.customizeIcon.Update(elapsed);
    this.gifts.Update(elapsed);

    if (g_gameData.theme == THEME_TYPE_DEFAULT) {

        /*this.cloudManager.Update(elapsed);
        for (var i = 0; i < this.cloudManager.cloud_list.length; i++) {
            this.cloudManager.cloud_list[i]._Y -= this.topY;
        }*/

        this.angle += 30 * elapsed;
        this.house.Update(elapsed);

        this.flower1.Update(elapsed);
        this.flower2.Update(elapsed);

        this.baker.Update(elapsed);
    } else if (g_gameData.theme == THEME_TYPE_SAMPLE)
    {
        //DIsable the lolly animations as requested by client
        //this.lollipop.Update(elapsed);
        //this.Olollipop.Update(elapsed);
        //this.Ylollipop.Update(elapsed);
        this.icecream.Update(elapsed);
        this.char1.Update(elapsed);
        this.char2.Update(elapsed);
    }
 }

GeneralLevelState.prototype.Draw = function (/**Graphics*/gfx) {
    if (this.background == null) return;

    if (g_gameData.theme == THEME_TYPE_DEFAULT) {
        this.bg_sky.Draw(gfx,
            0-this.topX, 0-this.topY);

        ////////////////////////////////////////////////////////
        var cxscreen = DEFAULT_WINDOW_WIDTH / 2;
        var cyscreen = (DEFAULT_WINDOW_HEIGHT / 2) - this.topY;
        var radial_cx = this.bg_ray._image.width / 2;
        var radial_cy = this.bg_ray._image.height / 2;
        var diffx = radial_cx - cxscreen;
        var diffy = radial_cy - cyscreen;
        gfx.DrawRotateFull(-diffx, -diffy, radial_cx, radial_cy,
            this.angle, this.bg_ray._image, 1.0);
        ////////////////////////////////////////////////////////

        //this.cloudManager.Draw(gfx);
    }

    gfx.DrawImage(this.background._image,
        this.topX, this.topY,
        DEFAULT_WINDOW_WIDTH, DEFAULT_WINDOW_HEIGHT,
        0, 0, DEFAULT_WINDOW_WIDTH, DEFAULT_WINDOW_HEIGHT, 1.0);

    if (g_gameData.theme == THEME_TYPE_DEFAULT) {
        this.house._X = 372;
        this.house._Y = 120 - this.topY;
        this.house.Draw(gfx);

        this.flower1._X = 969;
        this.flower1._Y = 5783 - this.topY;
        this.flower1.Draw(gfx);

        this.flower2._X = 988;
        this.flower2._Y = 5674 - this.topY;
        this.flower2.Draw(gfx);

        for (var i = 0; i < this.ropeImages.length; i++) {
            this.ropeImages[i]._Y = this.ropeImages[i]._origY - this.topY;
            this.ropeImages[i].Draw(gfx);
        }
    } else if (g_gameData.theme = THEME_TYPE_SAMPLE) {

        this.lollipop._X = 237;
        this.lollipop._Y = 5648 - this.topY;
        this.lollipop.Draw(gfx);

        this.Olollipop._X = 149;
        this.Olollipop._Y = 5573 - this.topY;
        this.Olollipop.Draw(gfx);

        this.Ylollipop._X = 8;
        this.Ylollipop._Y = 5705 - this.topY;
        this.Ylollipop.Draw(gfx);

        this.icecream._X = 40;
        this.icecream._Y = 349 - this.topY;
        this.icecream.Draw(gfx);

        this.char1._X = -10;
        this.char1._Y = this.char1.origY - this.topY;
        this.char1.Draw(gfx);

        this.char2._X = 789;
        this.char2._Y = this.char2.origY - this.topY;
        this.char2.Draw(gfx);

    }

    this.DrawDefaultTheme(gfx);

    if (this.levelHandleButtons) {
        this.levelHandleButtons.Draw(gfx);
    }

    this.DrawBase(gfx);

    //////////////////////////////////////////////////////////
    var textLife = GetLifeStatus();
    if (g_gameData.life != 0) {
        textLife =  g_gameData.life + " " + this.buttonText[0];
    }
    ///////////////////////////////////////////////////////

    this._uimanager.Draw(gfx);

    // Draw the text
    var X = this.X;
    var iconsY = [29, 26, 31, 35];
    var iconsX = [13, 3, 40, 0];
    var icons = [
        this.life,
        this.coinst,
        this.gifts,
        this.customizeIcon
    ];

    for (var i = 0; i < 3; i++) {

        var button_center = X + (229 / 2);
        var color = "rgb(255,255,255)";
        var style = this.fontStyle;
        var text = this.buttonText[i];

        if (i == 0) {
            text = textLife;
        } else if (i == 1) {
            text = Math.ceil(this.coins) + " Chococoins";
        } else if (i == 3) {
           // style = "11pt Androgyne_TB";
        }

        if (this.coins != g_gameData.coins && i==1) {
            color = "rgb(0,255,0)";
        }

        // Render Text header
        var ctx = gfx._canvasBufferContext;
        ctx.font = style;
        
        var textWidth = ctx.measureText(text);
        var buttonX = button_center - (textWidth.width / 2);

        if (i == 2) {
            buttonX += 15;
        } else if (i == 3) {
            buttonX += 40;
        } else if (i == 1) {
           // buttonX += 0;
        }

        
        if (i != 3) {
            gfx.DrawText(text, buttonX, 56, color, this.style);
        } else {
            gfx.DrawText("Super Premium", buttonX, 50, color, this.style);
            gfx.DrawText("      Version", buttonX, 70, color, this.style);
        }

        //  this.icons[i].Draw(gfx, X + 8, iconsY[i]);
        icons[i]._X = X + 8 + iconsX[i];
        icons[i]._Y = iconsY[i];
        icons[i].Draw(gfx);

        X += this.buttongap;
    }


    if (this.state == GEN_LEVEL_STATE_LIFE) {
        this.popupLost.Draw(gfx);
    } else if (this.state == GEN_LEVEL_GIFTS_WND) {
        this.popUpGifts.Draw(gfx);
        return;
    }else if (this.state == GEN_LEVEL_STATE_CUSTOMIZE){
		this.customize.Draw(gfx);
		return;
    } else if (this.state == GEN_LEVEL_STATE_MAILING_LIST) {
        this.popupMailingList.Draw(gfx);
    } else if (this.state == GEN_LEVEL_STATE_UNLOCK) {
        this.unlockWnd.Draw(gfx);
    }  else if( this.state == GEN_LEVEL_STATE_ADDX){
        this._popupAddX.Draw(gfx);
    }
} 

GeneralLevelState.prototype.DrawDefaultTheme = function (gfx) {

    switch (g_gameData.theme) {
        case THEME_TYPE_DEFAULT:
            this.baker._X = 84;
            this.baker._Y = this.baker.origY - this.topY;
            this.baker.Draw(gfx);
            //this.baker.Draw(gfx, 84, this.baker.origY - this.topY);
            break;
        case THEME_TYPE_SAMPLE:

            var line = [
                { x: 560, y: 5493, x2: 560, y2: 6000 },
                { x: 406, y: 5509, x2: 560, y2: 5509 },
                { x: 406, y: 5509, x2: 406, y2: 5109 },
                { x: 406, y: 5509, x2: 406, y2: 5109 },
                { x: 406, y: 5122, x2: 542, y2: 5122 },
                { x: 542, y: 5122, x2: 542, y2: 4982 },

                //DOU connections
                { x: 414, y: 6005, x2: 560, y2: 6027 },
                { x: 558, y: 5906, x2: 722, y2: 5889 },
                { x: 416, y: 5755, x2: 557, y2: 5778 },
                { x: 562, y: 5637, x2: 721, y2: 5622 },
                { x: 563, y: 5514, x2: 711, y2: 5440 },
                { x: 272, y: 5493, x2: 408, y2: 5516 },
                { x: 404, y: 5383, x2: 576, y2: 5351 },
                { x: 265, y: 5231, x2: 408, y2: 5253 },
                { x: 271, y: 5017, x2: 402, y2: 5118 },
                { x: 549, y: 4982, x2: 725, y2: 4990 },
                { x: 367, y: 463 + 4393, x2: 542, y2: 460 +4393 },

                // Level 11-19
                { x: 544, y: 362 + 4620, x2: 544, y2: 224 + 4620 },
                { x: 544, y: 224 + 4620, x2: 544, y2: 93 + 4620 -350},
                { x: 544, y: 342 + 4395, x2: 701, y2: 342 + 4395 },
                { x: 701, y: 342 + 4395, x2: 701, y2: 491 + 4145 },
                { x: 701, y: 491 + 4145, x2: 701, y2: 167 + 4344 },
                { x: 701, y: 532 + 3995, x2: 548, y2: 532 + 3995 },
                { x: 548, y: 532 + 3995, x2: 548, y2: 383 + 4045 },
                { x: 548, y: 383 + 4045, x2: 548, y2: 260 + 4045 },
                { x: 548, y: 260 + 4045, x2: 548, y2: 131 + 4045 },
                { x: 460, y: 131 + 4045, x2: 648, y2: 131 + 4045 },
                { x: 648, y: 131 + 4045, x2: 757, y2: 131 + 4045 },
                { x: 757, y: 131 + 4045, x2: 757, y2: 373 + 3667 },
                { x: 757, y: 373 + 3667, x2: 757, y2: 355 + 3545 },

                //DUO level 11-19
                 { x: 375, y: 440 + 4242, x2: 540, y2: 481 + 4242 },
                 { x: 709, y: 391 + 4241, x2: 863, y2: 506 + 4240 },
                 { x: 721, y: 301 + 4220, x2: 893, y2: 257 + 4220 },
                 { x: 368, y: 222 + 4240, x2: 542, y2: 213 + 4219 },
                 { x: 544, y: 411 + 3894, x2: 735, y2: 408 + 3894 },
                 { x: 301, y: 276 + 3893, x2: 462, y2: 278 + 3892 },
                 { x: 658, y: 362 + 3817, x2: 855, y2: 355 + 3818 },
                 { x: 589, y: 196 + 3819, x2: 739, y2: 229 + 3820 },
                 { x: 753, y: 96 + 3820, x2: 947, y2: 80 + 3820 },
            ];

            var color = "rgb(0,0,0)";
            var y = 0;

            for (var r = 0; r < line.length; r++) {

                if (r > 17)
                    color = "rgb(255,255,255)";

                if (r > 18 && r < 39)
                    y = 350;

                gfx.DrawLine(line[r].x,
                    line[r].y - this.topY - y,
                    line[r].x2,
                    line[r].y2 - this.topY - y,
                    6, color);
            }

            //this.baker.Draw(gfx, 720, this.baker.origY - this.topY);
            //this.char1.Draw(gfx, 20, this.char1.origY - this.topY);
           // this.char2.Draw(gfx, 789, this.char2.origY - this.topY);

            break;
    }
}

function SendGift(friends) {
    console.log("Send gifts to");
    console.log(friends);

    var mystate = 0;
    for (var i = 0; i < g_Engine._stateList.length; i++) {
        if (g_Engine._stateList[i]._stateID == GENERAL_LEVEL_STATE) {
            mystate = g_Engine._stateList[i];
            break;
        }
    }

    if (friends.length > 0) {
        /*var msg = ["Congratulations!",
			"",
			"You earn 1 gift yourself",
			"For sending to 5 friends!"];

        mystate.MessageBox(msg);

        var fbid = 0;
        if (typeof (g_DBUserInfo) != 'undefined') {
            fbid = g_DBUserInfo.fbid;
        }
        var me = { id: fbid, name: "dummy" };	// only ID attribute is used in Ajax_SendGift		
        friends.push(me);

		Incr_Gift();
		*/
		for(var i=0; i < friends.length; i++){
			if( g_gameData.gift_count + 1 < 5){
				g_gameData.gift_array[g_gameData.gift_count++] = true;
			}else{
				break;
			}
		}
		
		Ajax_UpdateGift();	
    } else {
        mystate.state = 0;
    }

    Ajax_SendGift(friends, 0);
    g_gameData.gift_give_date = GetDateFormatted();
    this.state = 0;
    mouse_down = false;
}

function OnCloseFriendWindow() {
    mouse_down = false;
    for (var i = 0; i < g_Engine._stateList.length; i++) {
        if (g_Engine._stateList[i]._stateID == GENERAL_LEVEL_STATE) {
            g_Engine._stateList[i].state = 0;
            break;
        }
    }
}

///////////////////////////////////////////////
// Destructor
///////////////////////////////////////////////
GeneralLevelState.prototype.Unload = function () {
    this.CleanupUIManager();
    mouse_down = false;
}

GeneralLevelState.prototype.EventHandler = function (e) {

    if (this.state != 0) {
        mouse_down = false;

        if (this.state == GEN_LEVEL_STATE_LIFE) {
            this.popupLost.EventHandler(e);
            return;
        } else if (this.state == GEN_LEVEL_GIFTS_WND) {
            this.popUpGifts.EventHandler(e);
            return;
        } else if (this.state == GEN_LEVEL_STATE_CUSTOMIZE){
            this.customize.EventHandler(e);
            return;
        } else if (this.state == GEN_LEVEL_STATE_UNLOCK) {
            this.unlockWnd.EventHandler(e);
            return;
        } else if (this.state == GEN_LEVEL_STATE_MAILING_LIST) {
            this.popupMailingList.EventHandler(e);
            return;
        }else if( this.state == GEN_LEVEL_STATE_ADDX){
            this._popupAddX.EventHandler(e);
            return;
        } else {
            this.EventHandlerEx(e);
            mouse_down = false;
            return;
        }
    }

    //..

    if (e.type == "mousemove" ||
                e.type == "touchmove") {

        if (mouse_down) {
            var mouse = getNormalizedMouse(e);

            var deltax = mouse.x - mouse_cache_x;
            var deltay = mouse.y - mouse_cache_y;
            var sensitivity = 0.5;

            if (deltax != 0) {
                this.topX += (-deltax * sensitivity);
            }

            if (deltay != 0) {
                this.topY += (-deltay * sensitivity);
            }

            mouse_cache_x = mouse.x;
            mouse_cache_y = mouse.y;

        }
    } else if (e.type == "mousedown" || e.type == "touchstart") {
        mouse_down = true;

        var mouse = getNormalizedMouse(e);
        mouse_cache_x = mouse.x;
        mouse_cache_y = mouse.y;

    } else if (e.type == "mouseup" || e.type == "touchend") {

        mouse_down = false;

        DEBUG_LOG("TopY " + this.topY);
    } else if (e.type == "mousewheel" || e.type == "DOMMouseScroll") {

        var delta = GetMouseWheelDelta(e) * 50;
        var sensitivity = 0.5;
        if (delta != 0) {
            this.topY += (-delta * sensitivity);
        }
    }

    if (this.EventHandlerBase(e) != true) {
        this.EventHandlerBase(e, this.levelHandleButtons);
    }
}