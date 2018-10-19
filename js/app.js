let API_URL = 'api/v1/customer';

$(document).ready(function(){
   if(typeof localStorage.session_token === 'undefined') {
       $('#loginModal').modal('show');
   }
});

function login() {
    let p = $("#phone").val()
    console.log(p)
    // $.ajax(API_URL, function(){
    //
    // })
}