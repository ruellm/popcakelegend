<!-- 
    index.php
    Main web page (dynamic)
    Date Started: November 05, 2014
    Author: Ruell Magpayo<ruellm@yahoo.com>
 -->
<?php 
	/* PHP at top is needed for debugging 
	and PHP log to show, when PHP command 
	is in the middle*/ 
?>
 <script>
	// Game Pre-load script
	// this structure declaration will be used
	// for loading data from database to javascript
	function DB_UserInfo()
	{
		this.fbid = "";
		this.coins = 0;
		this.epoch = 0;
		this.last_login = 0;
		this.total_score = 0;
		this.life = 0;
		this.name = 0;
		this.isNewToday = 0;
		this.max_level =0; 
		this.D = 0;
		this.D_claim_flag = 0;
		this.gift_count = 0;
		this.gift_give_date = 0;
		this.fr_gift_date = 0;
		this.theme = 0;
		this.spv_flag = 0;
	}
	
	function DB_LevelInfo()
	{
		this.level_id = 0;
		//this.saved = 0;
		this.stars = 0;		
		this.fbid = 0;
		this.name = 0;
		this.time_complete = 0;
		this.score = 0;
		this.errors = 0;
		this.extra = 0;
	}
	
	function DB_LevelSettings()
	{
		this.level_id = 0;
		this.hits = 60;
		this.points_per_hits = 0;
		this.points_per_time = 0;
		this.seconds = 0;
		this.clock_limit = 0;
		this.points_per_challenge = 0;
		this.minimum_trophy = 0;
		this.hidden = 0;
	}
	
	function DB_PriceSettings()
	{
		this.type = 0;
		this.price = 0;
		this.count = 0;
		this.currency = 0;
	}
	
	function DB_GeneralSettings()
	{
		this.name="";
		this.value = 0;
	}
	
	var g_DBUserInfo = new DB_UserInfo;
	var g_LevelInfoList = new Array();
	var g_myLevelInfoList = new Array();
	var g_LevelSettingsList = new Array();
	var g_PriceSettingsList = new Array();
	var g_GeneralSettingsList = new Array();
	
	// for average/statistics screen definitions
	var g_FriendsLevelMasterList = new Array();
	var g_Locale = "en_US";
	
 </script>
 
 <?php 
	require 'php-fb-sdk/facebook.php';
	include_once 'php/definitions.php';
	include 'php/pdomysql_ex.php';	
	
	function reAuth($facebook)
	{
		// Authorize application in Facebook
		$params = array(
				'scope' => 'user_friends, email',
				'redirect_uri' => 'https://apps.facebook.com/popcakelegend'
		);
		
		////////////////////////////////////////////////////////////////////////////////////////////////////////
		// production code -- drulztestapp -- DO NOT enable in live!!
		/*$params = array(
				'scope' => 'user_friends, email',
				'redirect_uri' => 'https://apps.facebook.com/drulztestapp'
		);*/
		////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		// retrieve AUTH URL and redirect to the page
		$login_url = $facebook->getLoginUrl($params);
		echo ("<script> top.location.href='".$login_url."'</script>");
	}
	
	//////////////////////////////////////////////////
	// FOR DEBUGGING flag
	$DEBUG_FB_MODE = 1;		
	//////////////////////////////////////////////////
	
	$fbuid = 0;
	$name = "";
	if($DEBUG_FB_MODE==0){
		$fbuid = 1;		// Temporary ID for testing without facebook
		$name = "No FB Test";
	}else{
			
		// Get these from http://developers.facebook.com 
		$facebook = new Facebook(array(
			'appId'  => $APP_KEY,
			'secret' => $SECRET_KEY,
			'cookie' => true
		));

		$access_token = $facebook->getAccessToken();	
				
		// Get Facebook User ID
		$fbuid = $facebook->getUser();			
		
		if (!$fbuid) {
			reAuth($facebook);		
			return;			
		} else {
			$facebook->setAccessToken($access_token);	
			$user_profile = $facebook->api('/v2.3/me');
			$name = $user_profile['name'];
			$locale = $user_profile['locale'];
		}
	}
				
	set_time_limit(0);
	do{
		$fbuid = $facebook->getUser();			
	}while($fbuid == 0);

	echo "<script>";		
		
	//0. set facebook flag
	
	echo "g_isFacebook=" . $DEBUG_FB_MODE . ";";
	echo "g_Locale='" . $locale . "';";
	
	//1. DO Login in here instead
	$userInfo = PDODB_LoginUser($fbuid,$name);
	echo "g_DBUserInfo.fbid ='".$fbuid."';";
	echo "g_DBUserInfo.coins =".$userInfo->coins.";";
	echo "g_DBUserInfo.epoch =".$userInfo->epoch.";";
	echo "g_DBUserInfo.life =".$userInfo->life.";";
	echo "g_DBUserInfo.isNewToday =".$userInfo->isNewToday.";";
	echo "g_DBUserInfo.max_level =".$userInfo->max_level.";";
	echo "g_DBUserInfo.D =".$userInfo->D.";";
	echo "g_DBUserInfo.D_claim_flag =".$userInfo->D_claim_flag.";";
	echo "g_DBUserInfo.gift_count =".$userInfo->gift_count.";";
	echo "g_DBUserInfo.gift_give_date ='".(($userInfo->gift_give_date==null)?"":$userInfo->gift_give_date)."';";
	echo "g_DBUserInfo.fr_gift_date ='".(($userInfo->fr_gift_date==null)?"":$userInfo->fr_gift_date)."';";
	echo "g_DBUserInfo.theme =".$userInfo->theme.";";
	echo "g_DBUserInfo.spv_flag =".$userInfo->spv_flag.";";
		
	
	// 2. Read player best record and store it in player's list
	$db = PDOMySQL_Init();
	$query = "SELECT * from level where fbid=" . $fbuid;
	$result = $db->query($query); 
	if($result){		
		$rowarray = $result->fetchall(PDO::FETCH_ASSOC);
		foreach($rowarray as $row)
		{
			echo "var level = new DB_LevelInfo();";
			echo "level.level_id =" . $row['level_id'] . ";";
			//echo "level.saved =" . $row['saved'] . ";";
			echo "level.stars =" . $row['stars'] . ";";
			echo "level.name ='" . $name . "';";
			echo "level.fbid ='" . $fbuid. "';";
			echo "level.time_complete =" . $row['time_complete'] . ";";
			echo "level.score =" . $row['score'] . ";";
			echo "level.errors =" . $row['errors'] . ";";
			echo "level.extra =" . $row['extra']  . ";";
			
			echo "g_myLevelInfoList.push(level);";	
		}
	}
		
	/***********************************************************************/
	/************* CHANGE THIS WHEN NEW LEVELS ARE ADDED *******************/
	/***************/ 		$LEVEL_COUNT = 10; 				/***************/
	/***********************************************************************/
	
	// 3. Read top 4 leader boards of each level only
	for($idx=0; $idx < $LEVEL_COUNT; $idx++){
		$query = "SELECT * from level where level_id=".$idx." 
		ORDER BY (score+extra) DESC limit 0,3";
		
		$result = $db->query($query); 
		if($result){		
			$rowarray = $result->fetchall(PDO::FETCH_ASSOC);
			foreach($rowarray as $row)
			{
			
				$user_fbid = $row ['fbid'];
				$userInfo = PDODB_CheckUser($user_fbid, $db);
				if($userInfo == null) continue;
				
				echo "var level = new DB_LevelInfo();";
				echo "level.level_id =" . $row['level_id'] . ";";
				//echo "level.saved =" . $row['saved'] . ";";
				echo "level.stars =" . $row['stars'] . ";";
				echo "level.name ='" . $userInfo->name . "';";
				echo "level.fbid ='" . $user_fbid. "';";
				echo "level.time_complete =" . $row['time_complete'] . ";";
				echo "level.score =" . $row['score'] . ";";
				echo "level.errors =" . $row['errors'] . ";";
				echo "level.extra =" . $row['extra']  . ";";
				
				echo "g_LevelInfoList.push(level);";	
			}
		}
	}
	
	//4. get LEVEL settings info
	$query = "SELECT * from level_settings";
	$result = $db->query($query); 
	if($result) {		
		$rowarray = $result->fetchall(PDO::FETCH_ASSOC);
		foreach($rowarray as $row)
		{
			echo "var level_s = new DB_LevelSettings();";
			echo "level_s.level_id =" . $row['level_id'] . ";";
			echo "level_s.hits =" . $row['hits'] . ";";
			echo "level_s.points_per_hits =" . $row['points_per_hits'] . ";";
			echo "level_s.points_per_time =" . $row['points_per_time'] . ";";
			echo "level_s.seconds =" . $row['seconds'] . ";";
			echo "level_s.clock_limit =" . $row['clock_limit'] . ";";
			echo "level_s.points_per_challenge =" . $row['points_per_challenge']  . ";";
			echo "level_s.minimum_trophy =" . $row['minimum_trophy']  . ";";
			echo "level_s.hidden =" . $row['hidden']  . ";";
			echo "g_LevelSettingsList.push(level_s);";	
		}
	}
	
	
	//5. Get price settings list
	$query = "SELECT * from price_settings";
	$result = $db->query($query); 
	$rowarray = $result->fetchall(PDO::FETCH_ASSOC);
	$count = count($rowarray);
	if( $count > 0 ){
		for($i = 0; $i < $count; $i++) {
			$row = $rowarray[$i];
			
			echo "var price = new DB_PriceSettings();";
			echo "price.type =" . $row['type'] . ";";
			echo "price.price =" . $row['price'] . ";";
			echo "price.count =" . $row['count'] . ";";
			echo "price.currency =" . $row['currency'] . ";";
			echo "g_PriceSettingsList.push(price);";	
		}
	}
		
	//6. load general settings data
		
	$query = "SELECT * from general_settings";
	$result = $db->query($query); 
	$rowarray = $result->fetchall(PDO::FETCH_ASSOC);
	$count = count($rowarray);
	if( $count > 0 ){
		for($i = 0; $i < $count; $i++) {
			$row = $rowarray[$i];
			echo "var setting = new DB_GeneralSettings();";
			echo "setting.name ='" . $row['name'] . "';";
			echo "setting.value =" . $row['value'] . ";";
			echo "g_GeneralSettingsList.push(setting);";
		}
	}
			
	
	/* 
	 * Retrieve all our friends in database for all levels 
	 * this is just for averaging in statistics screen
	*/	
	// Step 1. Get friends from Facebook
	$facebook->setAccessToken($access_token);	
	$friendsList = $facebook->api('/v2.3/me/friends');
	
	foreach ($friendsList["data"] as $value) {
		
		//Step 2. Store everything in friends-level master list 
		// step 3. it will be pickedup and sorted in Javascript code		
		$query = "SELECT * from level where fbid=".$value['id'];		
		$result = $db->query($query); 		
		if($result){		
			$rowarray = $result->fetchall(PDO::FETCH_ASSOC);
			foreach($rowarray as $row) {
				echo "var level = new DB_LevelInfo();";
				echo "level.level_id =" . $row['level_id'] . ";";
				echo "level.stars =" . $row['stars'] . ";";
				echo "level.name ='" . $name . "';";
				echo "level.fbid ='" . $fbuid. "';";
				echo "level.time_complete =" . $row['time_complete'] . ";";
				echo "level.score =" . $row['score'] . ";";
				echo "level.errors =" . $row['errors'] . ";";
				echo "level.extra =" . $row['extra']  . ";";
				
				echo "g_FriendsLevelMasterList.push(level);";				
			}
		}
	}
	
	echo "</script>";
	
	?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" manifest="game.manifest">
