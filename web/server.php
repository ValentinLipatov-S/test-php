<?php
$dbconn = pg_connect("
	host     = ec2-54-75-228-85.eu-west-1.compute.amazonaws.com
	dbname   = ddrgbsg3qokpc2
	user     = kbpivkrmvdkauu
	password = 0p_EhxRACs9Q2b96sZ5Fs3zK_m
")or die('Could not connect: ' . pg_last_error());

$database_name_users = "users";
$database_name_chatrooms = "chatrooms";
$database_name_messages = "messages";

$comand     = $_GET["comand"];
$firstname  = $_GET['user_firstname'];
$secondname = $_GET['user_secondname'];
$login      = $_GET['user_login'];
$password   = $_GET['user_password'];


$person_id;
$person_firstname;
$person_secondname;

switch ($comand)
{
	// Create DataBases
    case "create_database_users": 
    {
        try 
        {  
            $query = "CREATE TABLE " . $database_name_users . " (
            user_id SERIAL,
            user_firstname TEXT NOT NULL,
            user_secondname TEXT NOT NULL,
            user_login TEXT NOT NULL,
            user_password TEXT NOT NULL)";
            $result = pg_query($query) or die(pg_last_error());
            echo "SUCCESS";
        } 
        catch (Exception $e) 
        {
            echo "ERROR<-msg->Database are not created.";
        }    
    } break; 
	
	case "create_database_chatrooms": 
    {
        try 
        {  
            $query = "CREATE TABLE " . $database_name_chatrooms . " (
            chatroom_id SERIAL,
            user_id INT NOT NULL,
            chatroom_name TEXT NOT NULL,
			chatroom_password TEXT NOT NULL)";
            $result = pg_query($query) or die(pg_last_error());
            echo "SUCCESS";
        } 
        catch (Exception $e) 
        {
            echo "ERROR<-msg->Database are not created.";
        }    
    } break; 
	
	case "create_database_messages": 
    {
        try 
        {  
            $query = "CREATE TABLE " . $database_name_messages . " (
            message_id SERIAL,
            user_id INT NOT NULL,
			chatroom_id INT NOT NULL,
            message_text TEXT NOT NULL)";
            $result = pg_query($query) or die(pg_last_error());
            echo "SUCCESS";
        } 
        catch (Exception $e) 
        {
            echo "ERROR<-msg->Database are not created.";
        }    
    } break;
    
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//Login_Registration
    case "registration": 
    {
        if(isset($firstname) and isset($secondname) and isset($login) and isset($password))
        {
			if($firstname != "" and $secondname != "" and $login != "" and $password != "")
			{
				if(strlen($firstname) > 2 and strlen($secondname) > 2 and strlen($login) > 5 and strlen($password) > 5 and strlen($firstname) < 21 and strlen($secondname) < 21 and strlen($login) < 31 and strlen($password) < 31)
				{
					$query = "SELECT * FROM " . $database_name_users . " WHERE user_login = '$login' LIMIT 1";
					$result = pg_query($query) or die(pg_last_error());
					if(pg_num_rows($result) == 0)
					{
						$query = "INSERT INTO " . $database_name_users . " (user_firstname, user_secondname, user_login, user_password) VALUES ('$firstname', '$secondname', '$login', '$password')";
						$result = pg_query($query) or die(pg_last_error());
						echo "SUCCESS<-msg->Registered user.";
					}
					else 
					{
						echo "ERROR<-msg->User with such login is already registered.";
					}
				}
				else 
				{
					echo "ERROR<-msg->Length:<br>first name: 3 - 20;<br>second name: 3 - 20;<br>login name: 6 - 30;<br>password: 6 - 30;";
				}
			}
			else
			{
				echo "ERROR<-msg->No value name or last name or login or password.";
			}
        }
        else 
        {
            echo "ERROR<-msg->No value name or last name or login or password.";
        }
    } break;
        
		
		
		
		
		
		
		
		
		
		
		
		
		
    case "autorization": 
    {
        if(isset($login) and isset($password))
        {
			if($login != "" and $password != "")
			{
				$query = "SELECT * FROM " . $database_name_users . " WHERE user_login = '$login' LIMIT 1";
				$result = pg_query($query) or die(pg_last_error());
				if(pg_num_rows($result) > 0)
				{
					$line = pg_fetch_array($result, null, PGSQL_ASSOC);
					if($line["user_password"] == $password)
					{
						echo "SUCCESS<-msg->Authorizated user.";
					}
					else
					{
						echo "ERROR<-msg->Incorrect password.";
					}
				}
				else
				{
					echo "ERROR<-msg->Incorrect login.";
				}
			}
			else
			{
				echo "ERROR<-msg->No value login or password.";
			}
        }
        else 
        {
            echo "ERROR<-msg->No value login or password.";
        }
    } break;
	
	
	
	function Person($log, $pas)
	{
		if($log != "" and $pas != "")
		{
			$query = "SELECT * FROM " . $database_name_users . " WHERE user_login = '$log' LIMIT 1";
			$result = pg_query($query) or die(pg_last_error());
			$line = pg_fetch_array($result, null, PGSQL_ASSOC);
			if($line["user_password"] == $pas)
			{
				$person_id         = $line["user_id"];
				$person_firstname  = $line["user_firstname"];
				$person_secondname = $line["user_secondname"];		
				return true;				
			}
			return false;
		}
		return false;
	}
	
	
	case "chatrooms": 
    {
        if(isset($_GET["user_login"]) and isset($_GET["user_password"]))
        {	
			$flag = Person($_GET["user_login"], $_GET["user_password"]);
			if($flag == true)
			{
				$text = "";
				$query = "SELECT * FROM " . $database_name_chatrooms . " WHERE user_id = " . $person_id;
				$result = pg_query($query) or die(pg_last_error());
				while ($line = pg_fetch_array($result, null, PGSQL_ASSOC)) 
				{
					$text = $text . $line["chatroom_id"] . "<-id->" . $line["chatroom_name"] . "<-name->";
				}
				echo $text;	
			}
        }
    } break;

	case "chatroom_create": 
    {
        if(isset($_GET["user_login"]) and isset($_GET["user_password"]) and isset($_GET["chatroom_name"]) and isset($_GET["chatroom_password"]))
        {
			$flag = Person($_GET["user_login"], $_GET["user_password"]);
			if($flag == true and $_GET["chatroom_name"] != "")
			{
				$query = "INSERT INTO " . $database_name_chatrooms . " (user_id, chatroom_name, chatroom_password) VALUES ('$person_id', '$_GET[chatroom_name]', '$_GET[chatroom_password]')";
				$result = pg_query($query) or die(pg_last_error());
				echo "SUCCESS";
			}
        }
    } break;
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
    
    case "show_users":
    {
        $query = "SELECT * FROM " . $database_name_users;
        $result = pg_query($query) or die(pg_last_error());
        echo "<table>\n";
        while ($line = pg_fetch_array($result, null, PGSQL_ASSOC)) 
        {
            echo "\t<tr>\n";
            foreach ($line as $col_value) 
            {
                echo "\t\t<td>$col_value</td>\n";
            }
            echo "\t</tr>\n";
        }
	    echo "</table>\n";
    }break;
	
    case "show_chatrooms":
    {
        $query = "SELECT * FROM " . $database_name_chatrooms;
        $result = pg_query($query) or die(pg_last_error());
        echo "<table>\n";
        while ($line = pg_fetch_array($result, null, PGSQL_ASSOC)) 
        {
            echo "\t<tr>\n";
            foreach ($line as $col_value) 
            {
                echo "\t\t<td>$col_value</td>\n";
            }
            echo "\t</tr>\n";
        }
	    echo "</table>\n";
    }break;
	
	 case "show_messages":
    {
        $query = "SELECT * FROM " . $database_name_messages;
        $result = pg_query($query) or die(pg_last_error());
        echo "<table>\n";
        while ($line = pg_fetch_array($result, null, PGSQL_ASSOC)) 
        {
            echo "\t<tr>\n";
            foreach ($line as $col_value) 
            {
                echo "\t\t<td>$col_value</td>\n";
            }
            echo "\t</tr>\n";
        }
	    echo "</table>\n";
    }break;
	
	
	
	
	
	
	
    default: 
    {
        echo "ERROR<-msg->Unknow comand.";
    } break;
	
	
	
	
	
	
	
	
	
}
pg_free_result($result);
pg_close($dbconn);
?>
