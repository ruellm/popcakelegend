//
// All Resource handling will be handled in here
// file created: March 16, 2013 in Los Angeles
// Author: Ruell Magpayo <ruellm@yahoo.com>
//
// Ported to Spirt Bubble May 23, 2014
// Ported to PopcakeLegend Oct 16, 2014
/////////////////////////////////////////////////////////////////////////////////////
// Image Resource filenames
//

// Image Resource global lists
g_imageResourceList = new Array();

// Image filename list
g_imageFileList = [

	"images/FG-Logo.png",
	"images/WG-Logo-Black.png",
	"images/WG-Logo-White.png",
    "images/splash/welcome-screen_board.png",
    "images/splash/welcome-screen-logo.png",
    "images/splash/play-solo-duo-button.png",
    "images/splash/play-solo-duo-hover-button.png",
    "images/splash/play-solo-duo-button-glow.png",
    "images/splash/pop-cake-title-.png",

    "images/addx/maybe later button hover.png",
    "images/addx/maybe later button.png",
    "images/addx/play button hover.png",
    "images/addx/play button.png",
    "images/addx/slicing 2 bg.png",

    "images/ingame/icon-box.png",    
    "images/ingame/canvas.png",
    "images/ingame/icon-border.png",
    "images/ingame/challenge-board-background.png",
    "images/ingame/menu.png",
    "images/ingame/menu-hover.png",
    "images/ingame/menu-female.png",
    "images/ingame/menu-female-hover.png",
    
    "images/ingame/progress-bar-Bronzecup.png",
    "images/ingame/progress-bar-Silvercup.png",
    "images/ingame/progress-bar-Goldcup.png",
    "images/ingame/progress-bar-arrow.png",
    "images/ingame/progress-bar-bronzecup-glow.png",
    "images/ingame/progress-bar-Silvercup-glow.png",
    "images/ingame/progress-bar-Goldcup-glow.png",
    
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

    "images/ingame/football-pink.png",
    "images/ingame/football-green.png",
    "images/ingame/football-white.png",
    "images/ingame/football-brown.png",
    "images/ingame/marmalade-pink.png",
    "images/ingame/marmalade-green.png",
    "images/ingame/marmalade-white.png",
    "images/ingame/marmalade-brown.png",

    "images/ingame/top-button.png",
    "images/ingame/scores-icon.png",
    "images/ingame/hits-icon.png",
    "images/ingame/coins-icon.png",
    "images/ingame/life-icon.png",

    "images/ingame/icon-neutral.png",
    "images/ingame/icon-brown-popcake.png",
    "images/ingame/icon-brown-cupcake.png",
    "images/ingame/icon-brown-eclair.png",

    "images/ingame/glow-button.png",
    "images/ingame/check.png",
    "images/ingame/star.png",
    "images/ingame/glow-side-button.png",
    "images/ingame/top-button-glow.png",
	"images/ingame/challenge-board-glow.png",
	"images/ingame/timer-glow.png",
    "images/ingame/Alert-3.png",
	"images/ingame/arrow/SpriteBooster.png",
	
	
    // Pop-up images
    "images/pop_ups/retry-window-screen.png",
    "images/pop_ups/close-button.png",
    "images/pop_ups/close-hover-button.png",
    "images/pop_ups/failed-level.png",
    "images/pop_ups/retry-button.png",
    "images/pop_ups/retry-hover-button.png",

    // Run out of lives pop-up
    "images/pop_ups/600x500-window-screen.png",
    "images/pop_ups/run-out-of-lives.png",
    "images/pop_ups/invite-friend-button.png",
    "images/pop_ups/invite-friend-hover-button.png",
    "images/pop_ups/purchase-life-button.png",
    "images/pop_ups/purchase-life-hover-button.png",
    "images/pop_ups/do-nothing-button.png",
    "images/pop_ups/do-nothing-hover-button.png",
    "images/pop_ups/level-failed-heading.png",

    // Purchase pop-up arts
    "images/pop_ups/strip-show.png",
    "images/pop_ups/1.png",
    "images/pop_ups/2.png",
    "images/pop_ups/3.png",
    "images/pop_ups/buy-button.png",
    "images/pop_ups/buy-hover-button.png",
    "images/pop_ups/purchase-extra-lives.png",
    "images/pop_ups/Popup-window.png",
    "images/pop_ups/blank-window.png",

    "images/pop_ups/female-small-image.png",
    "images/pop_ups/male-small-image.png",
    "images/pop_ups/duo-game-heading.png",

    // level complete/failed screen
    "images/pop_ups/level_complete/best-score-heading.png",          
    "images/pop_ups/level_complete/chocolate-stars-icon.png",         
    "images/pop_ups/level_complete/error-icon.png",                   
    "images/pop_ups/level_complete/time-icon.png",
    "images/pop_ups/level_complete/total-score-icon.png",
    "images/pop_ups/level_complete/trophy-icon.png",
    "images/pop_ups/level_complete/stats-button-glow.png",

    // DOU Arts
    "images/dou/female-mascot-whole-image_btn.png",
    
    // General Level Screen
    "images/general-level/top-button.png",
    "images/general-level/top-button-hover.png",
    "images/general-level/hearts-15fps.png",
    "images/general-level/Coins.png",
    "images/general-level/SPV.png",
    "images/general-level/gifts.png",

    "images/general-level/locker.png",
    "images/general-level/star.png",
    "images/general-level/bronze-trophy.png",
    "images/general-level/silver-trophy.png",
    "images/general-level/gold-trophy.png",
    "images/general-level/profile-pic-background.png",
    "images/general-level/sound-on-button.png",
    "images/general-level/sound-off-button.png",

    // Gifts screen
    "images/gifts/free-gift-heading.png",                  
    "images/gifts/free-gift-icon-1.png",                   
    "images/gifts/free-gift-icon-2.png",                   
    "images/gifts/free-gift-icon-3.png",                   
    "images/gifts/free-gift-icon-4.png",                   
    "images/gifts/free-gift-icon-5.png",                   
    "images/gifts/free-gifts-screen-background.png",
    "images/gifts/gift-icons-rectangle-box.png",
    "images/gifts/Playing-screen-gift-button-hover.png",   
    "images/gifts/Playing-screen-gift-button.png",
    "images/gifts/window-art.png",

    // bakery store screen
    "images/bakery_store/button.png",
    "images/bakery_store/button-hover.png",
    "images/bakery_store/euro-symbol.png",
    "images/bakery_store/dollar-symbol.png",

    //"images/unlock/cancel-button.png",          
    //"images/unlock/cancel-hover-button.png",
    //"images/unlock/unlock-button.png",          
    "images/unlock/unlock-heading.png",
    //"images/unlock/unlock-hover-button.png",    
    "images/unlock/unlock-screen.png",

    //image customization
    "images/customization/customization-heading.png",
    "images/customization/left-arrow.png",
    "images/customization/left-arrow-hover.png",
    "images/customization/right-arrow.png",
    "images/customization/right-arrow-hover.png",

    "images/themes/default/theme-1.png",
    "images/themes/default/theme-1-large.png",
    "images/themes/sample/theme-2.png",
    "images/themes/sample/theme-2-large.png",

   "images/customization/yes-button.png",
    "images/customization/yes-button-hover.png",
    "images/customization/no-button.png",
    "images/customization/no-button-hover.png",

    // Friends invite and gifts
    "images/invite_gifts/conditions-background.png",       
    "images/invite_gifts/gifts-&-invitatons-background.png",
    "images/invite_gifts/gifts-invitatons-heading.png",        
    "images/invite_gifts/send-button-hover.png",
    "images/invite_gifts/send-button.png",

    "images/customization/loading-image.png",
    
    "images/ingame/monetization-machine.png",
    "images/ingame/monetization-machine-front-glass.png",
    "images/ingame/monetization-visible.png",
    "images/ingame/monetization-freeze.png",
    "images/ingame/monetization-reshuffle.png",

    "images/ingame/timer-bg.png",
    "images/ingame/timer-filling.png",
    "images/ingame/timer-front-white-line.png",

    //Level Pop-ups data
    // this will cause slowness during loading time
    // must cache and optimized
    "images/pop_ups/level_objective/seconds-icon.png",
    "images/pop_ups/level_objective/minutes-icon.png",
    "images/pop_ups/level_objective/hits-icon.png",

   /* "images/pop_ups/level_objective/Title-Level-1.png",
    "images/pop_ups/level_objective/Title-Level-2.png",
    "images/pop_ups/level_objective/Title-Level-3.png",
    "images/pop_ups/level_objective/Title-Level-4.png",
    "images/pop_ups/level_objective/Title-Level-5.png",
    "images/pop_ups/level_objective/Title-Level-6.png",
    "images/pop_ups/level_objective/Title-Level-7.png",
    "images/pop_ups/level_objective/Title-Level-8.png",
    "images/pop_ups/level_objective/Title-Level-9.png",
    "images/pop_ups/level_objective/Title-Level-10.png",
    */

    "images/pop_ups/level_objective/title-9-in-a-row-memory.png",
    "images/pop_ups/level_objective/title-dual-shapes-memory.png",
    "images/pop_ups/level_objective/title-Instant-memory.png",
    "images/pop_ups/level_objective/title-inverted-memory.png",
    "images/pop_ups/level_objective/title-Procedural-memory.png",
    "images/pop_ups/level_objective/title-Sequential-memory.png",
    "images/pop_ups/level_objective/title-Short-term-memory-.png",
    "images/pop_ups/level_objective/title-soccer-memory.png",
    "images/pop_ups/level_objective/title-Spatial-memory.png",
    "images/pop_ups/level_objective/title-Stress-memory.png",
    "images/pop_ups/level_objective/title-Tutorial.png",
    "images/pop_ups/level_objective/title-wonderful-memory.png",
    "images/pop_ups/level_objective/title-Working-memory.png",
    "images/pop_ups/level_objective/taste-of-memory.png",
     
    "images/pop_ups/level_objective/Todays-special-Level-1.png",
    "images/pop_ups/level_objective/Todays-special-Level-3.png",
    "images/pop_ups/level_objective/Todays-special-Level-4.png",
    "images/pop_ups/level_objective/Todays-special-Level-5.png",
    "images/pop_ups/level_objective/Todays-special-Level-6.png",
    "images/pop_ups/level_objective/Todays-special-Level-7.png",
    "images/pop_ups/level_objective/Todays-special-Level-8.png",
    "images/pop_ups/level_objective/Todays-special-Level-9.png",
    "images/pop_ups/level_objective/Todays-special-Level-10.png",

    "images/pop_ups/level_objective/Level-11-todays-image.png",
    "images/pop_ups/level_objective/Level-12-todays-image.png",
    "images/pop_ups/level_objective/Level-13-todays-image.png",
    "images/pop_ups/level_objective/Level-14-todays-image.png",
    "images/pop_ups/level_objective/Level-15-todays-image.png",
    "images/pop_ups/level_objective/Level-16-todays-image.png",
    "images/pop_ups/level_objective/Level-17-todays-image.png",
    "images/pop_ups/level_objective/Level-18-todays-image.png",
    "images/pop_ups/level_objective/Level-19-todays-image.png",

    "images/pop_ups/level_objective/play-button.png",
    "images/pop_ups/level_objective/play-button-hover.png",
    "images/pop_ups/level_objective/play-button-glow.png",
    "images/pop_ups/board-only391x292.png",
  
	"images/pop_ups/chalkboard589x589.png",
	"images/mailing_list/Subscribe Text.png", 
    "images/mailing_list/Newsletter Icon.png",
    "images/mailing_list/Join Text.png",
	"images/mailing_list/join button.png",
	"images/mailing_list/join button hover.png",
	"images/mailing_list/maybe later button.png",
	"images/mailing_list/maybe later button hover.png",
	"images/mailing_list/no thanks button.png",
	"images/mailing_list/no thanks button hover.png",
	   
    "images/pop_ups/Board-background501x624.png",
    "images/tutorial/how-to-play-title.png",
    "images/tutorial/mascot.png",

    "images/tutorial/solo/solo-play-now-button.png",
    "images/tutorial/solo/solo-play-now-button-hover.png",
    "images/tutorial/solo/solo-zone-1.png",
    "images/tutorial/solo/solo-zone-2.png",
    "images/tutorial/solo/solo-zone-3.png",
    "images/tutorial/solo/solo-zone-4.png",
    "images/tutorial/solo/solo-zone-5.png",

    "images/tutorial/duo/duo-play-now-button.png",
    "images/tutorial/duo/duo-play-now-button-hover.png",

    "images/tutorial/duo/duo-zone-1.png",
    "images/tutorial/duo/duo-zone-2.png",
    "images/tutorial/duo/duo-zone-3.png",
    "images/tutorial/duo/duo-zone-4.png",
    "images/tutorial/duo/duo-zone-5.png",

];