<head>
    <title>Popcake Legend</title>

	<!-- Load fonts -->
   	<link href="fonts/curlz/curlz___0.css" rel="stylesheet" />
	<link href="fonts/DJBCHALKITUP/styles.css" rel="stylesheet" />
	<link href="fonts/Androgyne_TB/fonts.css" rel="stylesheet" />

	<!-- flag to determine we are in debug mode -->
	<script> var g_DEBUG_MODE = true; </script> 
	
	<!-- We are using JQUERY for firefox coordinates -->
	<script type="text/javascript" src="js/jquery-1.8.2.min.js"></script>
	 
	<!-- Friend selection dialog --> 
	<!-- http://isaaccambron.com/fbfriends/ -->
	<script type="text/javascript" src="friend_selection/fbfriends.js"></script>
	<link rel='stylesheet' type='text/css' href='friend_selection/fbFriends.css'/>
	<script type='text/javascript' src='friend_selection/bootstrap.min.js'></script>
	<link rel='stylesheet' type='text/css' href='friend_selection/bootstrap.min.css'/>

    <!-- Global definitions -->
    <script src="js/common.js"></script>
    <script src="js/resource.js"></script>

    <!-- Core references -->
    <script src="js/core/baseObject.js"></script>
    <script src="js/core/engine.js"></script>
    <script src="js/core/graphics.js"></script>
    <script src="js/core/state.js"></script>

      <!-- Utility references -->
    <script src="js/utility/timer.js"></script>
    <script src="js/utility/animator.js"></script>
    <script src="js/utility/point.js"></script>
    <script src="js/utility/longAudio.js"></script>
    <script src="js/utility/vector2D.js"></script>
    <script src="js/utility/rectangle.js"></script>
    <script src="js/utility/collisionHandler.js"></script>
    
    <!-- scene classes reference -->
    <script src="js/scene/imageObject.js"></script>
    <script src="js/scene/animatedObject.js"></script>
    <script src="js/scene/animatedText.js"></script>
    <script src="js/scene/repeatingImage.js"></script>

    <!-- UI class reference -->
    <script src="js/ui/uibase.js"></script>
    <script src="js/ui/uimanager.js"></script>
    <script src="js/ui/button.js"></script>
    <script src="js/ui/listBoxBase.js"></script>
    <script src="js/ui/customListBox.js"></script>
    <script src="js/ui/textBoxBase.js"></script>
    <script src="js/ui/customTextBox.js"></script>
    <script src="js/ui/popupwindow.js"></script>
    <script src="js/ui/roundButtonText.js"></script>
    <script src="js/ui/slideWindow.js"></script>
	<script src="js/ui/radioButton.js"></script>   
    <script src="js/ui/animatedButton.js"></script>
	 
    <!-- Game classes -->    
    <script src="js/game/iconBox.js"></script>
    <script src="js/game/customImageButton.js"></script>
    <script src="js/game/level.js"></script>
    <script src="js/game/glowImage.js"></script>
    <script src="js/game/star.js"></script>
    <script src="js/game/objectiveWindow.js"></script>
	<script src="js/game/purchaseWindow.js"></script>
    <script src="js/game/popupLivesWindow.js"></script>
	<script src="js/game/congratsWindow.js"></script>
	<script src="js/game/statisticsWindow.js"></script>
    <script src="js/game/levelCompleteWnd.js"></script>
    <script src="js/game/retryWindow.js"></script>    
    <script src="js/game/levelHandle.js"></script>
	<script src="js/game/giftsWindow.js"></script>
	<script src="js/game/unlockWndw.js"></script>
	<script src="js/game/customizeWindow.js"></script>
    <script src="js/game/friendsInviteGiftWnd.js"></script>
    <script src="js/game/cloudManager.js"></script>
    <script src="js/game/audioBg.js"></script>
    <script src="js/game/blink_sprite.js"></script>
    <script src="js/game/bestScoreWindow.js"></script>
	<script src="js/game/pbm.js"></script>
	<script src="js/game/addx.js"></script>
	<script src="js/game/happyNeutronWindow.js"></script>

    <!-- Game Data -->    
    <script src="js/data/fb_data.js"></script>    
    <script src="js/data/fbaccess.js"></script>
    <script src="js/data/gameData.js"></script>    
	<script src="js/data/rc4.js"></script>
    <script src="js/data/ajaxAdapter.js"></script>
    <script src="js/data/popcake_data.js"></script>

    <!-- the level information -->
    <script src="js/data/level_data.js"></script>
    
    <!-- application states -->   
	<script src="js/states/popcakeBaseState.js"></script>
    <script src="js/states/splashState.js"></script>
    <script src="js/states/mainMenuState.js"></script>
    <script src="js/states/loadState.js"></script>
    <script src="js/states/gameState.js"></script>
    <script src="js/states/generalLevelState.js"></script>
	<script src="js/states/bakeryStoreState.js"></script>
	
     <!-- system entry point -->
    <script src="js/main.js"></script>
    <script src="js/default.js"></script>

    <script>
        // using jQUery to subscribe to event
        $(window).on('beforeunload', function () {
            OnGameExit();
        });
    </script>

