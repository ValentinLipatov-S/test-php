<?php
$dbconn = pg_connect("host=ec2-54-75-228-85.eu-west-1.compute.amazonaws.com dbname=ddrgbsg3qokpc2 user=kbpivkrmvdkauu password=0p_EhxRACs9Q2b96sZ5Fs3zK_m")or die('Could not connect: ' . pg_last_error());
if($_GET["type"] == "create")
{
	$query = 'CREATE TABLE users_login (id INT NOT NULL AUTO_INCREMENT, firstname TEXT, secondname TEXT, login TEXT, password TEXT)';
	$result = pg_query($query) or die('error: ' . pg_last_error());
	echo "execute";
}
if($_GET["type"] == "get")
{
	$query = 'SELECT * FROM users';
	$result = pg_query($query) or die(pg_last_error());
    $line = pg_fetch_array($result, null, PGSQL_ASSOC)
	echo $line["name"];
}
if($_GET["type"] == "set")
{
	$query = "INSERT INTO users_login VALUES('', '$_GET[firstname]', '$_GET[secondname]', '$_GET[login]', '$_GET[password]')";
	$result = pg_query($query) or die('error: ' . pg_last_error());
	echo "execute";
}
function Autorization($login, $password)
{
	$query = "SELECT * FROM users_login WHERE login = '$login' LIMIT 1";
	$result = pg_query($query) or die(pg_last_error());
	$data = mysqli_fetch_assoc($result);
	if($data['password'] === $password)return $data['id'];
	else return "error";
}
if($_GET["type"] == "autorization" and isset($_GET['login']) and isset($_GET['password']))
{
	echo Autorization($_GET['login'], $_GET['password']);
}
pg_free_result($result);
pg_close($dbconn);
?>
