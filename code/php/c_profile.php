<?php

$request = json_decode(file_get_contents('php://input'), true);
$c_id = $request["c_id"];
$c_pw = $request["c_pw"];
$c_repeatpw = $request["c_repeatpw"];

$c_name = $request["c_name"];
$c_address_si = $request["c_address_si"];
$c_address_gu = $request["c_address_gu"];
$c_phonenumber = $request["c_phonenumber"];
$c_birth = $request["c_birth"];


try{
	$conn = oci_connect("db501group4", "test1234", "203.249.87.57:1521/orcl"); //디비 접속

	$sql = "update customer
     set c_pw='".$c_pw."', c_repeatpw='".$c_repeatpw."',c_name='".$c_name."', c_address_si='".$c_address_si."', c_address_gu='".$c_address_gu."', c_phonenumber='".$c_phonenumber."', c_birth='".$c_birth."'
     where c_id='".$c_id."'";

	$stmt = oci_parse($conn, $sql);
	oci_execute($stmt);
	oci_free_statement($stmt);
	oci_close($conn);

	$response->result = 0;
	$response->body = "Update success!!";
	$json = json_encode($response);
	echo $json;
}
catch(Exception $e){
 $response->result = 1;
 $response->error = $e->getMessage();
 $json = json_encode($response);
 echo $json;
}

?>