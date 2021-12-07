<?php

$request = json_decode(file_get_contents('php://input'), true);	//js에서 post로 준 data 받음
$id = $request["c_id"];	//$:변수 post에서 받은 Json
$pw = $request["c_pw"];
$repeatpw = $request["c_repeatpw"];

try{ 
        $conn = oci_connect("db501group4", "test1234", "203.249.87.57:1521/orcl");	//db접속

 $sql = "select c_id,c_pw, c_repeatpw, c_repeatpw, c_name,c_address_si,c_address_gu,c_phonenumber,c_birth
         from customer where c_id='".$id."' and c_pw='".$pw."' and c_repeatpw = '".$repeatpw."';
 $stmt = oci_parse($conn, $sql);
 oci_execute($stmt);

 $customers = array();
 $index = 0;
 while ($row=oci_fetch_row($stmt)) {
  $customers[$index]->c_id = $row[0];
  $customers[$index]->c_pw = $row[1];
  $customers[$index]->c_repeatpw = $row[2];
  $customers[$index]->c_name = $row[3];
  $customers[$index]->c_address_si = $row[4];
  $customers[$index]->c_address_gu = $row[5];
  $customers[$index]->c_phonenumber = $row[6];
  $customers[$index]->c_birth = $row[7];
  $index++;
 }
  if ($index==0){
   $response->result = 1;
   $response->error = "Customer Not Found";
   $json = json_encode($response);
   echo $json;  //result가 전달
   return;
 }

 $si = $customers[0]->c_address_si;
 $gu = $customers[0]->c_address_gu;
 $sql = "select s_id,s_pw,s_repeatpw,s_name,s_address_si,s_address_gu, s_address_detail, s_shopnumber
         from salon where s_address_si='".$si."' and s_address_gu='".$gu."' order by s_name ";
 $stmt = oci_parse($conn, $sql);
 oci_execute($stmt);

 $nearShops = array();
 $index = 0;
 while ($row=oci_fetch_row($stmt)) {
  $nearShops[$index]->s_id = $row[0];
  $nearShops[$index]->s_pw = $row[1];
  $nearShops[$index]->s_repeatpw = $row[2];
  $nearShops[$index]->s_name = $row[3];
  $nearShops[$index]->s_address_si = $row[4];
  $nearShops[$index]->s_address_gu = $row[5];
  $nearShops[$index]->s_address_detail = $row[6];
  $nearShops[$index]->s_shopnumber = $row[7];

  $index++;
 }

 
 $today = date("Ymd", time());
 $sql = "select eyelash_shop.s_name,
 eyelash_shop.s_address_si, eyelash_shop.s_address_gu, eyelash_shop.s_address_detail,
 t_name, r_id, r_date, r_time from reservation
 inner join teacher on reservation.t_id = teacher.t_id
 inner join eyelash_shop on eyelash_shop.s_id = teacher.s_id where c_id='".$id."'
  and r_date>='" .$today. "' order by r_date desc ";
 $stmt = oci_parse($conn, $sql);
 oci_execute($stmt);
 $myReservations = array();
 $index = 0;
 while ($row=oci_fetch_row($stmt)) {
  $myReservations[$index]->r_id = $row[0];
  $myReservations[$index]->c_id = $row[1];
  $myReservations[$index]->t_id = $row[2];
  $myReservations[$index]->r_date = $row[3];
  $myReservations[$index]->r_time = $row[4];
  $myReservations[$index]->r_style = $row[5];
  $index++;
 }

 $response->result = 0;
 $response->customer = $customers[0];
 $response->nearShops = $nearShops;
 $response->myReservations = $myReservations;
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
    