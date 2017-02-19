<!DOCTYPE html>
<html>
  <head>
    <?php
      require_once "php/cdn.php";
    ?>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="css/style.css" rel="stylesheet" type="text/css"/>
    <script src="js/navbar.js"></script>
    <script>
      $(document).ready(function(){
        $.ajax({
          url: "php/pullindexpage.php",
          dataType: "json",
          method: "get",
          success: function(response)
          {
              $.each(response, function(key, row){
                if(row.Carousel === "true")
                {
                  var html_i = key == 0 ? '<li data-target="#mainCarousel" data-slide-to="' + key + '" class="active"></li>' : '<li data-target="#mainCarousel" data-slide-to="' + key + '"></li>';
                  $("#mainCarouselIndicators").append(html_i);
                  var classes = key == 0 ? 'active' : '';
                  var html_img = '<div class="carousel-item ' + classes + '">';
                  html_img += '<img class="d-block img-fluid carousel-image" src="' + row.ImagePath + '" alt="' + row.Heading + '">';
                  html_img += '<div class="carousel-caption">';
                  html_img += '<h3>' + row.Heading + '</h3>';
                  html_img += '<p>' + row.Subheading + '</p>';
                  html_img += '</div>';
                  html_img += '</div>';
                  $("#mainCarouselInner").append(html_img);
                }
                if(row.Page)
                {
                  var side = key % 2 == 0 ? "left" : "right";
                  var img_side = key % 2 == 0 ? "right" : "left";
                  var html_img = '<div class="col-md-6 no-padding mainimage mainimage-' + img_side + '">';
                  html_img += '<img src="' + row.ImagePath + '" alt="' + row.Heading + '" class="img-fluid">';
                  html_img += '</div>';
                  var html = '<div class="col-md-6 no-padding mainpromo-' + side + '">';
                  html += '<div class="mainpromo">';
                  html += '<h1>' + row.Heading + '</h1>';
                  html += '<h6>' + row.Subheading + '</h6>';
                  html += '<p>' + row.Text + '</p>';
                  html += '<br/>';
                  html += '<a href="brand.php?id=' + row.BrandID + '" class="btn btn-secondary btn-bottom" role="button">Shop Now!</a>';
                  if(key % 2 == 0)
                  {
                    $(".mainspace").append(html);
                    $(".mainspace").append(html_img);
                  }
                  else {
                    $(".mainspace").append(html_img);
                    $(".mainspace").append(html);
                  }

                }
              });
          }
        });
        $('#mainCarousel').carousel({
          interval: 6000,
          pause: "hover",
          wrap: true
        });
      });
    </script>
    <title>Oxylus</title>
  </head>
  <body>
    <!--Carousel -->
    <div id="mainCarousel" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators" id="mainCarouselIndicators">
      </ol>
      <div class="carousel-inner" id="mainCarouselInner" role="listbox">
      <a class="carousel-control-prev" href="#mainCarousel" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#mainCarousel" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
    <div class="row container-fluid mainspace">
      </div>
    </div>
  </body>
</html>
