<?php
include 'common_mysql.php';	

$conn = MYSQLI_GetConnection();

$param	= -1;
if (isset($_GET['param'])){
	$param	= $_GET["param"];
}
	
// storing  request (ie, get/post) global array to a variable  
$requestData= $_REQUEST;

$columns = array( 
// datatable column index  => database column name
	0 =>'fbid', 
	1 =>'level_id', 
	2 => 'stars',
	3 => 'score',
	4 => 'lives_remain',
	5 => 'hits',
	6 => 'errors',
	7 => 'time_complete'
);	

// getting total number records without any search
$sql = "SELECT * from level";


$query=mysqli_query($conn, $sql) or die("employee-grid-data.php: get level data");
$totalData = mysqli_num_rows($query);
$totalFiltered = $totalData;  // when there is no search parameter then total number rows = total number filtered rows.

$sql = "SELECT * ";
$sql.=" FROM level WHERE 1=1";

if( $param != -1) {
	$sql .= " AND fbid ='".$param ."'";
}

if( !empty($requestData['search']['value']) ) {   // if there is a search parameter, $requestData['search']['value'] contains search parameter
	$sql.=" AND ( fbid LIKE '".$requestData['search']['value']."%' )";    
}

$query=mysqli_query($conn, $sql) or die("employee-grid-data.php: get user");
$totalFiltered = mysqli_num_rows($query); // when there is a search parameter then we have to modify total number filtered rows as per search result. 

$sql.=" ORDER BY ". $columns[$requestData['order'][0]['column']]."   ".$requestData['order'][0]['dir'];
$sql .= "  LIMIT ".$requestData['start']." ,".$requestData['length']."   ";

$query=mysqli_query($conn, $sql) or die("employee-grid-data.php: get users");

$data = array();
while( $row=mysqli_fetch_array($query) ) {  // preparing an array
	$nestedData=array(); 

	$nestedData[] = $row["fbid"];
	$nestedData[] = $row["level_id"]+1; // it should display as non-zero based in admin
	$nestedData[] = $row["stars"];
	$nestedData[] = $row["score"];
	$nestedData[] = $row["lives_remain"];
	$nestedData[] = $row["hits"];
	$nestedData[] = $row["errors"];
	$nestedData[] = $row["time_complete"];
	
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