</head>

<!-- Facebook API Javascript access -->
<script>

	var url = "https://apps.facebook.com/popcakelegend/";
	//var hostURL = "https://localhost/popcakelegend/"; // Temporary	
	
	/***********************************************************************/
	/************* CHANGE THIS WHEN Migrating server *******************/
	/**/  var hostURL = "https://popcakelegend.herokuapp.com/";   /**/
	/***********************************************************************/
			
	(function(d, s, id){
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));	
	
	window.fbAsyncInit = function() {
		
		FB.init({
		  appId      : <?php echo $APP_KEY; ?>,
		  xfbml      : true,
		  version    : 'v2.0'
		});		
	
		window.setTimeout(function () {
			FB.Canvas.setAutoGrow()
		}, 250)
		
		FB.Canvas.setSize(/*{ width: 760, height: 1080 }*/);
		
		// try to login facebook
		/* FB.login(function(response) {
			// handle the response
			console.log("FB login response!");
			console.log(response);
		 }, {
			scope: 'publish_actions', 
			return_scopes: true,
			auth_type: 'rerequest'
		 });*/
	};
	
	function FBAcceess_Share(title, message)
	{
		if(!g_isFacebook) return;
		var picturePath = hostURL + "images/ingame/menu.png";

		// New Graph API with story	   	   
		FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				/*FB.api(
					'/me/objects/popcakelegend:level',
					'post',
					{
					object: {
						'app_id': <?php echo $APP_KEY; ?>,
						'type': 'popcakelegend:level',
						'title': title,
						'image': picturePath,
						'description': message
						}
					},
					function(response) {
						console.log(response);
						FB.ui({
							method: 'share_open_graph',
							action_type: 'popcakelegend:complete',
							action_properties: JSON.stringify({
								level: response.id
							})
						}, function(r){});
					});
					
					*/
				FB.ui(
                {
                        method: 'feed',
                        name: "Popcake Legend",
                        link: 'http://apps.facebook.com/popcakelegend/',
                        picture: picturePath
                }, function (response) {
                       if (response && response.post_id) {
                                // post successfull
                       } else {
                                // post not success
                       }                        
                });
			}
		});
	   
	}
	
	function FBAccess_SendAppRequest(id, message, callback)
	{	
		if(!g_isFacebook) return;
		FB.ui({
            method: 'apprequests',
            message: message/*,
			to: id*/
		}, function (response) {
            console.log(response);
			if(callback)
				callback(response);
			/*if (response && response.to) {
				if(callback)
					callback(response.to);
			}*/
		});	
	}
	
	function FBAccess_GetPicture(fbid, callback)
	{
			FB.getLoginStatus(function(response) {
				if (response.status === 'connected') {
					FB.api("/"+fbid+"/picture",  function(response) {
						if(response && response.data.url){
							if(callback){
								callback(response.data.url);
							}
						}
					});  				
				}
			});
	}
		
	function FBAccess_PaymentAPI(count)
	{
		var coinsdef =[
			{coins: 50, url:  "http://popcakelegend.herokuapp.com/payment_system/coin_50.html"},
			{coins: 100, url: "http://popcakelegend.herokuapp.com/payment_system/coin_100.html"},
			{coins: 300, url: "http://popcakelegend.herokuapp.com/payment_system/coin_300.html"},
			{coins: 500, url: "http://popcakelegend.herokuapp.com/payment_system/coin_500.html"},
			{coins: 30, url:  "http://popcakelegend.herokuapp.com/payment_system/coin_30.html"},
		
		];
				
		var url = 0;
		for(var p=0;p<coinsdef.length;p++){
			if( coinsdef[p].coins == count){
				url = coinsdef[p].url;
				break;
			}
		}
		
		FB.ui({
		  method: 'pay',
		  action: 'purchaseitem',
		  product: url,
		  quantity: 1		  
		},
		FBAccess_CallBack
		);
	}
		
	function FBAccess_CallBack(data) {
	
		console.log(data);
		g_Engine.GetState(BAKERYSTORE_STATE).DoInternalPurchase(data);
	}
		
	function FB_X_FriendSelect()
	{
		$("#multi").fbFriends({
		  
		  multiple: true,
		  whenDone: function(friends){ SendGift(friends); },
		  friendChecked: function(friend){},
		  friendUnchecked: function(friend){},
		  //normal dialog stuff
		  shower: function(element){ element.parents(".modal").modal("show");},
		  hider: function(element){ element.parents(".modal").modal("hide"); },
		});
		
		$('#multi-submit').click(function(){
			$("#multi").fbFriends("submit");
		});
	
	}
	
	function FriendsWindow_OnClose()
	{
		OnCloseFriendWindow();
	}
	
