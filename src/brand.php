<!DOCTYPE html>
<html>
  <head>
    <?php
        require "php/cdn.php";
        require "php/database.php";
    ?>
    <meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<script src="js/shopscript.js"></script>
<script src="js/navbar.js"></script>
<link rel="stylesheet" type="text/css" href="css/style.css"/>
  </head>
  <body>
    <div class="container" style="margin-top: 1em;">
      <div class="row">
    <?php
        $currencyUnit = "£";
        $result = DB::queryFirstRow("SELECT * FROM brands WHERE BrandID=%i", $_GET["id"]);
        $products = DB::query("SELECT * FROM products WHERE ProductBrandID=%i", $_GET["id"]);
        $productHTML = '<div class="card-group">';
        foreach($products as $product)
        {
          $productHTML .= '<div class="card product p-2" id="product'.$product["ProductID"].'">
          <img class="card-img-top'.$product["ProductID"].'" src="'.$product["ProductImagePath"].'" alt="'.$product["ProductName"].'" onclick="storeItem('.$product["ProductID"].');" style="height: 12em; width: 100%">
          <div class="card-block">
          <h4 class="card-title'.$product["ProductID"].'" onclick="storeItem('.$product["ProductID"].');">'.$product["ProductName"].'</h4>
          <h6 class="card subtitle mb-2 text-muted clickable'.$product["ProductID"].'">'.$currencyUnit.$product["ProductPrice"].'</h6>
          <p class="card-text'.$product["ProductID"].'">'.$product["ProductBasicDescription"].'</p></div></div>';
        }
        $productHTML .= "</div>";
        echo '
          <div class="card text-center expanded-product">
            <div class="card-block tab-content">
              <div class="tab-pane fade show active" id="tab-overview" role="tabpanel">
                <h4 class="card-title">'.$result["BrandName"].'</h4>
                <p class="card-text">'.$result["BrandDescription"].'</p>
                '.$productHTML.'
              </div>
              </div>
              <img class="card-img-bottom img-fluid" src="'.$result["BrandImagePath"].'" alt="'.$result["BrandName"].'">
          </div>
          </div>';
    ?>
    </div>
  </div>
</div>
  </div>
  </body>
</html>