var low_prio_resource = [
    "images/pop_ups/statistics-window.png",
    "images/pop_ups/level_complete/next-button.png",
    "images/pop_ups/level_complete/next-button-hover.png",
    "images/pop_ups/level_complete/retry-button.png",
    "images/pop_ups/level_complete/retry-button-hover.png",
    "images/pop_ups/level_complete/share-button.png",
    "images/pop_ups/level_complete/share-button-hover.png",
    "images/pop_ups/level_complete/stats-button.png",
    "images/pop_ups/level_complete/stats-button-hover.png",
    "images/pop_ups/level_complete/next-retry-share-button-glow.png",
    "images/pop_ups/Board-Background.png",
    "images/pop_ups/new=best-score-title.png",
    "images/pop_ups/happy_neutron/happy_neuron.png",
    "images/pop_ups/happy_neutron/tick.png",
    "images/pop_ups/happy_neutron/tick_hover.png",
    "images/pop_ups/happy_neutron/cross.png",
    "images/pop_ups/happy_neutron/cross_hover.png",

	"images/pop_ups/BOARD.png",
    "images/pop_ups/daily_bunos/FLASH BUTTON.png",
    //"images/pop_ups/daily_bunos/GREEN BUTTON HOVER.png",
    //"images/pop_ups/daily_bunos/Green-Button.png",
    "images/pop_ups/daily_bunos/HEADING.png",
    "images/pop_ups/daily_bunos/NO MORE CHOCOCOINS HEADING.png",
    "images/pop_ups/daily_bunos/NO MORE LIFE HEADING.png",
    //"images/pop_ups/daily_bunos/RED BUTTON HOVER.png",
    //"images/pop_ups/daily_bunos/RED BUTTON.png",
    "images/pop_ups/daily_bunos/tick mark.png",
    "images/pop_ups/daily_bunos/tick mark hover.png",
    "images/pop_ups/daily_bunos/board_life.png",
    "images/pop_ups/daily_bunos/board.png",
    "images/pop_ups/level-completed-heading.png",
    "images/congrats/congratulations-heading.png",
    "images/congrats/elephant-txt.png",
    "images/congrats/elephant.png",
    "images/congrats/squrrel-txt.png",
    "images/congrats/squrrel.png",
    "images/congrats/professor.png",
    "images/congrats/professor-txt.png",
	
	"images/ingame/small-logo-3fps.png",

    "images/ingame/circle-box-glow.png",
    "images/ingame/square-box-glow.png",
    "images/ingame/triangle-box-glow.png",
    "images/ingame/circle-box.png",
    "images/ingame/square-box.png",
    "images/ingame/triangle-box.png",
];

