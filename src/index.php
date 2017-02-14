<!DOCTYPE html>
<html>
  <head>
    <?php
      session_start();
      require_once "php/cdn.php";
    ?>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="css/style.css" rel="stylesheet" type="text/css"/>
    <script src="js/navbar.js"></script>
    <title>Oxylus</title>
  </head>
  <body>
    <!--Carousel -->
    <div id="mainCarousel" class="carousel slide" data-ride="carousel" style="height: 50em; overflow: hidden;">
      <ol class="carousel-indicators">
        <li data-target="#mainCarousel" data-slide-to="0" class="active"></li>
        <li data-target="#mainCarousel" data-slide-to="1"></li>
        <li data-target="#mainCarousel" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner" role="listbox">
        <div class="carousel-item active">
          <img class="d-block img-fluid carousel-image" src="assets/images/sample1.jpg" alt="First slide">
        </div>
        <div class="carousel-item">
          <img class="d-block img-fluid carousel-image" src="assets/images/sample2.jpg" alt="Second slide">
        </div>
        <div class="carousel-item">
          <img class="d-block img-fluid carousel-image" src="assets/images/sample3.jpg" alt="Third slide">
        </div>
      </div>
      <a class="carousel-control-prev" href="#mainCarousel" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#mainCarousel" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
    <div class="container-fluid">
      <div class="jumbotron">
          <h1 class="display-3">Oxylus</h1>
          <p class="lead">This is Oxylus named by Charles Sin etc. ...............</p>
          <hr class="my-4">
          <p>Check out our shop to purchase our products</p>
          <p class="lead">
            <a class="btn btn-secondary btn-lg" href="storelist.php" role="button">Shop Now!</a>
          </p>
      </div>
    </div>
  </body>
</html>
