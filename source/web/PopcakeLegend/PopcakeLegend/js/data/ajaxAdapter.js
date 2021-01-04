/**
    Helper for calling Ajax
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created Oct 23, 2012
    
	Ported to Spirit Bubble June 28, 2014
	
	IF releasing binary is imposible, obfuscate this code:
	http://javascriptobfuscator.com/
*/

//
// Transaction ID
//
var REQ_LOGIN_USER = 100;
var REQ_UPDATE_LIFE = 200;
var REQ_UPDATE_TOTAL_SCORE = 300;
var REQ_UPDATE_MAX_LEVEL = 400;
var REQ_UPDATE_LEVEL = 500;
var REQ_GET_USER_LEVEL_DATA = 600;
var REQ_ASK_LIFE = 700;
var REQ_LIFE_BEGGARS = 800;
var REQ_GRANT_LIFE_SINGLE= 900;
var REQ_SET_EPOCH = 1000;
var REQ_GET_BOOSTERS_INFO = 1100;
var REQ_PURCHASE_INAPP	= 1200;
var REQ_UPDATE_BOOSTER = 1300;
var REQ_UPDATE_REWARD_FLAG = 1400;
var REQ_UPDATE_GOLD = 1500;
var REQ_ADD_TRANSACTION = 1600;
var REQ_UPDATE_COINS = 1700;
var REQ_SAVE_LEVEL = 1800;
var REQ_UPDATE_MONETIZE = 1900;
var REQ_GIFTS = 2000;
var REQ_RESET_CLAIMFLAG	= 3000;
var REQ_UPDATE_GIFT = 4000;
var REQ_SET_THEME = 5000;
var REQ_UPDATE_FR_GIFT		= 6000;
var REQ_INCR_DOU_COUNT  = 7000;
var REQ_INCR_SOLO_COUNT = 8000;
var REQ_SET_EMAIL = 9000;

/////////////////////////////////////////////
// For Admin Page
var REQ_EXEC_SQL	= 10;
/////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
// Base 64 Encryption
var rc4_key = "spiritbubble";

var M = {
        // private property
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

        // public method for encoding
        e: function (input) {
                var output = "";
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                var i = 0;

				////////////////////////////////////////////////////
				// Perform RC4 decryption first
				//DEBUG_LOG(input);
				//input = rc4(rc4_key,input);
				///////////////////////////////////////////////////							
				
                input = M.ute(input);

                while (i < input.length) {

                        chr1 = input.charCodeAt(i++);
                        chr2 = input.charCodeAt(i++);
                        chr3 = input.charCodeAt(i++);

                        enc1 = chr1 >> 2;
                        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                        enc4 = chr3 & 63;

                        if (isNaN(chr2)) {
                                enc3 = enc4 = 64;
                        } else if (isNaN(chr3)) {
                                enc4 = 64;
                        }

                        output = output +
                        M._keyStr.charAt(enc1) + M._keyStr.charAt(enc2) +
                        M._keyStr.charAt(enc3) + M._keyStr.charAt(enc4);

                }

                return output;
        },

        // public method for decoding
        d: function (input) {
                var output = "";
                var chr1, chr2, chr3;
                var enc1, enc2, enc3, enc4;
                var i = 0;

                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                while (i < input.length) {

                        enc1 = M._keyStr.indexOf(input.charAt(i++));
                        enc2 = M._keyStr.indexOf(input.charAt(i++));
                        enc3 = M._keyStr.indexOf(input.charAt(i++));
                        enc4 = M._keyStr.indexOf(input.charAt(i++));

                        chr1 = (enc1 << 2) | (enc2 >> 4);
                        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                        chr3 = ((enc3 & 3) << 6) | enc4;

                        output = output + String.fromCharCode(chr1);

                        if (enc3 != 64) {
                                output = output + String.fromCharCode(chr2);
                        }
                        if (enc4 != 64) {
                                output = output + String.fromCharCode(chr3);
                        }

                }

                output = M.utd(output);

                return output;

        },

        // private method for UTF-8 encoding
        ute: function (string) {
                string = string.replace(/\r\n/g, "\n");
                var utftext = "";

                for (var n = 0; n < string.length; n++) {

                        var c = string.charCodeAt(n);

                        if (c < 128) {
                                utftext += String.fromCharCode(c);
                        }
                        else if ((c > 127) && (c < 2048)) {
                                utftext += String.fromCharCode((c >> 6) | 192);
                                utftext += String.fromCharCode((c & 63) | 128);
                        }
                        else {
                                utftext += String.fromCharCode((c >> 12) | 224);
                                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                                utftext += String.fromCharCode((c & 63) | 128);
                        }

                }

                return utftext;
        },

        // private method for UTF-8 decoding
        utd: function (utftext) {
                var string = "";
                var i = 0;
                var c = c1 = c2 = 0;

                while (i < utftext.length) {

                        c = utftext.charCodeAt(i);

                        if (c < 128) {
                                string += String.fromCharCode(c);
                                i++;
                        }
                        else if ((c > 191) && (c < 224)) {
                                c2 = utftext.charCodeAt(i + 1);
                                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                                i += 2;
                        }
                        else {
                                c2 = utftext.charCodeAt(i + 1);
                                c3 = utftext.charCodeAt(i + 2);
                                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                                i += 3;
                        }

                }
                return string;
        }
}
////////////////////////////////////////////////////////////////////////////////