//////////////////////////////////////////////////////////////
// Theme definitions
var default_theme = [
    "images/themes/default/background-green-garden.png",
    "images/themes/default/background-blue.png",
    "images/themes/default/sunrays.png",

    "images/themes/default/background.png",
    "images/themes/default/bakery-store-background-DEFAULT.png",

    "images/themes/default/back-button.png",
    "images/themes/default/back-hover-button.png",

     "images/themes/default/lock-level.png",
     "images/themes/default/unlock-solo-level.png",
     "images/themes/default/unlock-duo-level.png",
	 "images/themes/default/solo-box-BIG.png",
	 "images/themes/default/lock-level-BIG.png",
     "images/themes/default/general-level-background.png",
     "images/themes/default/Level-Completed-baker.png",
     "images/themes/default/Level-Failed-wheeping-baker-Sprite.png",
     "images/themes/default/house-2fps.png",
     "images/themes/default/flower1-2fps.png",
     "images/themes/default/flower2-2fps.png",
     "images/themes/default/level-short-rope.png",

     "images/themes/default/solo.png",
    "images/themes/default/duo.png",

     "images/themes/default/arrow_right.png",
    "images/themes/default/arrow_left.png",

    "images/themes/default/progressbar-male-baker.png",
    "images/themes/default/progressbar-female-baker.png",
    "images/themes/default/progressbar-male-baker-glow.png",
    "images/themes/default/progressbar-female-baker-glow.png",

    "images/themes/default/instruction-image.png",
    //"images/themes/default/welcome-screen_baker.png",
    "images/themes/default/welcome-screen_baker-front-fingers.png",
    "images/themes/default/Welcome-screen-baker.png",
    "images/themes/default/cloud-1.png",
    "images/themes/default/cloud-2.png",
    "images/themes/default/cloud-3.png",
   
    "images/themes/default/Default-General-level-baker-3fps.png",

    "images/themes/default/DEFAULT_STAT_SCREEN.png",
    "images/themes/default/30-chococoins-button.png",
    "images/themes/default/30-chococoins-button-hover.png",
    "images/themes/default/Male-baker-behind-Artboard.png",
    "images/themes/default/default-level-completed-baker-2fps.png",
    "images/themes/default/default-level-failed-baker.png",
    "images/themes/default/baker-on-top-3FPS.png",
	"images/themes/default/Flying_baker_Monetize_5fps.png"
  ];

