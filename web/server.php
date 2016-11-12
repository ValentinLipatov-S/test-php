<?php
$dbconn = pg_connect("
	host     = ec2-54-75-228-85.eu-west-1.compute.amazonaws.com
	dbname   = ddrgbsg3qokpc2
	user     = kbpivkrmvdkauu
	password = 0p_EhxRACs9Q2b96sZ5Fs3zK_m
")or die('Could not connect: ' . pg_last_error());

switch ($_GET["comand"])
{
    case "create_database": 
    {
        try 
        {  
            $query = "CREATE TABLE users (
            user_id SERIAL,
            user_firstname TEXT NOT NULL,
            user_secondname TEXT NOT NULL,
            user_login TEXT NOT NULL,
            user_password TEXT NOT NULL)";
            $result = pg_query($query) or die(pg_last_error());
            echo "SUCCESS table users is created";
			
			$query = "CREATE TABLE chatrooms (
            chatroom_id SERIAL,
            user_id INT NOT NULL,
            chatroom_name TEXT NOT NULL,
			chatroom_password TEXT NOT NULL)";
            $result = pg_query($query) or die(pg_last_error());
            echo "SUCCESS table chatrooms is created";
			
			$query = "CREATE TABLE messages (
            message_id SERIAL,
            user_id INT NOT NULL,
			chatroom_id INT NOT NULL,
            message_text TEXT NOT NULL)";
            $result = pg_query($query) or die(pg_last_error());
            echo "SUCCESS table messages is created";
        } 
        catch (Exception $e) 
        {
            echo "ERROR<-msg->Database are not created.";
        }    
    } break; 
    
    case "registration": 
    {
        if(isset($_GET['user_firstname']) and isset($_GET['user_secondname']) and isset($_GET['user_login']) and isset($_GET['user_password']))
        {
			if($_GET['user_firstname'] != "" and $_GET['user_secondname'] != "" and $_GET['user_login'] != "" and $_GET['user_password'] != "")
			{
				if(strlen($_GET['user_firstname']) > 2 and strlen($_GET['user_secondname']) > 2 and strlen($_GET['user_login']) > 5 and strlen($_GET['user_password']) > 5 and strlen($_GET['user_firstname']) < 21 and strlen($_GET['user_secondname']) < 21 and strlen($_GET['user_login']) < 31 and strlen($_GET['user_password']) < 31)
				{
					$query = "SELECT * FROM users WHERE user_login = '$_GET[user_login]' LIMIT 1";
					$result = pg_query($query) or die(pg_last_error());
					if(pg_num_rows($result) == 0)
					{
						$query = "INSERT INTO users (user_firstname, user_secondname, user_login, user_password) VALUES ('$_GET[user_firstname]', '$_GET[user_secondname]', '$_GET[user_login]', '$_GET[user_password]')";
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
					echo "ERROR<-msg->Length fields: 3 - 30 letters";
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
        if(isset($_GET['user_login']) and isset($_GET['user_password']))
        {
			if($_GET['user_login'] != "" and $_GET['user_password'] != "")
			{
				$query = "SELECT * FROM users WHERE user_login = '$_GET[user_login]' LIMIT 1";
				$result = pg_query($query) or die(pg_last_error());
				if(pg_num_rows($result) > 0)
				{
					$line = pg_fetch_array($result, null, PGSQL_ASSOC);
					if($line["user_password"] == $_GET['user_password'])
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
	
	case "chatrooms_search": 
    {
        if(isset($_GET["user_login"]) and isset($_GET["user_password"]) and isset($_GET["chatrooms_search_text"]))
        {	
			if($_GET["user_login"] != "" and $_GET["user_password"] != "")
			{
				$query = "SELECT * FROM users WHERE user_login = '$_GET[user_login]' LIMIT 1";
				$result = pg_query($query) or die(pg_last_error());
				if(pg_num_rows($result) > 0)
				{
					$line = pg_fetch_array($result, null, PGSQL_ASSOC);
					if($line["user_password"] == $_GET["user_password"])
					{
						$person_id         = $line["user_id"];
						$person_firstname  = $line["user_firstname"];
						$person_secondname = $line["user_secondname"];		
						$text = "";
						if($_GET["chatrooms_search_text"] != "")$query = "SELECT * FROM chatrooms WHERE chatroom_name = '$_GET[chatrooms_search_text]'";
						else $query = "SELECT * FROM chatrooms";
						$result = pg_query($query) or die(pg_last_error());
						while ($line = pg_fetch_array($result, null, PGSQL_ASSOC)) 
						{
							$text = $text . $line["chatroom_id"] . "<-id->" . $line["chatroom_name"] . "<-name->";
						}
						echo $text;		
					}
				}
			}
        }
    } break;
	
	case "chatrooms": 
    {
        if(isset($_GET["user_login"]) and isset($_GET["user_password"]))
        {	
			if($_GET["user_login"] != "" and $_GET["user_password"] != "")
			{
				$query = "SELECT * FROM users WHERE user_login = '$_GET[user_login]' LIMIT 1";
				$result = pg_query($query) or die(pg_last_error());
				if(pg_num_rows($result) > 0)
				{
					$line = pg_fetch_array($result, null, PGSQL_ASSOC);
					if($line["user_password"] == $_GET["user_password"])
					{
						$person_id         = $line["user_id"];
						$person_firstname  = $line["user_firstname"];
						$person_secondname = $line["user_secondname"];		
						$text = "";
						$query = "SELECT * FROM chatrooms";
						$result = pg_query($query) or die(pg_last_error());
						while ($line = pg_fetch_array($result, null, PGSQL_ASSOC))
						{
							$pas_chat;
							if($line["chatroom_password"] != "")$pas_chat = "private";
							else $pas_chat = "public";
							$text = $text . $line["chatroom_id"] . "<-id->" . $line["chatroom_name"] . "<-id->" . $pas_chat ."<-name->";
						}
						echo $text;		
					}
				}
			}
        }
    } break;
	case "chatroom_connect":
	{
		if(isset($_GET["user_login"]) and isset($_GET["user_password"]) and isset($_GET["chatroom_id"]) and isset($_GET["chatroom_password"]))
        {	
			if($_GET["user_login"] != "" and $_GET["user_password"] != "" and $_GET["chatroom_id"] != "")
			{
				$query = "SELECT * FROM users WHERE user_login = '$_GET[user_login]' LIMIT 1";
				$result = pg_query($query) or die(pg_last_error());
				if(pg_num_rows($result) > 0)
				{
					$line = pg_fetch_array($result, null, PGSQL_ASSOC);
					if($line["user_password"] == $_GET["user_password"])
					{
						$person_id         = $line["user_id"];
						$person_firstname  = $line["user_firstname"];
						$person_secondname = $line["user_secondname"];		
						$query = "SELECT * FROM chatrooms WHERE chatroom_id = '$_GET[chatroom_id]' LIMIT 1";
							$result = pg_query($query) or die(pg_last_error());
							if(pg_num_rows($result) > 0)
							{
								$line = pg_fetch_array($result, null, PGSQL_ASSOC);
								if($line["chatroom_password"] == $_GET['chatroom_password'])
								{
									echo "SUCCESS<-msg->Chat is opening.";
								}
								else
								{
									echo "ERROR<-msg->Incorrect password.";
								}
							}
							else
							{
								echo "ERROR<-msg->error autorization.";
							}
					}
				}
			}
			else
			{
				echo "ERROR<-msg->null element";
			}
        }
	}break;
	case "chatroom_create": 
    {
        if(isset($_GET["user_login"]) and isset($_GET["user_password"]) and isset($_GET["chatroom_name"]) and isset($_GET["chatroom_password"]))
        {
			if($_GET["user_login"] != "" and $_GET["user_password"] != "" and $_GET["chatroom_name"] != "")
			{
				$query = "SELECT * FROM users WHERE user_login = '$_GET[user_login]' LIMIT 1";
				$result = pg_query($query) or die(pg_last_error());
				if(pg_num_rows($result) > 0)
				{
					$line = pg_fetch_array($result, null, PGSQL_ASSOC);
					if($line["user_password"] == $_GET["user_password"])
					{
						$person_id         = $line["user_id"];
						$person_firstname  = $line["user_firstname"];
						$person_secondname = $line["user_secondname"];	
						$val = $line['user_id'];
						$query = "INSERT INTO chatrooms (user_id, chatroom_name, chatroom_password) VALUES ('$val', '$_GET[chatroom_name]', '$_GET[chatroom_password]')";
						$result = pg_query($query) or die(pg_last_error());
						echo "SUCCESS";
					}
				}
			}
        }
    } break;
	
	case "set_message":
	{
		if(isset($_GET["user_login"]) and isset($_GET["user_password"]) and isset($_GET["chatroom_id"]) and isset($_GET["message_text"]))
        {
			if($_GET["user_login"] != "" and $_GET["user_password"] != "")
			{
				$query = "SELECT * FROM users WHERE user_login = '$_GET[user_login]' LIMIT 1";
				$result = pg_query($query) or die(pg_last_error());
				if(pg_num_rows($result) > 0)
				{
					$line = pg_fetch_array($result, null, PGSQL_ASSOC);
					if($line["user_password"] == $_GET["user_password"])
					{
						$person_id         = $line["user_id"];
						$person_firstname  = $line["user_firstname"];
						$person_secondname = $line["user_secondname"];	
						
						$val = $line['user_id'];
						$query = "INSERT INTO messages (user_id, chatroom_id, message_text) VALUES ('$val', '$_GET[chatroom_id]', '$_GET[message_text]')";
						$result = pg_query($query) or die(pg_last_error());
						echo "SUCCESS";
					}
				}
			}
        }
	}break;
	
	case "get_message":
	{
		if(isset($_GET["user_login"]) and isset($_GET["user_password"]) and isset($_GET["chatroom_id"]) and isset($_GET["message_id"]))
        {
			if($_GET["user_login"] != "" and $_GET["user_password"] != "")
			{
				$query = "SELECT * FROM users WHERE user_login = '$_GET[user_login]' LIMIT 1";
				$result = pg_query($query) or die(pg_last_error());
				if(pg_num_rows($result) > 0)
				{
					$line = pg_fetch_array($result, null, PGSQL_ASSOC);
					if($line["user_password"] == $_GET["user_password"])
					{
						$person_id         = $line["user_id"];
						
						$person_firstname  = $line["user_firstname"];
						$person_secondname = $line["user_secondname"];	
						
						$query = "SELECT * FROM messages WHERE chatroom_id = '$_GET[chatroom_id]'";
						$result = pg_query($query) or die(pg_last_error());						
						$iterator = 1;
						while ($line = pg_fetch_array($result, null, PGSQL_ASSOC)) 
						{
							if($iterator == $_GET["message_id"])
							{
								$msg_text = $line['message_text'];
								$val = $line['user_id'];
								if($val != "" and $msg_text != "")
								{
									$query_1 = "SELECT * FROM users WHERE user_id='$val'";
									$result_1 = pg_query($query_1) or die(pg_last_error());
									$line_1 = pg_fetch_array($result_1, null, PGSQL_ASSOC);
									
									if($line_1['user_firstname'] != "" and $line_1['user_secondname'] != "")
									{
										echo $line_1['user_firstname'] . ' ' . $line_1['user_secondname'] . '<:>' . $msg_text;
									}
								}
								break;
							}
							$iterator++;
						}	
					}
				}
			}
        }
	}break;
	
	case "get_first_id_message":
	{
		if(isset($_GET["user_login"]) and isset($_GET["user_password"]) and isset($_GET["chatroom_id"]))
        {
			if($_GET["user_login"] != "" and $_GET["user_password"] != "")
			{
				$query = "SELECT * FROM users WHERE user_login = '$_GET[user_login]' LIMIT 1";
				$result = pg_query($query) or die(pg_last_error());
				if(pg_num_rows($result) > 0)
				{
					$line = pg_fetch_array($result, null, PGSQL_ASSOC);
					if($line["user_password"] == $_GET["user_password"])
					{
						$person_id         = $line["user_id"];
						$person_firstname  = $line["user_firstname"];
						$person_secondname = $line["user_secondname"];	
						$query = "SELECT * FROM messages WHERE chatroom_id = '$_GET[chatroom_id]'";
						$result = pg_query($query) or die(pg_last_error());
						echo '1' . '<-id->' . pg_num_rows($result);
					}
				}
			}
        }
	}break;
	
	case "get_last_id_message":
	{
		if(isset($_GET["user_login"]) and isset($_GET["user_password"]) and isset($_GET["chatroom_id"]))
        {
			if($_GET["user_login"] != "" and $_GET["user_password"] != "")
			{
				$query = "SELECT * FROM users WHERE user_login = '$_GET[user_login]' LIMIT 1";
				$result = pg_query($query) or die(pg_last_error());
				if(pg_num_rows($result) > 0)
				{
					$line = pg_fetch_array($result, null, PGSQL_ASSOC);
					if($line["user_password"] == $_GET["user_password"])
					{
						$person_id         = $line["user_id"];
						$person_firstname  = $line["user_firstname"];
						$person_secondname = $line["user_secondname"];	
										
						$query = "SELECT * FROM messages WHERE chatroom_id = '$_GET[chatroom_id]'";
						$result = pg_query($query) or die(pg_last_error());						
						echo $_GET["chatroom_id"] . "<-id->" . pg_num_rows($result);
					}
				}
			}
        }
	}break;
	
	
	
	
	
	
	
	

    case "query":
    {
		if(isset($_GET["text"]) and $_GET["text"] != "")
		{
			$query = $_GET["text"];
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
		}
    }break;
	
    default: 
    {
        echo "ERROR<-msg->Unknow comand.";
    } break;
}
pg_free_result($result);
pg_close($dbconn);
?>
