/**
    pop cakae data.js
    Pop cake Defines
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created Oct 16, 2012
*/

var ICON_TYPE_POPCAKES_PINK     = 0;
var ICON_TYPE_CUPCAKE_PINK      = 1;
var ICON_TYPE_ECLAIRS_PINK      = 2;

var ICON_TYPE_POPCAKES_GREEN    = 3;
var ICON_TYPE_CUPCAKE_GREEN     = 4;
var ICON_TYPE_ECLAIRS_GREEN     = 5;

var ICON_TYPE_POPCAKES_WHITE    = 6;
var ICON_TYPE_CUPCAKE_WHITE     = 7;
var ICON_TYPE_ECLAIRS_WHITE     = 8;

var ICON_TYPE_NEUTRAL           = 9;

var ICON_TYPE_POPCAKES_BROWN = 10;
var ICON_TYPE_CUPCAKE_BROWN = 11;
var ICON_TYPE_ECLAIRS_BROWN = 12;

var ICON_TYPE_COUNT             = 13;

// Trophy definition
var NONE_TROPHY_STARS = 0;
var BRONZE_TROPHY_STARS = 1;
var SILVER_TROPHY_STARS = 2;
var GOLD_TROPHY_STARS = 3;

// Monetization prices per coin
var SHUFFULE_PRICE = 1;
var WATCH_3_PRICE = 3;
var CANCEL_MOVE_PRICE = 5;
var FREEZE_ICON_PRICE = 7;

// unlock levelprice
var UNLOCK_LEVEL_PRICE = 10;

//customize your theme price 
var CUSTOM_THEME_PRICE = 30;

//Monetization type
var MONETIZATION_SHUFFULE= 0;
var MONETIZATION_WATCH_3 = 1;
var MONETIZATION_CANCEL_MOVE = 2;
var MONETIZATION_FREEZE_ICON = 3;
var MONETIZATION_LIFE = 4;
var MONETIZATION_EXTRA_HITS = 5;
var MONETIZATION_EXTRA_SECS = 6;
var MONETIZATION_UNLOCK = 7;
var MONETIZATION_THEME = 8;
var MONETIZATION_COINS = 9;

//...

// Lives prices
var gLIFE_PRICES = [
    { life: 1, coins: 5 },        // 1 life 40 coins
    { life: 3, coins: 10 },        // 2 life 60 coins
    { life: 5, coins: 15 },        // 5 life 100 coins
];

var EXTRA_HITS_COUNT = 10;
var EXTRA_HITS_COST = 5;            // 5 coins

var EXTRA_SECS_COUNT = 30;
var EXTRA_SECS_COST = 5;            // 5 coins

var VIDEO_CHOCOCOINS = 10;          // 10 choco coins on 1 video
var VIDEO_LIFE = 1;                 // 1 life fr 1 video

// Coin prices
// In actual currency USD
// BUTTONS are images and must be modified when prices changes

var gCoinPrices = [
    { coins: 30, price: 0.65 },          // 50 coins is $0.60
    { coins: 50, price: 0.92 },          // 100 coins is $1.0
    { coins: 100, price: 1.38 },          // 400 coins is $3.0
    { coins: 300, price: 3.69 },          // 1000 coins is $6.0
    { coins: 500, price: 4.61 }          // 2000 coins is $10.0

];

var CURRENCY_US = 0;
var CURRENCY_EUR = 1;
var g_CURRENCY = CURRENCY_US;

/************************************************************
* Theme definitions
*************************************************************/
var THEME_TYPE_DEFAULT = 0;
var THEME_TYPE_SAMPLE = 1;

var LOCALE = "en_US";