var sample_theme = [
    "images/themes/sample/customised-welcome-screen-bg.png",
    "images/themes/sample/Customised-Playing-screen-bg.png",
    "images/themes/sample/bakery-store-background-SPV.png",
    "images/themes/sample/back-button.png",
    "images/themes/sample/back-button-hover.png",
    "images/themes/sample/customised-general-levels-screen-bg.png",
    "images/themes/sample/custm-unlock-solo-level-yellow.png",
    "images/themes/sample/custm-unlock-duo-level-yellow.png",
    "images/themes/sample/custm-unlock-solo-level-green.png",
    "images/themes/sample/custm-unlock-duo-level-green.png",

    "images/themes/sample/Level-Completed-male-baker.png",
    "images/themes/sample/Level-Failed-male-baker.png",
    "images/themes/sample/male-baker-for-bakery-store.png",
    "images/themes/sample/lady-baker-for-bakery-store.png",
    "images/themes/sample/solo.png",
    "images/themes/sample/duo.png",
   "images/themes/sample/elephant-Charactor_genlevel.png",
   "images/themes/sample/squirrel-Charactor_genlevel.png",
    //"images/themes/sample/Menu.png",
    //"images/themes/sample/elephant_Menu.png",
    //"images/themes/sample/SPV-elephant-button-hover.png",
    //"images/themes/sample/SPV-squrrel-button-hover.png",
    "images/themes/sample/arrow-left.png",
    "images/themes/sample/arrow-right.png",
    "images/themes/sample/arrow-squirrel.png",
    "images/themes/sample/progress-bar-elephant.png",
    "images/themes/sample/progress-bar-squirrel.png",
    "images/themes/sample/progress-bar-elephant-glow.png",
    "images/themes/sample/progress-bar-squirrel-glow.png",

    "images/themes/sample/instruction-image.png",
    //"images/themes/sample/male-baker-for-welcomeScreen.png",
    //"images/themes/sample/lady-baker-for-welcomeScreen.png",
   
    "images/themes/sample/Lollipop.png",
    "images/themes/sample/Orange-Lollipop.png",
    "images/themes/sample/Yellow-Lollipop.png",
    "images/themes/sample/ice-cream.png",

    "images/themes/sample/stats/best-score-button.png",
    "images/themes/sample/stats/best-score-button-ACTIVE.png",

    "images/themes/sample/stats/star&trophies-button.png",
    "images/themes/sample/stats/star&trophies-button-ACTIVE.png",

    "images/themes/sample/stats/errors-button.png",
    "images/themes/sample/stats/errors-button-ACTIVE.png",
    "images/themes/sample/stats/best-scores-title.png",
    "images/themes/sample/stats/stars-and-trophies-title.png",
    "images/themes/sample/stats/Errors-title.png",
    "images/themes/sample/SPV-Level-completed-squrrel.png",
    "images/themes/sample/level-failed-squrrel.png",
    "images/themes/sample/Elephant-on-top-5FPS.png",
    "images/themes/sample/small-Squrrel-face-For-DUO.png",
    "images/themes/sample/small-Elephant-face-For-DUO.png",
	"images/themes/sample/elephant_arrow_SPV_4fps.png",
	
	"images/themes/sample/SPV-playing-screen-Menu-button-hover.png",
	"images/themes/sample/SPV-playing-screen-Menu-button.png",

];

