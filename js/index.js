//Trips Array
const arrTrips = [
    {
        name: "Cruise",
        price: "1500",
        destination: "Here to There",
        image: "trip_card1.png"
    }
];

$(document).ready(function (){

    loadTrips();

    $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=Pretoria&appid=080d424667c71d61175ec451ac296a23",
        success: function(data){
            console.log(data);
        }
    });

});

//Load all trips
function loadTrips() {

    console.log(arrTrips);

    for (let i = 0; i < arrTrips.length; i++) {
        const trip = arrTrips[i];

        console.log(trip.name);

        //Select the tripsContainer then add the plant card
        $("#tripsContainer").append($("#tripCardTemplate").html());

        //Create a variable that contains the most recently added trip card
        let currentChild = $("#tripsContainer").children().eq(i + 1);

        //Set the content for the current trip card from the trip array
        $(currentChild).find("#name-text").text(trip.name);
        $(currentChild).find("#card-price").text(trip.price);
        $(currentChild).find("#card-destination").text(trip.destination);
        $(currentChild).find(".card-img-top").attr('src', '../assets/' + trip.image);

        //Hide the description text from the current card
        $(currentChild).find("#card-price").hide();
        $(currentChild).find("#card-destination").hide();
        $(currentChild).find("#purchase-head").hide();
        $(currentChild).find("#card-button").hide();
    };

};

//When a trip card is clicked
$("#tripsContainer").on('click', '.card', function () {

    //Toggle information
    $(this).find("#card-price").toggle();
    $(this).find("#card-destination").toggle();
    $(this).find("#purchase-head").toggle();
    $(this).find("#card-button").toggle();

    //Resize the image to fit the additional content
    $(this).find(".card-img-top").toggleClass("small");

});