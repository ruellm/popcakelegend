/**
    PRe-Splash Load State (load at startup)
    All Resources must be loaded before starting the game
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created: March 16, 2013, Los Angeles CA.
*/

var g_textMessageList = [
    ["Popcake Legend really improves", "your memory? Maybe..."],
    ["5 minutes a day keeps Alzheimer","away? Not sure but it's fun!"],
    ["How does your memory compare", "with your friends?"],
    ["Beat your best scores and win", "Chococoins everyday!"],
    ["Popcake Legend trains your brain?", "Probably..."],
    ["Your brain is a muscle!", "Popcake Legend is your coach!"],
    ["Popcake Legend stimulates ","your brain? For sure!"],
    ["Improve your cognitive skills","with Popcake Legend!"],
    ["The faster you play,","the higher you score!"],
    ["Use boosters... ","Boost your score!"],
    ["Well in your brain,", "well in your body!"],
    ["Popcake Legend everyday,", "good brain forever? Not sure but it's fun!"],
    ["Don’t forget your memory!"],
    ["Regular training is a key","to healthy life?"],
    ["Have fun, play smart!"],
    ["Use booster to remix,","to watch or to freeze cakes!"],
];

function LoadState() {
    // State ID 
    this._stateID = LOAD_STATE;
	this.count = 0;
	this.audio_loaded = 0;
	this.error = false;
	var context = this;
	this.loaded = false;

	//...
	this.count = 0;

	var images_list = [
        "Loadiing-Screen-bg.jpg",
        "background-rays.png",
        "pop-cake-title.png",
        "male-baker-with-board.png",
        "elephant-charactor.png",
        "grass.png",
         "loading-screen-bg.png",  
         "loading-line.png"     
    ];

	this.images = new Array();
	for (var i = 0; i < images_list.length; i++) {
	    var img = new Image();
	    this.images.push(img);

	    this.images[i] = new Image();
	    this.images[i].src = "images/loading_images/" + images_list[i];
	    
	    this.images[i].onload = (function () {
	        context.count++;
	    });
	}
   
	this.messageIdx = Math.floor(Math.random() *
        g_textMessageList.length);
	
	this.angle = 0;

	this.walldorf = new Image();
	this.walldorf.src =   "images/WG-Logo-White.png";
	
	this.fglogo = new Image();
	this.fglogo.src =   "images/FG-Logo.png";
 }

// set base class to State
LoadState.prototype = new State;

LoadState.prototype.Load = function () {
    var context = this;

    // load the level definitions
    InitializeLevels();
	
    // Database
    this.LoadDatabaseInfo();

    // Load the themes
    var current_theme = g_themes_list[g_gameData.theme];
    g_theme_flag[g_gameData.theme] = true;

    for (var l = 0; l < current_theme.length; l++) {
        g_imageFileList.push(current_theme[l]);
    }
    
    new ImageResource().Load(g_imageFileList[0]);

    LoadAudio();
    
    //check life and if g_targetTimer not triggered
    if (g_gameData.life == 0 && g_targetTimer == 0) {
        TriggerEpoch();
    }

    if (1/*g_gameData.gift_count > 0*/) {
        g_gameData.gift_array = new Array();
        for (var i = 0; i < 5/*g_gameData.gift_count*/; i++) {
            if( i < g_gameData.gift_count)
				g_gameData.gift_array.push(true);
			else
				g_gameData.gift_array.push(false);
		}
    }
}