var g_themes_list = [
      default_theme,
      sample_theme
];

var g_theme_flag = [
    false,
    false
];

function LoadTheme(id) {
	
	id = THEME_TYPE_SAMPLE;
	
    if (g_theme_flag[id]) return true;;

    var current_theme = g_themes_list[id];
    g_theme_flag[id] = true;
    g_resourceLoadCount = g_imageResourceList.length;
    g_resourceLoadCount += current_theme.length;

    g_currentResource = new Array();
    for (var l = 0; l < current_theme.length; l++) {
        g_currentResource.push(current_theme[l]);
    }

    global_resource_index = 0;
    new ImageResource().Load(g_currentResource[0]);
    return false;
}
//////////////////////////////////////////////////////////////

// count image loaded error
var g_errorImageList = new Array();
var RETRY_MAX = 3;
var g_retryCount = 0;

// deferred loading of resources
var global_resource_index = 0;
var g_currentResource = g_imageFileList;
var g_resourceToLoad = null;
var g_resourceLoadCount = 0;
var g_audioLoadCount = 0;

function ImageResource() {
    this.image = null;
    this.path = null;
    this.load = false;

    this.Load = function (szPath) {
        this.image = new Image();
        this.image.src = szPath;
        this.path = szPath;
        var context = this;
        this.image.onload = (function () {
            context.load = true;			
            g_imageResourceList.push(context);
			
			DEBUG_LOG(context.path + " Loading Done..." 
				+  g_imageResourceList.length);
			
			if(g_currentResource != null){
				if( ++global_resource_index < g_currentResource.length){
					new ImageResource().Load(g_currentResource[global_resource_index]);
				}else{
					g_currentResource = null;
				}
			}
        });
		
        this.image.onerror = (function () {
            g_errorImageList.push(context);
        });
    }

    this.Reload = function () {
        this.image = null;
        this.Load(this.path);
    }
}

