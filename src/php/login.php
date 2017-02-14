<?php
  require "database.php";
  $email = htmlspecialchars($_POST["email"]);
  $password = $_POST["password"];
  $rememberMe = $_POST["remember"] == "true" ? true : false;
  $users = DB::query("SELECT Email FROM users");
  $correctUser = false;
  foreach($users as $user)
  {
    if($user["Email"] == $email)
    {
      $correctUser = true;
    }
  }
  if($correctUser)
  {
    $user = DB::queryFirstRow("SELECT * FROM users WHERE Email=%s", $email);
  if(password_verify($password, $user["Password"]))
  {

    session_start();
    $_SESSION["user_email"] = htmlspecialchars_decode($user["Email"]);
    if($rememberMe)
    {
      setcookie("user_email", $email, time() * 60 * 60 * 24 * 365);
    }
    $user["Firstname"] = htmlspecialchars_decode($user["Firstname"]);
    $user["Surname"] = htmlspecialchars_decode($user["Surname"]);
    $user["FullName"] = htmlspecialchars_decode($user["FullName"]);
    echo json_encode(array("LoggedIn" => "true", "User" => $user));
  }
  else {
    echo json_encode(array("LoggedIn" => "false", "User" => null));
  }
}else {
  echo json_encode(array("LoggedIn" => "false", "User" => null));
}
?>
