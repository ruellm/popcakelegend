/**
  *  gameState.js
  *  The main game class
  *  Author: Ruell Magpayo <ruellm@yahoo.com>
  *  Created: October 16, 2014
  * 
*/

var GAME_STATE_NORMAL = 0;          // the original purgatory?
var GAME_STATE_SHUFFLE_CARD = 1;
var GAME_STATE_TIMER_VIEWING = 2;
var GAME_STATE_BEFOREPLAY = 3;
var GAME_STATE_ONHOLD = 4;      // challenge icon is still animating
var GAME_STATE_PLAY = 5;
var GAME_STATE_FLIPBACK = 6;
var GAME_STATE_WINNER = 7;
var GAME_STATE_SWITCH_1 = 8;
var GAME_STATE_SWITCH_2 = 9;
var GAME_STATE_SWITCH_3 = 10;
var GAME_STATE_STARIN = 11;
var GAME_STATE_PURGATORY = 12;  // state of nothing, no update and no draw
var GAME_STATE_ROTATE_0 = 13;
var GAME_STATE_ROTATE_1 = 14;
var GAME_STATE_POPUPLOST = 15;
var GAME_STATE_LEVELCOMPLETE_WND = 16;
var GAME_STATE_RETRYWND = 17;
var GAME_STATE_WATCH3_SECONDS_0 = 18;
var GAME_STATE_FREEZE = 19;
var GAME_STATE_LOSS = 20;
var GAME_STATE_LOSS_MSG = 21;
var GAME_STATE_YES_NO_MONETIZE = 22;
var GAME_STATE_OBJECTIVE = 23;
var GAME_STATE_DAILY_BUNOS = 24;
var GAME_STATE_GIFT_WINDOW = 25;
var GAME_STATE_ROTATE_1_EX = 26;
var GAME_STATE_ROTATE_1_EXROTATE = 27;
var GAME_STATE_ROTATE_1_ROTATE_DONE = 28;
var GAME_STATE_ROTATE_2_ROTATE_DONE = 29;
var GAME_STATE_ROTATE_3_ROTATE_DONE = 30;
var GAME_STATE_UNLOCKLEVEL = 31;
var GAME_STATE_HITS_RUNDOWN = 32;
var GAME_STATE_TIMER_RUNDOWN = 33;

var g_highlight_Shuffle = false; // FOR TUTORIAL Level 1 challenge 1 only
var g_highlight_Watch3Seconds = false;
var g_freeze2Icons = false;
var g_cancelBoardMoveHighlight = false;
var g_giftHighlight = false;

var g_reShuffleAllowed = false;
var g_Watch3SecondsAllowed = false;
var g_freez2IconsAllowed = false;
var g_cancelBoardMoveAllowed = false;

var g_freezeCount = 0;
var g_message = "";
var g_losstype = 0; // 0: hits run out, 1: time run out 
var topline_width = 760;
var toplineX = (DEFAULT_WINDOW_WIDTH / 2) - (topline_width / 2);
var goldX = toplineX + (topline_width * 0.87);
var startStarX = toplineX + 35;

var g_MonetizeMode = 0; //0: reshuffle board, 
//1: reshuffle icon, 
//2: watch3, 
//3: cancel move
//4: Freeze 2 icons
//5: Use gifts
//6: extra hits
//7: extra sec
var saved_state = 0;

// for correct_flipback
var flip_back_correct = false;

function GameState() {
    // State ID 
    this._stateID = GAME_STATE;
    this.board = null;
    this.small_icon_list = null;
    this.sideButtonList = null;

    // cache this data for shorten access
    this.currentLevel = null;

    this.state = GAME_STATE_NORMAL;

    this.glowImg = null;
}

// set base class to State
GameState.prototype = new PopcakeBaseState;

GameState.prototype.Load = function () {

    this._uimanager = new UIManager();
    this._uiManagerLocal = new UIManager();

    // reset the timer to null
    this.timerStartGame = null;
    this.seconds_remain = 0;
    this.small_icon_list = null;
    this.correct_list = null;
    this.correctIndex_list = null;
    this.star_list = null;
    this.board = null;
    this.small_icon_list = null;
    this.timerClockLimit = null;
    this.timerWait = null;      // standard timer for wait
    this.timerFlipBack = null;
    this.openedCardIndex = -1;
    this.started = false;

    flip_back_correct = false;

    // FOR In Order challenges/level
    this.inorder_currentIdx = 0;

    this.success = false;
    g_freezeCount = 0;

    //Recreate the level always
    //May 8, 2015
    ReCreateLevel(g_gameData.curr_level_idx);

    this.currentLevel = g_gameData.level_list[g_gameData.curr_level_idx];
    this.currentChallenge = this.currentLevel.challenges_list[g_gameData.curr_challenge_idx];

    this.hits = this.currentLevel.number_of_hits;
    this.level_score = 0;
    this.last_score_granted = 10;
    this.stars_per_challenge = 3;
    g_gameData.total_accumulated_stars = 0;
    this.game_finish = false;
    this.errors = 0;

    // for rundown effect we cache remaining hits and remaining time
    // Added May 16, 2015
    this.remain_hits = this.hits;
    this.remain_pct = 1.0;
    this.remain_time = 0;

    // cache the time limit of the level
    this.time_limit = this.currentLevel.clock_limit;
    if (g_gameMode == GAME_MODE_DOU) {
        this.time_limit += 60;  //DUO is 1 minute longer (milestone 5)
    }


    ////////////////////////////////////////////////////////
    this.LoadTheme();

    this.canvasImg = new ImageObject();
    this.canvasImg.Load("images/ingame/canvas.png");

    this.challengeBoardBg = new ImageObject();
    this.challengeBoardBg.Load("images/ingame/challenge-board-background.png");

    this.bronzeCup = new ImageObject();
    this.bronzeCup.Load("images/ingame/progress-bar-Bronzecup.png");

    this.silverCup = new ImageObject();
    this.silverCup.Load("images/ingame/progress-bar-Silvercup.png");

    this.goldCup = new ImageObject();
    this.goldCup.Load("images/ingame/progress-bar-Goldcup.png");

    this.arrow = new ImageObject();
    this.arrow.Load("images/ingame/progress-bar-arrow.png");

    this.glowImg = new GlowImage();
    this.glowImg.Load("images/ingame/glow-button.png", 60);

    this.glowBtnImg = new GlowImage();
    this.glowBtnImg.Load("images/ingame/glow-side-button.png", 60);

    this.glowBtnImgHits = new GlowImage();
    this.glowBtnImgHits.Load("images/ingame/top-button-glow.png", 60);
    this.glowBtnImgHits._width = 165;
    this.glowBtnImgHits._height = 105;

    this.glowChallengeImg = new GlowImage();
    this.glowChallengeImg.Load("images/ingame/challenge-board-glow.png", 60);

    this.glowTimer = new GlowImage();
    this.glowTimer.Load("images/ingame/timer-glow.png", 60);
    this.glowTimer._width = 400;
    this.glowTimer._height = 57;

    this.checkImg = new ImageObject();
    this.checkImg.Load("images/ingame/check.png");

    this.starTop = new ImageObject();
    this.starTop.Load("images/ingame/star.png");

    this.alert = new ImageObject();
    this.alert.Load("images/ingame/Alert-3.png");

    //this.GoodIconTimer = null;
    this.goodIconIndex = -1;

    this.LoadButton();
    this.EvaluateGlow();

    // reset switch variable per level
    switch_index = null;
    switch_type = null;
    switch_original = null;
    /////////////////////////////////////////////////////////

    //////////////////////////////////////
    // Running score
   // this.targetScore = 0;
    // this.scoreStep = 1;
    this.giveMeScore = 0;
    this.coins_step = 0.25;
    //////////////////////////////////////
    this.animatedTextList = new Array();

    this.LoadBase();

    // Moving arrow implementstion
    this.arrowX = startStarX;
    this.targetArrowX = this.arrowX;

    ////////////////////////////////////////////////////////
    var context = this;
    if (g_gameData.life > 0) {
        this.objectiveWindow = new LevelObjectiveWnd;
        //this.objectiveWindow = new LevelCompleteWnd;
        //this.objectiveWindow = new BestScoreWindow;


		this.objectiveWindow.levelID = g_gameData.curr_level_idx;
        this.objectiveWindow.Load();
        this.objectiveWindow.Show();
        this.objectiveWindow.msg = this.currentLevel.msg;
		
		 this.objectiveWindow.fnPlay = function (){
			context.LoadBoardInfo(context.currentLevel);
		 }
    } else {
        this.objectiveWindow = new ObjectiveWindow;
        this.objectiveWindow.Load();
        this.objectiveWindow.Show();
        
        this.objectiveWindow.msg = ["You have 0 life remaining.", "Please wait or purchase", "extra-lives!"];

        g_gameData.life = 0;
        this.state = GAME_STATE_PURGATORY;
        TriggerEpoch();
    }

    this.objectiveWindow.fnClose = function () {
        g_Engine.SetState(GENERAL_LEVEL_STATE);
		/*if (g_gameData.life > 0) {
            context.LoadBoardInfo(context.currentLevel);
        } else {
            //TEMPORARY!
            context.state = 0;
            //g_Engine.SetState(MAIN_MENU_STATE);
        }   */     
    };
	

    this.state = GAME_STATE_OBJECTIVE;
    ////////////////////////////////////////////////////////
    this.fnCloseMessageBox = null;

    // timer for entire level
    this.timerLevel = new Date().getTime();

    if (g_gameMode == GAME_MODE_DOU) {

        g_DOU_players = new Array();
        g_DOU_players.push(new DOU_PlayerDef());
        g_DOU_players.push(new DOU_PlayerDef());
    }

    board_angle = 0;

    this.glowTrophyArray = new Array();
    this.glowTrophyArray[0] = new GlowImage();
    this.glowTrophyArray[0].Load("images/ingame/progress-bar-bronzecup-glow.png",60);

    this.glowTrophyArray[1] = new GlowImage();
    this.glowTrophyArray[1].Load("images/ingame/progress-bar-Silvercup-glow.png",60);

    this.glowTrophyArray[2] = new GlowImage();
    this.glowTrophyArray[2].Load("images/ingame/progress-bar-Goldcup-glow.png", 60);

    this.timer_bar = new ImageObject();
    this.timer_bar.Load("images/ingame/timer-bg.png");

    this.timer_filling = new ImageObject();
    this.timer_filling.Load("images/ingame/timer-filling.png");

    this.timer_front = new ImageObject();
    this.timer_front.Load("images/ingame/timer-front-white-line.png");

    this.top_button = new ImageObject();
    this.top_button.Load("images/ingame/top-button.png");

    var images_topic = ["images/ingame/scores-icon.png",
    "images/ingame/hits-icon.png",
    "images/ingame/coins-icon.png",
    "images/ingame/life-icon.png"];

    this.top_icon = new Array();
    for (var n = 0; n < 4; n++) {
        var image = new ImageObject();
        image.Load(images_topic[n]);
        this.top_icon.push(image);
    }
}

GameState.prototype.LoadTheme = function () {

    switch (g_gameData.theme) {
        case THEME_TYPE_DEFAULT:
            this.background = new ImageObject();
            this.background.Load("images/themes/default/background.png");

            this.baker = new Button;
            this.baker.LoadImages(
                 "images/ingame/menu.png",
                 "images/ingame/menu-hover.png",
                "images/ingame/menu.png");

            this.baker._X = 168;
            this.baker._Y = 589;
            this.baker._width = 120;
            this.baker._height = 145;
     

            this.baker_2 = new Button;
            this.baker_2.LoadImages(
                 "images/ingame/menu-female.png",
                "images/ingame/menu-female-hover.png",
                "images/ingame/menu-female.png");

            this.baker_2._X = 168;
            this.baker_2._Y = 589;
            this.baker_2._width = 120;
            this.baker_2._height = 145;
            this.baker_2._visible = false;

            if (g_gameMode == GAME_MODE_DOU) {

                this.baker1_Img = new ImageObject();
                this.baker1_Img.Load("images/themes/default/progressbar-male-baker.png");

                this.baker2_Img = new ImageObject();
                this.baker2_Img.Load("images/themes/default/progressbar-female-baker.png");

                this.glowDOU_1 = new GlowImage();
                this.glowDOU_1.Load("images/themes/default/progressbar-male-baker-glow.png", 60);

                this.glowDOU_2 = new GlowImage();
                this.glowDOU_2.Load("images/themes/default/progressbar-female-baker-glow.png", 60);
            }

            /////////////////////////////////////////////////////////////////////////////
            // Monetization buttons            
          /*  var button_file_list = [
                 "images/themes/default/monetization-visible.png",
                "images/themes/default/monetization-freeze.png",
                "images/themes/default/monetization-cancel.png",
                "images/themes/default/monetization-reshuffle.png"
            ];

            

            var arrayText = [
                ["Watch", "3", "seconds"],
                ["Freeze", "2", "icons"],
                ["Cancel", "board", "Move"],
                ["ReShuffle"]
            ];

            this.sideButtonList = new Array();
            var y = 282;
            for (var i = 0; i < button_file_list.length; i++) {
                var btn = new CustomButtonTextHover();
                btn._X = 830;
                btn._Y = y;
                btn.Load(
                     button_file_list[i],
                    53, 53, "rgb(241,104,34)");

                btn.textArray = arrayText[i];
                if (hoverAudio[i] != null) {
                    btn.hoverAudioPath = hoverAudio[i];
                }

                this._uiManagerLocal.Add(btn);
                this.sideButtonList.push(btn);
                y += 68;
            }

            /////////////////////////////////////////////////////////////////////////////

          
            this.machine = new ImageObject();
            this.machine.Load("images/themes/default/monetization-machine.png");
            */
            break;
        case THEME_TYPE_SAMPLE:
            this.background = new ImageObject();
            this.background.Load("images/themes/sample/Customised-Playing-screen-bg.png");


            this.baker = new Button;
            this.baker.LoadImages(
                 "images/themes/sample/elephant_Menu.png",
                 "images/themes/sample/SPV-elephant-button-hover.png",
                "images/themes/sample/elephant_Menu.png");

            this.baker._X = 168;
            this.baker._Y = 589;
            this.baker._width = 120;
            this.baker._height = 145;
            this.baker._visible = true;

             this.baker_2 = new Button;
             this.baker_2.LoadImages(
                  "images/themes/sample/Menu.png",
                  "images/themes/sample/SPV-squrrel-button-hover.png",
                  "images/themes/sample/Menu.png");

            this.baker_2._X = 168;
            this.baker_2._Y = 589;
            this.baker_2._width = 120;
            this.baker_2._height = 145;
            this.baker_2._visible = false;


            if (g_gameMode == GAME_MODE_DOU) {

                this.baker1_Img = new ImageObject();
                this.baker1_Img.Load("images/themes/sample/progress-bar-elephant.png");

                this.baker2_Img = new ImageObject();
                this.baker2_Img.Load("images/themes/sample/progress-bar-squirrel.png");

                this.glowDOU_1 = new GlowImage();
                this.glowDOU_1.Load( "images/themes/sample/progress-bar-elephant-glow.png", 60);

                this.glowDOU_2 = new GlowImage();
                this.glowDOU_2.Load("images/themes/sample/progress-bar-squirrel-glow.png", 60);

            }

            /////////////////////////////////////////////////////////////////////////////
            // Monetization buttons
           /* var button_file_list = [
                "images/themes/sample/monetization-visible.png",
                 "images/themes/sample/monetization-freeze.png",
                "images/themes/sample/monetization-cancel.png",
                "images/themes/sample/monetization-reshuffle.png"
            ];

            this.sideButtonList = new Array();
            var y = 247;
            for (var i = 0; i < button_file_list.length; i++) {
                var btn = new ZoomButton();
                btn._X = 853;
                btn._Y = y;
                btn.highlight = false;
                btn.Load(button_file_list[i]);

                this._uiManagerLocal.Add(btn);
                this.sideButtonList.push(btn);
                y += 57;

                if (hoverAudio[i] != null) {
                    btn.hoverAudioPath = hoverAudio[i];
                }
            }
            this.machine = new ImageObject();
            this.machine.Load("images/themes/sample/monetization-machine.png");
            this.machine_front = new ImageObject();
            this.machine_front.Load("images/themes/sample/monetization-machine-front-glass.png");
            */
            /////////////////////////////////////////////////////////////////////////////
            break;
    }

    var context = this;
    this.baker._fnMouseDownEvnt = (function () {
        if (context.state >= GAME_STATE_PLAY) {
            //Update_Life(-1);
        }
        g_Engine.SetState(GENERAL_LEVEL_STATE);
    });

    this.baker_2._fnMouseDownEvnt = function () {
        if (context.state >= GAME_STATE_PLAY) {
           // Update_Life(-1);
        }
        g_Engine.SetState(GENERAL_LEVEL_STATE);
    };

    this._uimanager.Add(this.baker);
    this._uimanager.Add(this.baker_2);
}

