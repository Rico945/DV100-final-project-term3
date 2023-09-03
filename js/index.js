//Trips Array
const arrTrips = [
    {
        name: "Sunderland to Groningen",
        price: "1500",
        destination: "3",
        duration: "2",
        image: "trip_card1.png"
    },
    {
        name: "Quanzhou to Taichung City",
        price: "900",
        destination: "1",
        duration: "1",
        image: "trip_card1.png"
    },
    {
        name: "Miami to The Bahamas",
        price: "500",
        destination: "1",
        duration: "1.5",
        image: "trip_card1.png"
    },
    {
        name: "Barcelona to Rome",
        price: "4500",
        destination: "6",
        duration: "4",
        image: "trip_card1.png"
    },
    {
        name: "Lisbon to Porto",
        price: "2500",
        destination: "3",
        duration: "2",
        image: "trip_card1.png"
    }
];

let appliedFilter = "";

let cartData = [];

$(document).ready(function (){
    
    filterTrips();

    $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=Pretoria&appid=080d424667c71d61175ec451ac296a23",
        success: function(data){
            tempData = data;
            console.log(tempData);
        }
    }).done(function (){
        $("#temp").text("Temperature: " + Math.round(tempData.main.temp - 273) + "°C");
        $("#weather").text("Weather: " + tempData.weather[0].main);
        $("#wind").text("Wind Speed: " + tempData.wind.speed);
    });

    loadCart();

});

//Load all trips
function loadTrips(tripsToShow) {

    $("#tripsContainer").empty();

    for (let i = 0; i < tripsToShow.length; i++) {
        const trip = tripsToShow[i];

        //Select the tripsContainer then add the plant card
        $("#tripsContainer").append($("#tripCardTemplate").html());

        //Create a variable that contains the most recently added trip card
        let currentChild = $("#tripsContainer").children().eq(i);

        //Set the content for the current trip card from the trip array
        $(currentChild).find("#name-text").text(trip.name);
        $(currentChild).find("#card-price").text("R" + trip.price);
        $(currentChild).find("#card-destination").text(trip.destination + " destination/s");
        $(currentChild).find("#card-duration").text(trip.duration + " week/s");
        $(currentChild).find(".card-img-top").attr('src', '../assets/' + trip.image);

        //Hide the description text from the current card
        $(currentChild).find("#card-price").hide();
        $(currentChild).find("#card-destination").hide();
        $(currentChild).find("#card-duration").hide();
        $(currentChild).find("#purchase-head").hide();
        $(currentChild).find("#card-button").hide();
    };

};

//When a filter option is clicked
$("input[name='filterRadio']").click(function(){

    appliedFilter = $(this).attr('value');

    console.log(appliedFilter);
    filterTrips();

});

function filterTrips(){
    let filteredArrTrips = [];

    //Filter trips
    switch (appliedFilter) {
        case "short":
            filteredArrTrips = arrTrips.filter(trip => trip.duration < 2);
            break;
    
        case "long":
            filteredArrTrips = arrTrips.filter(trip => trip.duration >= 2);
            break;

        case "single":
            filteredArrTrips = arrTrips.filter(trip => trip.destination == 1);
            break;

        case "multi":
            filteredArrTrips = arrTrips.filter(trip => trip.destination > 1);
            break;

        case "round":
            filteredArrTrips = arrTrips.filter(trip => trip.destination == 1);
            break;

        case "rowboat":
            filteredArrTrips = arrTrips.filter(trip => trip.price < 1000);
            break;

        default:
            filteredArrTrips = arrTrips;
            break;
    }

    console.log(filteredArrTrips);

    loadTrips(filteredArrTrips);
}

//When a trip card is clicked
$("#tripsContainer").on('click', '.card', function () {

    //Toggle information
    $(this).find("#card-price").toggle();
    $(this).find("#card-destination").toggle();
    $(this).find("#card-duration").toggle();
    $(this).find("#purchase-head").toggle();
    $(this).find("#card-button").toggle();

    //Resize the image to fit the additional content
    $(this).find(".card-img-top").toggleClass("small");

});

function addToCart(){

    let tripName = $("#name-text").text();

    console.log(tripName);

    for (let i = 0; i < arrTrips.length; i++) {
        if (arrTrips[i].name == tripName) {
            const data = [];
            data.push(JSON.stringify(arrTrips[i]));
            localStorage.setItem("cart", data);
            alert("Added item to cart!");
        }
    }

}

//---------------------------------------------------------------------------------------
//Purchase page

function loadCart(){

    cartData = JSON.parse(localStorage.getItem("cart"));
    let items = document.getElementById("cartContainer");

        if (cartData) {

            let name = cartData.name;
            let price = cartData.price;
            let destination = cartData.destination;
            let duration = cartData.duration;

            items.innerHTML += `
            <div class="orderLine">
                <p><strong>Name: </strong>${name}</p>
                <p><strong>Price: </strong>R${price}</p>
                <p><strong>Destination/s: </strong>${destination}</p>
                <p><strong>Duration: </strong>${duration} weeks</p>
            </div>`
        }

}

function checkout(){

    localStorage.removeItem("cart");
    alert("Payment successful! Have a lovely trip!");
    window.location.href = "../index.html";
    
}

function remove(){
    localStorage.removeItem("cart");
    $(".orderLine").remove();
}