function Ajax_Init()
{
        //
        // Get Ajax object
        //
		var xmlhttp = null;
        if (window.XMLHttpRequest) {
                // code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
        }
        else {
                // code for IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        
		xmlhttp.onreadystatechange = null;
		
        return xmlhttp;
}

///////////////////////////////////////////////////////////////////////
// This function request for data from server side and returns with
// following string format
//
// feedback format feedback format REQID|max_level|gold|life|coins|total_score	
///////////////////////////////////////////////////////////////////////

function Ajax_HandleReply()
{
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				
        var response = M.d(xmlhttp.responseText);
        var dataArray = response.split("|");
		
		//DEBUG_LOG(response);
		
		var req_id = parseInt(dataArray[0]);
		switch(req_id){
			
		}
	}
}

function Ajax_doRequest(id, value, callback)
{
	if(typeof (g_DBUserInfo) == 'undefined') return;
	
	xmlhttp = Ajax_Init();
	
	var fbid = g_DBUserInfo.fbid;
	var param = id + "/" + fbid + "/" + value;     
	 
	if(callback){
		xmlhttp.onreadystatechange = Ajax_HandleReply;
	}
	param = M.e(param);
    xmlhttp.open("GET", "php/transact.php?param="+param, true);
    xmlhttp.send();
}

function Ajax_doRequestID(id, fbid, callback)
{
	if(typeof (g_DBUserInfo) == 'undefined') return;
	
	xmlhttp = Ajax_Init();
	
	var param = id + "/" + fbid;     	 
	if(callback){
		xmlhttp.onreadystatechange = Ajax_HandleReply;
	}
		 
	param = M.e(param);
    xmlhttp.open("GET", "php/transact.php?param="+param, true);
    xmlhttp.send();
}

function Ajax_doRequestMe(id, callback)
{
	if(typeof (g_DBUserInfo) == 'undefined') return;
	
	xmlhttp = Ajax_Init();
	
	var fbid = g_DBUserInfo.fbid;
	var param = id + "/" + fbid;     	 
	if(callback){
		xmlhttp.onreadystatechange = Ajax_HandleReply;
	}
		 
	param = M.e(param);
    xmlhttp.open("GET", "php/transact.php?param="+param, true);
    xmlhttp.send();
}

function Ajax_UpdateLife(life)
{
   Ajax_doRequest(REQ_UPDATE_LIFE, life);
}

function Ajax_UpdateTotalScore(score)
{
    Ajax_doRequest(REQ_UPDATE_TOTAL_SCORE, score);
}

////////////////////////////////////////////////////////////////////
// needs more information, suplemental for Admin data
// For other Level related update transaction ie Supplemental data
// please create a separate Server request process.
// Ex: Suplemental Update
/////////////////////////////////////////////////////////////////
function Ajax_UpdateLevelInfo(level, score, star, time, hits, errors,extra )
{
    if(typeof (g_DBUserInfo) == 'undefined') return;

	xmlhttp = Ajax_Init();	
	var fbid = g_DBUserInfo.fbid;
	var life = g_gameData.life;
	var param = REQ_UPDATE_LEVEL + "/" + fbid + "/" + level + "/" +
			score + "/" + star + "/" + time + "/" + life + "/" + hits +
            "/" + errors + "/" + extra;
	 
	param = M.e(param);
    xmlhttp.open("GET", "php/transact.php?param="+param, true);
    xmlhttp.send();
}


function Ajax_UpdateCoins(count)
{
	Ajax_doRequest(REQ_UPDATE_COINS, count);
}

function Ajax_SaveLevel(level_id)
{
	Ajax_doRequest(REQ_SAVE_LEVEL, level_id);
}

function Ajax_UpdateMonetize(level, type)
{
	if(typeof (g_DBUserInfo) == 'undefined') return;

	xmlhttp = Ajax_Init();	
	var fbid = g_DBUserInfo.fbid;
	var life = g_gameData.life;
	var param = REQ_UPDATE_MONETIZE + "/" + fbid + "/" + level + "/" + type;			  
	 
	param = M.e(param);
    xmlhttp.open("GET", "php/transact.php?param="+param, true);
    xmlhttp.send();
}

