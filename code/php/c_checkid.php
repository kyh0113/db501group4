<?php
$request = json_decode(file_get_contents('php://input'), true);
$id = $request["c_id"];

try{
	$conn = oci_connect("db501group4", "test1234", "203.249.87.57:1521/orcl");

	$sql = "select c_id from customer where c_id='".$id."'";
	$stmt = oci_parse($conn, $sql);
	oci_execute($stmt);

	$customers = array();
	$index = 0;
	while ($row=oci_fetch_row($stmt)) {
		$customers[$index]->c_id = $row[0];
		$index++;
	}
	if ($index==1){
		$response->result = 1;
		$response->error = "Duplicated ID";
		$json = json_encode($response);
		echo $json;  //result가 전달
		return;
	}
	$response->result = 0;
	$response->body = "ID Checked!!";
	$json = json_encode($response);
	echo $json;  //result가 전달
}
catch(Exception $e){
 $response->result = 1;
 $response->error = $e->getMessage();
 $json = json_encode($response);
 echo $json;
}
?>

