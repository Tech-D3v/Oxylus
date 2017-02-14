<?php
  require "database.php";
  $email = htmlspecialchars($_POST["email"]);
  $password = password_hash($_POST["password"], PASSWORD_DEFAULT);
  $firstname = htmlspecialchars($_POST["firstname"]);
  $surname = htmlspecialchars($_POST["surname"]);
  $fullname = $firstname.' '.$surname;
  $result = DB::query("SELECT Email FROM users");
  $unique = true;
  foreach($result as $row)
  {
    if($row["Email"] == $email)
    {
      $unique = false;
    }
  }
  if($unique)
  {
    DB::insert("users", array("Firstname" => $firstname, "Surname" => $surname, "FullName" => $fullname, "Email" => $email, "Password" => $password));
    echo json_encode(array("SameUsername" => "false"));  
  }
  else {
    echo json_encode(array("SameUsername" => "true"));
  }
?>
