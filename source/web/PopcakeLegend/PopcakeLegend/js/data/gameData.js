/**
    gameData.js
    Global Game Data
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created: June 12, 2014
    Ported to Popcake Legend 10/16/2014
*/

///////////////////////////////////
// Life Wait minutes
var DEFAULT_WAIT_MINUTES = 45 * 60;
var g_targetTimer = 0;
var DEFAULT_LIFE = 5;
var DEFAULT_COINS = 30;
///////////////////////////////////

function GameData()
{
	// Flag if were ready to start
    this.isDataLoadDone = true;

    // List of Level Bitches
    this.level_list = null;

    // Current level index and current challenge
    this.curr_level_idx = 0;

    // Current challenge index
    this.curr_challenge_idx = 0;

    // the total accumulated score
    this.total_score = 0;

    // lives
    this.life = DEFAULT_LIFE;

    // chocolate coins
    this.coins = DEFAULT_COINS;

    // accumulated stars each level, note must be reset always
    this.total_accumulated_stars = 0;

    //max level
    this.max_level = 19;
	
	// for daily spin implementation
	this.D = 5;
	this.D_claim_flag = 0;
	
	// gifts implementation
	this.gift_count = 0;
	this.gift_give_date = 0;
	this.fr_gift_date = 0;
	this.gift_array = null;

    //theme implementation
	this.theme = THEME_TYPE_SAMPLE;//;
	this.spv_flag = 0;

    //user is subscribed to mailing list?
	this.mail_list_subscribe = 0;
}

function InitializeLevels() {
    g_gameData.level_list = new Array();
    
    var level_array =
        [
        Level_0_Init,
        Level_1_Init, Level_2_Init,
        Level_3_Init, Level_4_Init,
        Level_5_Init, Level_6_Init,
        Level_7_Init, Level_8_Init,
        Level_9_Init, Level_10_Init,

        Level_11_Init, Level_12_Init,
        Level_13_Init, Level_14_Init,
        Level_15_Init, Level_16_Init,
        Level_17_Init, Level_18_Init,
        Level_19_Init
        ];

    for (var i = 0; i < level_array.length; i++) {
        g_gameData.level_list.push(level_array[i]());

		//creating temporary blank array equivalent
		//to number of levels
        
	
		var players = new LevelPlayers();	
        players.Init();
		g_playersList.push(players);	
		
		var players = new LevelPlayers();		
		players.Init();
		g_perLevelFriendsData.push(players);

		g_myRecord.push( new PlayerInfo());						
		LoadLevelSettingsFromDB(i);
    
	}
}

function ReCreateLevel(id)
{
    var level_array =
        [
        Level_0_Init,
        Level_1_Init, Level_2_Init,
        Level_3_Init, Level_4_Init,
        Level_5_Init, Level_6_Init,
        Level_7_Init, Level_8_Init,
        Level_9_Init, Level_10_Init,

        Level_11_Init, Level_12_Init,
        Level_13_Init, Level_14_Init,
        Level_15_Init, Level_16_Init,
        Level_17_Init, Level_18_Init,
        Level_19_Init
        ];

    g_gameData.level_list[id] = level_array[id]();
	
	LoadLevelSettingsFromDB(id);
}

function GetTrophyType(stars)
{
    if (stars >= 26 && stars <= 30) {
        return GOLD_TROPHY_STARS;
    }else if (stars >= 21 && stars <= 25) {
        return SILVER_TROPHY_STARS;
    } else if (stars >= 16 && stars <= 20) {
        return BRONZE_TROPHY_STARS;
    }
    return NONE_TROPHY_STARS;
}

function GetTrophyStrings(type)
{
    var trophy = ["None", "Bronze", "Silver", "Gold"];
    return trophy[type];
}

function Credit_Coins(amount)
{
    if (g_gameData.coins - amount < 0)
        return false;

    g_gameData.coins -= amount;

    /////////////////////////////////////
    Ajax_UpdateCoins(g_gameData.coins);
    /////////////////////////////////////

    return true;
}

