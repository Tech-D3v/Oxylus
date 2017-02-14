<?php
  require "database.php";
  $result = null;
  if(isset($_GET["ids"]))
  {
    $ids = json_decode($_GET["ids"]);
    $result = array();
    foreach($ids as $id)
    {
      $result[] = DB::queryFirstRow("SELECT * FROM products WHERE ProductID=%i", $id);
    }
  }
  else {
    $result = DB::query("SELECT * FROM products");
  }

  echo json_encode($result);
?>