////////////////////////////////////////
// This is only used for Admin page!!
////////////////////////////////////////
function Ajax_ExecSQL(param)
{
	xmlhttp = Ajax_Init();
	var param = REQ_EXEC_SQL + "/" + param;
	param = M.e(param);
    xmlhttp.open("GET", "../php/transact.php?param="+param, true);
    xmlhttp.send();
}

function Ajax_SendGift(to)
{
	if(typeof (g_DBUserInfo) == 'undefined') return;

	var delim = "|";
    var inv = "";
		
	for (var i = 0; i < to.length; i++) {
		inv += (to[i].id);
		if(i+1 < to.length){
			inv += delim;
		}
    }
	
	xmlhttp = Ajax_Init();	
	var fbid = g_DBUserInfo.fbid;
		
	var param = REQ_GIFTS + "/" + fbid + "/" + inv;			  
	
	param = M.e(param);
    xmlhttp.open("GET", "php/transact.php?param="+param, true);
    xmlhttp.send();
}

function Ajax_SetClaimFlag(value)
{
	if(typeof (g_DBUserInfo) == 'undefined') return;

	xmlhttp = Ajax_Init();	
	var fbid = g_DBUserInfo.fbid;
		
	var param = REQ_RESET_CLAIMFLAG + "/" + fbid + "/" + value;			  
	
	param = M.e(param);
    xmlhttp.open("GET", "php/transact.php?param="+param, true);
    xmlhttp.send();
}

function Ajax_UpdateGift()
{
    if (typeof (g_DBUserInfo) == 'undefined') return;

    xmlhttp = Ajax_Init();
    var fbid = g_DBUserInfo.fbid;
    var param = REQ_UPDATE_GIFT + "/" + fbid + "/" + g_gameData.gift_count;

    param = M.e(param);
    xmlhttp.open("GET", "php/transact.php?param=" + param, true);
    xmlhttp.send();
}

function Ajax_UpdateMaxLevel()
{
    if (typeof (g_DBUserInfo) == 'undefined') return;

    xmlhttp = Ajax_Init();
    var fbid = g_DBUserInfo.fbid;
    var param = REQ_UPDATE_MAX_LEVEL + "/" + fbid + "/" + g_gameData.max_level;

    param = M.e(param);
    xmlhttp.open("GET", "php/transact.php?param=" + param, true);
    xmlhttp.send();
}

function Ajax_SetTheme(theme)
{
    if (typeof (g_DBUserInfo) == 'undefined') return;

    xmlhttp = Ajax_Init();
    var fbid = g_DBUserInfo.fbid;
    var param = REQ_SET_THEME + "/" + fbid + "/" + theme;

    param = M.e(param);
    xmlhttp.open("GET", "php/transact.php?param=" + param, true);
    xmlhttp.send();
}

function Ajax_SetEmail(email)
{
    if (typeof (g_DBUserInfo) == 'undefined') return;

    xmlhttp = Ajax_Init();
    var fbid = g_DBUserInfo.fbid;
    var param = REQ_SET_EMAIL + "/" + fbid + "/" + email;
    //console.log(g_DBUserInfo);
	
	param = M.e(param);
    xmlhttp.open("GET", "php/transact.php?param=" + param, true);
    xmlhttp.send();
}

function Ajax_UpdateFrGiftDate()
{
    Ajax_doRequestMe(REQ_UPDATE_FR_GIFT);
}

function Ajax_AddTransaction(amount, currency, payment_id, quantity)
{
	 if (typeof (g_DBUserInfo) == 'undefined') return;
	
	xmlhttp = Ajax_Init();	
	var fbid = g_DBUserInfo.fbid;
	var param = REQ_ADD_TRANSACTION + "/" + fbid + "/" +
		amount + "/" + currency + "/" + payment_id +"/" + quantity;

	param = M.e(param);
	xmlhttp.open("GET", "php/transact.php?param="+param, true);
	xmlhttp.send();
}

function Ajax_IncrementDUOCount(levelid)
{
	if (typeof (g_DBUserInfo) == 'undefined') return;

    xmlhttp = Ajax_Init();
    var param = REQ_INCR_DOU_COUNT   + "/" + levelid;

    param = M.e(param);
    xmlhttp.open("GET", "php/transact.php?param=" + param, true);
    xmlhttp.send();
}
	
function Ajax_IncrementSOLOCount(levelid)
{
	if (typeof (g_DBUserInfo) == 'undefined') return;

    xmlhttp = Ajax_Init();
    var param = REQ_INCR_SOLO_COUNT   + "/" + levelid;

    param = M.e(param);
    xmlhttp.open("GET", "php/transact.php?param=" + param, true);
    xmlhttp.send();

}