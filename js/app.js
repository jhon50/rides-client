let API_URL = 'https://secure-cove-69833.herokuapp.com/api/v1/';
// let API_URL = 'http://localhost:8080/api/v1/';

let GEOLOCATOR_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDqAyNTIc2S2A2WErrJdaGk1Gg0jurta9k';

$(document).ready(function () {
    console.log(localStorage.authentication_token);
    if (typeof localStorage.authentication_token === 'undefined') {
        $('#loginModal').modal('show');
    } else {
        loadRides();

        $('#loadCustomerRides').on('click', function() {
            loadCustomerRides();
        });

        $('#ratings').on('click', function() {
            alert('hehe')
        });
    }
    //
    // $('#followRideModal').on('stylechanged', function () {
    //     if(this.style.display == 'block') {
    //
    //     }
    // });


});
//
// (function() {
//     orig = $.fn.css;
//     $.fn.css = function() {
//         var result = orig.apply(this, arguments);
//         $(this).trigger('stylechanged');
//         return result;
//     }
// })();


function login() {
    let phone = {
        phone: $("#phone").val()
    };

    $.ajax({
        type: "POST",
        url: API_URL + 'customers/login',
        data: JSON.stringify(phone),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            localStorage.setItem('authentication_token', data);
            $('#loginModal').modal('hide');
        },
        error: function () {
            alert("Não foi possível encontrar o usuário");
        },
        dataType: 'text'
    });
}


function showAlert(message) {
    let alert = $(".alert");
    $(".alert .message").html(message);
    alert.show();
    alert.delay(4000).slideUp(200);
}

function loadMap(ride) {
    // retrieve lat long
    let origin      = $(ride).find('.origin').text();
    let destination = $(ride).find('.destination').text();

    let response = getGeolocatorAsyncJSON(origin.split(' ').join('+'));

    let origin_lat  = response.results[0].geometry.location.lat;
    let origin_lng  = response.results[0].geometry.location.lng;

    response     = getGeolocatorAsyncJSON(destination.split(' ').join('+'));

    let destination_lat  = response.results[0].geometry.location.lat;
    let destination_lng  = response.results[0].geometry.location.lng;

    $('#followRideModal .modal-body').html(
        "<iframe id='route' width=\"350\" height=\"450\" frameborder=\"0\" style=\"border:0\" src=\"https://www.google.com/maps/embed/v1/directions?origin="+ origin_lat +"," + origin_lng + "&destination="+ destination_lat +"," + destination_lng + "&key=AIzaSyDqAyNTIc2S2A2WErrJdaGk1Gg0jurta9k\" allowfullscreen></iframe>"
    )
}

function getGeolocatorAsyncJSON(address) {
    return $.ajax({
        url: GEOLOCATOR_API_URL+"&address=" + address,
        async: false
    }).responseJSON;
}

function loadRatings(ride_id) {
    $(".user-ratings").html('');
    $.ajax({
        type: "GET",
        url: API_URL + 'customer_rides/ride/' + ride_id,
        success: function (data) {
            let customer_rides = JSON.parse(data);
            customer_rides.forEach(function(ride) {
                $(userRatingComponent(ride)).prependTo($(".user-ratings"));
            });

            $(".submit-rating").on('click', function() {
                let user_rating      = $(this).closest('.ride');
                let customer_ride_id = $(user_rating).data('customer-ride-id');
                let rating           = $(user_rating).find("#rating-value").val();
                submitRating(customer_ride_id, rating)
            })
        },
        error: function () {
            alert("Nenhum usuário encontrado.");
        },
        dataType: 'text'
    });
}

function submitRating(customer_ride_id, rating_value) {
    let rating = {
        customer_ride_id: customer_ride_id,
        rating: rating_value
    };

    $.ajax({
        type: "POST",
        url: API_URL + 'customer_rides/rate',
        data: JSON.stringify(rating),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log('avaliação bem sucedida');
            showAlert("Avaliação feita com sucesso!")
        },
        error: function () {
            alert("Não foi possível avaliar o usuário");
        },
        dataType: 'text'
    });
}