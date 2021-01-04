<?php
	require '../php-fb-sdk/facebook.php';
	include_once '../php/definitions.php';
	include '../php/pdomysql_ex.php';
		
	// initialize FB
	// Get these from http://developers.facebook.com 
	$facebook = new Facebook(array(
		'appId'  => $APP_KEY,
		'secret' => $SECRET_KEY,
		'cookie' => true
	));

	// Get Facebook User ID
	$fbuid = $facebook->getUser();	
	$access_token = $facebook->getAccessToken();
	$app_access_token = $APP_KEY .'|'. $SECRET_KEY;
	
	$facebook->setAccessToken( $APP_KEY .'|'. $SECRET_KEY);
		
	$db = PDOMySQL_Init();	
	$sql = "select fbid from user where STR_TO_DATE(last_login, '%m/%d/%Y')
		BETWEEN DATE_SUB(NOW(), INTERVAL 30 DAY) AND NOW();";
	
	$message = "";
	if (isset($_GET['message'])){
		$message = $_GET["message"];		
	}
	
	if ( strlen($message) == 0) {
		print "no message no notification";
		return;
	}

	$params = array(
		'href' => 'https://professor-brain-memory.herokuapp.com/',
		'template' => $message,	
		'access_token' => $app_access_token
	);
		
	$stmt = $db->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_SCROLL));
	$stmt->execute();
	while ($row = $stmt->fetch(PDO::FETCH_NUM, PDO::FETCH_ORI_NEXT)) {
		try {
			$result = $facebook->api('/v2.4/' . $row[0] . 
				'/notifications?','post', $params);						
		
		} catch (Exception $e) {
			//print $e->getMessage();		
		}
		
	}
			
	print "OK";
?>