<?php 
	require '../php-fb-sdk/facebook.php';
	include_once '../php/definitions.php';
	include '../php/pdomysql_ex.php';	
		
	$user_array = array();
	
	// Get all users for this game
	$db = PDOMySQL_Init();
	
	/** Get Level Settings **/
	$level_settings = array();
	
	$query = "SELECT * from level_settings ORDER BY level_id";
	$result = $db->query($query); 
	$rowarray = $result->fetchall(PDO::FETCH_ASSOC);
	$count = count($rowarray);
	if( $count > 0 ){
		for($i = 0; $i < $count; $i++) {
			$row = $rowarray[$i];
			$level = new LevelSettings();	
			$level->level_id = $row['level_id'];		
			$level->hits = $row['hits'];	
			$level->points_per_hits = $row['points_per_hits'];	
			$level->points_per_time = $row['points_per_time'];	
			$level->seconds = $row['seconds'];	
			$level->clock_limit = $row['clock_limit'];	
			$level->points_per_challenge = $row['points_per_challenge'];	
			$level->minimum_trophy = $row['minimum_trophy'];
			$level->hidden = $row['hidden'];	
			array_push($level_settings,$level);	
		}
	}
	
	$price_settings = array();
	
	$query = "SELECT * from price_settings";
	$result = $db->query($query); 
	$rowarray = $result->fetchall(PDO::FETCH_ASSOC);
	$count = count($rowarray);
	if( $count > 0 ){
		for($i = 0; $i < $count; $i++) {
			$row = $rowarray[$i];
			$price = new PriceSettings();	
			$price->id   = $row['id'];
			$price->type = $row['type'];		
			$price->price = $row['price'];	
			$price->count = $row['count'];	
			$price->currency = $row['currency'];	

			array_push($price_settings,$price);	
		}
	}
	
	// Level statistics data retrieval
	class LevelStatistics
	{
		public $level_id;
		public $solo_count;
		public $duo_count;
	}
	
	$level_statistics  = array();
	$query = "SELECT * from level_statistics";
	$result = $db->query($query); 
	$rowarray = $result->fetchall(PDO::FETCH_ASSOC);
	$count = count($rowarray);
	if( $count > 0 ){
		for($i = 0; $i < $count; $i++) {
			$row = $rowarray[$i];
			$stat = new LevelStatistics();	
			$stat->level_id   = $row['level_id'];
			$stat->solo_count = $row['solo_count'];		
			$stat->duo_count = $row['duo_count'];		

			array_push($level_statistics,$stat);	
		}
	}
	
	
	//flag if we allow access
	$allowed = false;
	
	// Get these from http://developers.facebook.com 
	$facebook = new Facebook(array(
		'appId'  => $APP_KEY,
		'secret' => $SECRET_KEY,
		'cookie' => true
	));

	// Get Facebook User ID
	$fbuid = $facebook->getUser();
	$access_token = $facebook->getAccessToken();	
	
	//////////////////////////////////////////////////
	/* Add checking for users */
	if($fbuid == 10153571902873604 /*Ruell Magpayo*/|| 
		$fbuid == 10153420899438604 /*drulztestapp-Ruell*/ ||
		$fbuid == 1474766226147767 /*Affan Shah*/ ||
		$fbuid == 10205211196454995 /*Fab Lejeux*/ ||
		$fbuid == 10153773442530127 /*Matt Vermeulen*/ ||
		$fbuid == 155938768084258 /* Mary Sharrow*/) {
		$allowed = true;		
	}
	
	$whitelist = array('127.0.0.1', "::1");
	if(in_array($_SERVER['REMOTE_ADDR'], $whitelist)){
		$allowed = true;	
	}
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<?php
if($allowed) {
?>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
     <head>
        <title> Popcake Legend Admin Page </title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
		
		<link rel="stylesheet" type="text/css" href="css/jquery.dataTables.css">
		<script type="text/javascript" language="javascript" src="js/jquery.js"></script>
		<script type="text/javascript" language="javascript" src="js/jquery.dataTables.js"></script>
		<script src="../js/data/ajaxAdapter.js"></script>
		
		<script type="text/javascript" language="javascript" >
			$(document).ready(function() {
				var dataTable = $('#employee-grid').DataTable( {
					"processing": true,
					"serverSide": true,
					"lengthMenu": [[10, 25, 50, 100, 500, 1000, -1], [10, 25, 50, 100, 500, 1000, "All"]],
				
					"ajax":{
						url :"employee-grid-data.php", // json datasource
						type: "post",  // method  , by default get
						error: function(){  // error handling
							$(".employee-grid-error").html("");
							$("#employee-grid").append('<tbody class="employee-grid-error"><tr><th colspan="3">No data found in the server</th></tr></tbody>');
							$("#employee-grid_processing").css("display","none");
		 
						}
					}
				} );
			} );
		</script>
		
		<script type="text/javascript" language="javascript" type="text/javascript" class="init">

								
		$(document).ready(function() {
			$('#datatable').dataTable( {
				"pagingType": "full_numbers",
				"lengthMenu": [[10, 25, 50, 100, 500, 1000, -1], [10, 25, 50, 100, 500, 1000, "All"]]
			} );
			
			$('#levelStatisticsTable').dataTable( {
				"pagingType": "full_numbers"				
			} );
			
			$('#levelSettingsTable').dataTable( {
				"pagingType": "full_numbers"				
			} );
			
			$('#priceSettingsTbl').dataTable( {
				"pagingType": "full_numbers"
			} );
			
			$('#generalSettingsTbl').dataTable( {
				"pagingType": "full_numbers"
			} );
			
		} );
		
		function openWindow(url)
		{
			window.open(url, '_blank');
			window.focus();
		}
		
		function CollectTableInfo(tablename, escapeBottom)
		{
			var data = new Array();
			
			//gets table
			var oTable = document.getElementById(tablename);

			//gets rows of table
			var rowLength = oTable.rows.length;

			//loops through rows    
			for (i = 1; i < rowLength-escapeBottom; i++){

			   //gets cells of current row  
			   var oCells = oTable.rows.item(i).cells;

			   //gets amount of cells of current row
			   var cellLength = oCells.length;

			   //create column data
			   var colData = new Array();
			   
			   //loops through each cell in current row			   
			    for(var j = 0; j < cellLength; j++){

					// get your cell info here
					var cellVal = oCells.item(j).innerHTML;		
					
					// Store in Array
					colData.push(cellVal);
				}
				
				data.push(colData);
			}
			
			return data;
		}
		function isNumeric(n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		}

		function UpdateLvlSettings()
		{
			var data = CollectTableInfo('levelSettingsTable', 0);
			for(var i =0; i < data.length; i++) {
				for(var j=0; j < data[i].length; j++){
					value = data[i][j];
					if( !isNumeric(value)){
						alert(" An invalid value was found in the table,"+ 
							"please check the values and try again. " + 
							"["+(i+1) + "]["+(j+1) +"]");
						return;
					}
					value = parseInt(value);
					if(value < 0 && j != 5){
						alert("Negative values are not allowed except for Clock limit" + 
							"["+(i+1) + "]["+(j+1) +"]");
						return;
					}
					
					if(j==7){
						if( value <0 || value > 3){
							alert("Trophy value should be in the range of 0-3 only." + 
								"["+(i+1) + "]["+(j+1) +"]");
							return;
						}
					}
					if( j==8){
						if( value <0 || value > 1){
							alert("Hidden Column value should be 0-1 only."+ 
							"["+(i+1) + "]["+(j+1) +"]");
							return;
						}
					}
				}
			} 
			
			var fieldArray=["","hits", "points_per_hits" , "points_per_time" , "seconds" , 
				"clock_limit" , "points_per_challenge", /*"minimum_trophy" ,*/ "hidden" ];
			
			for(var i =0; i < data.length; i++) {
				
				var sql = "UPDATE level_settings SET ";		
				var level_id = 0;
				for(var j=0; j < data[i].length; j++){
					
					if(j==0){
						level_id = parseInt(data[i][j])-1;
						continue;
					}
					sql += fieldArray[j] + "=" + data[i][j];
					
					if( j+1 < data[i].length){
						sql += ",";
					}
				}
				sql += " where level_id = " + level_id;
				console.log(sql);
				Ajax_ExecSQL(sql);
			}		
			
			alert("Update Level Settings Completed!");			
		}
		
		function UpdatePriceSettings()
		{
			var data = CollectTableInfo('priceSettingsTbl', 0);
			for(var i =0; i < data.length; i++) {
				for(var j=0; j < data[i].length; j++){
					value = data[i][j];
					if( !isNumeric(value) && (j != 2 && j!=5)){
						alert(" An invalid value was found in the table,"+ 
							"please check the values and try again. " + 
							"["+(i+1) + "]["+(j+1) +"]");
						return;
					}
					
					var value = parseInt(value);
					if(value < 0){
						alert("Negative values are not allowed " + 
							"["+(i+1) + "]["+(j+1) +"]");
						return;
					}
				}
			}
			
			//.. lets do shabu!
			var fieldArray=["","", "", "price", "count"];
			
			var name = ['Reshuffle', 'Watch Board 3 seconds', 'Cancel Board Move', 
				'Freeze Icon', 'Life', 'Extra Hits', 'Extra Seconds', 'Unlock Level',
				'Customize Theme','Coins Purchase'];
							
			for(var i =0; i < data.length; i++) {				
				var sql = "UPDATE price_settings SET ";		
				var id = 0;
				for(var j=0; j < data[i].length -1; j++){
					if(j==1 || j==2) continue;
					if(j==0){
						id = parseInt(data[i][j]);						
						continue;
					}
					
					sql += fieldArray[j] + "=" + data[i][j];					
					if( j+2 < data[i].length){
						sql += ",";
					}
				}
				sql += " where id = " + id;
				console.log(sql);
				Ajax_ExecSQL(sql);				
			}		
			
			alert("Update Price Table Completed!");			
		}
		
		function UpdateGeneralSettings()
		{
			var data = CollectTableInfo('generalSettingsTbl', 0);
			for(var i =0; i < data.length; i++) {
				for(var j=0; j < data[i].length; j++){
					value = data[i][j];
					if( j != 1 && !isNumeric(value)){
						alert(" An invalid value was found in the table,"+ 
							"please check the values and try again. " + 
							"["+(i+1) + "]["+(j+1) +"]");
						return;
					}
					
					var value = parseInt(value);
					if(value < 0 && j==1){
						alert("Negative values are not allowed " + 
							"["+(i+1) + "]["+(j+1) +"]");
						return;
					}
				}
			}
			
			var fieldArray=["name", "value"];
			for(var i =0; i < data.length; i++) {				
						
				var id = parseInt(data[i][0]);
				var sql = "UPDATE general_settings SET value=" + 
					parseInt(data[i][2]) + " where id="+id;				
				console.log(sql);
				Ajax_ExecSQL(sql);
			}			
			
			alert("Update General Settings Completed!");
		}
		
		</script>
		<script type="text/javascript" language="javascript" >
			var DUMP_DATA = false;
			
			function DumpUserData()
			{
				if(DUMP_DATA) return;
				
				var xmlhttp = null;
				if (window.XMLHttpRequest) {
					// code for IE7+, Firefox, Chrome, Opera, Safari
					xmlhttp = new XMLHttpRequest();
				} else {
					// code for IE6, IE5
					xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
				}
        
				xmlhttp.onreadystatechange = function(){
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {		
						if(xmlhttp.responseText="1") {
							alert ("Export of Data complete!\n" + 
							"Click on the download link..");													
							
							var urlNum = window.location.href.split('/');
							var URL = "";
							for(var i = 0; i< urlNum.length-1;i++) {
								URL += urlNum[i];
								URL += "/";
							}
							
							console.log(URL);
							
							var myElement = document.getElementById("GenLink");
							myElement.innerHTML="Download CSV file!";							
							myElement.href= URL + "dump/UserData.csv";
							
							DUMP_DATA = true;
						}
					}
				};
					
				xmlhttp.open("GET", "exportUser.php", true);
				xmlhttp.send();
			}
				
		</script>		
    </head>

	<body>
		<!-- TODO: Display button to display ALL Monetization Info -->
		<!-- TODO: Display button to display ALL level Info -->
		
		<div>
		<h1 class="page_title">User Data </h1>
		<a  id = "GenLink"
			href="#"
			onclick="DumpUserData();">
			Generate File for Download</a>
		
		<table id="employee-grid"  cellpadding="0" cellspacing="0" border="0" class="display" width="100%">
			<thead>
				<tr>
					<th>FBID</th>
					<th>Name</th>
					<th>Max Level</th>
					<th>Life</th>
					<th>Coins</th>
					<th>Last Login</th>
					<!--
					<th>Daily Bonus</th>
					<th>Daily Bonus claimed</th> 
					-->
					<th>Gift Count</th>
					<th>Gift Send Date</th>
					<th> Email </th>					
					<th> Level Info </th>
					<th> Monetization Info </th>
					<th> Credit Card Purchase </th>
				</tr>
			</thead>
				
		</table>
		</div>
		
		<table>
			<tr>
				<td><button type="button" onClick="openWindow('level_info.php')">View All Level Player Records</button></td>
				<td><button type="button" onClick="openWindow('monetize_info.php')">View All Monetization Transaction Records</button></td>
				<td><button type="button" onClick="openWindow('cc_info.php')">View All Credit Card Transaction Records</button></td>
				<td><button type="button" onClick="openWindow('notifications_main.php')">Send Notifications</button></td>				
			</tr>
		</table>
		
		<!----------------------- This is for Level Statistics---------------------------------------------------------->
		<div>
			<hr width="100%" />
			<h1 class="page_title">Level Statistics </h1>
			<table id="levelStatisticsTable" class="display" cellspacing="0" width="100%">
			<thead>
				<tr>
					<th>Level</th>
					<th>SOLO Players Count</th>
					<th>DUO Players Count</th>
				</tr>
			</thead>
					
			<tbody>
				<?php 
					foreach($level_statistics as $stat) {
						echo "<tr>";
							echo "<td align='center'>" . ($stat->level_id+1) . "</td>";		
							echo "<td align='center'>" . ($stat->solo_count) . "</td>";	
							echo "<td align='center'>" . ($stat->duo_count) . "</td>";	
						echo "</tr>";
					}
				?>	
				
			</tbody>
		</table>
		</div>		
		
		<!----------------------- This is for Level Settings---------------------------------------------------------->
		<div>
			<hr width="100%" />
			<h1 class="page_title">Level Settings </h1>
			<table id="levelSettingsTable" class="display" cellspacing="0" width="100%">
			<thead>
				<tr>
					<th>Level</th>
					<th>Hits</th>
					<th>Points per Remaining Hits</th>
					<th>Points per Remaining Time</th>
					<th>Seconds View (Before Game)</th>
					<th>Clock limit</th>
					<th>Points per click</th>
					<!--<th>Minimum trophy </th>-->
					<th>Hidden</th>
				</tr>
			</thead>
					
			<tbody>
				<?php 
					foreach($level_settings as $level) {
						echo "<tr>";
							echo "<td align='center'>" . ($level->level_id+1) . "</td>";		
							echo "<td contenteditable='true' align='center'>" . $level->hits . "</td>";	
							echo "<td contenteditable='true' align='center'>" . $level->points_per_hits . "</td>";	
							echo "<td contenteditable='true' align='center'>" . $level->points_per_time . "</td>";	
							echo "<td contenteditable='true' align='center'>" . $level->seconds . "</td>";	
							echo "<td contenteditable='true' align='center'>" . $level->clock_limit . "</td>";	
							echo "<td contenteditable='true' align='center'>" . $level->points_per_challenge . "</td>";			
							//echo "<td contenteditable='true' align='center'>" . $level->minimum_trophy . "</td>";
							echo "<td contenteditable='true' align='center'>" . $level->hidden . "</td>";				
						echo "</tr>";
					}
				?>	
				
			</tbody>
		</table>
		<table>
			<tr>
				<td>
					<button type="button" onClick="UpdateLvlSettings()">Update Level Settings Data</button>
				</td>
			</tr>
		</table>
		</div>		
		
		<!------------------------------------------------------------------------------------------------------------>
		<!----------------------- This is for Price Settings---------------------------------------------------------->
		<div>
			<hr width="100%" />
			<h1 class="page_title">Pricing Settings </h1>
			<table id="priceSettingsTbl" class="display" cellspacing="0" width="100%">
			<thead>
				<tr>
					<th>Database ID</th>
					<th>Monetization ID</th>
					<th>Type</th>
					<th>Price</th>
					<th>Count</th>
					<th>Currency</th>
				</tr>
			</thead>
					
			<tbody>
				<?php 
					foreach($price_settings as $price) {
						
						$actual_type = array('Reshuffle', 'Watch Board 3 seconds', 
							'Cancel Board Move', 'Freeze Icon', 'Life', 'Extra Hits', 
							'Extra Seconds', 'Unlock Level', 'Customize Theme','Coins Purchase');
						$actual_currency = array('coins','USD');
						
						echo "<tr>";	
							echo "<td align='center'>" . $price->id . "</td>";
							echo "<td align='center'>" . $price->type . "</td>";							
							echo "<td align='center'>" . $actual_type[$price->type] . "</td>";	
							echo "<td contenteditable='true' align='center'>" . $price->price . "</td>";		
							echo "<td contenteditable='true' align='center'>" . $price->count . "</td>";
							echo "<td align='center'>" . $actual_currency[$price->currency] . "</td>";						
						echo "</tr>";
					}	
				?>
					
			</tbody>
		</table>
		
		<table>
			<tr>
				<td>
					<button type="button" onClick="UpdatePriceSettings()">Update Pricing Data</button>
				</td>
			</tr>
		</table>
		</div>
		<!----------------------- This is for General Settings---------------------------------------------------------->
			
		<div>
			<hr width="100%" />
			<h1 class="page_title">General Settings </h1>
			<table id="generalSettingsTbl" class="display" cellspacing="0" width="100%">
			<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Value</th>
				</tr>
			</thead>
					
			<tbody>
				<?php 
					$query = "SELECT * from general_settings";
					$result = $db->query($query); 
					$rowarray = $result->fetchall(PDO::FETCH_ASSOC);
					$count = count($rowarray);
					if( $count > 0 ){
						for($i = 0; $i < $count; $i++) {
							$row = $rowarray[$i];
								
							echo "<tr>";	
								echo "<td align='center'>" . $row['id'] . "</td>";
								echo "<td align='center'>" . $row['name'] . "</td>";	
								echo "<td contenteditable='true' align='center'>" . $row['value'] . "</td>";					
							echo "</tr>";
						}
					}				
				?>
					
			</tbody>
		</table>
		
		<table>
			<tr>
				<td>
					<button type="button" onClick="UpdateGeneralSettings()">Update General Settings Data</button>
				</td>
			</tr>
		</table>
		</div>
		<hr width="100%" />
	</body>
</html>
<?php } 
else{
	echo "Access Denied " . $fbuid;
}
?>