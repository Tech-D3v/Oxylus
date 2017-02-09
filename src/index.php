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
    <title>Oxylus</title>
  </head>
  <body>
    <div class="container-fluid">
    <nav>
      <ul>
        <li><a>Home</a></li>
        <li><a>Test</a></li>
        <li><a>Test</a></li>
      </ul>
    </nav>
    <div id="mainCarousel" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#mainCarousel" data-slide-to="0" class="active"></li>
        <li data-target="#mainCarousel" data-slide-to="1"></li>
        <li data-target="#mainCarousel" data-slide-to="2"></li>
      </ol>

      <div class="carousel-inner" role="listbox">
        <div class="item active">
          <img src="assets/images/sample1.jpeg" alt="Sample 1" class="carousel-image">
        </div>

        <div class="item">
          <img src="assets/images/sample2.jpeg" alt="Sample 2" class="carousel-image">
        </div>

        <div class="item">
          <img src="assets/images/sample3.jpeg" alt="Sample 3" class="carousel-image">
        </div>
      </div>
      <a class="left carousel-control" href="#mainCarousel" role="button" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="right carousel-control" href="#mainCarousel" role="button" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
  </div>

  </body>
</html>
