<?php
$dbconn = pg_connect("host=ec2-54-75-228-85.eu-west-1.compute.amazonaws.com dbname=ddrgbsg3qokpc2 user=kbpivkrmvdkauu password=0p_EhxRACs9Q2b96sZ5Fs3zK_m")or die('Could not connect: ' . pg_last_error());
if($_GET["type"] == "create")
{
	$query = 'CREATE TABLE users (name TEXT)';
	$result = pg_query($query) or die('error: ' . pg_last_error());
	echo "execute";
}
if($_GET["type"] == "get")
{
	$query = 'SELECT * FROM users';
	$result = pg_query($query) or die('error: ' . pg_last_error());
	echo "<table>\n";
	while ($line = pg_fetch_array($result, null, PGSQL_ASSOC)) {
		echo "\t<tr>\n";
		foreach ($line as $col_value) {
			echo "\t\t<td>$col_value</td>\n";
		}
		echo "\t</tr>\n";
	}
	echo "</table>\n";
}
if($_GET["type"] == "set")
{
	$query = "INSERT INTO users VALUES('$_GET[name]')";
	$result = pg_query($query) or die('error: ' . pg_last_error());
	echo "execute";
}
pg_free_result($result);
pg_close($dbconn);
?>
