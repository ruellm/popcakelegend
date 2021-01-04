<?php
	//////////////////////////////////////////////////
	// Defitions for SpiritBuble
	// Ported: June 28, 2014
	//////////////////////////////////////////////////
	// Transaction Commands
	/////////////////////////////////////////////////
	$REQ_LOGIN_USER 		= 100;
	$REQ_UPDATE_LIFE 		= 200;
	$REQ_UPDATE_TOTAL_SCORE = 300;
	$REQ_UPDATE_MAX_LEVEL 	= 400;
	$REQ_UPDATE_LEVEL 		= 500;
	$REQ_GET_USER_LEVEL_DATA = 600;
	$REQ_ASK_LIFE			= 700;
	$REQ_LIFE_BEGGARS		= 800;
	$REQ_GRANT_LIFE_SINGLE	= 900;
	$REQ_SET_EPOCH			= 1000;
	$REQ_GET_BOOSTERS_INFO	= 1100;
	$REQ_PURCHASE_INAPP		= 1200;
	$REQ_UPDATE_BOOSTER		= 1300;
	$REQ_UPDATE_REWARD_FLAG	= 1400;
	$REQ_UPDATE_GOLD 		= 1500;
	$REQ_ADD_TRANSACTION	= 1600;
	$REQ_UPDATE_COINS		= 1700;
	$REQ_SAVE_LEVEL 		= 1800;
	$REQ_UPDATE_MONETIZE	= 1900;
	$REQ_EXEC_SQL			= 10;
	$REQ_GIFTS				= 2000;
	$REQ_RESET_CLAIMFLAG	= 3000;
	$REQ_UPDATE_GIFT 		= 4000;
	$REQ_SET_THEME 			= 5000;
	$REQ_UPDATE_FR_GIFT		= 6000;
	$REQ_INCR_DOU_COUNT  = 7000;
	$REQ_INCR_SOLO_COUNT = 8000;
	
	// User Data
	$APP_KEY = '1564990630430817';
	$SECRET_KEY ='96606502d159e8c01c10b1be83855879';
	
	//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	// Production App definitions -- DO NOT Upload to live!!!
	//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/* $APP_KEY = '372773926246281';
	$SECRET_KEY ='8f3c920f3a4d77afcbad96545c3ac871';
*/

class UserInfo {
		public $uid;	
		public $fbid;
		public $life;
		public $coins;
		public $total_score;		
		public $last_login;					
		public $epoch;
		public $name;
		public $isNewToday;
		public $max_level;
		
		// for Daily spin implementation
		public $D;
		public $D_claim_flag;
		
		// for gift implementation
		public $gift_count;
		public $gift_give_date;
		public $fr_gift_date;
		
		public $theme;
		public $spv_flag;
	}
	
class LevelInfo {
	public $fbid;
	public $level_id;
	public $stars;
	//public $saved;
	public $errors;
	public $score;
	public $time_complete;
	
	//..
	//definitions for admin page
	//...
	public $lives_remain;
	public $hits;
	public $extra;
}

class MonetizeInfo
{
	public $fbid;
	public $type;
	public $level_id;
	public $count;
}

class LevelSettings
{
	public $level_id;
	public $hits;
	public $points_per_hits;
	public $points_per_time;
	public $seconds;
	public $clock_limit;
	public $points_per_challenge;
	public $minimum_trophy;
	public $hidden;
}

class PriceSettings
{
	public $id;
	public $type;
	public $price;
	public $count;
	public $currency;
}

?>