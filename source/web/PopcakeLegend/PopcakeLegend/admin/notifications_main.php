
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
     <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# spiritbubble: http://ogp.me/ns/fb/spiritbubble#">
        <title> Application Notifications </title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
		<script type="text/javascript" language="javascript" src="js/jquery.js"></script>
		<script src="../js/data/ajaxAdapter.js"></script>
		
		<script type="text/javascript" language="javascript" >
			 $(document).ready(function() {
			var text_max = 180;
			$('#textarea_feedback').html(text_max + ' characters remaining');

			$('#textarea').keyup(function() {
				var text_length = $('#textarea').val().length;
				var text_remaining = text_max - text_length;

				$('#textarea_feedback').html(text_remaining + ' characters remaining');
			});
		});
		
		var dot_count = 0;
		
			
		function SendNotification()
		{
			var xmlhttp = null;
			if (window.XMLHttpRequest) {
                // code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
			}
			else {
                // code for IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
			
			var message = $('#textarea').val();
			if(message.length == 0){
				alert("Please input message");
				return;
			}
			
			var r = confirm("Send Message to All users?");
			if (r == false) {
				return;
			} 
			
			xmlhttp.open("GET", "notification_backend.php?message=" + message, true);
			xmlhttp.send();
			
			document.getElementById("textarea").disabled = true;
			document.getElementById("notifyBtn").disabled = true;			
			
			setInterval(function() {
				var text = "";
				for(var i=0; i < dot_count; i++)
					text += ".";						
				$('#process_text').html('Processing' + text);
				dot_count = (dot_count+1) % 5;	
			}, 800);
				
			sql = "insert into notifications(message, date) values ('" 
							+ message + "','" + new Date() + "')";
				
			console.log(sql);
			Ajax_ExecSQL(sql)
				
			xmlhttp.onreadystatechange = function(){
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {				
					var feedback = xmlhttp.responseText;
					if(feedback=="OK") {
						alert ("Notification sent completed and successfull!");
					} else{						
						console.log(feedback);
					}
				}else{
					console.log("something happened status = " + xmlhttp.status + 
						" ready state" +xmlhttp.readyState);
						
					console.log("response " + xmlhttp.responseText);
					if(xmlhttp.status == 503){
						alert ("Server Busy processing too many records,"+
						" Processing at back-end will continue. " + 
						"Please do not send more notification for today." );
						
					}
				}
				
				window.location.reload();
			};
			
		}
				
		
		</script>
	 </head>

	<body>
		<h1> App Notifications </h1>
		<B> Send To : </B> All Users <br/>
		Auto Targeting for App Notifications (Enabled)<br/>
		
		<textarea id="textarea" rows="15" cols="50" maxlength="180" ></textarea>
		<div id="textarea_feedback"></div>
		<table>
			<tr>
				<td><button id="notifyBtn" type="button" onClick="SendNotification()">Send Notification To ALL Users</button></td>							
			</tr>
			<tr> 
				<td> <font size="3" color="red"><b>WARNING:</b> MESSAGE will be sent to all users!!</font></td>
			</tr>			
		</table>
		<h3 id="process_text"></h3>
		
		<div>
			<hr width="100%" />
			<h1 class="page_title">Notification History </h1>
			<table border="1">
			<thead>
				<tr>
					<th>Number</th>
					<th>Message</th>
					<th>Date Sent</th>
				</tr>
			</thead>
					
			<tbody>
				<?php 
					include '../php/pdomysql_ex.php';	

					// Get all users for this game
					$db = PDOMySQL_Init();
										
					$query = "SELECT * from notifications";
					$result = $db->query($query); 
					$rowarray = $result->fetchall(PDO::FETCH_ASSOC);
					$count = count($rowarray);
					if( $count > 0 ){
							
						for($i = 0; $i < $count; $i++) {
							$row = $rowarray[$i];
							echo "<tr>";	
								echo "<td align='center'>" . $i . "</td>";
								echo "<td align='center' width='70%'>" . $row['message'] . "</td>";							
								echo "<td align='center'>" . $row['date'] . "</td>";		
							echo "</tr>";	
						}						
					}
				?>
					
			</tbody>
		</table>
		
		<table>
			<tr>
				<td>
					<button type="button" onClick="window.location.reload()">Reload</button>
				</td>
			</tr>
		</table>
		</div>
		
	</body>
</html>