LoadState.prototype.LoadDatabaseInfo = function()
{
	if(typeof (g_DBUserInfo) === 'undefined') return;
	
	if(g_DBUserInfo) {
		g_gameData.life = g_DBUserInfo.life;
		g_gameData.coins = g_DBUserInfo.coins;
		g_gameData.total_score = g_DBUserInfo.total_score;
		g_gameData.max_level = g_DBUserInfo.max_level;
		g_gameData.D = g_DBUserInfo.D;
		g_gameData.D_claim_flag = g_DBUserInfo.D_claim_flag;
		g_gameData.gift_count = g_DBUserInfo.gift_count;
		g_gameData.gift_give_date = g_DBUserInfo.gift_give_date;
		g_gameData.fr_gift_date = g_DBUserInfo.fr_gift_date;
		
		g_gameData.theme = g_DBUserInfo.theme;
		g_gameData.spv_flag = g_DBUserInfo.spv_flag;
		
		// Set Epoch time
		if(g_gameData.life==0 &&g_DBUserInfo.epoch != 0){
			g_targetTimer = g_DBUserInfo.epoch;
		}
		//...
	}
	if(g_LevelInfoList) {
		for(var i =0; i < g_LevelInfoList.length;i++){
		    var level = g_LevelInfoList[i];

		    var player = new PlayerInfo();
		    player.fbid = level.fbid;
		    player.name = level.name;		    
		    player.stars = level.stars;
		    player.score = level.score;
		    player.trophy = GetTrophyType(level.stars);
		    player.time = level.time_complete;
		    player.errors = level.errors;
			player.extra = level.extra;
			
		    g_playersList[level.level_id].players.push(player);
		}

		for (var x = 0; x < g_playersList.length; x++) {
		    g_playersList[x].players.sort(SortData);
		}
	}
	if( g_myLevelInfoList){
		for(var i =0; i < g_myLevelInfoList.length;i++){
			var level = g_myLevelInfoList[i];

		    var player = new PlayerInfo();
		    player.fbid = level.fbid;
		    player.name = level.name;		    
		    player.stars = level.stars;
		    player.score = level.score;
		    player.trophy = GetTrophyType(level.stars);
		    player.time = level.time_complete;
		    player.errors = level.errors;
		    player.extra = level.extra;
		    player.unlocked = true;
			//player.saved = level.saved;
		    g_myRecord[level.level_id] = player;
		}
	}
	
	if(g_LevelSettingsList){
		for(var i =0; i < g_LevelSettingsList.length;i++){
			var level_s = g_LevelSettingsList[i];
			var level = g_gameData.level_list[level_s.level_id];
			
			level.number_of_hits = level_s.hits;
			level.points_per_hits = level_s.points_per_hits;
			level.points_per_time = level_s.points_per_time;
			level.seconds = level_s.seconds;
			level.clock_limit = level_s.clock_limit;			
			level.point_per_challenge = level_s.points_per_challenge;
			level.minimum_trophy = level_s.minimum_trophy;   
			level.hidden = (level_s.hidden ==0)?false:true;			
		}
	}
	
	if(g_PriceSettingsList){
		
		gLIFE_PRICES = new Array();
		
		for(var i =0; i < g_PriceSettingsList.length;i++){
			var price = g_PriceSettingsList[i];

			if(price.type==MONETIZATION_SHUFFULE){
				SHUFFULE_PRICE = price.price;
			}else if(price.type==MONETIZATION_WATCH_3){
				WATCH_3_PRICE = price.price;
			}else if(price.type==MONETIZATION_CANCEL_MOVE){
				CANCEL_MOVE_PRICE = price.price;
			}else if(price.type==MONETIZATION_FREEZE_ICON){
				FREEZE_ICON_PRICE = price.price;
			}else if(price.type==MONETIZATION_LIFE){
				gLIFE_PRICES.push({life: price.count, coins: price.price});
			}else if(price.type==MONETIZATION_EXTRA_HITS){
				EXTRA_HITS_COST = price.price;
				EXTRA_HITS_COUNT = price.count;
			}else if(price.type==MONETIZATION_EXTRA_SECS){
				EXTRA_SECS_COST = price.price;
				EXTRA_SECS_COUNT = price.count;
			} else if(price.type == MONETIZATION_UNLOCK){
				UNLOCK_LEVEL_PRICE = price.price;
			} else if (price.type == MONETIZATION_THEME) {
			    CUSTOM_THEME_PRICE = price.price;
			} else if(price.type == MONETIZATION_COINS){
				for(var s=0; s < gCoinPrices.length; s++){
					if( gCoinPrices[s].coins == price.count){
						gCoinPrices[s].price = price.price;
						
						break;
					}
				}
			}
		}
	}
	
	if(g_GeneralSettingsList){
		for(var i =0; i < g_GeneralSettingsList.length;i++){
			var data = g_GeneralSettingsList[i];
			if(data.name == "Lives"){
				DEFAULT_LIFE = data.value;
			}else if(data.name=="Coins"){
				DEFAULT_COINS =  data.value;
			} else if (data.name == "Life Minutes") {
			    DEFAULT_WAIT_MINUTES = data.value * 60;
			} else if (data.name == "Free Chococoins for Video") {
			    VIDEO_CHOCOCOINS = data.value;
			}
		}
	}	
	
	//* For Statistics screen */
	if( g_FriendsLevelMasterList){
		for(var i =0; i < g_FriendsLevelMasterList.length;i++){
		    var level = g_FriendsLevelMasterList[i];

		    var player = new PlayerInfo();
		    player.fbid = level.fbid;
		    player.name = level.name;		    
		    player.stars = level.stars;
		    player.score = level.score;
		    player.trophy = GetTrophyType(level.stars);
		    player.time = level.time_complete;
		    player.errors = level.errors;
			player.extra = level.extra;
			
		    g_perLevelFriendsData[level.level_id].players.push(player);
		}
	}

	if (g_Locale) {
	    LOCALE = g_Locale;
	}
}

