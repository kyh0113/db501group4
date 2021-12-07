<?php

$request = json_decode(file_get_contents('php://input'), true);	//js에서 post로 준 data 받음
$id = $request["s_id"];	//$:변수 post에서 받은 Json

try{ 
  $conn = oci_connect("db501group4", "test1234", "203.249.87.57:1521/orcl");	//db접속

 $sql = "select t_id,t_name
         from teacher where s_id='".$id."'";
 $stmt = oci_parse($conn, $sql);
 oci_execute($stmt);
 $hairdressers = array();
 $index = 0;
 while ($row=oci_fetch_row($stmt)) {
  $teacher[$index]->t_id = $row[0];
  $teacher[$index]->t_name = $row[1];
  $teacher[$index]->s_id = $row[2];
  $index++;
 }
 if ($index==0){
   $response->result = 1;
   $response->error = "teacher Not Found";
   $json = json_encode($response);
   echo $json;  //result가 전달
   return;
 }

 $sql = "select s_name
         from eyelash_shop where s_id='".$id."'";
 $stmt = oci_parse($conn, $sql);
 oci_execute($stmt);
 $salons = array();
 $index = 0;
 while ($row=oci_fetch_row($stmt)) {
  $salons[$index]->s_name = $row[0];
  $index++;
 }
 if ($index==0){
   $response->result = 1;
   $response->error = "eyelash_shop Not Found";
   $json = json_encode($response);
   echo $json;  //result가 전달
   return;
 } 

 $sql = "select perm,extension,care
         from price where s_id='".$id."'";
 $stmt = oci_parse($conn, $sql);
 oci_execute($stmt);
 $prices = array();
 $index = 0;
 while ($row=oci_fetch_row($stmt)) {
  $prices[$index]->perm = $row[0];
  $prices[$index]->extension = $row[1];
  $prices[$index]->care = $row[2];
  $index++;
 }
 if ($index==0){
   $response->result = 1;
   $response->error = "Price Info Not Found";
   $json = json_encode($response);
   echo $json;  //result가 전달
   return;
 }

 $response->result = 0;
 $response->teacher = $teacher;
 $response->eyelash_shop = $eyelash_shop[0];
 $response->price = $prices[0];
 $json = json_encode($response);
 echo $json;	//result가 전달
}
catch(Exception $e){
 $response->result = 1;
 $response->error = $e->getMessage();
 $json = json_encode($response);
 echo $json;
}

?>
    