<?php
$dbconn = pg_connect("host=ec2-54-75-233-142.eu-west-1.compute.amazonaws.com dbname=d49ap8m67d6okt user=gjowfbdepubgzi password=EMRp_nMC4f46cvcYTCm3Lr_jcs")or die('Could not connect: ' . pg_last_error());
if($_GET["type"] == "create")
{
	$query = 'CREATE TABLE users (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, firstname TEXT, secondname TEXT, login TEXT, password TEXT)';
	$result = pg_query($query) or die(pg_last_error());
}
if($_GET["type"] == "get")
{
	$query = 'SELECT * FROM users';
	$result = pg_query($query) or die(pg_last_error());
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
	$query = "INSERT INTO users ('name') VALUES ('$_GET[name]')";
	$result = pg_query($query) or die(pg_last_error());
}





function Autorization($login, $password)
{
	$query = "SELECT * FROM users WHERE login = '$login' LIMIT 1";
	$result = pg_query($query) or die(pg_last_error());
	$data = mysqli_fetch_assoc($result);
	if($data['password'] === $password)	return $data['id'];
	else return "error";
}






if($_GET["type"] == "autorization" and isset($_GET['login']) and isset($_GET['password']))
{
	$aut = Autorization($_GET['login'], $_GET['password'])
	if($aut === "error")
	{
		echo "error<-msg->login or password";
	}
	else 
	{
		echo "sucess<-msg->";
	}
	
}
if($_GET["type"] == "registration")
{
	$query = "INSERT INTO users VALUES ('', '$_GET[firstname]', '$_GET[secondname]', '$_GET[login]', '$_GET[password]')";
	$result = pg_query($query) or die(pg_last_error());
}















pg_free_result($result);
pg_close($dbconn);
?>
