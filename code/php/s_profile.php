<?php

$request = json_decode(file_get_contents('php://input'), true);
$s_id = $request["s_id"];
$s_pw = $request["s_pw"];
$s_repeatpw = $request["s_repeatpw"];
$s_name = $request["s_name"];
$s_address_si = $request["s_address_si"];
$s_address_gu = $request["s_address_gu"];
$s_address_detail = $request["s_address_detail"];
$s_phonenumber = $request["s_shopnumber"];

$t_id_1 = $request["t_id_1"];
$t_name_1 = $request["t_name_1"];

$t_id_2 = $request["t_id_2"];
$t_name_2 = $request["t_name_2"];

$t_id_3 = $request["t_id_3"];
$t_name_3 = $request["t_name_3"];


$perm = $request["perm"];
$extension = $request["extension"];
$care = $request["care"];

try{
	$conn = oci_connect("db501group4", "test1234", "203.249.87.57:1521/orcl"); //디비 접속

	$sql = "update eyelash_shop
     set s_pw='".$s_pw."', s_repeatpw='".$s_repeatpw."', s_name='".$s_name."', s_address_si='".$s_address_si."', s_address_gu='".$s_address_gu."', s_address_detail='".$s_address_detail."', s_phonenumber='".$s_phonenumber."'
     where s_id='".$s_id."'";
	$stmt = oci_parse($conn, $sql);
	oci_execute($stmt);


	$sql = "update teacher
     set t_name='".$t_name_1."'
     where t_id='".$t_id_1."'";
	$stmt = oci_parse($conn, $sql);
	oci_execute($stmt);

	$sql = "update teacher
     set t_name='".$t_name_2."'
     where t_id='".$t_id_2."'";
	$stmt = oci_parse($conn, $sql);
	oci_execute($stmt);

	$sql = "update teahcer
     set t_name='".$t_name_3."'
     where t_id='".$t_id_3."'";
	$stmt = oci_parse($conn, $sql);
	oci_execute($stmt);


	$sql = "update price
     set perm='".$perm."', extension='".$extension."', care='".$care."'
     where s_id='".$s_id."'";
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