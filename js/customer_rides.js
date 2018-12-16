
function addCustomerRideModal(ride_id) {
    let element = $('#addCustomerRideModal');
    element.modal('show');
    element.data('ride_id', ride_id);
}



function loadCustomerRides() {
    $('.rides').html('');
    $.ajax({
        type: "GET",
        url: API_URL + 'customer_rides/' + localStorage.getItem('authentication_token'),
        success: function (data) {
            let rides = JSON.parse(data);
            rides.map(function(e){ return e.ride }).forEach(function(ride) {
                $(customerRideComponent(ride)).prependTo($(".rides"));
            });

            $('.ratings').on('click', function(){
                loadRatings($(this.closest('.ride')).data('ride-id'));
            })
        },
        error: function () {
            alert("Não foi possível salvar.");
        },
        dataType: 'text'
    });
}

function saveCustomerRide() {
    let customer_ride = {
        ride_id: $("#addCustomerRideModal").data('ride_id'),
        authentication_token: localStorage.getItem('authentication_token')
    };

    $.ajax({
        type: "POST",
        url: API_URL + 'customer_rides',
        data: JSON.stringify(customer_ride),
        contentType: "application/json; charset=utf-8",
        success: function () {
            $('#addCustomerRideModal').modal('hide');
            showAlert('Inscrito na carona com sucesso!');
        },
        error: function () {
            alert("Não foi possível salvar.");
        },
        dataType: 'text'
    });
}