GameState.prototype.LoadButton = function () {
    var context = this;

    this.SetupMonetizationButtons();

    this.purchaseHItsBtn = new RoundButtonText();
    this.purchaseHItsBtn._X = 630;
    this.purchaseHItsBtn._Y = 620;
    this.purchaseHItsBtn._visible = false;
    this.purchaseHItsBtn.border_color = "rgb(241,104,34)";

    this.purchaseHItsBtn.Create(70, 70,
           "rgb(241,104,34)",
           "rgb(255,255,255)",
           "rgb(255,255,255)",
           "rgb(255,0,0)",
            "15 hits",
           "Androgyne_TB",
           14);

    this.purchaseHItsBtn._fnMouseDownEvnt = function () {
        if (g_losstype == 1) {
            //extra time
            if (Credit_Coins(EXTRA_SECS_COST)) {
                context.time_limit = EXTRA_SECS_COUNT;
                context.state = GAME_STATE_PLAY;
                context.timerClockLimit = new Date().getTime();
            }
        } else {
            //extra hits
            if (Credit_Coins(EXTRA_HITS_COST)) {
                context.hits += EXTRA_HITS_COUNT;
                context.state = GAME_STATE_PLAY;
            }
        }
    };

    this._uiManagerLocal.Add(this.purchaseHItsBtn);

    ///////////////////////////////////////
    // Gifts implementation
    // as described in milestone 4:
    // Should ALWAYS appear on the playing screen, even if empty
    ///////////////////////////////////////
    /*  if (g_gameData.gift_count > 0) */
    {

        var gift = new Button;
        gift.LoadImages(
              "images/gifts/Playing-screen-gift-button.png",
              "images/gifts/Playing-screen-gift-button-hover.png",
             "images/gifts/Playing-screen-gift-button.png");

        gift._width = 123;
        gift._height = 115;
        gift._X = 782;;
        gift._Y = 600;
        gift._fnMouseDownEvnt = (function () {
            if (context.state != GAME_STATE_PLAY) return;
            context.giftpopup = new GiftsWindow();
            context.giftpopup.Load();
            context.giftpopup.Show();
            saved_state = context.state;
            context.giftpopup.fnClose = function () {
                context.state = saved_state;
            };
            context.giftpopup.fnGiftClicked = function () {
                // award 1 life + 10 seconds+ 10 hits
                context.RewardGift();

            }
            context.state = GAME_STATE_GIFT_WINDOW;
        });

        this._uimanager.Add(gift);
    }
}


GameState.prototype.SetupMonetizationButtons = function () {
    var context = this;

    /////////////////////////////////////////////////////////
    // Load the side buttons
    this.machine = new ImageObject();
    this.machine.Load("images/ingame/monetization-machine.png");
    this.machine_front = new ImageObject();
    this.machine_front.Load("images/ingame/monetization-machine-front-glass.png");

    var button_file_list = [
        "images/ingame/monetization-visible.png",
        "images/ingame/monetization-freeze.png",
        "images/ingame/monetization-reshuffle.png"
    ];

    var hoverAudio = [
        "Machine-Look",
        "Machine-Freeze",
        "Machine-Remix"
    ];

    this.sideButtonList = new Array();
    var y = 255;
    for (var i = 0; i < button_file_list.length; i++) {
        var btn = new ZoomButton();
        btn._X = 830;
        btn._Y = y;
        btn.highlight = false;
        btn.Load(button_file_list[i]);

        this._uiManagerLocal.Add(btn);
        this.sideButtonList.push(btn);
        y += 70;

        if (hoverAudio[i] != null) {
            btn.hoverAudioPath = hoverAudio[i];
        }
    }

    /////////////////////////////////////////////////////////////////
    // Setup Button events
    // Reshuffle button 
    
    this.sideButtonList[2]._fnMouseDownEvnt = function () {
        if (context.state == GAME_STATE_SHUFFLE_CARD) return;
        // if (!g_reShuffleAllowed) return;
        if (!context.IsAllowReshuffule()) return;

        g_highlight_Shuffle = false;

        // context.ReShuffle();        
        if (context.state == GAME_STATE_TIMER_VIEWING) {
            g_MonetizeMode = 0;
        } else if (context.state == GAME_STATE_PLAY) {
            g_MonetizeMode = 1;
        }
        context.DoMonetize();
    };

    // Watch 3 Seconds
    this.sideButtonList[0]._fnMouseDownEvnt = function () {
        // if (!g_Watch3SecondsAllowed) return;
        if (context.state != GAME_STATE_PLAY) return;

        g_highlight_Watch3Seconds = false;
        //context.Watch3Seconds();
        context.DoMonetize();
        g_MonetizeMode = 2;
    };

    // Freeze 2 icons
    this.sideButtonList[1]._fnMouseDownEvnt = function () {
        // if (!g_freez2IconsAllowed) return;
        if (context.state != GAME_STATE_PLAY) return;
        if (context.IsBoardFrozen()) return;

        // Player can freeze the hell till he wants!
        //if (g_freezeCount >= 2) return;
        g_freezeCount = 0;


        g_freeze2Icons = false;
        //context.state = GAME_STATE_FREEZE;

        saved_state = GAME_STATE_PLAY;
        context.DoMonetize();
        g_MonetizeMode = 4;
    };

    // Cancel board move
    /*this.sideButtonList[2]._fnMouseDownEvnt = function () {
        if (!g_cancelBoardMoveAllowed) return;
        if (switch_index == null) return; // No movement, no cancel

        g_cancelBoardMoveHighlight = false;
        //context.SwitchBack();

        context.DoMonetize();
        g_MonetizeMode = 3;
    }*/
    
    /////////////////////////////////////////////////////////////////
    // Add the YES/NO button for monetization.
    var yes_no_width = (47 * 2);
   /* this.yesBtn = new RoundButtonText;
    this.yesBtn.Create(90, 40,
        "rgb(59,157,59)",
        "rgb(255,255,255)",
        "rgb(255,255,255)",
        "rgb(255,0,0)",
        "YES",
        "Androgyne_TB",
        20);
        */
    //
    this.yesBtn = new Button;
    this.yesBtn.LoadImages(
         "images/customization/yes-button.png",
        "images/customization/yes-button-hover.png",
	    "images/customization/yes-button.png");

 //   this.yesBtn.border_color = "rgb(59,157,59)";
    this.yesBtn._X = (DEFAULT_WINDOW_WIDTH / 2) - (yes_no_width / 2);
    this.yesBtn._Y = 660;
    this.yesBtn._width = 47;
    this.yesBtn._height = 47;
    this.yesBtn._visible = false;    
    this.yesBtn._fnMouseDownEvnt = function () {	
        saved_state = 0;
        switch (g_MonetizeMode) {
            case 0:
            case 1:
                if (Credit_Coins(SHUFFULE_PRICE)) {
                    context.ReShuffle();
                    Ajax_UpdateMonetize(g_gameData.curr_level_idx,
						MONETIZATION_SHUFFULE);
                } else {
                    if (g_MonetizeMode == 0) {
                        saved_state = GAME_STATE_TIMER_VIEWING;
                    } else {
                        saved_state = GAME_STATE_PLAY;
                    }
                    context.UnableToPurchase();
                }
                break;
            case 2:
                if (Credit_Coins(WATCH_3_PRICE)) {
                    context.Watch3Seconds();
                    Ajax_UpdateMonetize(g_gameData.curr_level_idx,
						MONETIZATION_WATCH_3);
                } else {
                    saved_state = GAME_STATE_PLAY;
                    context.UnableToPurchase();
                }
                break;
            /*case 3:
                if (Credit_Coins(CANCEL_MOVE_PRICE)) {
                    context.SwitchBack();
                    Ajax_UpdateMonetize(g_gameData.curr_level_idx,
						MONETIZATION_CANCEL_MOVE);
                } break;*/
            case 4:
                if (Credit_Coins(FREEZE_ICON_PRICE)) {
                    context.state = GAME_STATE_FREEZE;
                    Ajax_UpdateMonetize(g_gameData.curr_level_idx,
						MONETIZATION_FREEZE_ICON);
                } else {
                    saved_state = GAME_STATE_PLAY;
                    context.UnableToPurchase();
                } break;
            case 5:
                // Reward gifts!
                context.RewardGift();
                break;
            case 6:
                //extra hit
                if (Credit_Coins(EXTRA_HITS_COST)) {
                    context.hits += EXTRA_HITS_COUNT;
                    context.state = GAME_STATE_PLAY;
					
					 Ajax_UpdateMonetize(g_gameData.curr_level_idx,
						MONETIZATION_EXTRA_HITS);
                } else {
                    saved_state = GAME_STATE_PLAY;
					 context.UnableToPurchase();
                }
                break;
            case 7:
                //extra seconds
                if (Credit_Coins(EXTRA_SECS_COST)) {
                    context.time_limit = EXTRA_SECS_COUNT;
                    context.state = GAME_STATE_PLAY;
                    context.timerClockLimit = new Date().getTime();
					
					 Ajax_UpdateMonetize(g_gameData.curr_level_idx,
						MONETIZATION_EXTRA_SECS);
						
                } else {
                    saved_state = GAME_STATE_PLAY;
					 context.UnableToPurchase();
                }
                break;
        }
    };
    this.yesBtn.clickAudioPath = "Click-Confirm";

    /*this.noBtn = new RoundButtonText;
    this.noBtn.Create(90, 40,
        "rgb(255,20,20)",
        "rgb(255,255,255)",
        "rgb(255,255,255)",
        "rgb(255,0,0)",
        "NO",
        "Androgyne_TB",
        20);

    //255,20,20
    this.noBtn.border_color = "rgb(255,20,209)";
    */

    this.noBtn = new Button;
    this.noBtn.LoadImages(
        "images/customization/no-button.png",
        "images/customization/no-button-hover.png",
	    "images/customization/no-button.png");

    this.noBtn._X = (DEFAULT_WINDOW_WIDTH / 2) + (110 - 90);
    this.noBtn._Y = 660;
    this.noBtn._width = 47;
    this.noBtn._height = 47;
    this.noBtn._visible = false;
    this.noBtn._fnMouseDownEvnt = function () {
        if (g_MonetizeMode == 5) {
            context.ShowFailedPopup();
        }else if(g_MonetizeMode == 6 || g_MonetizeMode == 7){
            context.ShowFailedPopup();
         } else {
            context.state = saved_state;
            saved_state = 0;
            context.yesBtn._visible = false;
            context.noBtn._visible = false;
            if (context.state == GAME_STATE_FREEZE) {
                context.state = GAME_STATE_PLAY;
            }
        }
    };

    this._uiManagerLocal.Add(this.yesBtn);
    this._uiManagerLocal.Add(this.noBtn);
    /////////////////////////////////////////////////////////////////
}

GameState.prototype.IsAllowReshuffule = function () {
    for (var i = 0; i < this.board.length; i++) {
        if (this.board[i].done) {
            return false;
        }
    }
    return true;
}

GameState.prototype.RewardGift = function ()
{
    this.hits += 10;
    Update_Life(1);

    var currTime = new Date().getTime();
    var diff = (currTime - this.timerClockLimit) / 1000;
    this.time_limit -= diff;
    if (this.time_limit < 0)
        this.time_limit = 0;

   ////////////////////////////////////////////////
    var timerText = new AnimatedText;
    timerText.size = 0;
    timerText.fontface = "Androgyne_TB";
    timerText.strike = "Bold";
    timerText.text = "+10";
    timerText.type = ANIMATION_TYPE_ZOOM_OUT;
    timerText.centerx = 547;
    timerText.targetSize = 100;
    timerText._Y = 600;
    timerText.alpha_step = -1;
    timerText.staySeconds = 800;
    timerText.ANIMTEXT_ZOOM_STEP = 500;

    var context = this;
    timerText.fnZoomDone = (function () {
       
        context.time_limit += 10;
        context.timerClockLimit = new Date().getTime();  

        for (var i = 0; i < context.animatedTextList.length; i++) {
            if (context.animatedTextList[i] == this) {
                context.animatedTextList.splice(this, 1);
            }
        }
    });

    this.animatedTextList.push(timerText);
    ////////////////////////////////////////////////

    this.state = GAME_STATE_PLAY;
}

