<?php
  require_once "database.php";
  $result = DB::query("SELECT * FROM indexpage");
  echo json_encode($result);

?>
