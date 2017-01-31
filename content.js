chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        console.log("This is a first install!");
    }else if(details.reason == "update"){
        var thisVersion = chrome.runtime.getManifest().version;
        console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
    }
});

function process_bookmark(bookmarks) {

    for (var i =0; i < bookmarks.length; i++) {
        var bookmark = bookmarks[i];
        if (bookmark.url) {
            //console.log("bookmark: "+ bookmark.title + " ~  " + bookmark.url);
			var newName = bookmark.title.replace(/\s+/g, '');
            $(".sidenav").append("<a href='"+bookmark.url+"'>"+newName+"</a>");
            $(".sidenav").append('<p style = "color:white;">______________</p>');

        }
        if (bookmark.children) {
            process_bookmark(bookmark.children);
        }
    }
}

 document.getElementById("myAppWindow").style.width = "0";
    	document.getElementById("openApp").style.visibility = "visible";


//console.log("listing bookmarks: " );
  chrome.bookmarks.getTree( process_bookmark );
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
//console.log(name.nameSaved);
nameString = name.nameSaved;
setName();
});

var nameString = "Click Here to Edit Name";
var DarkSkyKey = "9586c77dc682ad17f93495cd931c700f";
var lat;
var long;
//weather variables
chrome.storage.sync.get("apiKey", function(key) {
//console.log(name.nameSaved);
DarkSkyKey = key.apiKey;
//callWeather();
});
var weatherString = "weather";
var url = "temp!"
var precip = 0;
var summary = "";
var temperature = 0;
var humidity = 0;

$('#changeName').hide();
$('#changeKey').hide();

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
	$("#name").show(150);
	$('#changeName').hide(150);
}
function cancelName(){
	setWelcomeMessage();
	resetName();
	$("#name").show(150);
	$('#changeName').hide(150);
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
	//console.log(hours);
    (function(c) {
        var newHours = hours;
        var zero = "";
        if(hours == 12){
        	status = "PM";
        	newHours = hours;
        	}
			else if (hours == 0){
				newHours = 12;
				status = "AM";
			}
        else if (hours > 12) {
            newHours -= 12;
                    	status = "PM";

        }
		else {
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

navigator.geolocation.getCurrentPosition(successFunction, errorFunction);

function successFunction(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    console.log("lat:" + lat + " long:" + long);
    callWeather();
}

function errorFunction(position) {
    console.log('Error!');
}



//***********WEATHER API AND FUNCTION***********//
//added some security with adding the API key!
function callWeather() {
	if(DarkSkyKey == null || DarkSkyKey.length< 5){
		//console.log("null");
		weatherString = "Right Click to Assign a Key! (Press Go then Refresh)";
		setWeather();
	}
	else {
$.ajax({
    url: "https://api.darksky.net/forecast/"+DarkSkyKey+"/"+lat+","+long,
    method: "GET",
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        if (XMLHttpRequest.readyState == 4) {
            console.log("HTTP Error");
            DarkSkyKey = "null";
            weatherString = "Invalid Key. Right click to change. (Press Go then Refresh)";
            setWeather();
        }
        else if (XMLHttpRequest.readyState == 0) {
            console.log("Network Error");
            DarkSkyKey = "null";
            weatherString = "Invalid Key. Right click to change. (Press Go then Refresh)";
            setWeather();

        }
        else {
            console.log("wat");
            DarkSkyKey = "null";
            weatherString = "Invalid Key. Right click to change. (Press Go then Refresh)";
            setWeather();

        }
    },
    success: function(response) {

        summary = response.currently.summary;
        precip = response.currently.precipProbability;
        temperature = response.currently.temperature;
        humidity = response.currently.humidity;

        setWeatherString();
        setWeather();
    }
})
	}

}
//****//
function setWeatherString(){
	if (temperature < 0) {
        weatherString = "Its " + Math.round(temperature) + " degrees... wear a heavy coat or dont go outside.";
    } else if (temperature < 40) {
        weatherString = "Its " + Math.round(temperature) + " degrees... wear a coat.";
    } else if (temperature < 65) {
        weatherString = "Its " + Math.round(temperature) + " degrees outside... wear a vest.";
    } else if (temperature < 80) {
        weatherString = "Its " + Math.round(temperature) + " degrees outside... vest optional.";
    } else if (temperature < 100) {
        weatherString = "Its " + Math.round(temperature) + " degrees outside... beautiful day, stay hydrated.";
    } else {
        weatherString = "Its " + Math.round(temperature) + " degrees... hydrate or stay indoors.";
    }

	}


function setWeather() {
    (function(weather) {
        weather.getElementsByTagName("weather")[0].innerHTML = weatherString;
    })(this.document);
}

function setWeatherKey(){
	DarkSkyApi = $("#keyInput").val();
	 chrome.storage.sync.set({'apiKey': DarkSkyApi}, function() {

        });
	$("#weather").show(150);
	$('#changeKey').hide(150);
	//callWeather();
	setWeatherString();
	setWeather();
}
function cancelWeatherKey(){
    setWeatherString();
    setWeather();
    //callWeather();
	$("#weather").show(150);
	$('#changeKey').hide(150);


	}
//***********END OF WEATHER API AND FUNCTION***********//
var vibrantColor;
//bing image of the day!!!!!!
$.ajax({
    url: "http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1",
    method: "GET",
    success: function (response) {
        url = "http://bing.com" + response.images[0].url;
        //console.log(url);
        $("body").css("background-image", "url(" + url + ")");
        getImageBrightness(url);
        /*	var img = document.createElement('img');
            img.setAttribute('src', url)
        
        img.addEventListener('load', function() {
            var vibrant = new Vibrant(img);
            var swatches = vibrant.swatches()
            for (var swatch in swatches)
                if (swatches.hasOwnProperty(swatch) && swatches[swatch])
                    //console.log(swatch, swatches[swatch].getHex())
                    //console.log(swatches.Vibrant.rgb);
                    //$(".sidenav a").css("color", "rgb(" + swatches.Vibrant.rgb[0] + "," + swatches.Vibrant.rgb[1] +"," + swatches.Vibrant.rgb[2] + ")");
                
             * Results into:
             * Vibrant #7a4426
             * Muted #7b9eae
             * DarkVibrant #348945
             * DarkMuted #141414
             * LightVibrant #f3ccb4
            
        });
        */
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        if (XMLHttpRequest.readyState == 4) {
            console.log("HTTP Error");
        }
        else if (XMLHttpRequest.readyState == 0) {
            console.log("Network Error");
        }
        else {
            console.log("wat");
        }
    }
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
       //console.log(brightness);

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
	//if(#nameString = $("#nameInput").val() == null){
  document.getElementById("nameButton").addEventListener("click", changeName);
	//}
});
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("cancelName").addEventListener("click", cancelName);
});


$(function() {
    $('#name').on('dblclick', function() {
        $('#changeName').show(100); //show textbox
        $(this).hide(100);
		$('#inputName').focus();
		//$('#changeName').select();
        welcomeMessage = "Would you like to change your name? ";
        resetName();
    });
   });

var stage = true; 
$(function() {
    $('#weather').on('click', function() {	
	if(stage == true){
	weatherString = precip+"% Chance of Precipitation | " + summary + " | Humidity: "+Math.round(humidity*100)+"%";
	    setWeather();
	    stage = false;
	}
	else if (stage == false){
		setWeatherString();
		setWeather();
		stage = true;
		}
	});
});


//change from double click to right click
/*
$(function() {
    $('#weather').on('dblclick', function() {
        $('#changeKey').show(100); //show textbox
        $(this).hide(100);
		$('#inputKey').focus();
		//$('#changeName').select();
    });
   });*/
    
var timeoutId = 0;
$(function () {
    $("#weather").on("contextmenu", function (e) {
        $('#changeKey').show(100); //show textbox
        $(this).hide(100);
        $('#inputKey').focus();
        return false;
    });
});


 document.addEventListener('DOMContentLoaded', function() {
	//if(#nameString = $("#nameInput").val() == null){
  document.getElementById("enterKey").addEventListener("click", setWeatherKey);
  
	//}
});
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("cancelKey").addEventListener("click", cancelWeatherKey);
}); 