GameState.prototype.DoMonetize = function (value) {
    saved_state = this.state;
    this.state = GAME_STATE_YES_NO_MONETIZE;
    this.yesBtn._visible = true;
    this.noBtn._visible = true;
}

GameState.prototype.IsBoardFrozen = function ()
{
    // count frozen board
    var frozen = 0;
    for (var i = 0; i < this.board.length; i++) {
        if (this.board[i].freeze || this.board[i].isOpen)
            frozen++;
    }

    return (frozen == this.board.length);
}

GameState.prototype.LoadBoardInfo = function (level) {

    if (this.board != null) {
        for (var i = 0; i < this.board.length; i++) {
            var obj = this._uiManagerLocal.Find(this.board[i]);
            if (obj) {
                this._uiManagerLocal.Remove(obj);
            }
        }
    }


    this.state = GAME_STATE_SHUFFLE_CARD;
    this.board = new Array();
    var itr = 0;

    var boardw = (100 * 3);
    var sourcex = (DEFAULT_WINDOW_WIDTH / 2) - (boardw / 2) - 20;
    var y = 210;
    for (var j = 0; j < 3; j++) {
        x = sourcex;
        for (var i = 0; i < 3; i++) {

            var cardbox = new IconBox();
            cardbox.Load();
            cardbox.id = itr;
            cardbox._X = x;
            cardbox._Y = y;

            // special handling for hidden levels            
            cardbox.isOpen = (this.currentLevel.hidden) ? false : true;

            cardbox.InitialState();

            var type = level.board[itr++];
            cardbox.LoadFace(type);

            cardbox._fnMouseDownEvnt = function () {
                if (context.state != GAME_STATE_PLAY) {
                    if (context.state == GAME_STATE_FREEZE) {
                        if (this.freeze) return;
                        if (g_freezeCount < 2) {

                            this.Flip();
                            this.freeze = true;

                            if (this.id == context.goodIconIndex) {
                                context.goodIconIndex = -1;
                            }

                            ++g_freezeCount;

                            if (g_freezeCount >= 2) {
                                context.state = GAME_STATE_PLAY;
                                g_freezeCount = 0;                               
                            }
                            
                            if (context.IsBoardFrozen()) {
                                context.state = GAME_STATE_PLAY;
                            }
                        }
                    }
                    return;
                }

                context.goodIconIndex = -1;

                if (this.isOpen) {
                    if (this.freeze) {
                        context.Evaluate(this.id);
                    }
                    return;
                }
                if (context.hits <= 0) return;

                this.Flip();
                this.fnAnimateComplete = function () {

                    //lets play some audio
                    var audio = ["TF-Croissant",
                        "TF-Cupcake", "TF-Eclair",
                        "TF-Popsicle"];
                    var index_aud = 0;

                    if( context.board[this.id].type == ICON_TYPE_POPCAKES_PINK ||
                        context.board[this.id].type == ICON_TYPE_POPCAKES_GREEN ||
                        context.board[this.id].type == ICON_TYPE_POPCAKES_WHITE)
                    {
                        index_aud= 3;    
                    } else if (context.board[this.id].type == ICON_TYPE_CUPCAKE_PINK ||
                        context.board[this.id].type == ICON_TYPE_CUPCAKE_GREEN ||
                        context.board[this.id].type == ICON_TYPE_CUPCAKE_WHITE)
                    {
                        index_aud = 1;
                    } else if (context.board[this.id].type == ICON_TYPE_ECLAIRS_PINK ||
                        context.board[this.id].type == ICON_TYPE_ECLAIRS_GREEN ||
                        context.board[this.id].type == ICON_TYPE_ECLAIRS_WHITE)
                    {
                        index_aud = 2;
                    } 

                    var flipaud = GetAudioResource(audio[index_aud]);
                    if (flipaud)
                        flipaud.play();

                    context.Evaluate(this.id);
                };

            };

            if (i == 0 && j == 0) {
                cardbox.In();
                currentIndexShow = 0;
                var context = this;
                cardbox.fnAnimateComplete = function () {
                    context.ShowNext();

                };
            }

            this.board.push(cardbox);
            this._uiManagerLocal.Add(cardbox);
            x += 120;
        }

        y += 120;
    }
}
GameState.prototype.DoLoss = function (type) {
    g_losstype = type;

    
    //this.purchaseHItsBtn._visible = true;
    this.state = GAME_STATE_LOSS;
    if (type == 1) {
     //   this.purchaseHItsBtn.text = "15 secs";
      //  this.purchaseHItsBtn._X = 630;
        g_MonetizeMode = 7;

    } else {
       // this.purchaseHItsBtn.text = "15 hits";
        //this.purchaseHItsBtn._X = 610;
        g_MonetizeMode = 6;
    }

    this.yesBtn._visible = true;
    this.noBtn._visible = true;

    //this.timerLoss = new Date().getTime();

   /* if (g_gameData.gift_count > 0) {
        g_losstype = type
        g_MonetizeMode = 5;
        this.DoMonetize();
    } else {
        this.ShowFailedPopup();
    }*/
}

GameState.prototype.DoNothing = function () {
    if (g_gameData.life - 1 <= 0) {
        var context = this;
        this.popupLost = new PurchaseLifeWindow();
        this.popupLost.fnClose = function () {

            // IF after pop-up the life is still 0, 
            // then we go to purgatory
            if (g_gameData.life <= 0) {
                context.state = GAME_STATE_PURGATORY;
                g_gameData.life = 0;
                //Update_Life(-1);

                TriggerEpoch();
            } else {

                // IF you loose life because no more hits or no more time
                // then no point of continuing to where you are because
                // you have no more hits or time, reload the level instead.
                g_Engine.SetState(GAME_STATE);                
            }
            
        };

        /*this.popupLost.fnInviteConfirm = function () {
            //context.hits += EXTRA_HITS_COUNT;
            //context.state = GAME_STATE_PLAY;
            // Conflicting specifications
            Update_Life(1);
            Debit_Coins(10);
            g_Engine.SetState(GAME_STATE);
        };*/
        this.popupLost.Load(); 
        this.popupLost.Show();

        this.state = GAME_STATE_POPUPLOST;
        g_gameData.life = 0;
    } else {
      //  Update_Life(-1);

        // start at challenge 1 of the level
        g_gameData.curr_challenge_idx = 0;

        // great the shit
        this.state = GAME_STATE_LOSS_MSG;
        this.timerLoss = new Date().getTime();
    }
}

var currentIndexShow = 0;
GameState.prototype.ShowNext = function () {
    this.board[currentIndexShow].fnAnimateComplete = null;
    currentIndexShow++;
    if (currentIndexShow < 9) {
        this.board[currentIndexShow].In();

        var context = this;
        this.board[currentIndexShow].fnAnimateComplete = function () {
            context.ShowNext();
        }

    } else {
        /////////////////////////////////////////////
        // Start The Timer!!
        /////////////////////////////////////////////
        if (this.currentLevel.hidden) {
            this.GenerateIconChallenge();
        } else {
            this.timerStartGame = new Date().getTime();
            this.state = GAME_STATE_TIMER_VIEWING;
            currentIndexShow = 0;

            //start the audio timer too
            //LoadAndPlay("15Sec-Timer");
            var aud = GetAudioResource("15Sec-Timer");
            if (aud) {
                //aud.volume = 1;

                var seconds_advance = 15 - this.currentLevel.seconds;
                aud.currentTime = seconds_advance;
                aud.loop = false;
                aud.play();
            }

			this.EvaluateGlow();
		}

    }
}

GameState.prototype.ShowNextSmallIcon = function () {
    this.small_icon_list[currentIndexShow].fnAnimateComplete = null;
    currentIndexShow++;
    if (currentIndexShow < this.currentChallenge.icons.length) {
        this.small_icon_list[currentIndexShow].In();

        var context = this;
        this.small_icon_list[currentIndexShow].fnAnimateComplete = function () {
            context.ShowNextSmallIcon();
        }

    } else {
        currentIndexShow = 0;
        this.state = GAME_STATE_PLAY;

        this.started = true;

        // IF this level has clock, then start timer
        if (this.currentLevel.clock_limit != -1) {
            //if not yet instantiated, create object
            if (this.timerClockLimit == null) {
                this.timerClockLimit = new Date().getTime();
            }
        }

        // BULLSHIT SPecs
        if ((g_gameData.curr_challenge_idx == 0 &&
            g_gameData.curr_level_idx == 1)) {
            g_freeze2Icons = true;
            g_freez2IconsAllowed = true;
            g_highlight_Shuffle = false;
        }

        if (this.hits == 0) {
            // Added May 30, 2015
            // IF next challenged started without any hits
            // offer purchase
            this.DoLoss(0);
        }
    }
}

GameState.prototype.CheckNeutral = function () {
    // check if neutral has already been discovered
    for (var i = 0; i < this.small_icon_list.length; i++) {
        if (this.small_icon_list[i].type == ICON_TYPE_NEUTRAL &&
            this.correct_list[i]) {
            return true;
        }
    }
    return false;
}

GameState.prototype.IsIndexOpen = function (index) {
    for (var i = 0; i < this.correctIndex_list.length; i++) {
        if (this.correctIndex_list[i] == index)
            return true;
    }
    return false;
}

GameState.prototype.SpawnAnimatedScore = function (value, func)
{
    var scoreText = new AnimatedText;
    scoreText.size = 200;
    scoreText.fontface = "Androgyne_TB";
    scoreText.strike = "Bold";
    scoreText.text = "+" + value;
    scoreText.type = ANIMATION_TYPE_ZOOM_IN;
    scoreText.centerx = 347.5;
    scoreText.targetSize = 19;
    scoreText._Y = 124;
    scoreText.staySeconds = 800;
    scoreText.ANIMTEXT_ZOOM_STEP = 500;

    LoadAndPlay("Scoreboard-Plus");

    var context = this;
    scoreText.fnZoomDone = (function () {
        context.level_score += context.giveMeScore;

        for (var i = 0; i < context.animatedTextList.length; i++) {
            if (context.animatedTextList[i] == this) {
                context.animatedTextList.splice(this, 1);
            }
        }

        if (func) {
            func();
        }
    });

    this.animatedTextList.push(scoreText);
}

GameState.prototype.Evaluate = function (index) {

    if (this.IsIndexOpen(index)) {
        if (this.currentLevel.correct_flipback) {
            this.FLipBackCard(index);
        }
        return;
    }

    var found = false;
    this.hits--;

    if (this.currentChallenge.inorder) {

        if (this.board[index].type == this.small_icon_list[this.inorder_currentIdx].type) {
            found = true;
            this.correct_list[this.inorder_currentIdx] = true;

            if (this.inorder_currentIdx + 1 < this.small_icon_list.length) {
                this.inorder_currentIdx++;
            }
        }

    } else {
        for (var i = 0; i < this.small_icon_list.length; i++) {

            if (this.board[index].type == this.small_icon_list[i].type) {

                found = true;
                if (this.board[index].type == ICON_TYPE_NEUTRAL &&
                    this.CheckNeutral()) {
                    found = false;
                }

                this.correct_list[i] = true;
                break;
            }
        }
    }

    if (!found) {

        this.FLipBackCard(index);

        // last score granted is re-initialize to 10
        this.last_score_granted = this.currentLevel.point_per_challenge;

        //base from tables, 1 error is 2 stars, 3 error is 1 star, more than is 0 stars
        if (this.stars_per_challenge - 1 >= 0) {
            this.stars_per_challenge--;
        } else {
            this.stars_per_challenge = 0;
        }

        this.errors++;

        flip_back_correct = false;

    } else {

        //this.level_score += this.last_score_granted;        
        //this.targetScore += this.last_score_granted;
        this.giveMeScore = this.last_score_granted;        
        this.SpawnAnimatedScore(this.last_score_granted);
        this.last_score_granted += this.currentLevel.point_per_challenge;

        this.correctIndex_list.push(index);

        // Added 12/29/2014
        if (this.currentLevel.correct_flipback) {
            flip_back_correct = true;
            this.FLipBackCard(index);
        } else {
            this.board[index].done = true;
        }

        // For DOU version
        if (g_gameMode == GAME_MODE_DOU) {
            g_DOU_players[g_DOU_turn].level_score += this.last_score_granted;
        }
    }

    // detect winner
    var count = 0;
    for (var i = 0; i < this.correct_list.length; i++) {
        if (this.correct_list[i]) {
            count++;
        }
    }

    if (count == this.correct_list.length) {
        // Declare winner section (per challenge)
        this.state = GAME_STATE_STARIN;

        this.ProduceStar(this.stars_per_challenge);

        this.success = true;

        /*var message = ["Well Done!", "Good Job!", "Congratulations!", "Way to Go!"];

        var idex = Math.floor(Math.random() * message.length);

        g_message = message[idex];
        */

        var msg_3_stars =
            ["Your are a Chief!",
            "Impressive!",
            "Memorable!",
            "Great play!",
            "I love your brain!"];

        var msg_2_stars =
            ["Almost perfect!",
            "You'll succeed!",
            "Nice memory!",
            "What a brain!",
            "So close to perfection!"];

        var msg_1_star =
            ["Play more, get better!",
            "You can do better!",
            "It's encouraging!",
            "No pain, no brain!",
            "Practice, practice, practice!"];

        var msg_no_star = [
            "Don't worry, be happy!",
            "Keep practicing!",
            "You'll do better next time!",
            "You can do it!",
            "Wake up please!"
        ];

        var message = [
            msg_no_star,
            msg_1_star,
            msg_2_stars,
            msg_3_stars
        ];
     
        var idex = Math.floor(Math.random() * message[this.stars_per_challenge].length);
        g_message = message[this.stars_per_challenge][idex];
     
        g_gameData.total_accumulated_stars += this.stars_per_challenge;

        // arrow movement implementation		
        //var topBarX = (DEFAULT_WINDOW_WIDTH / 2) - (topline_width / 2);   
        var arrow_pct = g_gameData.total_accumulated_stars / 30.0;
        var starWidth = goldX - startStarX;
        this.targetArrowX = (startStarX) + (starWidth * arrow_pct);

        if (g_gameMode == GAME_MODE_DOU) {
            if (g_DOU_turn == 0) {
                g_message = "Player 1 wins the challenge!";
            } else {
                g_message = "Player 2 wins the challenge!";
            }
            g_DOU_players[g_DOU_turn].challengedWon++;
        }

        var starAudio = [
             "Star-1",
             "Star-2",
             "Star-3"
        ];

        if (this.stars_per_challenge > 0) {
            LoadAndPlay(starAudio[this.stars_per_challenge - 1]);
        }
        this.game_finish = true;

    } else {
        if (this.hits == 0) {
            //Game over here
            // RUN OUT OF HITS!!
            this.game_finish = true;
            this.success = false;

            this.DoLoss(0);
        }
    }

    if (this.game_finish && this.IsLevelDoneOnNext()) {
        //Cache data if there are no more challenges left
        this.remain_hits = this.hits;
        var currTime = new Date().getTime();
        var diff = (currTime - this.timerClockLimit) / 1000;
        var remain_seconds = this.time_limit - diff;
        this.remain_time = remain_seconds;

        pct = remain_seconds / this.time_limit;
        pct = (pct < 0) ? 0 : pct;
        this.remain_pct = pct;
    }
}

