<?php

	$hub_mode		= $_GET["hub_mode"];
	$hub_challenge 	= $_GET["hub_challenge"];
	$hub_verify_token = $_GET["hub_verify_token"];
	$method = $_SERVER['REQUEST_METHOD'];   

	// read here: https://developers.facebook.com/docs/graph-api/real-time-updates/
	//https://developers.facebook.com/docs/payments/realtimeupdates/	
	if( $method == 'GET' && $hub_mode == 'subscribe' && 
		$hub_verify_token=='popcakelegend') {	
		echo $hub_challenge;
		return;
	}
?>
