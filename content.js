//*****************************//
var currentdate = new Date();
var welcomeMessage = "";
var dateDay = currentdate.getDate();
var month = currentdate.getMonth()
var monthString = "";
var year = currentdate.getFullYear();
var hours = currentdate.getHours();
var minutes = currentdate.getMinutes();
var status = "AM";
var weatherString = "weather";
var url = "temp!"
var brightness = 0;



switch(month){
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
	monthString = "This probably wont happen";
	break;
}
setWelcomeMessage();
setName();
setTheDate();
setTheTime();




function setWelcomeMessage() {
    if (hours <= 12 && hours > 4) {
        welcomeMessage = "Good Morning, "
    } else if (hours > 12 && hours < 17) {
        welcomeMessage = "Good Afternoon, "
    } else if (hours >= 17) {
        welcomeMessage = "Good Evening, "
    } else {
        welcomeMessage = "Again, This probably wont happen";
    }
}

function setName() {
    (function(name) {
        var nameString = "Gavri";
        name.getElementsByTagName("name")[0].innerHTML = welcomeMessage + nameString +".";
    })(this.document);
}

function setTheDate() {
    (function(d) {
        var date = monthString + 
            dateDay +", " +
            year;

        d.getElementsByTagName("date")[0].innerHTML = date;
    })(this.document);
}

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
		if(minutes<10){
			zero = "0";
		}
		
        var time = newHours + ":" + zero+
            minutes + " " +
            status;
        c.getElementsByTagName("time")[0].innerHTML = time;

    })(this.document);
}

//***********WEATHER API AND FUNCTION***********//
//
$.ajax({
    url: "https://api.darksky.net/forecast/f1f08a02e482dfe09be8bb7c33d1d1b3/40.893247,-74.011654",
    method: "GET"
}).done(function(response) {
    console.log(response.currently.temperature);
    if (response.currently.temperature < 0) {
        weatherString = "Its " + response.currently.temperature + " degrees... wear a heavy coat or dont go outside.";
    } else if (response.currently.temperature < 40) {
        weatherString = "Its " + response.currently.temperature + " degrees... wear a coat.";
    } else if (response.currently.temperature < 65) {
        weatherString = "Its " + response.currently.temperature + " degrees outside..... wear a vest.";
    } else if (response.currently.temperature < 80) {
        weatherString = "Its " + response.currently.temperature + " degrees outside..... vest optional.";
    } else if (response.currently.temperature < 100) {
        weatherString = "Its " + response.currently.temperature + " degrees outside..... beautiful day, stay hydrated.";
    } else {
        weatherString = "Its " + response.currently.temperature + " degrees..... hydrate or stay indoors.";
    }
    setWeather();
});


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

        if (brightness < 150) {
        	 $(".contrast").css("-webkit-text-fill-color", "white");
            $(".contrast").css("-webkit-text-stroke", "0.01em black");
            $(".contrast").css("text-shadow", "0 0 1px black, 0 0 3px black");


        }
        else{

        	 $(".contrast").css("-webkit-text-fill-color", "black");
             $(".contrast").css("-webkit-text-stroke", "0.01px white");
            $(".contrast").css("text-shadow", "0 0 1px white, 0 0 5px white");

        	}
        	
    }
}



//*****************************//
setInterval(function() {

    //get the variables
    hours = currentdate.getHours();
    year = currentdate.getFullYear();
    hours = currentdate.getHours();
    minutes = currentdate.getMinutes();
    currentdate = new Date();
    welcomeMessage = "";
    setWelcomeMessage();
    setName();
    setTheDate();
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