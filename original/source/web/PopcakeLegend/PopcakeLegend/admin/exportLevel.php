<?php

	require '../php-fb-sdk/facebook.php';
	include_once '../php/definitions.php';
	include '../php/pdomysql_ex.php';	
		
	$param	= -1;
	$fname = "ALL";
	if (isset($_GET['fbid'])){
		$param	= $_GET["fbid"];
		if($param != -1) {
			$fname = $param;
		}
	}
	
	$filename = "dump/LevelData_" . $fname . ".csv";
	
	// Get all users for this game
	$file = fopen($filename, "w"); 	
		
	$db = PDOMySQL_Init();	
	$query = "SELECT * from level";		
	
	if($param != -1) {
		$query .= " where fbid=" . $param;		
	}
	echo $query;
	
	$stmt = $db->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_SCROLL));
	$stmt->execute();	

	//Dump column names
	
	$data = "Level information for " . $fname;
	$data .= "\n";
	$data .= "\n";
	
	$data .=  "Facebook ID,";
	$data .= "Level,";
	$data .= "Stars,";
	$data .= "Score,";
	$data .= "Lives Remain,";
	$data .= "Hits,";
	$data .= "Errors,";
	$data .= "Time Complete,";
	$data .= "\n";
	$data .= "\n";
	fwrite($file,$data);
		
	while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {		
				
		$data = "'" . $row['fbid'].",";
		$data .= $row['level_id']+1 . ",";
		$data .= ($row['stars'] + 1 ). ",";
		$data .= $row['score'] . ",";
		$data .= $row['lives_remain'] . ",";
		$data .= $row['hits'] . ",";
		$data .= $row['errors'] . ",";
		$data .= $row['time_complete'] . "";						
		$data .= "\n";
				
		fwrite($file,$data);
		
   }
	fclose($file);
	
	echo "1";
?>