GameState.prototype.IsLevelDoneOnNext = function ()
{
    return !(g_gameData.curr_challenge_idx + 1
        < this.currentLevel.challenges_list.length);

}

GameState.prototype.FLipBackCard = function (index)
{
    if (!this.board[index].freeze) {
        this.timerFlipBack = new Date().getTime();
        this.state = GAME_STATE_FLIPBACK;
        this.openedCardIndex = index;
    }
}

var starNextShow = 0;
GameState.prototype.ShowNextStar = function () {
    this.star_list[starNextShow].fnAnimateComplete = null;
    starNextShow++;
    if (starNextShow < this.star_list.length) {
        var context = this;
        this.star_list[starNextShow].EnterAnimate();
        this.star_list[starNextShow].fnAnimateComplete = function () {
            context.ShowNextStar();
        };
    } else {
        // initialize timer wait before start of next challenge
        this.game_finish = true;
        this.timerWait = new Date().getTime();
        this.state = GAME_STATE_WINNER;
    }

}

GameState.prototype.ProduceStar = function (count) {

    this.star_list = new Array();
    starNextShow = 0;

    var gap = 5;
    var width = (count > 1) ? STAR_NORMAL_WIDTH + gap : STAR_NORMAL_WIDTH;
    var total_width = (width * count);
    var sourcex = (DEFAULT_WINDOW_WIDTH / 2) - (total_width / 2);

    var y = 610;
    for (var i = 0; i < count; i++) {
        var star = new Star();
        star._X = sourcex;
        star._Y = y;

        if (i == 0) {
            var context = this;
            star.EnterAnimate();
            star.fnAnimateComplete = function () {
                context.ShowNextStar();
            };
        } else {
            star.visible = false;
        }

        sourcex += width;
        this.star_list.push(star);
    }

    if (count <= 0) {
        this.game_finish = true;
        this.timerWait = new Date().getTime();
        this.state = GAME_STATE_WINNER;
    }
}

GameState.prototype.Watch3Seconds = function (count) {
    // if (this.state != GAME_STATE_PLAY) return;
    this.state = GAME_STATE_WATCH3_SECONDS_0;
    for (var i = 0; i < this.board.length; i++) {
        if (!this.board[i].isOpen) {
            this.board[i].Flip();
            this.board[i].fnAnimateComplete = null;
        }
    }
    this.watch3SecTimer = new Date().getTime();
}

GameState.prototype.ReShuffle = function () {
    // if (this.state != GAME_STATE_PLAY) return;
    //
    // 
    if (g_MonetizeMode == 0/*this.state == GAME_STATE_TIMER_VIEWING*/) {
        this.currentLevel.Generate();
        this.LoadBoardInfo(this.currentLevel);
    } else if (g_MonetizeMode == 1/*this.state == GAME_STATE_PLAY*/) {
        this.currentLevel.RegenerateChallenge(g_gameData.curr_challenge_idx);
        this.GenerateIconChallenge();

        // close the board again!
        for (var i = 0; i < this.board.length; i++) {
            if (this.board[i].isOpen) {
                this.board[i].Flip();
                this.board[i].done = false;
                this.board[i].fnAnimateComplete = null;
            }
        }
    }
}

GameState.prototype.SwitchBack = function () {
    /* 
    // implementation 1
    if (switch_original == null) return;
    for (var i = 0; i < switch_type.length; i++) {
        switch_type[i] = switch_original[i];
    }

    switch_back = true;
    this.timerSwitch = new Date().getTime();
    this.state = GAME_STATE_SWITCH_1;
    */

    if (switch_index == null) return;

    for (var i = 0; i < switch_index.length; i++) {
        var obj = this.board[switch_indexed_new[i]];
        var objTarget = this.board[switch_index[i]];

        //obj.GoTo(objTarget._X, objTarget._Y);
        switch_original_coord.push({ x: objTarget._X, y: objTarget._Y });
        switch_object_list.push(objTarget);
    }

    switch_back = true;
    this.timerSwitch = new Date().getTime();
    this.state = GAME_STATE_SWITCH_1;
}

GameState.prototype.GenerateIconChallenge = function () {

    this.state = GAME_STATE_ONHOLD;

    if (this.currentChallenge.inorder) {
        this.inorder_currentIdx = 0;

        //this.green_arrow = new ImageObject();
        // this.green_arrow.Load("images/ingame/green_arrow.png");

        //this.green_arrow_glow = new GlowImage();
        // this.green_arrow_glow.Load("images/ingame/arrow-glow.png", 120);

        this.green_arrow = new AnimatedObject();
        // this.green_arrow.Load("images/ingame/arrow/green-arrow-left.png");
      
        this.green_arrow._fnCallback = (function () {
            //...
        });

        switch (g_gameData.theme) {
            case THEME_TYPE_DEFAULT:
                this.green_arrow.Load("images/themes/default/arrow_left.png");
                this.green_arrow.Set(7, 10.0, true);
                this.green_arrow._frameWidth = 64.714;
                break;
            case THEME_TYPE_SAMPLE:
                this.green_arrow.Load("images/themes/sample/arrow-squirrel.png");
                this.green_arrow.Set(1, 10.0, true);
                this.green_arrow._frameWidth = 49;
                break;
        }
    }

    this.stars_per_challenge = 3;
    this.small_icon_list = new Array();
    this.correct_list = new Array();
    this.correctIndex_list = new Array();

    // Generate Small Icon from current Chann
    var length = this.currentChallenge.icons.length;
    var boardw = (68 * length);
    var sourcex = (DEFAULT_WINDOW_WIDTH / 2) - (boardw / 2);
    var x = sourcex;
    var y = 610;

    for (var i = 0; i < length; i++) {
        var cardbox = new SmallIconBox();
        cardbox.Load();
        cardbox._X = x;
        cardbox._Y = y;
        cardbox.isOpen = true;
        cardbox.InitialState();

        var type = this.currentChallenge.icons[i];
        cardbox.LoadFace(type);

        this.correct_list.push(false);
        this.small_icon_list.push(cardbox);

        if (i == 0) {
            cardbox.In();
            currentIndexShow = 0;
            var context = this;
            cardbox.fnAnimateComplete = function () {
                context.ShowNextSmallIcon();
            };
        }

        x += (SMALL_ICONBOX_WIDTH + 10);
    }

    // check if this challenge has good icon on it
    // this.GoodIconTimer
    if (this.currentChallenge.goodIcon > 0 && g_gameMode != GAME_MODE_DOU) {

        //look for good icon 0
        var theicon = this.currentChallenge.icons[0];
        for (var i = 0; i < this.board.length; i++) {
            if (this.board[i].type == theicon) {
                this.goodIconIndex = i;
                break;
            }
        }

        // Create yellow arrow!
        this.yellow_arrow = new AnimatedObject();
        // this.yellow_arrow.Load("images/ingame/arrow/yellow-arrow-left.png");


        switch (g_gameData.theme) {
            case THEME_TYPE_DEFAULT:
                this.yellow_arrow.Load("images/themes/default/arrow_left.png");
                this.yellow_arrow.Set(7, 10.0, true);
                this.yellow_arrow._frameWidth = 64.714;
                break;
            case THEME_TYPE_SAMPLE:
                this.yellow_arrow.Load( "images/themes/sample/arrow-left.png");
                this.yellow_arrow.Set(8, 10.0, true);
                this.yellow_arrow._frameWidth = 865/8;
                break;
        }

        this.yellow_arrow._fnCallback = (function () {
            //...
        });
    }

    //Load the audio for new challenge
    LoadAndPlay("Flip-Begin");
}

GameState.prototype.BeForePlay = function () {

    // close all the cards
    for (var i = 0; i < this.board.length; i++) {
        this.board[i].Flip();
        this.board[i].done = false;
        this.board[i].fnAnimateComplete = null;
    }

    this.GenerateIconChallenge();

    //From request #428049
    //Deduct life every time player plays a level
    Update_Life(-1);
}

GameState.prototype.UnableToPurchase = function ()
{
    var message = ["Unable to purchase item!", "", "Not enough Chococoins!"];
    var context = this;

    this.fnCloseMessageBox = function () {
        context.state = saved_state;
        saved_state = 0;
		
		/*
		// Nope we will not activate this for now as user can have the options
		to use gifts if he does not have any coins.
		if( g_MonetizeMode == 6 || 
			g_MonetizeMode == 7) {
			context.ShowFailedPopup();
		}*/
	
    };
    context.MessageBox(message);
}

GameState.prototype.OnCloseMsgBox = function () {
    if (this.fnCloseMessageBox) {
        this.fnCloseMessageBox();
        this.fnCloseMessageBox = null;
    }
}

GameState.prototype.DOUnlock = function ()
{
    var context = this;

    if (g_gameData.curr_level_idx+1 <= g_gameData.max_level ) {
        this.NextLevel();
        return;
    }

    this.fnCloseMessageBox = function () {
        g_Engine.SetState(GENERAL_LEVEL_STATE);
    };

    if (g_gameData.curr_level_idx + 1 > g_gameData.level_list.length) {
        var message = ["Unable to unlock level", "", "Run out of Levels!"];
        this.MessageBox(message);        
        return;
    }

    this.unlockWnd = new UnlockWindow();
    this.unlockWnd.id = g_gameData.curr_level_idx + 1;
    this.unlockWnd.Load();
    this.unlockWnd.Show();
    this.unlockWnd.fnClose = function () {
        context.state = saved_state;
        g_Engine.SetState(GENERAL_LEVEL_STATE);
    };
    this.unlockWnd.fnUnlock = function () {
        if (Credit_Coins(UNLOCK_LEVEL_PRICE)) {
            UnlockLevel(this.id);
            context.NextLevel();
        } else {
            var message = ["Unable to unlock level", "", "Not enough chococoins!"];           
            context.MessageBox(message);
            
        }
    };

    this.state = GAME_STATE_UNLOCKLEVEL;
}

GameState.prototype.ShowFailedPopup = function (msg)
{
    var context = this;
    this.state = GAME_STATE_LEVELCOMPLETE_WND;
    this.popupComplete = new LevelCompleteWnd;
    this.popupComplete.type = 1;
    this.popupComplete.Load();
    this.popupComplete.score = this.level_score;
    this.popupComplete.stars = g_gameData.total_accumulated_stars;
    this.popupComplete.Show();


    if (msg) {
        this.popupComplete.succmsg = msg;
    } else {
        if (g_losstype == 0) {
            // no more hits
            this.popupComplete.succmsg = [
                "YOU HAVE NO MORE HITS!",
				"TRY AGAIN!"
            ];
        } else if (g_losstype == 1) {
            this.popupComplete.succmsg = [
                "YOU RUN OUT OF TIME!",
				"TRY AGAIN!"
            ];
        }
    }

    this.popupComplete.fnNext = function () {
        this.targetY = DEFAULT_WINDOW_HEIGHT;
        this.state = SLIDE_WINDOW_STATE_OUT;

        this.fnAnimDone = function () {
            context.DOUnlock();
        }
    };

    this.popupComplete.fnClose = function () {
        g_Engine.SetState(GENERAL_LEVEL_STATE);
    };
}