function Debit_Coins(amount)
{
    g_gameData.coins += amount;

    /////////////////////////////////////
    Ajax_UpdateCoins(g_gameData.coins);
    /////////////////////////////////////
}

function Update_Life(amount)
{
    g_gameData.life += amount;
	if(g_gameData.life <0) 
		g_gameData.life = 0;
	
    ////////////////////////////
    Ajax_UpdateLife(g_gameData.life);
    ////////////////////////////
}

function Decr_Gift()
{
    g_gameData.gift_count--;
    if (g_gameData.gift_count < 0)
        g_gameData.gift_count = 0;

    Ajax_UpdateGift();
}

function Incr_Gift()
{	

	if( g_gameData.gift_count + 1 > 5 ) { 
		return;
	}
	
    g_gameData.gift_array[g_gameData.gift_count++] = true;
    Ajax_UpdateGift();
}

function TriggerEpoch()
{
    // compute the target minutes
    g_targetTimer = new Date().getTime() +
        (DEFAULT_WAIT_MINUTES * 1000.0);

    //////////////////////////////////////////////
    //Store target timer as EPOCH instead!
    // next login of user, the stored epoch will just
    // computed again the current time.
    Ajax_doRequest(REQ_SET_EPOCH, g_targetTimer);
    //////////////////////////////////////////////
}

function GetLifeStatus()
{
    var textLife = g_gameData.life;
    if (g_gameData.life == 0 && g_targetTimer) {
        var currentTimeX = new Date().getTime();
        var diff = (g_targetTimer - currentTimeX) / 1000.0;

        if (diff <= 0) {
            // g_gameData.UpdateLife(DEFAULT_LIFE);
            Update_Life(DEFAULT_LIFE);
            g_targetTimer = 0;
            Ajax_doRequest(REQ_SET_EPOCH, 0);

            //Restart Game
            g_Engine.SetState(GAME_STATE);
        }

        textLife = FormatTimeStr(diff);
    }
    return textLife;
}

function UpdateClaimFlag(value)
{
	g_gameData.D_claim_flag = value;
	Ajax_SetClaimFlag(value);
}

function SetTheme(theme)
{
    if (g_gameData.theme == theme)
        return;
		
    g_gameData.theme = theme;
    Ajax_SetTheme(theme);

	if( theme == THEME_TYPE_SAMPLE && !g_gameData.spv_flag ) {
		// Setting of database spv_flag value is done inside 
		// PHP routine PDODB_UpdateTheme as one for setting Theme flag
		// set local value instead.
		g_gameData.spv_flag = 1;		
	} 
}

//////////////////////////////////////////////////
// Player Info for leaderboards and best score
////////////////////////////////////////////////


// Top 4 player info array arranged per level
// example; g_playersList[0].players are top player
// of level 1
var g_playersList = new Array();

// Player personal record per level array
// Ex: g_myRecord[0] is record of level 1
var g_myRecord = new Array();

// Level Data of Friends arrayarranged per Level
// Example g_perLevelFriendsData[0].players[]
// contains friends data of level 1
g_perLevelFriendsData = new Array();

function PlayerInfo()
{
    this.name = "";
    this.fbid = "";
    this.stars = 0;
    this.score = 0;
    this.trophy = 0;
    this.time = 0;
    this.errors = 0;
    this.extra = 0;
    // this.saved = 0;
    
    this.unlocked = false;
}

function LevelPlayers()
{
    this.players = null;

    this.Init = function()
    {
        this.players = new Array();
    }
}

function GetMyRecord(levelid)
{
    //if (levelid >= this.g_playersList.length) return;
    //return this.g_playersList[levelid].FindMe();
	//if (typeof (g_DBUserInfo) == 'undefined') return null;

	return g_myRecord[levelid];
}

