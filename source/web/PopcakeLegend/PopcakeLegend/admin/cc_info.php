<?php 
	require '../php-fb-sdk/facebook.php';
	include_once '../php/definitions.php';
	include '../php/pdomysql_ex.php';								

	class TransactInfo {
		public $id;	
		public $fbid;
		public $amount;
		public $currency;
		public $payment_id;
		public $quantity;
	}
	
	class CC_Info {
		public $transact_id;
		public $fbid;
		public $amount;
		public $currency;
		public $payment_id;
		public $quantity;
		public $date;
	}
	
	$param	= -1;
	$fname = "ALL Players";
	if (isset($_GET['fbid'])){
		$param	= $_GET["fbid"];
		$fname = $param;
	}

	$cc_info = array();
	
	// Get all users for this game
	$db = PDOMySQL_Init();
	if( $param != -1 ){
		$query = "SELECT * from transaction where fbid =" . $param;
	} else{
		$query = "SELECT * from transaction ";
	}
	$result = $db->query($query); 
	$rowarray = $result->fetchall(PDO::FETCH_ASSOC);
	$count = count($rowarray);
	if( $count > 0 ){
		
		for($i = 0; $i < $count; $i++) {
			$row = $rowarray[$i];
			$cc = new CC_Info();	

			$cc->fbid = $row['fbid'];		
			$cc->amount = $row['amount'];	
			$cc->currency = $row['currency'];	
			$cc->payment_id = $row['payment_id'];	
			$cc->quantity = $row['quantity'];	
			$cc->date = $row['date'];	
		
		
			array_push($cc_info,$cc);			
		}
	}
	
?>	

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
     <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# spiritbubble: http://ogp.me/ns/fb/spiritbubble#">
        <title> Monetize Record </title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
		<link rel="stylesheet" type="text/css" href="jquery.dataTables.css" />
		<script type="text/javascript" language="javascript" src="../js/jquery-1.8.2.min.js"></script>
		<script type="text/javascript" language="javascript" src="lib/jquery.dataTables.min.js"></script>
		<script src="lib/excellentexport.min.js" > </script>
		<script type="text/javascript" language="javascript" type="text/javascript" class="init">

		$(document).ready(function() {
			$('#datatable').dataTable( {
				"pagingType": "full_numbers"
			} );
		} );
				
		</script>
		
    </head>

	<body>
		<h1 class="page_title">Credit Card Purchase Record for <?php echo $fname; ?>  </h1>
		<a download="PlayerMonetizeReport_<?php echo $fname; ?>.xls"
			href="#"
			onclick="return ExcellentExport.excel(this, 'datatable', 'Sheet Name Here');">
			Export Credi Card Purchase Record Info to Excel</a>
			
		<table id="datatable" class="display" cellspacing="0" width="100%">
			<thead>
				<tr>
					<?php if($param == -1){ ?>					
					<th> FBID</th>
					<?php }?>
					<th>Amount</th>		
					<th>Currency</th>
					<th>Payment ID</th>
					<th>Quantity</th>
					<th>Date</th>
				</tr>
			</thead>
					
			<tbody>		
					<?php 
						foreach($cc_info as $cc){
																	
							echo "<tr>";
							
							 if($param == -1){ 
								echo "<td>". $cc->fbid . "</td>";
							}
							
							echo "<td align='center'>". ($cc->amount) . "</td>";
							echo "<td align='center'>". $cc->currency . "</td>";
							echo "<td align='center'>". $cc->payment_id . "</td>";
							echo "<td align='center'>". $cc->quantity . "</td>";
							echo "<td align='center'>". $cc->date . "</td>";
							echo "</tr>";
						}
					?>										
			</tbody>
		</table>
	</body>
</html>
