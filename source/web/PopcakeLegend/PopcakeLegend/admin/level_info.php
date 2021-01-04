<?php 
						
	$param	= -1;
	$fname = "ALL";
	if (isset($_GET['fbid'])){
		$param	= $_GET["fbid"];
		$fname = $param;
	}

?>	

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
     <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# spiritbubble: http://ogp.me/ns/fb/spiritbubble#">
        <title> Transaction Record </title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
		<link rel="stylesheet" type="text/css" href="jquery.dataTables.css" />
		<link rel="stylesheet" type="text/css" href="css/jquery.dataTables.css">
		<script type="text/javascript" language="javascript" src="js/jquery.js"></script>
		<script type="text/javascript" language="javascript" src="js/jquery.dataTables.js"></script>
				
		<script type="text/javascript" language="javascript" >
			$(document).ready(function() {
				var dataTable = $('#level-grid').DataTable( {
					"processing": true,
					"serverSide": true,
					"lengthMenu": [[10, 25, 50, 100, 500, 1000, -1], [10, 25, 50, 100, 500, 1000, "All"]],
					"ajax":{
						url :"level-grid-data.php?param=<?php echo $param; ?>", // json datasource
						type: "post",  // method  , by default get
						error: function(){  // error handling
							$(".level-grid-error").html("");
							$("#level-grid").append('<tbody class="level-grid-error"><tr><th colspan="3">No data found in the server</th></tr></tbody>');
							$("#level-grid_processing").css("display","none");
		 
						}
					}
				} );
			} );
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
							
							var myElement = document.getElementById("GenLink");
							myElement.innerHTML="Download CSV File!";							
							myElement.href= URL + "dump/LevelData_<?php echo $fname; ?>.csv";
							
							DUMP_DATA = true;
						}
					}
				};
					
				xmlhttp.open("GET", "exportLevel.php?fbid="+ <?php echo $param; ?>, true);
				xmlhttp.send();
			}
				
		</script>
    </head>

	<body>
		<h1 class="page_title">Level Record for <?php echo $fname; ?>  </h1>
		<a  id = "GenLink"
			href="#"
			onclick="DumpUserData();">
			Generate File for Download</a>
			
		<table id="level-grid"  cellpadding="0" cellspacing="0" border="0" class="display" width="100%">
			<thead>
				<tr>
					<th> FBID</th>
					
					<th>Level ID</th>
					<th>Stars</th>
					<!--<th>Saved</th>-->
					<th>Score</th>
					<!--<th>Extra Score</th>-->
					<th>Lives remain</th>
					<th>Hits remain</th>
					<th>Error count</th>										
					<th>Time complete (in seconds)</th>
				</tr>
			</thead>
					

		</table>
	</body>
</html>
