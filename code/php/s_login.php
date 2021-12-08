<?php

$request = json_decode(file_get_contents('php://input'), true);	//js에서 post로 준 data 받음
$id = $request["s_id"];	//$:변수 post에서 받은 Json
$pw = $request["s_pw"];
$repeatpw = $request["s_repeatpw"];

try{ 
         $conn = oci_connect("db501group4", "test1234", "203.249.87.57:1521/orcl");	//db접속

 $sql = "select s_id,s_pw,s_repeatpw, s_name,s_address_si,s_address_gu,s_address_details_shopnumber
         from eyelash_shop where s_id='".$id."' and s_pw='".$pw."'" and s_repeatpw='".$repeatpw."';
 $stmt = oci_parse($conn, $sql);
 oci_execute($stmt);
 $eyelash_shop = array();
 $index = 0;
 while ($row=oci_fetch_row($stmt)) {
  $eyelash_shop[$index]->s_id = $row[0];
  $eyelash_shop[$index]->s_pw = $row[1];
  $eyelash_shop[$index]->s_repeatpw = $row[2];
  $eyelash_shop[$index]->s_name = $row[3];
  $eyelash_shop[$index]->s_address_si = $row[4];
  $eyelash_shop[$index]->s_address_gu = $row[5];
  $eyelash_shop[$index]->s_address_detail = $row[6];
  $eyelash_shop[$index]->s_shopnumber = $row[7];

  $index++;
 }
 if ($index==0){
   $response->result = 1;
   $response->error = "shop Not Found";
   $json = json_encode($response);
   echo $json;  //result가 전달
   return;
 }

 $sql = "select t_id,t_name
         from teahcer where s_id='".$id."'";
 $stmt = oci_parse($conn, $sql);
 oci_execute($stmt);
 $hairdressers = array();
 $index = 0;
 while ($row=oci_fetch_row($stmt)) {
  $teacher[$index]->t_id = $row[0];
  $teacher[$index]->s_id = $row[1];
  $teacher[$index]->t_name = $row[2];
  $index++;
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

 $today = date("Ymd", time());
 $sql = "select c_id,r_style,r_date,r_time from reservation 
 where reservation.t_id in
 (select teacher.t_id from teacher where teacher.s_id='".$id."') order by reservation.r_time";
 $stmt = oci_parse($conn, $sql);
 oci_execute($stmt);
 $todayReservations = array();
 $index = 0;
 while ($row=oci_fetch_row($stmt)) {
  $todayReservations[$index]->c_id = $row[0];
  $todayReservations[$index]->t_id = $row[1];
  $todayReservations[$index]->r_date = $row[2];
  $todayReservations[$index]->r_time = $row[3];
  $todayReservations[$index]->r_style = $row[4];
  $index++;
 }
 
 $tmrw = date("Ymd", strtotime($day." +1 day"));
 $sql = "select c_id,r_style,r_date,r_time from reservation 
 where reservation.t_id in
 (select teacher.t_id from teahcer where teahcer.s_id='".$id."') order by reservation.r_time";
 $stmt = oci_parse($conn, $sql);
 oci_execute($stmt);
 $tmrwReservations = array();
 $index = 0;
 while ($row=oci_fetch_row($stmt)) {
  $tmrwReservations[$index]->c_id = $row[0];
  $tmrwReservations[$index]->r_style = $row[1];
  $tmrwReservations[$index]->r_date = $row[2];
  $tmrwReservations[$index]->r_time = $row[3];
  $index++;
 }
 
 $response->result = 0;
 $response->eyelash_shop = $eyelash_shop[0];
 $response->teacher1 = $teacher[0];
 $response->teacher2 = $teacher[1];
 $response->price = $prices[0];
 $response->todayReservations = $todayReservations;
 $response->tmrwReservations = $tmrwReservations;
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
    