function UpdateRecord(level, score, star, time, /*saved,*/ hits, errors, extra)
{
    g_myRecord[level].stars = star;
    g_myRecord[level].score = score;
    g_myRecord[level].trophy = GetTrophyType(star);
    g_myRecord[level].time = time;
    g_myRecord[level].errors = errors;
    g_myRecord[level].extra = extra;
    g_myRecord[level].unlocked = true;

	if (typeof (g_DBUserInfo) == 'undefined') return null;

	for(var i = 0; i < g_playersList[level].players.length; i++)
	{
		if( g_DBUserInfo.fbid == g_playersList[level].players[i].fbid)
		{
			g_playersList[level].players[i] = g_myRecord[level];
			
		}
	}
	
	Ajax_UpdateLevelInfo(level, score, star, time, /*saved,*/ hits, errors, extra);
		
}

function IsMeExist(levelid)
{
	if (typeof (g_DBUserInfo) == 'undefined') return null;

	for(var i = 0; i < g_playersList[levelid].players.length; i++)
	{
		if( g_DBUserInfo.fbid == g_playersList[levelid].players[i].fbid)
			return true;
	}
	return false;
}

function SortData(jam, shi) {
	a = jam.score + jam.extra;
	b = shi.score + shi.extra;
	if ( a > b)
	   return -1;
	else if (a < b)
	   return 1;
	else
	   return 0;
}

/***********************************************************/
function LoadLevelSettingsFromDB(levelid)
{
	if(typeof (g_LevelSettingsList) == 'undefined') return;

	var obj = null;
	for(var i =0; i < g_LevelSettingsList.length;i++) {
		if( g_LevelSettingsList[i].level_id == levelid){
			obj = g_LevelSettingsList[i]; 
			break;
		}
	}
	
	if(obj == null) return;
	
	var level = g_gameData.level_list[levelid];
			
	level.number_of_hits = obj.hits;
	level.points_per_hits = obj.points_per_hits;
	level.points_per_time = obj.points_per_time;
	level.seconds = obj.seconds;
	level.clock_limit = obj.clock_limit;			
	level.point_per_challenge = obj.points_per_challenge;
	level.minimum_trophy = obj.minimum_trophy;   
	level.hidden = (obj.hidden ==0)?false:true;			
}

/************************************************************
* DOU VERSION definitions
*************************************************************/
var GAME_MODE_SOLO = 0;
var GAME_MODE_DOU = 1;

var g_gameMode = GAME_MODE_SOLO;
var g_DOU_turn = 0; // 0: player 1, 1: player 2

function DOU_PlayerDef()
{
    // count how many challenge this player won in one level
    this.challengedWon = 0; 
    this.total_score = 0;
    this.level_score = 0;
}

var g_DOU_players = null;

/************************************************************
* Unlocking level
*************************************************************/
function UnlockLevel(id)
{
    // by unlocking a window it means that use has level data in database
    UpdateRecord(id, 0, 0, 0, 0, 0, 0);
    g_myRecord[id].unlocked = true;

    if (g_gameData.max_level < id) {
        g_gameData.max_level = id;
        Ajax_UpdateMaxLevel();
    }
}

/************************************************************
* Level Access Condition
* Callback operations -- must be bolean
*************************************************************/
function Level4_Evaluate()
{

    // yeah no need to evaluate this level already passed
    if (g_gameData.max_level >= 4) return true;

    var stars = 0;
    for (var i = 0; i < g_myRecord.length; i++) {
        stars += g_myRecord[i].stars;
    }

    // add the stars accumulated
    stars += g_gameData.total_accumulated_stars;

    // required to collect atleast sixty stars
    return (stars >= 80);
}

function Level8_Evaluate()
{
    if (g_gameData.max_level >= 8) return true;

    var gold_count = 0;
    for (var i = 0; i < g_myRecord.length; i++) {
        if (g_myRecord[i].trophy == GOLD_TROPHY_STARS) {
            gold_count++;
        }
    }

    //need to collect atleast two gold trophies
    return (gold_count >= 2);
}