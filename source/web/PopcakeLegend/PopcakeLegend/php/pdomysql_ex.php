<?php

	//////////////////////////////////////////////////
	// Defitions for PopCake Legend
	// Ported: November 05, 2014
	//////////////////////////////////////////////////

	
	//////////////////////////////////////////////
	// Functions for PDO SQLite
	/////////////////////////////////////////////
	function PDOMySQL_Init()
	{	
		$live_server = false;
			
		$url=parse_url(getenv("CLEARDB_DATABASE_URL"));
			
		if ($live_server){
			//live server testing
			$username="";
			$password="";
			$dbname = "popcakelegend_pbm";
			$server = "localhost";
		} else {
			if(isset($url["host"])){
				//using live DB - ClearDB MySQL - Heroku
				$server = $url["host"];
				$username = $url["user"];
				$password = $url["pass"];
				$dbname = substr($url["path"],1);				
			} else {
				$username="root";
				$password="";
				$dbname = "popcakelegend_pbm";
				$server = "localhost";
			}
		}
		
		try{
		
			// COnnect to Database using PDN
			$db = new PDO("mysql:host=". $server .";dbname=" . $dbname . ";",
						$username, $password);
						
		} catch(PDOException $ex) {
			echo($ex->getMessage());
		}
		return $db;
	}	
	
		
	function PDODB_CheckUser($fbid, $db)
	{
		$userInfo = null;
		
		$query = "SELECT * from user where fbid=" . $fbid . ";";
		$result = $db->query($query); 
		$rowarray = $result->fetchall(PDO::FETCH_ASSOC);
		if( count($rowarray) > 0 ){
				
				$row = $rowarray[0];		
				$userInfo = new UserInfo();		
				$userInfo->id = $row['id'];					
				$userInfo->life = $row['life'];
				$userInfo->coins = $row['coins'];
				$userInfo->total_score = $row['total_score'];
				$userInfo->last_login = $row['last_login'];
				$userInfo->epoch = $row['epoch'];
				$userInfo->name = $row['name'];
				$userInfo->max_level = $row['max_level'];
				$userInfo->D = $row['D'];
				$userInfo->D_claim_flag = $row['D_claim_flag'];
				$userInfo->gift_count = $row['gift_count'];
				$userInfo->gift_give_date = $row['gift_give_date'];
				$userInfo->fr_gift_date = $row['fr_gift_date'];
				$userInfo->theme = $row['theme'];
				$userInfo->spv_flag = $row['spv_flag'];
				$userInfo->email = $row['email'];
				$userInfo->$fbid = $fbid;
				
		}
		return $userInfo;
	}		
	
	///////////////////////////////////////////////////////
	function PDODB_GetValue($db,$text)
	{
		$query = "SELECT * from general_settings where name='".$text."'";
		$result = $db->query($query); 
		if($result){		
			$rowarray = $result->fetchall(PDO::FETCH_ASSOC);
			foreach($rowarray as $row){
				return $row['value'];
			}
		}
		return 0;
	}
	
	///////////////////////////////////////////////////////
	
	function PDODB_LoginUser($fbid, $name)
	{
		$db = PDOMySQL_Init();
		
		//status are 0: OK, 1: Problem
		$total_score = 0;
		$gold = 0;
		$coins = PDODB_GetValue($db,'Coins');
		$date = "";
		$current_date = date('m/d/Y', time());
		$uid = 0;
		$max_level = 0;
		$life = PDODB_GetValue($db,'Lives');
		$epoch = 0;
		$reward_flag = 0;		
		$is_new_today = 1; 
		
		$userInfo = PDODB_CheckUser($fbid,$db);
		
		if($userInfo){		
			
			$life 			= $userInfo->life;
			$coins 			= $userInfo->coins;
			$total_score 	= $userInfo->total_score;
			$epoch			= $userInfo->epoch;
			$date 			= $userInfo->last_login;
					
			if($current_date == $date) {
				$is_new_today = 0;
			}else{
				$query = "Update user SET last_login='" . $current_date ."' " .
					"where fbid=".$fbid;
				$db->exec($query);	
				
			}
			
			//
			// Daily Spin implementation
			//
			$start = strtotime($date);
			$end = strtotime($current_date);
			$days_between = ceil(abs($end - $start) / 86400);
			
			$Dchanged = false;
			if($days_between == 1){
				$userInfo->D += 5;
				$userInfo->D_claim_flag = 0;
				
				if($userInfo->D > 30) {
					$userInfo->D = 5;
				}				
				$Dchanged = true;				
			}else if( $days_between != 0){			
				$userInfo->D = 5;
				$userInfo->D_claim_flag = 0;
				$Dchanged = true;
			}
			
			if($Dchanged){
				
				$query = "Update user SET D=" . $userInfo->D .
					" where fbid=".$fbid;
				$db->exec($query);	
				
				PDODB_SetClaimFlag($db, $fbid, 0);
			}
		}else{
			$query = "INSERT into user(fbid, life, coins, total_score, last_login, epoch, name, gift_count) " .
				"values (" . $fbid ."," . $life . ",".$coins.",0,'" . $current_date ."', 0,'".$name."', 2);";
			$db->exec($query);
			
			$userInfo = new UserInfo();		
			$userInfo->id = -1;		//unused for now
			$userInfo->life = $life;
			$userInfo->coins = $coins;
			$userInfo->total_score = 0;
			$userInfo->epoch = 0;
			$userInfo->name = $name;
			$userInfo->max_level = 0;
			$userInfo->$fbid = $fbid;
			$userInfo->D = 5;
			$userInfo->D_claim_flag = 0;
			$userInfo->last_login = $current_date;
			$userInfo->gift_count = 2;   // free two gifts for new users
			$userInfo->gift_give_date = 0;
			$userInfo->fr_gift_date = 0;
			$userInfo->theme = 0;
			$userInfo->email = 0;
			$userInfo->spv_flag = 0;
		}			
		
		$userInfo->isNewToday = $is_new_today;
		
		return $userInfo;
		
	}
	
	function PDODB_UpdateLife($fbid, $life){
		$db = PDOMySQL_Init();
		
		$query = "Update user SET life=". 
			$life . " where fbid=" . $fbid;
		
		$db->exec($query);		
		
		$db = null;	
	}
	
	function PDODB_UpdateTotalScore($fbid, $score)
	{
		$db = PDOMySQL_Init();
		
		$query = "Update user SET total_score=". 
			$score . " where fbid=" . $fbid;
		
		$db->exec($query);		
		
		$db = null;	
	}
	
	function PDODB_UpdateMaxLevel($fbid, $level)
	{
		$db = PDOMySQL_Init();
		
		$query = "Update user SET max_level=". 
			$level . " where fbid=" . $fbid;
		
		$db->exec($query);		
		
		$db = null;
	}	
		
	//! needs to be updated for more information
	function PDODB_UpdateLevel($fbid, $level, $score, 
		$star, $time, $life, $hits, $errors, $extra)	
	{
		$db = PDOMySQL_Init();
		$query = "SELECT * from level where fbid=" . $fbid . 
			" and level_id=". $level.";";
			
		$result = $db->query($query); 
		$rowarray = $result->fetchall(PDO::FETCH_ASSOC);
		if( count($rowarray) > 0 ){
			$query = "Update level SET score=". 
				$score . ", stars=". $star .", time_complete=".$time.", lives_remain=".$life .
				", hits=".$hits .", errors=".$errors.", extra=".$extra .
				" where fbid=" . $fbid . " and level_id=".$level;
		} else {
			$query = "INSERT into level(fbid, level_id, score, stars, time_complete, lives_remain,  hits, errors, extra) values (" .	
				$fbid ."," . $level . ",". $score. ",".$star . ",". $time. ",".$life. ",".$hits. "," . $errors . "," . $extra . ");";
		}		
		
		$db->exec($query);	
		
		// Auto max_level update implementation
		// check user and update max_level
		//if max_level is this level, then increment level
		/*$query = "SELECT max_level from user where fbid=" . $fbid;			
		$result = $db->query($query); 
		$rowarray = $result->fetchall(PDO::FETCH_ASSOC);
		if( count($rowarray) > 0 ){
			$row = $rowarray[0];		
			if($row['max_level'] == $level){
				$query = "Update user SET max_level=". 
					($level+1) . " where fbid=" . $fbid;
				$db->exec($query);	
			}	
		}*/
		
		$db = null;	
	}
	
	function PDODB_GiveLife($recID)
	{
		$db = PDOMySQL_Init();
		$query = "Update life_request set granted=1 where id=" . $recID;		
		$db->exec($query);			
		$db = null;	
	}
	
	function PDODB_SetEpoch($fbid, $epoch)
	{
		$db = PDOMySQL_Init();
		$query = "Update user set epoch=".$epoch." where fbid=" . $fbid;		
		$db->exec($query);			
		$db = null;	
	}
	/*	
	function PDODB_SaveLevel($fbid, $level_id)
	{
		$db = PDOMySQL_Init();
		$query = "Update level set saved=1 where fbid=" . $fbid . 
			" and level_id=".$level_id;		
			
		$db->exec($query);			
		$db = null;	
	}*/
		
	function PDODB_UpdateCoins($fbid, $coins)
	{
		$db = PDOMySQL_Init();
		
		$query = "Update user SET coins=". 
			$coins . " where fbid=" . $fbid;
		
		$db->exec($query);		
		
		$db = null;	
	}
	
	function PDODB_GetLevelInfo($fbid)
	{
		$level_info = array();	
		$db = PDOMySQL_Init();
		
		$query = "SELECT * from level where fbid=" . $fbid;
		$result = $db->query($query); 
		if($result){		
			$rowarray = $result->fetchall(PDO::FETCH_ASSOC);
			foreach($rowarray as $row)
			{
				$level = new LevelInfo();
				$level->level_id = $row['level_id'];
				$level->stars = $row['stars'];
				//$level->saved = $row['saved'];
				//...
				array_push($level_info,$level);		
			}
		}
		
		return $level_info;
	}
	
	function PDODB_UpdateMonetizeInfo($fbid, $level, $type)
	{
		$db = PDOMySQL_Init();
		
		$query = "SELECT * from monetize where fbid=" . $fbid . " and level_id=" . $level . " and type=" . $type;
		$result = $db->query($query); 
		$rowarray = $result->fetchall(PDO::FETCH_ASSOC);
		
		if(count($rowarray) > 0 ){		
			$query = "Update monetize SET count=count+1 where fbid=" . 
				$fbid . " and level_id=" . $level . " and type=" . $type;
			$db->exec($query);	
					
		}else {
			$query = "INSERT into monetize (fbid, type, level_id) values (" . $fbid . "," . $type . "," . $level . ")";
			$db->exec($query);	
		}
			
	}
	
	function PDODB_ExecSQL($param)
	{
		$db = PDOMySQL_Init();
		
		$query = $param;
		$db->exec($query);		
		
		$db = null;	
	}
	
	function PDODB_SendGift($fbid, $to)
	{
		$db = PDOMySQL_Init();
		$friends = explode("|", $to);
		
		for($i = 0; $i < count($friends); $i++){
			$query = "Update user set gift_count=gift_count+1 where (gift_count < 5) and fbid=".$friends[$i];		
			$db->exec($query);		
		}
		
		$current_date = date('m/d/Y', time());
		$query = "Update user set gift_give_date='". $current_date ."' where fbid=".$fbid;
		$db->exec($query);		
		
		$db = null;
	}
	
	function PDODB_SetClaimFlag($db, $fbid, $value)
	{
		if( $db == -1 ){
			$db = PDOMySQL_Init();
		}
		
		$query = "Update user set D_claim_flag=".$value. " where fbid=".$fbid;
		
		$db->exec($query);		
		
		$db = null;	
	}
	
	function PDODB_UpdateGift($fbid, $count)
	{
		$db = PDOMySQL_Init();
		$query = "Update user set gift_count=".$count. " where fbid=".$fbid;		
		$db->exec($query);		
		
		$db = null;	
	}
	
	function PDODB_UpdateTheme($fbid, $theme)
	{
		$db = PDOMySQL_Init();
		$query = "Update user set theme=".$theme. " where fbid=".$fbid;		
		$db->exec($query);				
		
		if($theme == 1){
			// this is defined in game as THEME_TYPE_SAMPLE
			// also known as Super Premium Version
			$query = "Update user set spv_flag=1 where fbid=".$fbid;		
			$db->exec($query);		
		}
				
		$db = null;	
	}
	
	function PDODB_UpdateFrGift($fbid)
	{
		$db = PDOMySQL_Init();
		$current_date = date('m/d/Y', time());
		$query = "Update user set fr_gift_date='". $current_date ."' where fbid=".$fbid;
		$db->exec($query);					
		$db = null;	
	}
	
	function PDODB_SetEmail($fbid, $email)
	{
		$db = PDOMySQL_Init();
		$current_date = date('m/d/Y', time());
		$query = "Update user set email='". $email ."' where fbid=".$fbid;
		$db->exec($query);					
		$db = null;	
	}
		
	function PDODB_AddTransactionRecord($fbid, $amount, $currency, $payment_id, $quantity)
	{
		$db = PDOMySQL_Init();
		$current_date = date('m/d/Y', time());
		
		$query = "INSERT into transaction(fbid, amount, currency, payment_id, quantity, date) values (" .
			$fbid . "," . $amount . ",'" . $currency . "'," . $payment_id . "," . $quantity . ",'". 
			$current_date ."')";
		
		echo $query;
		
		$db->exec($query);		
		
		$db = null;	
	}
	
	function PDODB_IncrementDUOCount($levelid){
		$db = PDOMySQL_Init();
		$current_date = date('m/d/Y', time());
		$query = "Update level_statistics set duo_count=duo_count+1 where level_id=".$levelid;
		$db->exec($query);					
		$db = null;	
	}
	
	function PDODB_IncrementSOLOCount($levelid){
		$db = PDOMySQL_Init();
		$current_date = date('m/d/Y', time());
		$query = "Update level_statistics set solo_count=solo_count+1 where level_id=".$levelid;
		$db->exec($query);					
		$db = null;	
	}
?>