//
// helper functions
//
function GetImageResource(szPath) {
    var image = null;
    for (var idx = 0; idx < g_imageResourceList.length; idx++) {
        if (g_imageResourceList[idx].path == szPath) {
            image = g_imageResourceList[idx].image;
            break;
        }
    }
    return image;
}

//////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////
// Audio Resource
//
//  Audio resources are divided into two categories
// WAV and MP3
// See audio support http://www.w3schools.com/html/html5_audio.asp
// Test Audio support http://textopia.org/androidsoundformats.html
// HTML5 audio issue 
// http://flowz.com/2011/03/apple-disabled-audiovideo-playback-in-html5/
// http://developer.apple.com/library/safari/#documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html
//
// online mp3 converter (for OGG support)
// http://media.io/
// mp3 cutter
// http://mp3cut.net/
// Ported from Titays game to Spirit Bubble
// May 25, 2014 

// Image Resource global lists
g_audioResourceList = new Array();

g_audioFileList = [
     {
           fname: "Music-Loop-A",
           sfx: false
     },
     {
         fname: "Music-Loop-B",
         sfx: false
     },

    {
        // button click
        fname: "Music-Loop-C",
        sfx: false
    },

     {
         // button click
         fname: "15Sec-Timer",
         sfx: true
     },

    {
        // button click
        fname: "Build-Board",
        sfx: true
    },

    {
        // button click
        fname: "Click",
        sfx: true
    },

    {
        // button click
        fname: "Click-Confirm",
        sfx: true
    },

    {
        // button click
        fname: "Congratulations",
        sfx: true
    },

    {
        // button click
        fname: "Flip-Begin",
        sfx: true
    },

    {
        // button click
        fname: "Flip-No-Success",
        sfx: true
    },

    {
        // button click
        fname: "Level-Completed",
        sfx: true

    },

    {
        // button click
        fname: "Machine-Freeze",
        sfx: true
    },

    {
        // button click
        fname: "Machine-Look",
        sfx: true
    },

    {
        // button click
        fname: "Machine-Remix",
        sfx: true
    },

    {
        // button click
        fname: "Scoreboard-Plus",
        sfx: true
    },

    {
        // button click
        fname: "Slide",
        sfx: true
    },

    {
        // button click
        fname: "Star-1",
        sfx: true
    },

    {
        // button click
        fname: "Star-2",
        sfx: true
    },


    {
        // button click
        fname: "Star-3",
        sfx: true
    },
    {
        // button click
        fname: "TF-Croissant",
        sfx: true
    },

    {
        // button click
        fname: "TF-Cupcake",
        sfx: true
    },

    {
        // button click
        fname: "TF-Eclair",
        sfx: true
    },
    {
        // button click
        fname: "TF-Popsicle",
        sfx: true
    }
];


