function loadRides() {
    $(".rides").html("");
    $.ajax({
        type: "GET",
        url: API_URL + 'rides',
        success: function (data) {
            let rides = JSON.parse(data);
            rides.forEach(function(ride) {
                $(rideComponent(ride)).prependTo($(".rides"));

                $('.ride-path').on('click', function(){
                    loadMap(this.closest('.ride'));
                })
            });
        },
        error: function () {
            alert("Não foi possível salvar.");
        },
        dataType: 'text'
    });
}

function saveRide() {
    // setar valores dinâmicos
    let ride = {
        destination: $("#destination").val(),
        origin:      $("#origin").val(),
        start_time:  $("#start_time").val(),
        authentication_token: localStorage.getItem('authentication_token')
    };
    console.log(ride)

    $.ajax({
        type: "POST",
        url: API_URL + 'rides',
        data: JSON.stringify(ride),
        contentType: "application/json; charset=utf-8",
        success: function () {
            $('#addRideModal').modal('hide');
            showAlert('Carona salva com sucesso!');
            $(".rides").html('');
            loadRides();
        },
        error: function () {
            alert("Não foi possível salvar.");
        },
        dataType: 'text'
    });
}