GameState.prototype.UpdateRotate = function (elapsed) {
    switch (this.state) {
        case GAME_STATE_ROTATE_0: {

            var currTime = new Date().getTime();
            var diff = (currTime - this.timerRotate) / 1000;
            if (diff >= 2) {
                this.state = GAME_STATE_ROTATE_1;
                for (var i = 0; i < this.board.length; i++) {
                    this.board[i].Flip();
                    this.board[i].fnAnimateComplete = null;
                }
                this.timerRotate = currTime;
            }

            return true;
        } case GAME_STATE_ROTATE_1: {

            this.rotateCanvas = document.createElement('canvas');
            this.rotateCanvas.width = DEFAULT_WINDOW_WIDTH;
            this.rotateCanvas.height = DEFAULT_WINDOW_HEIGHT;
            this.rotateCtx = this.rotateCanvas.getContext('2d');

            this.state = GAME_STATE_ROTATE_1_EX;
            this.timerRotate = new Date().getTime();
            return true;
        } case GAME_STATE_ROTATE_1_EX: {
            var currTime = new Date().getTime();
            var diff = (currTime - this.timerRotate) / 1000;
            if (diff >= 3) {
                this.state = GAME_STATE_ROTATE_1_EXROTATE;
            }

            return true;
        } case GAME_STATE_ROTATE_1_EXROTATE: {
            if (board_angle < board_angle_target) {
                board_angle = (board_angle + 1);
            } else {
                board_angle = board_angle_target;
                this.state = GAME_STATE_ROTATE_1_ROTATE_DONE;
                this.timerRotate = new Date().getTime();
            }
            return true;
        } case GAME_STATE_ROTATE_1_ROTATE_DONE: {
            var currTime = new Date().getTime();
            var diff = (currTime - this.timerRotate) / 1000;
            if (diff >= 3) {
                this.state = GAME_STATE_ROTATE_2_ROTATE_DONE;

                ///////////////////////////////////////////////
                // Do the Swap
                var type_copy = new Array();
                for (var i = 0; i < this.board.length; i++) {
                    type_copy.push(this.board[i].type);
                }

                var index_src = 0;
               /* for (var d = 2; d >= 0; d--) {
                    for (var c = 0; c < 3; c++) {
                        var index_target = (c * 3) + d;
                        var type = type_copy[index_src++];
                        this.board[index_target].LoadFace(type);
                    }
                }*/
                index_src = 8;
                for (var i = 0; i < 9; i++) {
                    var type = type_copy[index_src--];
                    this.board[i].LoadFace(type);
                }

                type_copy = null;
                ///////////////////////////////////////////////
            }
            return true;
        } case GAME_STATE_ROTATE_2_ROTATE_DONE: {
            var context = this;

            for (var i = 0; i < this.board.length; i++) {
                this.board[i].angle = 180;//this.currentChallenge.rotate_angle;
            
                if (i == 0) {
                    this.board[i].fnAnimateComplete = function () {
                        context.state = GAME_STATE_ROTATE_3_ROTATE_DONE;
                        this.timerRotate = new Date().getTime();
                        this.fnAnimateComplete = null;
                    };
                } else {
                    this.board[i].fnAnimateComplete = null;
                }

                this.board[i].Flip();
            }
            return true;
        } case GAME_STATE_ROTATE_3_ROTATE_DONE: {

            var currTime = new Date().getTime();
            var diff = (currTime - this.timerRotate) / 1000;
            if (diff >= 1.5) {
                for (var i = 0; i < this.board.length; i++) {
                    this.board[i].angle = 0;
                }
                this.ProceedNextChallenge();
            }

            return true;
        }

    }

    return false;
}
GameState.prototype.UpdateSwitch = function (elapsed) {
    switch (this.state) {
        case GAME_STATE_SWITCH_1: {
            var currTime = new Date().getTime();
            var diff = (currTime - this.timerSwitch) / 1000;
            if (diff >= 1) {

                for (var i = 0; i < switch_index.length; i++) {

                    this.board[switch_index[i]].Flip();
                    this.board[switch_index[i]].fnAnimateComplete = null;
                }

                this.state = GAME_STATE_SWITCH_2;
                this.timerSwitch = new Date().getTime();

            }

            return true;
        } case GAME_STATE_SWITCH_2:
            var currTime = new Date().getTime();
            var diff = (currTime - this.timerSwitch) / 1000;
            if (diff >= 1) {
                this.state = GAME_STATE_PURGATORY;
                var context = this;

                /////////////////////////////////////////////////////
                // Switch implementation 2
                for (var i = 0; i < switch_index.length; i++) {
                    var obj = this.board[switch_index[i]];
                    var objTarget = switch_original_coord[i];
                    obj.GoTo(objTarget.x, objTarget.y);
                    obj.fnAnimateComplete = function () {
                        switch_count++;
                        if (switch_count >= switch_index.length) {

                            // re-assign the new icons after animation switch
                            for (var ix = 0; ix < switch_index.length; ix++) {
                                var newobj = switch_object_list[ix];
                                var index = switch_index[ix];
                                newobj.id = index;
                                context.board[index] = newobj;
                            }


                            context.state = GAME_STATE_SWITCH_3;
                            context.timerSwitch = new Date().getTime();
                        }
                    };
                }
                /////////////////////////////////////////////////////
                return true;
            }
        case GAME_STATE_SWITCH_3: {
            var currTime = new Date().getTime();
            var diff = (currTime - this.timerSwitch) / 1000;
            if (diff >= 2) { 

                for (var i = 0; i < switch_index.length; i++) {
                    this.board[switch_index[i]].Flip();
                    this.board[switch_index[i]].fnAnimateComplete = null;
                }

                if (switch_back) {
                    switch_index = null;
                    switch_type = null;
                    switch_original = null;

                    /////////////////////////
                    switch_object_list = null;
                    switch_indexed_new = null;
                    switch_original_coord = null;
                    ////////////////////////
                    this.state = GAME_STATE_PLAY;
                } else {
                    this.ProceedNextChallenge();
                }
            }
            return true;
        }
    }
    return false;
}

GameState.prototype.Update = function (elapsed) {

    g_globalAudio.Update();

    var context = this;
    // Update UIs
    this._uimanager.Update(elapsed);
    this._uiManagerLocal.Update(elapsed);

    this.glowBtnImgHits.Update(elapsed);
    this.glowTimer.Update(elapsed);
    this.glowImg.Update(elapsed);
    this.glowChallengeImg.Update(elapsed);

    var handled = this.UpdateRotate(elapsed);
    if (!handled) {
        handled = this.UpdateSwitch(elapsed);
    } if (!handled) {
        handled = this.BaseSubStateUpdate(elapsed);
    }

    if (!handled) {
        switch (this.state) {
            case GAME_STATE_UNLOCKLEVEL:
                this.unlockWnd.Update(elapsed);
                break;
            case GAME_STATE_GIFT_WINDOW:
                this.giftpopup.Update(elapsed);
                break;
            case GAME_STATE_DAILY_BUNOS:
            case GAME_STATE_OBJECTIVE:
                this.objectiveWindow.Update(elapsed);
                break;
            case GAME_STATE_LOSS_MSG:
                var currTime = new Date().getTime();
                var diff = (currTime - this.timerLoss) / 1000;
                /*if (diff >= 5) {

                    // Pop up level failed window
                    this.ShowFailedPopup();                    
                }*/
                break;
            case GAME_STATE_LOSS:
                var currTime = new Date().getTime();
                var diff = (currTime - this.timerLoss) / 1000;
                if (diff >= 5) {
                    this.state = 0;
                    this.DoNothing();
                }
                break;

            case GAME_STATE_WATCH3_SECONDS_0: {
                var currTime = new Date().getTime();
                var diff = (currTime - this.watch3SecTimer) / 1000;
                if (diff >= 3) {
                    this.watch3SecTimer = null;
                    var isIssued = false;
                    for (var i = 0; i < this.board.length; i++) {
                        if (!this.board[i].done) {
                     
                            if (!isIssued) {
                                this.board[i].fnAnimateComplete = function () {
                                    context.state = GAME_STATE_PLAY;
                                    this.fnAnimateComplete = null;
                                };
                                isIssued = true;
                            } else {
                                this.board[i].fnAnimateComplete = null;
                            }

                            this.board[i].Flip();

                        }
                    }
                }
            } break;
            case GAME_STATE_LEVELCOMPLETE_WND: {
                this.popupComplete.Update(elapsed);
            } break;
            case GAME_STATE_POPUPLOST: {
                this.popupLost.Update(elapsed);
            } break;
            case GAME_STATE_RETRYWND: {
                this.retryWindow.Update(elapsed);
            } break;

            case GAME_STATE_FLIPBACK:
                {
                    var currTime = new Date().getTime();
                    var diff = (currTime - this.timerFlipBack) / 1000;
                    if (diff >= 1) {
                        var context = this;
                        this.board[this.openedCardIndex].Flip();
                        this.board[this.openedCardIndex].fnAnimateComplete = function () {
                            context.state = GAME_STATE_PLAY;
      
                            ////////////////////////////////////////////
                            // switch the user during flip, except if it was forced flip
                            if (g_gameMode == GAME_MODE_DOU) {
                                if (context.currentLevel.correct_flipback && flip_back_correct)
                                    return;
                                g_DOU_turn = (g_DOU_turn == 0) ? 1 : 0;
                            }
                            ////////////////////////////////////////////

                            this.fnAnimateComplete = null;
                        };

                        this.timerFlipBack = null;
                    }
                } break;

            /*case GAME_STATE_TIMER_VIEWING:
                {
                    var currTime = new Date().getTime();
                    var diff = (currTime - this.timerStartGame) / 1000;
                    this.seconds_remain = this.currentLevel.seconds - diff;

                    if (this.seconds_remain <= 0) {
                        this.BeForePlay();

                    }
                } break;*/
            case GAME_STATE_PLAY:
                {
                    //...                
                }
                break;
            case GAME_STATE_STARIN:
                for (var i = 0; i < this.star_list.length; i++) {
                    this.star_list[i].Update(elapsed);
                }
                break;
            case GAME_STATE_HITS_RUNDOWN:
                {
                    if (this.hits > 0) {
                        this.hits -= 1;
                        
                    } else {
                        this.hits = 0;                        
                        var hits_total = (this.currentLevel.points_per_hits * this.remain_hits);
                        this.giveMeScore = hits_total;
                        var context = this;
                        this.state = GAME_STATE_PURGATORY;
                        this.SpawnAnimatedScore(hits_total, function () {
                            context.state = GAME_STATE_TIMER_RUNDOWN;
                        });                    
                    }
                }
                break;
            case GAME_STATE_TIMER_RUNDOWN: {
                if (this.remain_pct > 0) {
                    this.remain_pct -= (0.5) * elapsed;
                } else {

                    this.remain_pct = 0;
                    var time_total = (Math.ceil(context.remain_time) *
                        this.currentLevel.points_per_time)

                    this.state = GAME_STATE_PURGATORY;
                    var context = this;
                    this.SpawnAnimatedScore(time_total, function () {
                         context.NextGame();
                    });
                    
                }
            } break;
            case GAME_STATE_WINNER:
                {
                    for (var i = 0; i < this.star_list.length; i++) {
                        this.star_list[i].Update(elapsed);
                    }

                    if (this.game_finish) {
                        var currTime = new Date().getTime();
                        var diff = (currTime - this.timerWait) / 1000;
                        if (diff >= 1.5) {
                            this.timerWait = null;
                                     
                            if (!this.IsLevelDoneOnNext()) {
                                this.NextGame();
                              } else {
                                  this.state = GAME_STATE_HITS_RUNDOWN;
                              }
                        }
                    }
                }
                break;
        }
    }

    if (this.state == GAME_STATE_TIMER_VIEWING ||
        saved_state == GAME_STATE_TIMER_VIEWING) {
        var currTime = new Date().getTime();
        var diff = (currTime - this.timerStartGame) / 1000;
        this.seconds_remain = this.currentLevel.seconds - diff;

        if (this.seconds_remain <= 0) {

            if (this.state != GAME_STATE_TIMER_VIEWING &&
                saved_state == GAME_STATE_TIMER_VIEWING)
                saved_state = 0;

            this.BeForePlay();
        }        
    }

    if (this.small_icon_list) {
        for (var sc = 0; sc < this.small_icon_list.length; sc++) {
            this.small_icon_list[sc].Update(elapsed);
        }
    }

    if (g_highlight_Shuffle || g_highlight_Watch3Seconds ||
        g_freeze2Icons || g_cancelBoardMoveHighlight || 
	        this.state == GAME_STATE_LOSS) {
        this.glowBtnImg.Update(elapsed);

        if (this.monetize_arrow) {
            this.monetize_arrow.Update(elapsed);
        }
    }

	if( g_giftHighlight) {		
		 this.gift_arrow.Update(elapsed);
	}
	
	
    ////////////////////////////////////////////////
    // Running score system
  /*  if (this.level_score < this.targetScore) {
        this.level_score += this.scoreStep;
    } else {
        this.level_score = this.targetScore;
    }*/

    ////////////////////////////////////////////////
    this.UpdateBase(elapsed);


    // moving arrow
    if (this.arrowX < this.targetArrowX) {
        this.arrowX += (50 * elapsed);
    } else {
        this.arrowX = this.targetArrowX;
    }

    var limitX = (toplineX + topline_width) - this.arrow._image.width;

    if (this.arrowX >= goldX) {
        this.arrowX = goldX;
    }

    if (this.currentChallenge.inorder && this.green_arrow) {
        this.green_arrow.Update(elapsed);
    }
    if (this.goodIconIndex != -1 && this.yellow_arrow) {
        this.yellow_arrow.Update(elapsed);
    }

    if (g_gameMode == GAME_MODE_DOU) {
        if (g_DOU_turn == 0) {
            context.baker._visible = true;
            context.baker_2._visible = false;
        } else {
            context.baker._visible = false;
            context.baker_2._visible = true;
        }

        //this.glowDOUTurn.Update(elapsed);
        if (this.glowDOU_1) {
            this.glowDOU_1.Update(elapsed);
        } if (this.glowDOU_2) {
            this.glowDOU_2.Update(elapsed);
        }
    }

    // Animated TExts
    for (var m = 0; m < this.animatedTextList.length; m++) {
        this.animatedTextList[m].Update(elapsed);
    }
}


var switch_index = null;
var switch_type = null;
var switch_original = null;
var switch_back = false;
var switch_count = 0;

////////////////////////////////////
//for switch2 implementation
var switch_object_list = null;
var switch_indexed_new = null;
var switch_original_coord = null;
////////////////////////////////////

GameState.prototype.DoSwitch = function () {

    this.state = GAME_STATE_SWITCH_1;
    switch_index = new Array();
    //switch_currIdx = 0;
    switch_back = false;
    do {
        var position = Math.floor(Math.random() * 9);
        var found = false;

        //neutral icons shall not switch
        if (this.board[position].type == ICON_TYPE_NEUTRAL)
            continue;

        for (var i = 0; i < switch_index.length; i++) {
            if (switch_index[i] == position /*||
                // do not switch freeze icons
                (this.board[position].freeze == true)*/) {
                found = true;
                break;
            }
        }

        if (!found) {
            switch_index.push(position);
        }
    } while (switch_index.length < this.currentChallenge.switch_count);

    console.log(switch_index);
    switch_type = new Array();
    switch_original = new Array();

    /////////////////////////////////////////////
    switch_object_list = new Array();
    switch_indexed_new = new Array();
    switch_original_coord = new Array();
    /////////////////////////////////////////////

    for (var i = 0; i < switch_index.length; i++) {
        switch_type.push(this.board[switch_index[i]].type);
        switch_original.push(switch_type[i]);

        ////////////////////////////////////
        //for switch 2 implementation
        switch_indexed_new.push(switch_index[i]);
        ////////////////////////////////////
    }

    switch_type = shuffleArray(switch_type);

    ////////////////////////////////////
    do {
        switch_indexed_new = shuffleArray(switch_indexed_new);

        var count = 0;
        for (var i = 0; i < switch_index.length; i++) {
            if (switch_index[i] == switch_indexed_new[i]) {
                count++;
            }           
        }

    } while (count > 0);

    for (var i = 0; i < switch_index.length; i++) {
        var obj = this.board[switch_index[i]];
        var objTarget = this.board[switch_indexed_new[i]];
        //obj.GoTo(objTarget._X, objTarget._Y);
        switch_original_coord.push({ x: objTarget._X, y: objTarget._Y });
        switch_object_list.push(objTarget);
    }
    ////////////////////////////////////

    this.timerSwitch = new Date().getTime();

}

