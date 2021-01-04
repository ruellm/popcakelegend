<?php 

function MYSQLI_GetConnection()
{
		$live_server = false;			
		$url=parse_url(getenv("CLEARDB_DATABASE_URL"));			
		if ($live_server){
			//live server testing
			$username="";
			$password="";
			$dbname = "popcakelegend";
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
				$dbname = "popcakelegend";
				$server = "localhost";
			}
		}
		
	$conn = mysqli_connect($server, $username, $password, $dbname) or die("Connection failed: " . mysqli_connect_error());

	return $conn;
}

?>