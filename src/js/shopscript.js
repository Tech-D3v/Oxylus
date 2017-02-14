var shopData = [];
var categories = [];

var currencyUnit = "£";
var minPrice = 99999999999.99;
var maxPrice = 0.0;
var currentMin, currentMax = 0.0;
var activeCategories = [];

function printShopHTML(shopID, filterID) {
    $(document).ready(function() {
        $.ajax({
            url: "php/pullallproducts.php",
            method: "get",
            dataType: "json",
            success: function(json) {
                shopData = json;
                printShopData(shopID);
                getCategories(filterID);
            }
        });

    });

}

function printShopData(id) {
    var html = '<div class="d-flex flex-wrap flex-row">';
    $.each(shopData, function(key, val) {
        html += '<div class="card product p-2" id="product' + val.ProductID + '">';
        html += '<img class="card-img-top' + val.ProductID + '" src="' + val.ProductImagePath + '" alt="' + val.ProductName + '" onclick="storeItem(' + val.ProductID + ');" style="height: 12em; width: 100%">';
        html += '<div class="card-block">';
        html += '<h4 class="card-title' + val.ProductID + '" onclick="storeItem(' + val.ProductID + ');">' + val.ProductName + '</h4>';
        html += '<h6 class="card subtitle mb-2 text-muted clickable' + val.ProductID + '">' + currencyUnit + val.ProductPrice + '</h6>';
        html += '<p class="card-text' + val.ProductID + '">' + val.ProductBasicDescription + '</p>';
        //html += '<div class="input-group"><span class="input-group-addon" id="add-quantity' + val.ProductID + '" onclick="increaseQuantity(' + val.ProductID + ');">+</span><input type="text" value="1" id="quantity' + val.ProductID + '" class="form-control" aria-describedby="add-quantity' + val.ProductID + '"><span class="input-group-addon" id="remove-quantity' + val.ProductID + '" onclick="decreaseQuantity(' + val.ProductID + ');">-</span>';
        //html += '<div class="input-group-btn"><button onclick="addToBasket(' + val.ProductID + ', false);" class="btn btn-primary p-2" style="cursor: pointer;">Add to Basket</button></div></div>';
        html += '</div></div>';
    });
    html += '</div>';
    $(id).html(html);
    resizeCards(id);
}

function storeItem(id) {
    window.location.href = "storeitem.php?id=" + id;
}

function addToBasket(id, redirect) {
    basket = null;
    if (localStorage.getItem("basket") != null) {
        basket = JSON.parse(localStorage.getItem("basket"));
        var quantity = parseInt($("#quantity" + id).val());
        var index = -1;
        $.each(basket, function(key, val) {
            if (val.id == id) {
                quantity += val.quantity;
                index = key;
            }
        });
        if (index == -1) {
            basket.push({
                id: id,
                quantity: quantity
            });
        } else {
            basket[index] = {
                id: id,
                quantity: quantity,
            };
        }
        localStorage.setItem("basket", JSON.stringify(basket));
    } else {
        basket = [];
        var quantity = parseInt($("#quantity" + id).val());
        basket.push({
            id: id,
            quantity: quantity,
        });
        localStorage.setItem("basket", JSON.stringify(basket));
    }
    if (redirect) {
        window.location.href = "basket.php";
    } else {
        $("#basket").html('<span class="badge badge-default">' + basket.length + "</span> Basket");
    }

}

function deleteFromBasket(id) {
    var basket = JSON.parse(localStorage.getItem("basket"));
    var index = 0;
    $.each(basket, function(key, val) {
        if (val.id == id) {
            index = key;
        }
    });
    basket.splice(index, 1);
    localStorage.setItem("basket", JSON.stringify(basket));
    if (basket.length > 0) {
        $("#navbasket").html('<span class="badge badge-default">' + basket.length + "</span> Basket");
    } else {
        $("#navbasket").html("Basket");
    }
    printBasketHTML();

}

function printBasketHTML() {
    var basket = JSON.parse(localStorage.getItem("basket"));
    $(document).ready(function() {
        var ids = [];
        var quantities = [];
        $.each(basket, function(key, val) {
            ids.push(val.id);
            quantities[val.id] = val.quantity;
        });
        $.ajax({
            url: "php/pullallproducts.php",
            method: "get",
            dataType: "json",
            data: {
                ids: JSON.stringify(ids)
            },
            success: function(callback) {
                var html = '<div class="card">';
                html += '<h3 class="card-header">Shopping Basket</h3>';
                html += '<div class="card-block">';
                html += '<ul class="list-unstyled">';
                var total = 0.0;
                $.each(callback, function(key, val) {
                    var price = parseFloat(val.ProductPrice);
                    price = price * quantities[val.ProductID];
                    total += price;
                    price = currencyUnit + price;
                    html += '<li class="media">';
                    html += '<img class="d-flex align-self-center mr-3" src="' + val.ProductImagePath + '" alt="' + val.ProductName + '" width="96" height="60">';
                    html += '<div class="media-body">';
                    html += '<h5 class="mt-0">' + val.ProductName + '</h5>';
                    html += '<div class="input-group"><span class="input-group-addon" id="add-quantity' + val.ProductID + '" onclick="increaseQuantity(' + val.ProductID + ');">+</span><input type="text" id="quantity' + val.ProductID + '" value="' + quantities[val.ProductID] + '" class="form-control" aria-describedby="add-quantity' + val.ProductID + '" style="text-align: center;"><span class="input-group-addon" id="remove-quantity' + val.ProductID + '" onclick="decreaseQuantity(' + val.ProductID + ');">-</span><div class="input-group-btn"><button onclick="deleteFromBasket(' + val.ProductID + ');" class="btn btn-danger">Delete</button></div>';
                    html += '<strong class="align-self-center p-2">' + price + '</strong>';
                    html += '</li>';
                    $("#quantity" + val.ProductID).val(quantities[val.ProductID]);
                });
                html += '</ul></div></div>';
                html += '<div class="card" style="float: right; width: 30%; text-align: right;">';
                html += '<div class="card-block">';
                total = currencyUnit + total;
                html += '<strong class="card-text">Total: ' + total + '</strong></div></div>';
                $("#mainBasket").html(html);
            }
        });
    });
}