var board_angle = 0;
var board_angle_target = 0;
GameState.prototype.DoRotate = function () {
    /*var type_copy = new Array();
    for (var i = 0; i < this.board.length; i++) {
        this.board[i].angle = this.currentChallenge.rotate_angle;
		type_copy.push(this.board[i].type);
    }
	
	var index_src = 0;
	for(var d = 2; d >= 0; d--) {
		for(var c = 0; c < 3; c++) {
			var index_target = (c * 3) + d;
			var type = type_copy[index_src++];
			this.board[index_target].LoadFace(type);
		}
	}
		
	type_copy = null;*/
    board_angle = 0;
    board_angle_target = 180;//this.currentChallenge.rotate_angle;
    this.state = GAME_STATE_ROTATE_0;
    this.timerRotate = new Date().getTime();
}

GameState.prototype.EvaluateGlow = function () {
    /////////////////////////////////////////////////////
    // SPECIAL CONDTION for TUTORIAL LEVEL!
    g_highlight_Shuffle = false;
    g_highlight_Watch3Seconds = false;
    g_freeze2Icons = false;
    g_cancelBoardMoveHighlight = false;
	g_giftHighlight = false;
    /////////////////////////////////////////////////////

    if (
		(g_gameData.curr_level_idx ==0 && 
		this.state == GAME_STATE_TIMER_VIEWING) ||
        
		// Level 1 tutorial
        (g_gameData.curr_challenge_idx == 1 &&
        g_gameData.curr_level_idx == 0) ||

        // Level 2 tutorial
        (g_gameData.curr_challenge_idx == 0 &&
        g_gameData.curr_level_idx == 1) ||
		
	   (g_gameData.curr_challenge_idx == 2 &&
        g_gameData.curr_level_idx == 1) ||

        // Level 2 tutorial
        (g_gameData.curr_challenge_idx == 1 &&
        g_gameData.curr_level_idx == 1) ||

        // Level 3 tutorial
        (g_gameData.curr_challenge_idx == 0 &&
        g_gameData.curr_level_idx == 2)) {

        g_highlight_Shuffle = true;
        g_reShuffleAllowed = true;
    } else if (g_gameData.curr_challenge_idx == 2 &&
        g_gameData.curr_level_idx == 0) {
        g_highlight_Watch3Seconds = true;
        g_Watch3SecondsAllowed = true;
    } else if (g_gameData.curr_challenge_idx == 2 &&
        g_gameData.curr_level_idx == 4) {
        g_cancelBoardMoveHighlight = true;
        g_cancelBoardMoveAllowed = true;
    }

    // Level jump!
    if (g_gameData.curr_level_idx > 2) {
        g_reShuffleAllowed = true;
        g_cancelBoardMoveAllowed = true;
    }
    if (g_gameData.curr_level_idx > 1) {
        g_Watch3SecondsAllowed = true;
    }
	
	// Display flying baker on gift box for 
	// challenge 6 on first 4 levels
	if( g_gameData.curr_challenge_idx == 5 && 
		g_gameData.curr_level_idx <= 2){
		g_giftHighlight = true;
	}
	
    /////////////////////////////////////////////////////
    if (g_gameMode == GAME_MODE_DOU) {
        g_reShuffleAllowed = true;
        g_Watch3SecondsAllowed = true;
        g_cancelBoardMoveAllowed = true;
        g_freez2IconsAllowed = true;
    }

    if (g_highlight_Shuffle || g_highlight_Watch3Seconds ||
	    g_freeze2Icons || g_cancelBoardMoveHighlight) {
		
        this.monetize_arrow = new AnimatedObject();
        // this.monetize_arrow.Load("images/ingame/arrow/green-arrow-right.png");

        switch (g_gameData.theme) {
            case THEME_TYPE_DEFAULT:
                this.monetize_arrow.Load("images/themes/default/arrow_right.png");
                this.monetize_arrow.Set(7, 10.0, true);
                this.monetize_arrow._frameWidth = 64.714;
                break;
            case THEME_TYPE_SAMPLE:
                this.monetize_arrow.Load("images/themes/sample/arrow-right.png");
                this.monetize_arrow.Set(8, 10.0, true);
                this.monetize_arrow._frameWidth = 865/8;
                break;
        }
    }
	
	if(g_giftHighlight) {
		 this.gift_arrow = new AnimatedObject();
		    switch (g_gameData.theme) {
            case THEME_TYPE_DEFAULT:
                this.gift_arrow.Load("images/themes/default/Flying_baker_Monetize_5fps.png");
                this.gift_arrow.Set(7, 5.0, true);
                this.gift_arrow._frameWidth = 909/7;
                break;
            case THEME_TYPE_SAMPLE:
                this.gift_arrow.Load("images/themes/sample/elephant_arrow_SPV_4fps.png");
                this.gift_arrow.Set(3, 4.0, true);
                this.gift_arrow._frameWidth = 460/3;
                break;
        }
	}
}
GameState.prototype.ProceedNextChallenge = function () {
    if (g_gameMode == GAME_MODE_DOU) {
        g_DOU_turn = (g_DOU_turn == 0) ? 1 : 0;
    }
    this.GenerateIconChallenge();
    this.EvaluateGlow();

}

GameState.prototype.DeclareDOUWInner = function () {
    this.popupComplete = new DOUWinnerWindow;
    this.popupComplete.Load();
    this.popupComplete.Show();
    var context = this;

    this.popupComplete.fnClose = function () {
        context.NextLevel();
    };

    // Declare DOU Winner
    this.state = GAME_STATE_LEVELCOMPLETE_WND;
}


GameState.prototype.FinishLevel = function () {
    this.popupComplete.Load();
    this.popupComplete.Show();

    LoadAndPlay("Level-Completed");

    this.popupComplete.fnClose = function () {
        //context.NextLevel();
        g_Engine.SetState(GENERAL_LEVEL_STATE);
    };
    var context = this;
    this.popupComplete.fnNext = function () {
        context.NextLevel();
    };

    this.state = GAME_STATE_LEVELCOMPLETE_WND;
}

GameState.prototype.NextLevel = function () {
    
    //DUO cannot unlock next level, return to Gen level instead
    if (g_gameMode == GAME_MODE_DOU) {
        if (g_gameData.curr_level_idx + 1 > g_gameData.max_level) {
            g_Engine.SetState(GENERAL_LEVEL_STATE);
            return;
        }
    }

    if (g_gameData.curr_level_idx + 1 < g_gameData.level_list.length) {
        g_gameData.curr_level_idx++;
        g_gameData.curr_challenge_idx = 0;

        this.currentLevel = g_gameData.level_list[g_gameData.curr_level_idx];
        if (g_gameMode == GAME_MODE_DOU) {
            g_DOU_turn = (g_DOU_turn == 0) ? 1 : 0;
        }

        g_Engine.SetState(GAME_STATE);
    } else {

        // show congrats screen
        this.state = GAME_STATE_OBJECTIVE;
        var context = this;
        this.objectiveWindow = new CongratsWindow;
        this.objectiveWindow.Load();
        this.objectiveWindow.Show();
        this.objectiveWindow.fnClose = function () {
            g_Engine.SetState(GENERAL_LEVEL_STATE);
        }
    }
}

GameState.prototype.DrawBoard = function (gfx) {
    if (this.board == null) return;
    for (var i = 0; i < this.board.length; i++) {

        if (this.goodIconIndex != -1 && i == this.goodIconIndex) {
            continue;
        } else {
            this.board[i].Draw(gfx);
        }
    }

    if (this.goodIconIndex != -1) {

        //compute for image
        var i = this.goodIconIndex;
        var cx = this.board[i]._X + (this.board[i]._width / 2);
        var cy = this.board[i]._Y + (this.board[i]._height / 2);
        var x = cx - (this.glowImg._width / 2);
        var y = cy - (this.glowImg._height / 2);

        if (this.board[i].state == ICONBOX_STATE_NORMAL
            && this.state == GAME_STATE_PLAY) {
            this.glowImg._X = x;
            this.glowImg._Y = y;
            this.glowImg.Draw(gfx);

        }

        this.board[i].Draw(gfx);

        if (this.board[i].state == ICONBOX_STATE_NORMAL
            && this.state == GAME_STATE_PLAY) {
            // Draw the yellow arrow here!
            this.yellow_arrow._X = x + this.board[i]._width;
            this.yellow_arrow._Y = y;
            this.yellow_arrow.Draw(gfx);
        }
    }
}

