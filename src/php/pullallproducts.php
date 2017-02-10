<?php
  require "database.php";
  $result = DB::query("SELECT * FROM products");
  echo json_encode($result);
?>
