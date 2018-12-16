function rideComponent(ride) {
    let options = null;

    if(ride.customer.id !== localStorage.getItem('authentication_token')) {
        options =  "onclick=addCustomerRideModal(" + ride.id + ")"
    }

    return "<div class='row ride' data-ride-id="+ ride.id +" data-customer-id='"+ ride.customer.id + "'" +
        options +
        ">"+
        "<div class='col-xs-2'>" +
        ride.start_time +
        "</div> " +

        "<div class='col-xs-2'>" +
        ride.slots +
        "/4</div> " +

        "<div class='col-xs-3 origin'> " +
        ride.origin +
        "</div> " +

        "<div class='col-xs-3 destination'> " +
        ride.destination +
        "</div> " +

        "<div class='col-xs-1'> " +
        "<i class='fa fa-map-marker-alt ride-path' data-toggle='modal' data-target='#followRideModal'></i>" +
        "</div> " +

    "</div>"
}

function customerRideComponent(ride) {
    let rideType = null;
    if(ride.customer.id === localStorage.getItem('authentication_token')) {
        rideType = 'ride-offer'
    } else {
        rideType = 'ride-wanted'
    }
    return "<div class='row ride "+ rideType +"' data-customer-id='"+ ride.customer.id + "' data-ride-id='"+ ride.id + "'>" +

        "<div class='col-xs-2'>" +
        ride.start_time +
        "</div> " +


        "<div class='col-xs-2'>" +
        ride.slots +
        "/4</div> " +

        "<div class='col-xs-3'> " +
        ride.origin +
        "</div> " +

        "<div class='col-xs-3'> " +
        ride.destination +
        "</div> " +


        "<div class='col-xs-1'> " +
        "<a href=\"geo:latitude,longitude\"><i class='fa fa-compass'></i></a>" +
        "</div> " +

        "<div class='col-xs-1'> " +
        "<i class='fa fa-star ratings' data-toggle='modal' data-target='#ratingsModal'></i>" +
        "</div> " +

        "</div>"
}

function userRatingComponent(customer_ride) {
    return "<div class='row ride' data-customer-ride-id='"+ customer_ride.id + "'>" +

    "<div class='col-xs-2'>" +
    customer_ride.customer.firstname +
    "</div> " +

    "<div class='col-xs-6'>" +
    "<input type='text' id='rating-value' value='"+ (customer_ride.rating !== null ? customer_ride.rating : '') +"'> " +
    "</div> " +

    "<div class='col-xs-2'>" +
    "<button class='submit-rating'>Avaliar</button>" +
    "</div> " +

    "</div>"
}

