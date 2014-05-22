<?php
	$username = $_REQUEST['username'];
	$password = $_REQUEST['password'];
	
	if($username == "admin" && $password == "starwars")
		return true;
	else
		return false;
?>