GameState.prototype.Draw = function (gfx) {

    this.background.Draw(gfx);
    this.canvasImg.Draw(gfx,
       (DEFAULT_WINDOW_WIDTH / 2) - (this.canvasImg._image.width / 2),
       (DEFAULT_WINDOW_HEIGHT / 2) - (this.canvasImg._image.height / 2));

    // Temporary Text
    gfx.DrawText("Level " + (g_gameData.curr_level_idx + 1),
           5, 30, "rgb(255,255,255)", "28pt Calibri");

    ////////////////////////////////////////////////////////
    if (g_gameMode == GAME_MODE_DOU) {
        this.DrawDOUScreen(gfx);
    }
    ////////////////////////////////////////////////////////


   /* if (g_gameData.theme==THEME_TYPE_SAMPLE) {
        this.machine.Draw(gfx, 730, 205);
    } else if (g_gameData.theme == THEME_TYPE_DEFAULT) {
        this.machine.Draw(gfx, 800, 205);
    }*/
    this.machine.Draw(gfx, 710, 205);

    //...
    this._uimanager.Draw(gfx);
    // this.cardbox.Draw(gfx);

	// Gift indicator - added 7/17/2015 - Milestone 50
	 if (g_gameData.gift_count > 0) 
	 {
		 gfx.DrawCircle(857, 714, 15, "rgb(255,0,0)", "rgb(255,0,0)", 0);
		       gfx.DrawText(g_gameData.gift_count ,
              850, 720,
               "rgb(255,255,255)",
               "12pt Androgyne_TB");
	 }
	
	
	
	
    //Draw Top Line
    var topBarX = (DEFAULT_WINDOW_WIDTH / 2) - (topline_width / 2);
    gfx.FillRect(topBarX, 175, topline_width, 15, "rgb(215,102,58)", 1.0);

    //////////////////////////////////////////////////////////
    textLife = GetLifeStatus();
    ///////////////////////////////////////////////////////

    // Draw 4 Square on top
    var topbox_count = 4;
    var total_width = 126 * topbox_count;
    var startX = (DEFAULT_WINDOW_WIDTH / 2) - (total_width / 2);
    var textArray = ["Score", "Hits", "ChocoCoins", "Life", "Total Score"];

    var valueArray = [
        this.level_score,
        this.hits,
        /*g_gameData.coins,*/
        Math.ceil(this.coins),
        textLife/*g_gameData.life*/,
        g_gameData.total_score];

    var icon_x = [2, 11, 0, 0];
    var icon_y = [0, -5, -5, 0];

    for (var jm = 0; jm < topbox_count; jm++) {

        if ((jm == 1 && this.hits <= 5 && g_gameData.life > 0) ||
            (jm == 1 && this.state == GAME_STATE_HITS_RUNDOWN) ||
            (jm == 3 && g_gameData.life == 0 && g_targetTimer != 0) ||
            (jm == 2 && this.coins != g_gameData.coins)) {         
            //render glow for if hits < 5 or no life

            this.glowBtnImgHits._X = startX - 30;
            this.glowBtnImgHits._Y = 60;
            this.glowBtnImgHits.DrawResize(gfx);
        }

       /* gfx.roundRect(
            startX, 84, 106, 70, 6,
            "rgb(241,104,34)");
            */
  
        this.top_button.Draw(gfx, startX, 84);
        //this.top_icon[jm].Draw(gfx, startX + 5 + icon_x[jm], 84 + 10 + icon_y[jm]);

        var scalex = 1.0;
        var scaley = 1.0;
        if (jm == 0) {
            scalex = 1.2;
            scaley = 1.2;
        }

        this.top_icon[jm].DrawScaled(gfx,
            startX + 5 + icon_x[jm],
            84 + 10 + icon_y[jm],
            scalex,
            scaley);


        var center = startX + (106 / 2) + 10;
        var ctx = gfx._canvasBufferContext;
        var style = "18pt Androgyne_TB";
        ctx.font = style;
        var text = textArray[jm];

        if (g_gameData.life == 0 && g_targetTimer && jm == 3) {
            //resize the text timer to fit
            style = "12pt Androgyne_TB";
            center += 16;
        }
        /*if (jm == 2) {
            var textWidth = ctx.measureText(text);
            gfx.DrawText(text,
               center - (textWidth.width / 2) + 18, 107,
               "rgb(255,255,255)",
               "10pt Androgyne_TB");

        } else {
            // Render Text header
            var textWidth = ctx.measureText(text);
            gfx.DrawText(text,
               center - (textWidth.width / 2), 107,
               "rgb(255,255,255)",
               style);
        }*/

        // Render Value
        var text = valueArray[jm];
        var textWidth = ctx.measureText(text);
        gfx.DrawText(text,
           center - (textWidth.width / 2), 125,
           "rgb(255,255,255)",
           style);
        startX += 126;
    }

    ///////////////////////////////////////////////
    // Drawing of the Cups
    // The following stats for the cups
    // the total width is 30 stars per level
    // bronze is 16 to 20  or 53%
    // Silver is 21 to 25 or 70%
    // Gold is 26 to 30 or 87%
    var starWidth = goldX - startStarX;

    //////////////////////////////////////////////////////////////
    //this.arrow.Draw(gfx, this.arrowX, 165);
    gfx.DrawImage(this.starTop._image, 0, 0,
         this.starTop._image.width, this.starTop._image.height,
          this.arrowX, 155,
          56, 55, 1.0);
    //////////////////////////////////////////////////////////////


    // Glow Trophy
    var trophy_type = GetTrophyType(g_gameData.total_accumulated_stars)
    if (trophy_type != NONE_TROPHY_STARS) {
        var tt_index = trophy_type - 1;
        var tt_xloc = [
            startStarX + (starWidth * 0.53), 
            startStarX + (starWidth * 0.70),
            startStarX + (starWidth * 0.87)
        ];
        var tt_yloc = [160, 160 - 13, 160 - 31];
        this.glowTrophyArray[tt_index].Update(0.01);
        this.glowTrophyArray[tt_index]._X = tt_xloc[tt_index] - 15;
        this.glowTrophyArray[tt_index]._Y = tt_yloc[tt_index] - 17;
        this.glowTrophyArray[tt_index].Draw(gfx);
    }

    this.bronzeCup.Draw(gfx,
        startStarX + (starWidth * 0.53),
        160);

    this.silverCup.Draw(gfx, startStarX + (starWidth * 0.70),
        160 - 13);

    this.goldCup.Draw(gfx, startStarX + (starWidth * 0.87),
        160 - 31);

    /////////////////////////////////////////////////////
    if (this.state >= GAME_STATE_ROTATE_1_EX && this.state <= GAME_STATE_ROTATE_1_ROTATE_DONE) {
        this.DrawRotateBoard(gfx);
    } else {
        this.DrawBoard(gfx);
    }

    /////////////////////////////////////////////////////
    var pct = 1.0;
    if (this.state == GAME_STATE_TIMER_VIEWING ||
        saved_state == GAME_STATE_TIMER_VIEWING ) {
        pct = this.seconds_remain / this.currentLevel.seconds;
        pct = (pct < 0) ? 0 : pct;
    } else if (this.state == GAME_STATE_WATCH3_SECONDS_0) {
        var currTime = new Date().getTime();
        var diff = (currTime - this.watch3SecTimer) / 1000;
        var count = 3 - diff;
        pct = count / 3;
        if (pct <= 0) pct = 0;
    } else if (this.started) {
        if (this.timerClockLimit) {
            var currTime = new Date().getTime();
            var diff = (currTime - this.timerClockLimit) / 1000;
            var count = this.time_limit - diff;

            pct = count / this.time_limit;
            pct = (pct < 0) ? 0 : pct;

            if (this.game_finish && this.IsLevelDoneOnNext()) {
                pct = this.remain_pct;
            } else {
                if (count <= 0 && this.state == GAME_STATE_PLAY) {
                    this.DoLoss(1);
                }
            }
        }
    }

    // If game finished succesfully, 
    // timer is now empty because of running timer effects
    if (this.game_finish && this.remain_pct == 0) {
        pct = 0;
    }

    if (pct != 1.0) {
        this.glowTimer._X = (DEFAULT_WINDOW_WIDTH / 2) - (399 / 2);
        this.glowTimer._Y = 553;
        this.glowTimer.DrawResize(gfx);
    }

    this.timer_bar.Draw(gfx,
        (DEFAULT_WINDOW_WIDTH / 2) - (this.timer_bar._image.width / 2),
        570);
    
    if (pct > 0) {
        gfx.DrawImage(this.timer_filling._image,
            0, 0,
            this.timer_filling._image.width * pct,
            this.timer_filling._image.height,
            (DEFAULT_WINDOW_WIDTH / 2) - (this.timer_filling._image.width / 2),
            570,
            this.timer_filling._image.width * pct,
            this.timer_filling._image.height);
    } 

    this.timer_front.Draw(gfx,
       370,
       573);

    /////////////////////////////////////////////////////
    var piste = false;
    for (var sc = 0; sc < this.sideButtonList.length; sc++) {
        var highlight = false;

        if ((g_highlight_Shuffle && sc == 2)
            || (g_highlight_Watch3Seconds && sc == 0) ||
            (g_freeze2Icons && sc == 1) || (g_cancelBoardMoveHighlight && sc == 2)) {
            highlight = true;
        }

        /* if (highlight == true) {
            //compute for image
            var cx = this.sideButtonList[sc]._X + (this.sideButtonList[sc]._width / 2);
            var cy = this.sideButtonList[sc]._Y + (this.sideButtonList[sc]._height / 2);
            var x = cx - (this.glowBtnImg._width / 2);
            var y = cy - (this.glowBtnImg._height / 2);

            this.glowBtnImg._X = x;
            this.glowBtnImg._Y = y;
            this.glowBtnImg.Draw(gfx);
        }*/

        this.sideButtonList[sc].Draw(gfx);

        if (highlight) {
            piste = true;

            if( g_gameData.theme == THEME_TYPE_DEFAULT)
                this.monetize_arrow._X = this.sideButtonList[sc]._X - 40;
            else
                this.monetize_arrow._X = this.sideButtonList[sc]._X - 70;
          
            this.monetize_arrow._Y = this.sideButtonList[sc]._Y - 25;

            //this.monetize_arrow.Draw(gfx);
        }
    }
	

    //if (g_gameData.theme == THEME_TYPE_SAMPLE) {
    this.machine_front.Draw(gfx, 820, 242);
//    }

    if (piste) {
        this.monetize_arrow.Draw(gfx);
    }

    if (this.state == GAME_STATE_SWITCH_1 ||
		this.state == GAME_STATE_SWITCH_2 ||
		this.state == GAME_STATE_SWITCH_3 /*||
        this.state == GAME_STATE_YES_NO_MONETIZE*/) {

        this.glowChallengeImg._X = (DEFAULT_WINDOW_WIDTH / 2) -
			(this.glowChallengeImg._width / 2);
        this.glowChallengeImg._Y = 600 - 80;
        this.glowChallengeImg.Draw(gfx);
    }

    this.challengeBoardBg.Draw(gfx,
        (DEFAULT_WINDOW_WIDTH / 2) - (this.challengeBoardBg._image.width / 2)-23,
        600);

    // State Manipulations 
    switch (this.state) {
        case GAME_STATE_TIMER_VIEWING:
            this.DrawTimerState(gfx);
            break;
        case GAME_STATE_STARIN:
        case GAME_STATE_WINNER:
            {
                this.DrawWinnerState(gfx);
            }
            break;
        case GAME_STATE_PLAY:
            break;
        case GAME_STATE_FREEZE:
            var value = 2 - g_freezeCount;
            var center = (DEFAULT_WINDOW_WIDTH / 2);
            var ctx = gfx._canvasBufferContext;
            var style = "25pt Androgyne_TB";
            ctx.font = style;

            //check icons how many is remaining  added: May 30, 2015
            var frozen = 0;
            for (var i = 0; i < this.board.length; i++) {
                if (this.board[i].freeze || this.board[i].isOpen)
                    frozen++;
            }

            var text = "Click " + value + " icons ";
            if (frozen == 8) {
                text = "Click 1 icon";
            }                       

            var textWidth = ctx.measureText(text);
            gfx.DrawText(text,
                center - (textWidth.width / 2), 650,
                "rgb(242,105,37)",
                style);

            text = "To Freeze";
            var textWidth = ctx.measureText(text);
            gfx.DrawText(text,
               center - (textWidth.width / 2), 685,
               "rgb(242,105,37)",
               style);
            break;

        case GAME_STATE_SWITCH_1:
        case GAME_STATE_SWITCH_2:
        case GAME_STATE_SWITCH_3:
        case GAME_STATE_ROTATE_0:
        case GAME_STATE_ROTATE_1:
        case GAME_STATE_ROTATE_1_EX:
        case GAME_STATE_ROTATE_1_EXROTATE:
        case GAME_STATE_ROTATE_1_ROTATE_DONE:
        case GAME_STATE_ROTATE_2_ROTATE_DONE:
        case GAME_STATE_ROTATE_3_ROTATE_DONE:

            this.alert.Draw(gfx,
                (DEFAULT_WINDOW_WIDTH / 2) - (this.alert._image.width / 2),
                610);

            var value = 2 - g_freezeCount;
            var center = (DEFAULT_WINDOW_WIDTH / 2);
            var ctx = gfx._canvasBufferContext;
            var style = "15pt Androgyne_TB";
            ctx.font = style;

            var text = "BE CAREFUL! ";

            var textWidth = ctx.measureText(text);
            gfx.DrawText(text,
                center - (textWidth.width / 2), 685,
                "rgb(242,105,37)",
                style);

            text = "THE BOARD WILL MOVE";
            var textWidth = ctx.measureText(text);
            gfx.DrawText(text,
               center - (textWidth.width / 2), 710,
               "rgb(242,105,37)",
               style);
            break;
        case GAME_STATE_LOSS:
            this.DrawNoMoreHits(gfx);
            break;
        case GAME_STATE_YES_NO_MONETIZE:
            this.DrawYesNoMonetize(gfx);
            break;
        case GAME_STATE_LOSS_MSG:
            var value = 2 - g_freezeCount;
            var center = (DEFAULT_WINDOW_WIDTH / 2);
            var ctx = gfx._canvasBufferContext;
            var style = "15pt Androgyne_TB";
            ctx.font = style;

            var text = "YOU WILL DO BETTER NEXT TIME ";

            var textWidth = ctx.measureText(text);
            gfx.DrawText(text,
                center - (textWidth.width / 2), 650,
                "rgb(242,105,37)",
                style);

            text = g_gameData.life + " LIVES REMAINING";
            var textWidth = ctx.measureText(text);
            gfx.DrawText(text,
               center - (textWidth.width / 2), 685,
               "rgb(242,105,37)",
               style);
            break;
    }

    if (this.state >= GAME_STATE_BEFOREPLAY && this.state <= GAME_STATE_FLIPBACK
        && this.state != GAME_STATE_WINNER) {
        this.DrawChallengeBoxContents(gfx);
    }

	if( g_giftHighlight ){
		if( g_gameData.theme == THEME_TYPE_DEFAULT) {
           this.gift_arrow._X = 715;		 
		} else {
          this.gift_arrow._X = 720;
		}
		  this.gift_arrow._Y = 550;
		  
		   this.gift_arrow.Draw(gfx);
 	}
	
    /////////////////////////////////////
    // PopUp window handlign
    if (this.state == GAME_STATE_POPUPLOST) {
        this.popupLost.Draw(gfx);

    } else if (this.state == GAME_STATE_LEVELCOMPLETE_WND) {
        this.popupComplete.Draw(gfx);
    } else if (this.state == GAME_STATE_RETRYWND) {
        this.retryWindow.Draw(gfx);
    } else if (this.state == GAME_STATE_OBJECTIVE ||
		this.state == GAME_STATE_DAILY_BUNOS) {
        this.objectiveWindow.Draw(gfx);
    } else if (this.state == GAME_STATE_GIFT_WINDOW) {
        this.giftpopup.Draw(gfx);
    } else if (this.state == GAME_STATE_UNLOCKLEVEL) {
        this.unlockWnd.Draw(gfx);
    } else if (this.state != 0) {
        this.DrawBase(gfx);
    }

    /////////////////////////////////////

    //Animated Texts
    for (var m = 0; m < this.animatedTextList.length; m++) {
        this.animatedTextList[m].Draw(gfx);
    }
	

}

GameState.prototype.DrawDOUScreen = function (gfx) {
    gfx.roundRect(220, 250, 15, 300, 5, "rgb(241,104,36)");
    gfx.roundRect(300, 250, 15, 300, 5, "rgb(241,104,36)");


    var pct1 = g_DOU_players[0].challengedWon / 10;
    var pct2 = g_DOU_players[1].challengedWon / 10;

    pct1 = (pct1 < 0) ? 0 : pct1;
    pct1 = (pct1 > 1) ? 1 : pct1;

    pct2 = (pct2 < 0) ? 0 : pct2;
    pct2 = (pct2 > 1) ? 1 : pct2;

    var xdiff = 0;
    var xdiff2 = 0;
    if (g_gameData.theme == THEME_TYPE_DEFAULT) {
        xdiff = 20;
        xdiff2 = 40;
    } else if (g_gameData.theme == THEME_TYPE_SAMPLE) {
        xdiff = 50;
        xdiff2 = 38;
    }

    var x = (220 + (this.baker1_Img._image.width / 2)) - xdiff;
    this.DrawDOUHandle(gfx, this.baker1_Img, x-18, pct1, 0);

    var x = (300 + (this.baker2_Img._image.width / 2)) - xdiff2;
    this.DrawDOUHandle(gfx, this.baker2_Img, x-4, pct2,1 );

}
GameState.prototype.DrawDOUHandle = function (gfx, baker, x, pct, turn) {
    var height = 300;
    var y = 250;
    var part = height - (pct * height);

    if (g_gameData.theme == THEME_TYPE_DEFAULT) {
        var canvasY = (y + part) - 6;
        canvasY = canvasY - (baker._image.height - 30);

        if (g_DOU_turn == turn && this.glowDOU_1) {
            if (turn == 0) {
                this.glowDOU_1._X = x-20;
                this.glowDOU_1._Y = canvasY-20;
                this.glowDOU_1.Draw(gfx);
            } else {
                this.glowDOU_2._X = x-23;
                this.glowDOU_2._Y = canvasY-23;
                this.glowDOU_2.Draw(gfx);
            }
        }

    } else if (g_gameData.theme == THEME_TYPE_SAMPLE) {
        var canvasY = (y + part)+25;
        canvasY = canvasY - (baker._image.height);

        if (g_DOU_turn == turn && this.glowDOU_1) {
            if (turn == 0) {
                this.glowDOU_1._X = x - 10;
                this.glowDOU_1._Y = canvasY - 17;
                this.glowDOU_1.Draw(gfx);
            } else {
                this.glowDOU_2._X = x - 14;
                this.glowDOU_2._Y = canvasY - 17;
                this.glowDOU_2.Draw(gfx);
            }
        }

    }

 
    baker.Draw(gfx, x, canvasY);
}

GameState.prototype.DrawYesNoMonetize = function (gfx) {

    var textArrHeader = ["RESHUFFLE THE BOARD", "RESHUFFLE THE CHALLENGE",
                        "WATCH THE BOARD 3 SECONDS", "CANCEL BOARD MOVE",
                        "FREEZE ICONS FOR"];

    var textArrBottom = ["FOR ", "FOR ", "FOR ", "FOR ", " WHOLE LEVEL FOR "];

    y = 625;
    var center = (DEFAULT_WINDOW_WIDTH / 2);
    var ctx = gfx._canvasBufferContext;
    var style = "14pt Androgyne_TB";
    ctx.font = style;

    var text = textArrHeader[g_MonetizeMode];
    if (g_MonetizeMode == 5) {
        var value=["hits", "time"]
        text = "You run out of " + value[g_losstype];
    }

    var textWidth = ctx.measureText(text);
    gfx.DrawText(text,
        center - (textWidth.width / 2), y,
        "rgb(242,105,37)",
        style);

    y += 25;
    var coins_worth = [SHUFFULE_PRICE,
            SHUFFULE_PRICE, WATCH_3_PRICE,
            CANCEL_MOVE_PRICE, FREEZE_ICON_PRICE];

    var text = textArrBottom[g_MonetizeMode] +
        coins_worth[g_MonetizeMode] + " CHOCOCOINS";

    if (g_MonetizeMode == 5) {
        text = "Use one of your gifts?";
    }

    var textWidth = ctx.measureText(text);
    gfx.DrawText(text,
        center - (textWidth.width / 2), y,
        "rgb(242,105,37)",
        style);

    this.yesBtn.Draw(gfx);
    this.noBtn.Draw(gfx);
}