</script>

<body>	
    <script type="text/javascript" src="//cpm1.affiz.net/tracking/ads_video.php" defer async></script>
    <script type="text/javascript">
                
        var GLOBAL_CURRENT_WINDOW = 0;        
        var AFFIZ_ADS_LOADED = false;
        var AFFIZ_init = false;

        window.avAsyncInit = function () {
            AFFIZ_InitAds();
        };

        function AFFIZ_InitAds()
        {          
            if (AFFIZ_init) return;

            AFFIZVIDEO.init({
                    site_id: '315f315f32303636_801bd4e933',
                    load_callback: loadAds,
                    noads_callback: noAds,
                    complete_callback: completeAds,
                    close_callback: closeAds,
                    modal: true,
                });

            AFFIZ_init = true;
            console.log("AFFIZ Init called...")
        }

        function loadAds()
        {
            console.log("AFFIZ: Ads available");
            AFFIZ_ADS_LOADED = true;
            AFFIZ_init = false;
        }

        function noAds()
        {
            console.log("AFFIZ: no ads");
            AFFIZ_ADS_LOADED = false;
            AFFIZ_init = false;
        }

        function completeAds()
        {
            console.log("AFFIZ: complete ads");
            AFFIZ_ADS_LOADED = false;
            AFFIZ_InitAds();
			ToggleSounds(true);
            GLOBAL_CURRENT_WINDOW.ShowAward();
        }
        function closeAds()
        {
            console.log("AFFIZ: Ads close");
			ToggleSounds(true);
        }

    </script>
	<div class="modal hide" role="dialog">
	  <div class="modal-header">
		<button class="close" onclick="FriendsWindow_OnClose()" data-dismiss="modal" type="button" aria-hidden= "true">&times;</button>
		<h3>Offer 1 gift to 1 friend and receive 1 free gift!</h3>
	  </div>
	  <div class="modal-body">
		<div id="multi"></div>
	  </div>
	  <div class="modal-footer"> 
		<button class="btn" onclick="FriendsWindow_OnClose()" data-dismiss="modal" aria-hidden="true">Cancel</button>
		<button id="multi-submit" class="btn btn-primary">Send</button>
	  </div>
	</div>
	</div>
	    <div style="width: 100%; text-align:center;">
        <canvas id="game_canvas" align="center" style="background:#FFFFFF;"> 
              HTML5 canvas not supported.
        </canvas> 
		<br/>		
		<div style="width: 100%; text-align:center;"
			class="fb-like" 
			data-href="https://www.facebook.com/popcakelegend/" 
			data-layout="standard" data-action="like" 
			data-show-faces="true" data-share="true"></div>
    </div>
</body>
</html>