function getCategories(id) {
    $.each(shopData, function(key, val) {
        var price = parseFloat(val.ProductPrice);
        if (price > maxPrice) {
            maxPrice = price;
        }
        if (price < minPrice) {
            minPrice = price;
        }
        var valCategories = val.ProductCategory.split(",");
        $.each(valCategories, function(key1, val1) {
            if (categories.indexOf(val1) == -1 && val1 != "") {
                categories.push(val1);
            }
        });
    });
    printCategories(id);
}

function printCategories(id) {
    var html = "";
    html += '<div class="input-group"><span class="input-group-addon" id="addon-search">Search</span><input type="text" id="shop-search" class="form-control"  aria-describedby="addon-search"></div>'
    html += '<h6>Price Range</h6><div id="slider-range"><div id="handle0" class="ui-slider-handle"></div><div id="handle1" class="ui-slider-handle" ></div></div>';
    html += '<h6>Categories</h6><div class="list-group">';
    $.each(categories, function(key, val) {
        html += '<button type="button" class="list-group-item list-group-item-action" id="filter' + key + '" onclick="filterClick(' + key + ');">' + val + '<badge</button>';
    });
    html += '</div>';
    $(id).html(html);
    $("#shop-search").on('input', function() {
        filterOut(activeCategories, currentMin, currentMax, $('#shop-search').val());
    });
    $("#slider-range").slider({
        range: true,
        min: Math.floor(minPrice),
        max: Math.ceil(maxPrice),
        values: [Math.floor(minPrice), Math.ceil(maxPrice)],
        create: function() {
            $("#handle0").html('<p>' + currencyUnit + $(this).slider("values", 0) + '</p>');
            $("#handle1").html('<p>' + currencyUnit + $(this).slider("values", 1) + '</p>');
            currentMin = parseFloat($(this).slider("values", 0));
            currentMax = parseFloat($(this).slider("values", 1));
        },
        slide: function(e, ui) {
            $("#handle0").html('<p>' + currencyUnit + ui.values[0] + '</p>');
            $("#handle1").html('<p>' + currencyUnit + ui.values[1] + '</p>');
            currentMin = ui.values[0];
            currentMax = ui.values[1];
            filterOut(activeCategories, currentMin, currentMax, $('#shop-search').val());
        }
    });
}


function filterClick(id) {
    $('#filter' + id).toggleClass("active");
    if (activeCategories.indexOf(categories[id]) == -1) {
        activeCategories.push(categories[id]);
    } else {
        activeCategories.splice(activeCategories.indexOf(categories[id]), 1);
    }
    filterOut(activeCategories, currentMin, currentMax, $('#shop-search').val());
}

function filterOut(filters, price1, price2, text) {
    $.each(shopData, function(key, val) {
        var price = parseFloat(val.ProductPrice);
        if (val.ProductName.includes(text) || val.ProductBasicDescription.includes(text)) {
            if (price >= price1 && price <= price2) {
                if (filters.indexOf(val.ProductCategory) == -1 && filters[0] != null) {
                    $('#product' + val.ProductID).css("display", "none");
                } else {
                    $('#product' + val.ProductID).css("display", "inline-block");
                }
            } else {
                $('#product' + val.ProductID).css("display", "none");
            }
        } else {
            $('#product' + val.ProductID).css("display", "none");
        }
    });
}

function resizeCards(id) {
    var count = shopData.length;
    var size = Math.floor(parseInt($(id).css("width")) / 250);
    var width = parseInt($(id).css("width")) / size;
    $('.product').css("width", width + "px");
}

function increaseQuantity(id) {
    var text = parseInt($('#quantity' + id).val());
    if (text >= 99) {
        $('#quantity' + id).val("99");
    } else {
        $('#quantity' + id).val(text + 1);
    }

}

function decreaseQuantity(id) {
    var text = parseInt($('#quantity' + id).val());
    if (text <= 1) {
        $('#quantity' + id).val("1");
    } else {
        $('#quantity' + id).val(text - 1);
    }
}
