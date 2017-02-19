var userData = [];
$(document).ready(function() {
    $.ajax({
        url: "php/pulluserdetails.php",
        dataType: "json",
        method: "get",
        success: function(response) {
            var html = ' <nav class="navbar static-top navbar-toggleable-md navbar-light bg-faded">'
            html += '<button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#mainNavbar" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">';
            html += '<span class="navbar-toggler-icon"></span>';
            html += '</button>';
            html += '<a class="navbar-brand" href="#">Oxylus</a>';
            html += '<div class="collapse navbar-collapse" id="mainNavbar">';
            html += '<div class="navbar-nav">'
            html += '<a class="nav-item nav-link" href="index.php" id="navhome">Home</a>';
            html += '<a class="nav-item nav-link" href="storelist.php" id="navproducts">Products</a>';
            html += '<a class="nav-item nav-link" id="navbasket" href="basket.php">Basket</a>';
            html += '<div id="userspace"></div>';
            html += '</div></div></nav>';
            html += '<div class="modal fade" id="loginmodal" tabindex="-1" role="dialog" aria-labelledby="loginModal">';
            html += '<div class="modal-dialog modal-lg" role="document">';
            html += '<div class="modal-content">';
            html += '<div class="modal-header">';
            html += '<h5 class="modal-title">Login</h5>';
            html += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
            html += '<span aria-hidden="true">&times;</span>';
            html += '</button>';
            html += '</div>';
            html += '<div class="modal-body">';
            html += '<ul class="nav nav-tabs nav-justified" role="tablist">';
            html += '<li class="nav-item">';
            html += '<a class="nav-link active" data-toggle="tab" href="#login" role="tab">Login</a>';
            html += '</li>';
            html += '<li class="nav-item">';
            html += '<a class="nav-link" data-toggle="tab" href="#register" role="tab">Register</a>';
            html += '</li>';
            html += '</ul>';
            html += '<div class="tab-content">';
            html += '<div class="tab-pane active" id="login" role="tabpanel">';
            html += '<form id="login-form" method="post">';
            html += '<div class="form-group">';
            html += '<label  for="email">Email Address:</label>';
            html += '<input class=" form-control" type="email" name="email" id="loginemail" placeholder="Enter Email Address"/>';
            html += '</div>';
            html += '<div class="form-group">';
            html += '<label  for="password">Password:</label>';
            html += '<input class="form-control" type="password" id="loginpassword" name="password" placeholder="Enter Password"/>';
            html += '</div>';
            html += '<div class="form-check">';
            html += '<label class="form-check-label" for="remember">';
            html += '<input class="form-check-input" id="loginremember" type="checkbox" name="remember" value="true">Remember Me?</label>';
            html += '</div>';
            html += '</form>';
            html += '<div class="alert alert-danger" role="alert" id="loginerror" style="visibility: hidden;">';
            html += '<strong>Login Failed</strong> Invalid Username or Password</div>';
            html += '<button type="button" class="btn btn-primary" onclick="validateLogin();">Login</button>';
            html += '</div>';
            html += '<div class="tab-pane" id="register" role="tabpanel">';
            html += '<form id="register-form" method="post">';
            html += '<div class="form-group">';
            html += '<label for="firstname">Firstname:</label>';
            html += '<input class=" form-control" type="text" name="firstname" id="registerfirstname" placeholder="Enter Firstname"/>';
            html += '</div>';
            html += '<div class="form-group">';
            html += '<label for="surname">Surname:</label>';
            html += '<input class=" form-control" type="text" name="surname" id="registersurname" placeholder="Enter Surname"/>';
            html += '</div>';
            html += '<div class="form-group">';
            html += '<label for="email">Email Address:</label>';
            html += '<input class=" form-control" type="email" name="email" id="registeremail" placeholder="Enter Email Address"/>';
            html += '</div>';
            html += '<div class="form-group">';
            html += '<label for="password">Password:</label>';
            html += '<input class="form-control" type="password" id="registerpassword" name="password" placeholder="Enter Password"/>';
            html += '</div>';
            html += '<div class="form-group">';
            html += '<label for="password">Confirm Password:</label>';
            html += '<input class=" form-control" type="password" id="registerconfirmpassword" name="confirmpassword" placeholder="Confirm Password"/>';
            html += '</div>';
            html += '</form>';
            html += '<div class="alert" role="alert" id="registererror" style="visibility: hidden;"></div>';
            html += '<button type="button" class="btn btn-primary" onclick="registerAccount();">Create Account</button>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';


            $("body").prepend(html);
            loginActivate(response);
            var url = window.location.pathname;
            var filename = url.substring(url.lastIndexOf('/') + 1);
            switch (filename) {
                case "index.php":
                    $("#navhome").toggleClass("active");
                    break;
                case "storelist.php":
                    $("#navproducts").toggleClass("active");
                    break;
                case "basket.php":
                    $("#navbasket").toggleClass("active");
                    break;
            }
            printBasket();
        }
    });

});

function loginActivate(response) {
    html = "";
    if (response.LoggedIn == "true") {
        userData = response.User;
        html = '<p class="nav-item nav-link">Welcome back, ' + response.User.FullName + '</p>';
    } else {
        html += '<a class="nav-item nav-link" style="cursor: pointer;" data-toggle="modal" data-target="#loginmodal" id="style="cursor: pointer;">Login</a>';
    }
    $("#userspace").html(html);
}



function printBasket() {
    var basket = JSON.parse(localStorage.getItem("basket"));
    if (basket != null) {
        if (basket.length > 0) {
            $("#navbasket").html('<span class="badge badge-default">' + basket.length + "</span> Basket");
        }
    }
}

function validateLogin() {
    console.log($('#loginemail').val());
    $.ajax({
        url: "php/login.php",
        method: "post",
        dataType: "json",
        data: {
            email: $("#loginemail").val(),
            password: $("#loginpassword").val(),
            remember: $("#loginremember").is(":checked")
        },
        success: function(response) {
            console.log(response);
            if (response.LoggedIn == "true") {
                loginActivate(response);
                $("#loginmodal").modal("hide");
            } else {
                $("#loginerror").css("visibility", "visible");
            }
        }
    });
}

function registerAccount() {
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/g;
    if ($("#registerpassword").val() === $("#registerconfirmpassword").val() && passwordRegex.test($('#registerpassword').val())) {
        $.ajax({
            url: "php/newuser.php",
            method: "post",
            dataType: "json",
            data: {
                email: $("#registeremail").val(),
                password: $("#registerpassword").val(),
                firstname: $("#registerfirstname").val(),
                surname: $("#registersurname").val()
            },
            success: function(response) {
                if (response.SameUsername == "true") {
                    $("#registererror").removeClass("alert-success");
                    $("#registererror").addClass("alert-danger");
                    $("#registererror").html("<strong>Register Failed</strong> Email has already been used.");
                } else {
                    $("#registererror").removeClass("alert-danger");
                    $("#registererror").addClass("alert-success");
                    $("#registererror").html("<strong>Register Success</strong> You can now login on the previous tab.");
                }

            }
        });
    } else {
        $("#registererror").removeClass("alert-success");
        $("#registererror").addClass("alert-danger");
        if (!passwordRegex.test($("#registerpassword").val())) {
            $("#registererror").html("<strong>Register Failed</strong> Passwords is not complex enough. It should contain 8-16 characters with at least one capital, one lowercase and one number");
        } else {
            $("#registererror").html("<strong>Register Failed</strong> Passwords do not match");
        }
        $('#registererror').css("visibility", "visible");

    }
}
