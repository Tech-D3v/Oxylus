<?php
  require "database.php";
  if(!isset($_SESSION))
  {
    session_start();
  }
  $loggedIn = isset($_SESSION["user_email"]);
  $loggedInCookie = isset($_COOKIE["user_email"]);
  if($loggedIn)
  {
    $userEmail = htmlspecialchars($_SESSION["user_email"]);
    $result = DB::queryFirstRow("SELECT * FROM users WHERE Email=%s", $userEmail);
    echo json_encode(array("LoggedIn" => "true", "User" => $result));
  }
  else if($loggedInCookie)
  {
    $userEmail = $_COOKIE["user_email"];
    $result = DB::queryFirstRow("SELECT * FROM users WHERE Email=%s", $userEmail);
    $_SESSION["user_email"] = htmlspecialchars_decode($userEmail);
    echo json_encode(array("LoggedIn" => "true", "User" => $result));
  }
  else {
    echo json_encode(array("LoggedIn" => "false", "User" => null));
  }

?>