LoadState.prototype.Update = function (elapsed) {

    if (this.count < 8) {
        return;
    } 

    if (g_imageResourceList.length >= g_imageFileList.length) {

        //...
       /* this.audio_loaded = 0;
        for (var aud = 0; aud < g_audioResourceList.length; aud++) {
            if (g_audioResourceList[aud].loaded) {
                this.audio_loaded++;
            }
        }
        */
        if (true/*this.audio_loaded >= g_audioFileList.length*/) {
            DEBUG_LOG("ALL Loading done...");
            DEBUG_LOG("Loading flag " + g_gameData.isDataLoadDone);
            DEBUG_LOG("Error flag " + this.error);

            g_Engine.SetState(MAIN_MENU_STATE);

            ////////////////////////////////////////////////////////////
            // Load the other images at the back
            global_resource_index = 0;
            g_currentResource = low_prio_resource;
            new ImageResource().Load(g_currentResource[0]);
            ////////////////////////////////////////////////////////////
        }
    }

    this.angle += 30 * elapsed;
}
/*
LoadState.prototype.LoadRemainingTheme = function ()
{
    g_currentResource = new Array();
    for (var i = 0; i < g_themes_list.length; i++) {
        if (!g_theme_flag[i]) {
            var current_theme = g_themes_list[i];
            g_theme_flag[i] = true;

            for (var l = 0; l < current_theme.length; l++) {
                g_currentResource.push(current_theme[l]);
            }
        }
    }

    global_resource_index = 0;
    new ImageResource().Load(g_currentResource[0]);
}
*/
LoadState.prototype.Draw = function (gfx) {

    if (this.count < 8) return;

    //compute center
    gfx.FillRect(0, 0, gfx.GetRenderWidth(), gfx.GetRenderHeight(), "rgb(255,255,255)");

    //Draw background
   	gfx.DrawImageFullA(this.images[0], 0, 0, 1.0);

    //this is the rays, maybe we rotate it?
  // 	gfx.DrawImageFullA(this.images[1], 
    //    (DEFAULT_WINDOW_WIDTH / 2) - (this.images[1].width / 2), 0, 1.0);
    ////////////////////////////////////////////////////////
   	var cxscreen = DEFAULT_WINDOW_WIDTH / 2;
   	var cyscreen = (DEFAULT_WINDOW_HEIGHT / 2);
   	var radial_cx = this.images[1].width / 2;
   	var radial_cy = this.images[1].height / 2;
   	var diffx = radial_cx - cxscreen;
   	var diffy = radial_cy - cyscreen;
   	gfx.DrawRotateFull(-diffx, -diffy, radial_cx, radial_cy,
        this.angle, this.images[1], 1.0);
    ////////////////////////////////////////////////////////


   	gfx.DrawImageFullA(this.images[3],
        (DEFAULT_WINDOW_WIDTH / 2) - (this.images[3].width / 2) + 140,
        this.images[2].height-140, 1.0);

    //title
   	gfx.DrawImageFullA(this.images[2],
        (DEFAULT_WINDOW_WIDTH / 2) - (this.images[2].width / 2),
        40, 1.0);

   	gfx.DrawImageFullA(this.images[4], 10, 303, 1.0);

   	gfx.DrawImageFullA(this.images[6], 
        (DEFAULT_WINDOW_WIDTH / 2) - (this.images[6].width / 2),
        524, 1.0);

   	var total = g_imageFileList.length;// + g_audioFileList.length;
   	var loaded = (g_imageResourceList.length);// + this.audio_loaded;
    var pct = loaded / total;
    pct = (pct > 1) ? 1 : pct;

    var barwidth = 382 * pct;
    if (barwidth) {
        gfx.DrawImage(this.images[7], 0, 0, barwidth, 48,
                   (DEFAULT_WINDOW_WIDTH / 2) - (this.images[6].width / 2)+7,
                   527, barwidth, 48, 1.0);
    }


    //Grass
    gfx.DrawImageFullA(this.images[5], -30, 550, 1.0);

    var style = "22pt DJBCHALKITUP";
    var ctx = gfx._canvasBufferContext;
    ctx.font = style;

    text = Math.floor(pct*100)+"%";
    var textWidth = ctx.measureText(text);
    var x = (DEFAULT_WINDOW_WIDTH / 2);

    gfx.DrawText(text,
              x - (textWidth.width / 2), 510,
              "rgb(255,255,255)",
             style);

    var warning_msg = ["WARNING: THIS IS A SERIOUSLY FUN",
						"BRAIN TRAINING GAME","NOT AN EASY ONE!"];
	y = 310;
	 var size = 18;
		
	 for (var i = 0; i < warning_msg.length; i++) {
        var text = warning_msg[i];
      
        var style = size + "pt DJBCHALKITUP";
        var ctx = gfx._canvasBufferContext;
        ctx.font = style;
        var textWidth = ctx.measureText(text);
        var x = (DEFAULT_WINDOW_WIDTH / 2);

        gfx.DrawText(text,
                  x - (textWidth.width / 2), y,
                  "rgb(255,255,255)",
                 style);

        y += 32;
    }
				  
				 
			 
    var cy = (DEFAULT_WINDOW_HEIGHT / 2);
    var length = g_textMessageList[this.messageIdx].length;
    y = cy - (30 * length) + 90;// 340;

    //get size in advance for balance text size

    for (var i = 0; i < length; i++) {
        var text = g_textMessageList[this.messageIdx][i];
        if (text.length >= 32) {
            size = 18;
        } /*else if (text.length < 20) {
            size = 26;
        }*/

    }

    for (var i = 0; i < length; i++) {
        var text = g_textMessageList[this.messageIdx][i];
      
        var style = size + "pt DJBCHALKITUP";
        var ctx = gfx._canvasBufferContext;
        ctx.font = style;
        var textWidth = ctx.measureText(text);
        var x = (DEFAULT_WINDOW_WIDTH / 2);

        gfx.DrawText(text,
                  x - (textWidth.width / 2), y,
                  "rgb(255,255,255)",
                 style);

        y += 38;
    }

    gfx.DrawImageFullA(this.walldorf, 820, 710, 1.0);
	gfx.DrawImageFullA(this.fglogo, 97, 710, 1.0);
	
	
}


///////////////////////////////////////////////
// Destructor
///////////////////////////////////////////////
LoadState.prototype.Unload = function () {
    this.CleanupUIManager();
}

LoadState.prototype.EventHandler = function (e) {

    this.EventHandlerBase(e);
}


