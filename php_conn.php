<?php
        error_reporting(E_ALL);
        ini_set("display_errors", 1);
?>
//error message code


<html>

<body>

<?php

//oracle data base address
$db='
(DESCRIPTION =
        (ADDRESS_LIST=
                (ADDRESS = (PROTOCOL = TCP)(HOST = 203.249.87.57)(PORT = 1521))
        )
        (CONNECT_DATA =
        (SID = orcl)
        )
)';

//enter user name % password

$username="db501group4";
$password="test1234";

//connect with oracle_db
$connect = oci_connect($username,$password,$db);

//oracle db connection error message
if(!$connect){
        $e = oci_error();
        trigger_error(htmlentities($e['message'],ENT_QUOTES),E_USER_ERROR);
}

//write down your SQL here
$sql= "SELECT *FROM Eyelash_shop";

//parse SQL
$stid = oci_parse($connect,$sql);

//Send SQL
oci_execute($stid);

//table setting
echo "<table width ='300' border='1' cellpadding='0' cellspacing='0'>\n";

while ($row=oci_fetch_array($stid,OCI_ASSOC+OCI_RETURN_NULLS)){

        echo "<tr>\n";
        foreach($row as $item){
                echo " <td>" . ($item !== NULL ? htmlentities($item,ENT_QUOTES) : "&nbsp;"). "</td>\n";
        }
        echo "</tr>\n";
}
echo"</table>\n";
//disconnect & logoff
oci_free_statement($stid);
oci_close($connect);

?>

</body>
</html>