// for separate implementation

///////////////////////////////////////////////////////////////////////////////

function AudioResource() {
    this.audio = null;
    this.path = null;
    this.loaded = false;
    this.volume = 1.0;
    this.sfx = true;

    this.Load = function (aud) {
        var context = this;
        var audpath = GetAudPath(aud.fname);
        this.audio = buildAudio(audpath);
        if (this.audio == null) return;

        this.audio.addEventListener("canplay", function () {
            context.loaded = true;
           
        });

        this.audio.addEventListener("error", function (e) {
			console.log("error on "+context.path);
            switch (e.target.error.code) {
                case e.target.error.MEDIA_ERR_ABORTED:
                    console.log('You aborted the video playback.');
                    break;
                case e.target.error.MEDIA_ERR_NETWORK:
                    console.log('A network error caused the audio download to fail.');
                    break;
                case e.target.error.MEDIA_ERR_DECODE:
                    console.log('The audio playback was aborted due to a corruption problem or because the video used features your browser did not support.');
                    break;
                case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                    console.log('The video audio not be loaded, either because the server or network failed or because the format is not supported.');
                    break;
                default:
                    console.log('An unknown error occurred.');
                    break;
            }
        });

        g_audioResourceList.push(context);
        this.path = aud.fname;
        this.audio.loop = false;
        this.sfx = aud.sfx;
    }
}

function buildAudio(path) {
    // Disable audio for Apple devices
    if (isMobileSafari()) {
        return null;
    }

    var audio = document.createElement("audio");
    if (audio != null && audio.canPlayType) {
        audio.src = path;
        audio.preload = "auto";
        audio.load();
    }

    return audio;
}

function LoadAndPlay(audpath)
{
    var aud = GetAudioResource(audpath);
    if (aud) {
    //    aud.volume = 1;
        aud.currentTime = 0;
        aud.loop = false;
        aud.play();
    }
}

function StopAudio(audpath) {
    var aud = GetAudioResource(audpath);
    if (aud) {
     //   aud.volume = 0;
        aud.pause();
    }
}

function GetAudioResource(szPath, vol) {
    var audio = null;
    if (!szPath || 0 === szPath.length) return null;
    for (var idx = 0; idx < g_audioResourceList.length; idx++) {
        if (g_audioResourceList[idx].path == szPath) {
            if (g_audioResourceList[idx].loaded) {
                audio = g_audioResourceList[idx].audio;

                if (vol) {
                    g_audioResourceList[idx].volume = vol;
                }

                
                if ((g_audioResourceList[idx].sfx && VOLUME_SFX_FLAG) ||
                    (!g_audioResourceList[idx].sfx && VOLUME_BGMUSIC_FLAG)) {
                    audio.volume = g_audioResourceList[idx].volume;
                } else {
                    audio.volume = 0;
                }
            }
            break;
        }
    }

    return audio;
}

// 
// NOTE: temporarily disabled soundbank feature
//

var SOUND_BANK_COUNT = 2;
var VOLUME_BGMUSIC_FLAG = true;
var VOLUME_SFX_FLAG = true;

function LoadAudio() {
    for (var idx = 0; idx < g_audioFileList.length; idx++) {
        new AudioResource().Load(g_audioFileList[idx]);
    }
}

function GetAudPath(audId) {
    var browser = BrowserVersion();
    var path = "mp3";
    if (browser[0] == "firefox" || browser[0] == "opera") {
        path = "ogg";
    }

    return ("sounds/" + path + "/" + audId + "." + path);
}

function ToggleSounds(value)
{
	if(VOLUME_SFX_FLAG != value || 
				VOLUME_BGMUSIC_FLAG != value)
	{
		UpdateAudio(value, true);
		UpdateAudio(value, false);
	}
}

function UpdateAudio(flag, sfx) {
    //silent all the audio resource
    for (var idx = 0; idx < g_audioResourceList.length; idx++) {
        if ((sfx == g_audioResourceList[idx].sfx)) {

            if (!flag) {
                g_audioResourceList[idx].audio.volume = 0;
            } else {
                g_audioResourceList[idx].audio.volume = g_audioResourceList[idx].volume;
            }
        }
    }
    
    if (sfx) {
        VOLUME_SFX_FLAG = flag;
    } else {
        VOLUME_BGMUSIC_FLAG = flag;
    }
}
