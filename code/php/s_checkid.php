<?php
$request = json_decode(file_get_contents('php://input'), true);

try{
	$conn = oci_connect("db501group4", "test1234", "203.249.87.57:1521/orcl");

	$sql = "select s_id from eyelash_shop where s_id='".$id."'";
	$stmt = oci_parse($conn, $sql);
	oci_execute($stmt);

	$salons = array();
	$index = 0;
	while ($row=oci_fetch_row($stmt)) {
		$salons[$index]->s_id = $row[0];
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

