<?php

	require '../php-fb-sdk/facebook.php';
	include_once '../php/definitions.php';
	include '../php/pdomysql_ex.php';	
	
	// Get all users for this game
	$file = fopen("dump/UserData.csv", "w"); 	
		
	$db = PDOMySQL_Init();
	$query = "SELECT * from user";		
	$stmt = $db->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_SCROLL));
	$stmt->execute();	

	//Dump column names
	$data =  "Facebook ID,";
	$data .= "Name,";
	$data .= "Max Level,";
	$data .= "Live,";
	$data .= "Coins,";
	$data .= "Last Login,";
	$data .= "Gifts count,";
	$data .= "Last Send Gift Date,";
	$data .= "Email";
	$data .= "\n";
	$data .= "\n";
	fwrite($file,$data);
	
	
	while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {		
				
		$data = "'" . $row['fbid'].",";
		$data .= $row['name'] . ",";
		$data .= ($row['max_level'] + 1 ). ",";
		$data .= $row['life'] . ",";
		$data .= $row['coins'] . ",";
		$data .= $row['last_login'] . ",";
		$data .= $row['gift_count'] . ",";
		$data .= $row['gift_give_date'] . ",";
		$data .= $row['email'] . "";							
		$data .= "\n";
				
		fwrite($file,$data);
		
   }
	fclose($file);
	
	echo "1";
?>