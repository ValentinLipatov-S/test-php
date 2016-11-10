<?php
$dbconn = pg_connect("
	host     = ec2-54-75-228-85.eu-west-1.compute.amazonaws.com
	dbname   = ddrgbsg3qokpc2
	user     = kbpivkrmvdkauu
	password = 0p_EhxRACs9Q2b96sZ5Fs3zK_m
")or die('Could not connect: ' . pg_last_error());
if($_GET["type"] == "get")
{
	$query = 'SELECT * FROM users';
	$result = pg_query($query) or die(pg_last_error());
    	$line = pg_fetch_array($result, null, PGSQL_ASSOC);
	echo $line["name"];
}
pg_free_result($result);
pg_close($dbconn);
?>
