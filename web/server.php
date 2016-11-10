<?php
$dbconn = pg_connect("
	host     = ec2-54-75-228-85.eu-west-1.compute.amazonaws.com
	dbname   = ddrgbsg3qokpc2
	user     = kbpivkrmvdkauu
	password = 0p_EhxRACs9Q2b96sZ5Fs3zK_m
")or die('Could not connect: ' . pg_last_error());

$database_name = "users";

$comand       = $_GET["comand"];
$firstname  = $_GET['firstname'];
$secondname = $_GET['secondname'];
$login      = $_GET['login'];
$password   = $_GET['password'];


$person_id;
$person_firstname;
$person_secondname;

function GetPerson()
{
    if(isset($login) and isset($password))
    {
        $query = "SELECT * FROM " . $database_name . " WHERE login = '$login' LIMIT 1";
        $result = pg_query($query) or die(pg_last_error());
        if(pg_num_rows($result) > 0)
        {
            $line = pg_fetch_array($result, null, PGSQL_ASSOC);
            if($line["password"] == $password)
            {
                $person_id         = $line["id"];
                $person_firstname  = $line["firstname"];
                $person_secondname = $line["secondname"];
                return "SUCCESS";  
            }
            else
            {
                 return "ERROR";
            }
        }
        else
        {
             return "ERROR";
        }
    }
}
switch ($comand)
{
    case "create_database": 
    {
        try 
        {  
            $query = "CREATE TABLE " . $database_name . " (
            id SERIAL,
            firstname TEXT NOT NULL,
            secondname TEXT NOT NULL,
            login TEXT NOT NULL,
            password TEXT NOT NULL)";
            $result = pg_query($query) or die(pg_last_error());
            echo "SUCCESS";
        } 
        catch (Exception $e) 
        {
            echo "ERROR:<-msg->Database are not created.";
        }    
    } break; 
    
    case "registration": 
    {
        if(isset($firstname) and isset($secondname) and isset($login) and isset($password))
        {
            $query = "INSERT INTO " . $database_name . " (firstname, secondname, login, password) VALUES ('$firstname', '$secondname', '$login', '$password')";
            $result = pg_query($query) or die(pg_last_error());
            echo "SUCCESS";
        }
        else 
        {
            echo "ERROR:<-msg->No value name or last name or login or password.";
        }
    } break;
        
    case "autorization": 
    {
        if(isset($login) and isset($password))
        {
            $query = "SELECT * FROM " . $database_name . " WHERE login = '$login' LIMIT 1";
            $result = pg_query($query) or die(pg_last_error());
            if(pg_num_rows($result) > 0)
            {
                $line = pg_fetch_array($result, null, PGSQL_ASSOC);
                if($line["password"] == $password)
                {
                    echo "SUCCESS";
                }
                else
                {
                    echo "ERROR:<-msg->Incorrect password.";
                }
            }
            else
            {
                echo "ERROR:<-msg->Incorrect login.";
            }
        }
        else 
        {
            echo "ERROR:<-msg->No value login or password.";
        }
    } break;
    
    case "show":
    {
        $query = "SELECT * FROM " . $database_name;
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
        echo "ERROR:<-msg->Unknow comand.";
    } break;
}
pg_free_result($result);
pg_close($dbconn);
?>