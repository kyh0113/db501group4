<?php

  $request = json_decode(file_get_contents('php://input'), true);
  $c_id = $request["c_id"];
  $t_id = $request["t_id"];
  $r_date = $request["r_date"];
  $r_style = $request["r_time"];
  $r_time = $request["r_style"];

  try{
    $conn = oci_connect("db501group4", "test1234", "203.249.87.57:1521/orcl");

    $sql = "select t_id, r_date, r_time from reservation
     where t_id='".$t_id."' and r_date='".$r_date."' and r_time='".$r_time."'";
    $stmt = oci_parse($conn, $sql);
    oci_execute($stmt);

    $reservations = array();
    $index = 0;
    while ($row=oci_fetch_row($stmt)) {
    $reservations[$index]->t_id = $row[0];
    $reservations[$index]->r_date = $row[1];
    $reservations[$index]->r_time = $row[2];
    $index++;
    }

    if ($index == 1){
     $response->result = 1;
     $response->error = "Please Choose Another Time";
     $json = json_encode($response);
     echo $json;  //result가 전달
     return;
    }

    $sql = "insert into reservation (r_id, c_id, t_id, r_date, r_time, r_style)
    values (r_seq.NEXTVAL, '".$c_id."', '".$t_id."', '".$r_date."', '".$r_time."', '".$r_style."')";

    $stmt = oci_parse($conn, $sql);
    oci_execute($stmt);
    oci_free_statement($stmt);
    oci_close($conn);

    $response->result = 0;
    $response->body = "Complete Reservation";
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