$(document).keydown(function(e) {
    if(e.which == 37){
    		if($('#mySidenav').css("width") == "0px"){
        	openNav();
        	//console.log("Left");
        	}
       		else{
       		closeNav();
       		//console.log("Left Off");
       		}

    	}
       if(e.which == 39){
    		if($('#myAppWindow').css("width") == "0px"){
        	openApp();
        	//console.log("right");
        	}
       		else{
       		closeApp();
       		//console.log("right Off");
       		}

    	}
    
    //e.preventDefault(); // prevent the default action (scroll / move caret)
});
  
  
   
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("openNav").addEventListener("click", openNav);
});
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("closeNav").addEventListener("click", closeNav);
});

function openNav() {
    document.getElementById("mySidenav").style.width = "15em";
    	document.getElementById("openNav").style.visibility = "hidden";

}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    	document.getElementById("openNav").style.visibility = "visible";

}




document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("openApp").addEventListener("click", openApp);
});
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("closeApp").addEventListener("click", closeApp);
});
function openApp() {
    document.getElementById("myAppWindow").style.width = "15em";
    	document.getElementById("openApp").style.visibility = "hidden";

}

/* Set the width of the side navigation to 0 */
function closeApp() {
    document.getElementById("myAppWindow").style.width = "0";
    	document.getElementById("openApp").style.visibility = "visible";

}
//*****************************//
setInterval(function() {
    //refresh the time variables
    hours = currentdate.getHours();
    year = currentdate.getFullYear();
    hours = currentdate.getHours();
    minutes = currentdate.getMinutes();
    currentdate = new Date();
	//refresh the time
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