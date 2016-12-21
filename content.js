chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        console.log("This is a first install!");
    }else if(details.reason == "update"){
        var thisVersion = chrome.runtime.getManifest().version;
        console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
    }
});



//*****************************//
//Date and Time
var currentdate = new Date();
var dateDay = currentdate.getDate();
var month = currentdate.getMonth()
var monthString = "";
var year = currentdate.getFullYear();
var hours = currentdate.getHours();
var minutes = currentdate.getMinutes();
var status = "AM";
//message and text
var welcomeMessage = "";
var brightness = 0;
chrome.storage.sync.get("nameSaved", function(name) {
console.log(name.nameSaved);
nameString = name.nameSaved;
setName();
});

var nameString = "Click Here to Edit Name";

//weather variables
var weatherString = "weather";
var url = "temp!"
var DarkSkyKey = "5dc4dd4d38441fc51019644eecc7f199";

$('#changeName').hide();
//find name of month from number
switch (month) {
    case 0:
        monthString = "January ";
        break;
    case 1:
        monthString = "February ";
        break;
    case 2:
        monthString = "March ";
        break;
    case 3:
        monthString = "April ";
        break;
    case 4:
        monthString = "May ";
        break;
    case 5:
        monthString = "June ";
        break;
    case 6:
        monthString = "July ";
        break;
    case 7:
        monthString = "August ";
        break;
    case 8:
        monthString = "September ";
        break;
    case 9:
        monthString = "October ";
        break;
    case 10:
        monthString = "November ";
        break;
    case 11:
        monthString = "December ";
        break;
    default:
        monthString = "This probably shoud not happen";
        break;
}

//run all the functions once
setWelcomeMessage();
setName();
setTheDate();
setTheTime();

//****//
function setWelcomeMessage() {
    if(hours <= 4){
    	welcomeMessage = "Good Evening, "
    	}
    else if (hours <= 12) {
        welcomeMessage = "Good Morning, "
    }  
    else if (hours < 17) {
        welcomeMessage = "Good Afternoon, "
    }  
    else if (hours >= 17) {
        welcomeMessage = "Good Evening, "
    } 
    
    (function(message) {
        message.getElementsByTagName("message")[0].innerHTML = welcomeMessage;
    })(this.document);
    }


function setName(){

    	(function(Name) {

        Name.getElementsByTagName("name")[0].innerHTML = nameString;
    })(this.document);
    	 }
    	 
    	 
function resetName(){
	(function(Name) {
        Name.getElementsByTagName("message")[0].innerHTML = welcomeMessage;
    })(this.document);
    (function(Name) {
        Name.getElementsByTagName("name")[0].innerHTML = nameString;
    })(this.document);
	}
	
function changeName(){
	nameString = $("#nameInput").val();
	 chrome.storage.sync.set({'nameSaved': nameString}, function() {

        });
	setWelcomeMessage();
	resetName();
	$("#name").show(500);
	$('#changeName').hide(500);
}

//****//

function setTheDate() {
    (function(d) {
        var date = monthString +
            dateDay + ", " +
            year;
        d.getElementsByTagName("date")[0].innerHTML = date;
    })(this.document);
}
//****//
function setTheTime() {
    (function(c) {
        var newHours = hours;
        var zero = "";
        if (hours > 12) {
            status = "PM";
            newHours -= 12;
        } else {
            newHours = hours;
            status = "AM";
        }
        if (minutes < 10) {
            zero = "0";
        }

        var time = newHours + ":" + zero +
            minutes + " " +
            status;
        c.getElementsByTagName("time")[0].innerHTML = time;

    })(this.document);
}

//***********WEATHER API AND FUNCTION***********//
//
$.ajax({
    url: "https://api.darksky.net/forecast/"+DarkSkyKey+"/40.893247,-74.011654",
    method: "GET"
}).done(function(response) {
    console.log(response.currently.temperature);
    if (response.currently.temperature < 0) {
        weatherString = "Its " + Math.round(response.currently.temperature) + " degrees... wear a heavy coat or dont go outside.";
    } else if (response.currently.temperature < 40) {
        weatherString = "Its " + Math.round(response.currently.temperature) + " degrees... wear a coat.";
    } else if (response.currently.temperature < 65) {
        weatherString = "Its " + Math.round(response.currently.temperature) + " degrees outside... wear a vest.";
    } else if (response.currently.temperature < 80) {
        weatherString = "Its " + Math.round(response.currently.temperature) + " degrees outside... vest optional.";
    } else if (response.currently.temperature < 100) {
        weatherString = "Its " + Math.round(response.currently.temperature) + " degrees outside... beautiful day, stay hydrated.";
    } else {
        weatherString = "Its " + Math.round(response.currently.temperature) + " degrees... hydrate or stay indoors.";
    }
    setWeather();
});
//****//
function setWeather() {
    (function(weather) {
        weather.getElementsByTagName("weather")[0].innerHTML = weatherString;
    })(this.document);
}
//***********END OF WEATHER API AND FUNCTION***********//

//bing image of the day!!!!!!
$.ajax({
    url: "http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1",
    method: "GET"
}).done(function(response) {
    url = "http://bing.com" + response.images[0].url;
    console.log(url);
    $("body").css("background-image", "url(" + url + ")");
    getImageBrightness(url);

});

//****//
function getImageBrightness(imageSrc) {
    var img = document.createElement("img");
    img.src = imageSrc;
    img.style.display = "none";
    document.body.appendChild(img);

    var colorSum = 0;

    img.onload = function() {
        // create canvas
        var canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);

        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;
        var r, g, b, avg;

        for (var x = 0, len = data.length; x < len; x += 4) {
            r = data[x];
            g = data[x + 1];
            b = data[x + 2];

            avg = Math.floor((r + g + b) / 3);
            colorSum += avg;
        }

        brightness = Math.floor(colorSum / (this.width * this.height));
        console.log(brightness);

        if (brightness < 200) {
            $(".contrast").css("-webkit-text-fill-color", "white");
            //$(".contrast").css("-webkit-text-stroke", "0.02em black");
            $(".contrast").css("text-shadow", "0 0 0.5em black, 0 0 1em black");


        } else {

            $(".contrast").css("-webkit-text-fill-color", "black");
            $(".contrast").css("-webkit-text-stroke", "0.01px white");
            $(".contrast").css("text-shadow", "0 0 1px white, 0 0 5px white");

        }

    }
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("nameButton").addEventListener("click", changeName);
});

$(function() {
    $('#name').on('dblclick', function() {
        $('#changeName').show("medium"); //show textbox
        $(this).fadeOut(500);
        welcomeMessage = "Would you like to change your name?";
        resetName();
    });
   });
   
   
   
//*****************************//
setInterval(function() {
    //refresh the time variables
    hours = currentdate.getHours();
    year = currentdate.getFullYear();
    hours = currentdate.getHours();
    minutes = currentdate.getMinutes();
    currentdate = new Date();
	//refresh time
    setTheTime();
}, 1000);
/*
        _         _         _         _    
       | |       | |       | |       | |   
   __ _| | ____ _| | ____ _| | ____ _| | __
  / _` | |/ / _` | |/ / _` | |/ / _` | |/ /
 | (_| |   < (_| |   < (_| |   < (_| |   < 
  \__, |_|\_\__, |_|\_\__, |_|\_\__, |_|\_\
   __/ |     __/ |     __/ |     __/ |     
  |___/     |___/     |___/     |___/      */