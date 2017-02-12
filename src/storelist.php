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
    <!-- Navbar -->
    <nav class="navbar static-top navbar-toggleable-md navbar-light bg-faded">
      <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#mainNavbar" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <a class="navbar-brand" href="index.php">Oxylus</a>
      <div class="collapse navbar-collapse" id="mainNavbar">
        <div class="navbar-nav">
          <a class="nav-item nav-link" href="index.php">Home</a>
          <a class="nav-item nav-link active" href="storelist.php">Shop</a>
        </div>
      </div>
    </nav>

    <nav class="navbar navbar-toggleable-md navbar-light bg-faded" style="background-color: #E3E3E3;">
      <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#shopNavbar" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle Shop Navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <a class="navbar-brand" href="">Shop</a>
      <div class="collapse navbar-collapse" id="shopNavbar">
        <div class="navbar-nav">
          <a class="nav-item nav-link" id="basket">Basket</a>
        </div>
      </div>
    </nav>


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
