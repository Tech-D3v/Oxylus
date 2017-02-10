var shopData = [];

function printShopHTML(id) {
    $(document).ready(function() {
        $.ajax({
            url: "php/pullallproducts.php",
            method: "get",
            dataType: "json",
            success: function(json) {
                shopData = json;
                printShopData(id, null);
            }
        });
    });

}

function printShopData(id, filters) {
    var html = '<div class="row">';
    $.each(shopData, function(key, val) {
        html += '<div class="card product col-md-3">';
        html += '<img class="card-img-top" src="' + val.ProductImagePath + '" alt="' + val.ProductName + '" style="height: 12em; width: 100%">';
        html += '<div class="card-block">';
        html += '<h4 class="card-title">' + val.ProductName + '</h4>';
        html += '<h6 class="card subtitle mb-2 text-muted">£' + val.ProductPrice + '</h6>';
        html += '<p class="card-text">' + val.ProductBasicDescription + '</p>';
        html += '<div class="input-group"><span class="input-group-addon" id="add-quantity' + val.ProductID + '" onclick="increaseQuantity(' + val.ProductID + ');">+</span><input type="text" value="1" id="quantity' + val.ProductID + '" class="form-control" aria-describedby="add-quantity' + val.ProductID + '"><span class="input-group-addon" id="remove-quantity' + val.ProductID + '" onclick="decreaseQuantity(' + val.ProductID + ');">-</span>';
        html += '<div class="input-group-btn"><button onclick="addToBasket(' + val.ProductID + ');" class="btn btn-primary p-2" style="cursor: pointer;">Add to Basket</button></div></div>';
        html += '</div></div>';
    });
    html += '</div>';
    $(id).html(html);
}

function increaseQuantity(id) {
    var text = parseInt($('#quantity' + id).val());
    $('#quantity' + id).val(text + 1);
}

function decreaseQuantity(id) {
    var text = parseInt($('#quantity' + id).val());
    $('#quantity' + id).val(text - 1);
}
