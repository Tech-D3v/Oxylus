<!DOCTYPE html>
<html>
  <head>
    <?php
      require_once "php/cdn.php";
    ?>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="css/style.css" rel="stylesheet" type="text/css"/>
    <script src="js/dependencies/jquery.ui.touch-punch.min.js"></script>
    <script src="js/shopscript.js"></script>
    <script src="js/navbar.js"></script>
    <script>
      $(document).ready(function(){
        printShopHTML('#shoplist', '#categories');
        $(window).load(resizeCards('#shoplist'));
        $(window).resize(resizeCards('#shoplist'));
        $('#slider-range').draggable();
    });
    </script>
  </head>
  <body>
    <div class="container-fluid">
      <div class="card card-block filtercategories">
        <h4>Filter</h4>
        <div id="categories">
        </div>
      </div>
    <div id="shoplist">
    </div>
  </div>
  </body>
</html>