GameState.prototype.DrawNoMoreHits = function (gfx) {

    var style = "15pt Androgyne_TB";
    var textArr = ["PURCHASE "+ EXTRA_HITS_COUNT + " EXTRA-HITS", "FOR " + EXTRA_HITS_COST + " CHOCOCOINS?"];;
    if (g_losstype == 1) {
        textArr = ["PURCHASE " + EXTRA_SECS_COUNT + " EXTRA-SECONDS", "FOR " + EXTRA_SECS_COST + " CHOCOCOINS?"];;
    }
    y = 628;
    for (var i = 0; i < textArr.length; i++) {

        var center = (DEFAULT_WINDOW_WIDTH / 2);
        var ctx = gfx._canvasBufferContext;
        ctx.font = style;

        var textWidth = ctx.measureText(textArr[i]);
        gfx.DrawText(textArr[i],
          center - (textWidth.width / 2), y,
          "rgb(242,105,37)",
         style);

        y += 22;
    }

    this.yesBtn.Draw(gfx);
    this.noBtn.Draw(gfx);
    //var cx = this.purchaseHItsBtn._X + (this.purchaseHItsBtn._width / 2);
    //var cy = this.purchaseHItsBtn._Y + (this.purchaseHItsBtn._height / 2);
    //var x = cx - (this.glowBtnImg._width / 2);
    //var y = cy - (this.glowBtnImg._height / 2);

    //this.glowBtnImg._X = x;
    //this.glowBtnImg._Y = y;
    //this.glowBtnImg.Draw(gfx);
    //this.purchaseHItsBtn.Draw(gfx);
}

GameState.prototype.DrawWinnerState = function (gfx) {

    var center = (DEFAULT_WINDOW_WIDTH / 2);
    var ctx = gfx._canvasBufferContext;
    var style = "20pt Androgyne_TB";
    
    var textlength = g_message.length;
    if (textlength >= 27) {
        var size = 18+(textlength - 27);
        style = "18pt Androgyne_TB";
    }

    ctx.font = style;

    var textWidth = ctx.measureText(g_message);

    var y = 700;
    if (this.star_list.length <= 0) {
        y = 660;
    }

    gfx.DrawText(g_message,
         center - (textWidth.width / 2), y,
          "rgb(242,105,37)", style);

    for (var i = 0; i < this.star_list.length; i++) {
        this.star_list[i].Draw(gfx);
    }
}

GameState.prototype.DrawChallengeBoxContents = function (gfx) {

    if (this.small_icon_list) {
        var centerX = 0;
        var arrowY = 0;
        for (var sc = 0; sc < this.small_icon_list.length; sc++) {

            this.small_icon_list[sc].Draw(gfx);
            if (this.correct_list[sc]) {
                this.checkImg.Draw(gfx,
                    this.small_icon_list[sc]._X,
                    this.small_icon_list[sc]._Y);
            }

            if (this.currentChallenge.inorder &&
               this.inorder_currentIdx == sc) {

                centerX = (this.small_icon_list[sc]._X + (this.small_icon_list[sc]._width / 2));
                arrowY = this.small_icon_list[sc]._Y;
            }
            
        }

        if (this.currentChallenge.inorder) {

            /*this.green_arrow_glow._X = centerX - (this.green_arrow_glow._width / 2);
            this.green_arrow_glow._Y = this.small_icon_list[sc]._Y - (this.green_arrow_glow._height);
            this.green_arrow_glow.Draw(gfx);
            
            this.green_arrow.Draw(gfx,
                centerX - (this.green_arrow._image.width/2),
                this.small_icon_list[sc]._Y - (this.green_arrow._image.height));*/

            if (g_gameData.theme == THEME_TYPE_SAMPLE) {
                centerX -= (49/2);
            }

            this.green_arrow.Draw(gfx,
                centerX,
                arrowY - (this.green_arrow._image.height / 2) - 13);
        }

        var center = (DEFAULT_WINDOW_WIDTH / 2);
        var ctx = gfx._canvasBufferContext;
        var style = "15pt Androgyne_TB";
        ctx.font = style;

        var text = "Challenge " +
            (g_gameData.curr_challenge_idx + 1) +
            "/10"; // Watchout its a fix value!!

        var textWidth = ctx.measureText(text);
        gfx.DrawText(text,
            center - (textWidth.width / 2), 700,
            "rgb(242,105,37)",
            style);

        gfx.DrawText("?",
            this.small_icon_list[this.small_icon_list.length - 1]._X +
                SMALL_ICONBOX_WIDTH + 15,
            660,
            "rgb(242,105,37)",
            "35pt Androgyne_TB");
    }

}

GameState.prototype.DrawTimerState = function (gfx) {

    var center = (DEFAULT_WINDOW_WIDTH / 2);
    var ctx = gfx._canvasBufferContext;
    var style = "20pt Androgyne_TB";
    ctx.font = style;

    var text = Math.floor(this.seconds_remain + 1) + " seconds";
    var textWidth = ctx.measureText(text);
    gfx.DrawText(text,
        center - (textWidth.width / 2), 650,
        "rgb(242,105,37)",
        style);

    var text = "To Memorize";
    var textWidth = ctx.measureText(text);
    gfx.DrawText(text,
        center - (textWidth.width / 2), 690,
        "rgb(242,105,37)",
        style);
}

GameState.prototype.DisplayMessage = function (msg, gfx) {
    //... to be implemented
}

GameState.prototype.DrawRotateBoard = function (gfx) {
    var ctx = gfx._canvasBufferContext;
    gfx._canvasBufferContext = this.rotateCtx;

    this.rotateCtx.clearRect(0, 0,
            DEFAULT_WINDOW_WIDTH, DEFAULT_WINDOW_HEIGHT);

    this.DrawBoard(gfx);
    gfx._canvasBufferContext = ctx;

    var cx = this.board[4]._X + 50;
    var cy = this.board[4]._Y + 50;
    //draw the image but rorated
    gfx.DrawRotateFull(0, 0,
           cx,
            cy,
            board_angle,
            this.rotateCanvas,
            1.0);

}

/*Finish!*/
GameState.prototype.NextGame = function () {

    this.state = GAME_STATE_PURGATORY;
    // check if there are still challenges left?
    if (g_gameData.curr_challenge_idx + 1 < this.currentLevel.challenges_list.length) {
        g_gameData.curr_challenge_idx++;
        this.currentChallenge = this.currentLevel.challenges_list[g_gameData.curr_challenge_idx];

        //////////////////////////////
        // Trigger new Challenge !!!
        //////////////////////////////

        // Flip all cards back
        var switchflag = false;
        var rotateFlag = false;
        var context = this;
        for (var i = 0; i < this.board.length; i++) {

            if (this.board[i].isOpen) {
                this.board[i].done = false; 

                if (this.currentChallenge.switch_icon && !switchflag) {
                    switchflag = true;

                    this.board[i].fnAnimateComplete = function () {
                        context.DoSwitch();
                        this.fnAnimateComplete = null;
                    };

                } else if (this.currentChallenge.rotate && !rotateFlag) {
                    rotateFlag = true;

                    this.board[i].fnAnimateComplete = function () {
                        context.DoRotate();

                        this.fnAnimateComplete = null;
                    };
                } else {
                    this.board[i].fnAnimateComplete = null;
                }

                this.board[i].Flip();
            }

            // Generate new challenge icons
            if (this.currentChallenge.switch_icon == false &&
                this.currentChallenge.rotate == false) {
                this.ProceedNextChallenge();
            }
        }

    } else {

        ////////////////////////////////////////////////////////
        // Level Condition, applicable to SOLO only - May 10, 2014
        ////////////////////////////////////////////////////////  
        if (g_gameMode != GAME_MODE_DOU) {
            if (this.currentLevel.fnEvaluate &&
                !this.currentLevel.fnEvaluate()) {

                this.ShowFailedPopup(this.currentLevel.level_cond_errmsg);
                return;
            }
        }

        ////////////////////////////////////////////////////
        // Update Max level
        // DUO DO NOT Unlock levels 
        if (g_gameMode != GAME_MODE_DOU) {
            if (g_gameData.max_level < g_gameData.curr_level_idx + 1) {
                g_gameData.max_level = g_gameData.curr_level_idx + 1;

                ///////////////////////////////////////////////////////////
                // temporary clip
                if (g_gameData.max_level >= g_gameData.level_list.length) {
                    g_gameData.max_level = g_gameData.level_list.length-1;

                }
                ///////////////////////////////////////////////////////////

                Ajax_UpdateMaxLevel();
            }
        }

        // check for next level
        if (g_gameMode == GAME_MODE_SOLO) {

			Ajax_IncrementSOLOCount(g_gameData.curr_level_idx);
		
            var context = this;
            var trophy = GetTrophyType(g_gameData.total_accumulated_stars);
            if (this.currentLevel.minimum_trophy != 0) {
                if (trophy < this.currentLevel.minimum_trophy) {
                    this.state = GAME_STATE_RETRYWND;
                    var trophyArr = ["None", "Bronze", "Silver", "Gold"];

                    this.retryWindow = new RetryWindow();
                    this.retryWindow.Load();
                    this.retryWindow.message = ["You must earn a minimum of",
                                trophyArr[this.currentLevel.minimum_trophy]
                                + " trophy to complete", "the level"];

                    this.retryWindow.PopShow();
                    this.retryWindow.fnRetry = function () {
                        context.state = 0;
                        context.DoNothing();

                    };

                    this.retryWindow.fnClose = function () {
                        g_Engine.SetState(MAIN_MENU_STATE);
                    };

                    return;
                }

            }

            ////////////////////////////////////////////////////////
            // Level Complete!
            ////////////////////////////////////////////////////////
            var total = 0;
            this.popupComplete = new LevelCompleteWnd();
            this.popupComplete.score = this.level_score;
            this.popupComplete.stars = g_gameData.total_accumulated_stars;

            /*
            var hits_total = (this.currentLevel.points_per_hits * this.hits);

            total += hits_total;*/
            var time_remain = -1;

            /*if (this.currentLevel.clock_limit != -1) {
                var currTime = new Date().getTime();
                var diff = (currTime - this.timerClockLimit) / 1000;
                var count = Math.floor(this.currentLevel.clock_limit - diff);
                var time_total = (count * this.currentLevel.points_per_time)

                total += time_total;
                time_remain = count;
            }*/

            this.popupComplete.levelID = g_gameData.curr_level_idx;
            this.popupComplete.extra_points = total;
            this.popupComplete.total_score = total + this.level_score;
            this.popupComplete.trophy = trophy;
            this.popupComplete.number_of_errors = this.errors;

            var currentTime = new Date().getTime();
            var diff = (currentTime - this.timerLevel) / 1000;

            //substract the time view limit
            diff -= this.currentLevel.seconds;

            this.popupComplete.time_to_complete = FormatTimeStr(diff);

            g_gameData.total_score += total;

            // based on specification, auto saved is every 5 levels
            var saved = (g_gameData.curr_level_idx % 5) == 0;

            ////////////////////////////////////////////////////
            //TODO: Add additional check against best score
            var bestData = GetMyRecord(g_gameData.curr_level_idx);
            if (bestData == null || this.popupComplete.total_score > (bestData.score + bestData.extra)) {
                if (g_gameMode != GAME_MODE_DOU) {
                    // We dont store info for Game mode DOU
                    UpdateRecord(g_gameData.curr_level_idx,
                        this.level_score, g_gameData.total_accumulated_stars, diff,
                        this.remain_hits, this.errors, total);

                    // checking for Daily Bunos! Added 12/04/2014
					// Update on June 29, display daily bunos every time score is beaten
                    if (/*g_gameData.D_claim_flag == 0*/1) {
                        this.state = GAME_STATE_DAILY_BUNOS;

                        this.objectiveWindow = new BestScoreWindow;
                        this.objectiveWindow.chococoins = g_gameData.D;
                        this.objectiveWindow.Load();
                        this.objectiveWindow.Show();

                        LoadAndPlay("Congratulations");

                        /*this.objectiveWindow.msg = ["YOU WIN,",
							"",
							"This is a new best score!",
							"[" + g_gameData.D + "] CHOCOCOINS ",
							"",
							"Get More " + ((g_gameData.D + 5 < 30) ? g_gameData.D + 5 : 5) + "!"];
                        */
                        var context = this;
                        this.objectiveWindow.fnClose = function () {
                            context.FinishLevel();
                        };

                        // Award a coins 
                       // Debit_Coins(10/*g_gameData.D*/);
                        UpdateClaimFlag(1);

                        return;
                    } // End Daily Spin

                }
            }
            ////////////////////////////////////////////////////
            this.FinishLevel();


        } else {
            this.DeclareDOUWInner();
			Ajax_IncrementDUOCount(g_gameData.curr_level_idx);
        }
    }

    //NOTE: Might affect sequence of LOGIC
    this.success = false;
    this.game_finish = false;
}

///////////////////////////////////////////////
// Destructor
///////////////////////////////////////////////
GameState.prototype.Unload = function () {

    this.CleanupUIManager();

    //cleanup the timer
    StopAudio("15Sec-Timer");
}

GameState.prototype.EventHandler = function (e) {

    if (this.state == GAME_STATE_POPUPLOST) {
        this.popupLost.EventHandler(e);
        return;
    }
    else if (this.state == GAME_STATE_LEVELCOMPLETE_WND) {
        this.popupComplete.EventHandler(e);
        return;
    } else if (this.state == GAME_STATE_RETRYWND) {
        this.retryWindow.EventHandler(e);
        return;
    } else if (this.state == GAME_STATE_OBJECTIVE ||
		this.state == GAME_STATE_DAILY_BUNOS) {
        this.objectiveWindow.EventHandler(e);
        return;
    } else if (this.state == GAME_STATE_GIFT_WINDOW) {
        this.giftpopup.EventHandler(e);
        return;
    } else if (this.state == GAME_STATE_UNLOCKLEVEL) {
        this.unlockWnd.EventHandler(e);
        return;
    } else if (this.EventHandlerEx(e)) {
        return;
    }

    if (e.type == "keydown") {
        var keycode = e.keyCode;
        if (keycode == SPACE_BAR_KEY) {
            //TODO: TEMPORARY!!
            //this.LoadBoardInfo(g_gameData.level_list[0]);
        }
    }

    // Pass to base class
    this.EventHandlerBase(e);
    this.EventHandlerBase(e, this._uiManagerLocal);
}



