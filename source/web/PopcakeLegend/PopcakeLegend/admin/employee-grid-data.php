<?php

include 'common_mysql.php';	
	
$conn = MYSQLI_GetConnection();

// storing  request (ie, get/post) global array to a variable  
$requestData= $_REQUEST;

$columns = array( 
// datatable column index  => database column name
	0 =>'fbid', 
	1 => 'name',
	2 => 'max_level',
	3 => 'life',
	4 => 'coins',
	5 => 'last_login',
	6 => 'gift_count',
	7 => 'gift_give_date',
	8 => 'email'
);

// getting total number records without any search
$sql = "SELECT * from user";

$query=mysqli_query($conn, $sql) or die("employee-grid-data.php: get users data");
$totalData = mysqli_num_rows($query);
$totalFiltered = $totalData;  // when there is no search parameter then total number rows = total number filtered rows.

$sql = "SELECT * ";
$sql.=" FROM user WHERE 1=1";
if( !empty($requestData['search']['value']) ) {   // if there is a search parameter, $requestData['search']['value'] contains search parameter
	$sql.=" AND ( name LIKE '".$requestData['search']['value']."%' ";    
	$sql.=" OR name LIKE '".$requestData['search']['value']."%' ";

	$sql.=" OR fbid LIKE '".$requestData['search']['value']."%' )";
}
$query=mysqli_query($conn, $sql) or die("employee-grid-data.php: get user");
$totalFiltered = mysqli_num_rows($query); // when there is a search parameter then we have to modify total number filtered rows as per search result. 

if( $requestData['order'][0]['column'] == 5) {
	//special sorting of dates string, ALL date sorting should come here
	//order-column 5 : Last login 
	//order-column 7 : Gift Send Date
	$sql = "SELECT *, str_to_date(".$columns[$requestData['order'][0]['column']].",'%m/%d/%Y') AS cdate FROM user";
	$sql.=" ORDER BY cdate ".$requestData['order'][0]['dir']."  LIMIT ".$requestData['start']." ,".$requestData['length']."   ";

}else{
	$sql.=" ORDER BY ". $columns[$requestData['order'][0]['column']]."   ".$requestData['order'][0]['dir']."  LIMIT ".$requestData['start']." ,".$requestData['length']."   ";
}

/* $requestData['order'][0]['column'] contains colmun index, $requestData['order'][0]['dir'] contains order such as asc/desc  */	
$query=mysqli_query($conn, $sql) or die("employee-grid-data.php: get users");

$data = array();
while( $row=mysqli_fetch_array($query) ) {  // preparing an array
	$nestedData=array(); 

	$nestedData[] = $row["fbid"];
	$nestedData[] = $row["name"];
	$nestedData[] = $row["max_level"] + 1;
	$nestedData[] = $row["life"];
	$nestedData[] = $row["coins"];
	$nestedData[] = $row["last_login"];
	$nestedData[] = $row["gift_count"];
	$nestedData[] = $row["gift_give_date"];
	$nestedData[] = $row["email"];
	$nestedData[] = "<a href='#' onclick=openWindow('level_info.php?fbid=". 
					$row["fbid"] ."')> Link </a>";
	$nestedData[] = "<a href='#' onclick=openWindow('monetize_info.php?fbid=". 
					$row["fbid"] ."')> Link </a>";
	$nestedData[] = "<a href='#' onclick=openWindow('cc_info.php?fbid=". 
					$row["fbid"] ."')> Link </a>";
	
	$data[] = $nestedData;
}



$json_data = array(
			"draw"            => intval( $requestData['draw'] ),   // for every request/draw by clientside , they send a number as a parameter, when they recieve a response/data they first check the draw number, so we are sending same number in draw. 
			"recordsTotal"    => intval( $totalData ),  // total number of records
			"recordsFiltered" => intval( $totalFiltered ), // total number of records after searching, if there is no searching then totalFiltered = totalData
			"data"            => $data   // total data array
			);

echo json_encode($json_data);  // send data as json format


?>
