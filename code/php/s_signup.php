<?php

$request = json_decode(file_get_contents('php://input'), true);
$s_id = $request["s_id"];
$s_pw = $request["s_pw"];
$s_repeatpw = $request["s_repeatpw"];
$s_name = $request["s_name"];
$s_address_si = $request["s_address_si"];
$s_address_gu = $request["s_address_gu"];
$s_address_detail = $request["s_address_detail"];
$s_shopnumber = $request["s_shopnumber"];

$t_id_1 = $request["t_id_1"];
$t_name_1 = $request["t_name_1"];

$t_id_2 = $request["t_id_2"];
$t_name_2 = $request["t_name_2"];

$h_id_3 = $request["t_id_3"];
$h_name_3 = $request["t_name_3"];


$dyeing = $request["perm"];
$perm = $request["extension"];
$cut = $request["care"];

try{
	$conn = oci_connect("db501group4", "test1234", "203.249.87.57:1521/orcl"); //디비 접속 정보

	$sql = "insert into eyelash_shop (s_id, s_pw, s_repeatpw, s_name, s_address_si, s_address_gu, s_address_detail, s_shopnumber)
        values ('".$s_id."','".$s_pw."','".$s_repeatpw."', '".$s_name."','".$s_address_si."','".$s_address_gu."','".$s_address_detail."',
        '".$s_shopnumber."')";
    $stmt = oci_parse($conn, $sql);
	oci_execute($stmt);

	$sql = "insert into teacher (t_id, s_id, t_name)
	    values (t_seq.NEXTVAL, '".$s_id."', '".$t_name_1."')";
    $stmt = oci_parse($conn, $sql);
	oci_execute($stmt);

	$sql = "insert into teacher (t_id, s_id, t_name)
	    values (t_seq.NEXTVAL, '".$s_id."', '".$t_name_2."')";
    $stmt = oci_parse($conn, $sql);
	oci_execute($stmt);


    $sql = "insert into price (s_id, perm, extension, care)
	    values ('".$s_id."', '".$perm."', '".$extension."', '".$care."')";
    $stmt = oci_parse($conn, $sql);
	oci_execute($stmt);

	oci_free_statement($stmt);
	oci_close($conn);

	$response->result = 0;
	$response->body = "Sign up success!!";
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