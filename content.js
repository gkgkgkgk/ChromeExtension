/*chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        console.log("This is a first install!");
    }else if(details.reason == "update"){
        var thisVersion = chrome.runtime.getManifest().version;
        console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
    }
});*/
function process_bookmark(bookmarks) {

    for (var i = 0; i < bookmarks.length; i++) {
        var bookmark = bookmarks[i];
        if (bookmark.url) {
            //console.log("bookmark: "+ bookmark.title + " ~  " + bookmark.url);
            var newName = bookmark.title.replace(/\s+/g, '');
            $(".sidenav").append("<a href='" + bookmark.url + "'>" + newName + "</a>");
            $(".sidenav").append('<p style = "color:white;">______________</p>');

        }
        if (bookmark.children) {
            process_bookmark(bookmark.children);
        }
    }
}
document.getElementById("myAppWindow").style.width = "0";
document.getElementById("openApp").style.visibility = "visible";
chrome.bookmarks.getTree(process_bookmark);
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
    if (name.nameSaved == null || !name.nameSaved) {
        nameString = "Right Click Here!"
        console.log(nameString);
    }
    nameString = name.nameSaved;

    setName();
});

var nameString = "Click Here to Edit Name";
var DarkSkyKey = "";
var lat;
var long;
//weather variables


chrome.storage.sync.get("apiKey", function(key) {
    //console.log(name.nameSaved);
    DarkSkyKey = key.apiKey;
    //callWeather();
});

var weatherString = "Retrieving Weather";
(function(weather) {
    weather.getElementsByTagName("weather")[0].innerHTML = weatherString;
})(this.document);

var url = "temp!"
var precip = 0;
var summary = "";
var temperature = 0;
var humidity = 0;
$('#changeName').hide();
$('#changeKey').hide();
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("enterKey").addEventListener("click", setWeatherKey);
    document.getElementById("cancelKey").addEventListener("click", cancelWeatherKey);
    document.getElementById("nameButton").addEventListener("click", changeName);
    document.getElementById("cancelName").addEventListener("click", cancelName);
    document.getElementById("openApp").addEventListener("click", openApp);
    document.getElementById("closeApp").addEventListener("click", closeApp);
    document.getElementById("closeNav").addEventListener("click", closeNav);
    document.getElementById("openNav").addEventListener("click", openNav);
});


$('#headLineWeather').text((precip * 100) + "% Chance of Precipitation | " + summary + " | Humidity: " + Math.round(humidity * 100) + "%");

var days = [5];
for (var i = 0; i < 5; i++) {
    var str = "";
    //console.log(currentdate.getDay());
    var num = 0;
    num = currentdate.getDay() + i;
    if (num == 7) {
        num -= 7;
    }

    console.log(num);
    switch (num) {
        case 0:
            str = "Monday";
            break;
        case 1:
            str = "Tuesday"
            break;
        case 2:
            str = "Wednesday";
            break;
        case 3:
            str = "Thursday";
            break;
        case 4:
            str = "Friday"
            break;
        case 5:
            str = "Saturday";
            break;
        case 6:
            str = "Sunday";
            break;
    }
    days[i] = str;
    $('#day' + (i + 1) + ' h2:first').text(days[i]);

}



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
        monthString = "This probably should not happen";
        break;
}

//run all the functions once
setWelcomeMessage();
setTheDate();
setTheTime();

//****//
function setWelcomeMessage() {
    if (hours <= 4) {
        welcomeMessage = "Good Evening, "
    } else if (hours <= 12) {
        welcomeMessage = "Good Morning, "
    } else if (hours < 17) {
        welcomeMessage = "Good Afternoon, "
    } else if (hours >= 17) {
        welcomeMessage = "Good Evening, "
    }

    (function(message) {
        message.getElementsByTagName("message")[0].innerHTML = welcomeMessage;
    })(this.document);
}


function setName() {

    (function(Name) {

        Name.getElementsByTagName("name")[0].innerHTML = nameString;
    })(this.document);
}


function resetName() {
    (function(Name) {
        Name.getElementsByTagName("message")[0].innerHTML = welcomeMessage;
    })(this.document);
    (function(Name) {
        Name.getElementsByTagName("name")[0].innerHTML = nameString;
    })(this.document);
}

function changeName() {
    nameString = $("#nameInput").val();
    chrome.storage.sync.set({
        'nameSaved': nameString
    }, function() {

    });
    setWelcomeMessage();
    resetName();
    $("#name").show(150);
    $('#changeName').hide(150);
}

function cancelName() {
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
        if (hours == 12) {
            status = "PM";
            newHours = hours;
        } else if (hours == 0) {
            newHours = 12;
            status = "AM";
        } else if (hours > 12) {
            newHours -= 12;
            status = "PM";

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

navigator.geolocation.getCurrentPosition(successFunction, errorFunction, geo_options);

function successFunction(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    console.log("lat:" + lat + " long:" + long);
    var d = new Date();
    console.log("called position: " + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds());
    callWeather();
}

function errorFunction(position) {
    console.log('Error!');
}

var geo_options = {
    maximumAge: 5400000, //wait an hour and a half before updating position, allows for quicker calls to weather api
    timeout: 10000 // wait 10 seconds before giving up on position
};


//***********WEATHER API AND FUNCTION***********//
//added some security with adding the API key!

/* OpenWeatherMapVersion
function callWeather() {
    if (DarkSkyKey == null || DarkSkyKey.length < 5) {
        //console.log("null");
        weatherString = "Right Click to Assign a Key! (Press Go then Refresh)";
        setWeather();
    }
    else {
        

        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid=" + "7e3f2f70d393c8b8d4d55024244b0a45",
            method: "GET"
        })
    .fail(function (XMLHttpRequest, textStatus, errorThrown) {
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
    })
    .done(function (response) {
        summary = response.weather[0].main;
        console.log(response);
        
        if (summary == "Snow") {
            snow(250);
        }
        else if (summary == "Light Snow" || summary == "Flurries") {
            snow(25);
        }
        else if (summary == "rain") {
            rain();
        }

        precip = response.main.pressure;
        temperature = response.main.temp;
        humidity = response.main.humidity;

        setWeatherString();
        setWeather();
   
   });
    }
}
*/

//DARKSKY VERSION
function callWeather() {
    if (DarkSkyKey == null || DarkSkyKey.length < 5) {
        //console.log("null");
        weatherString = "Right Click to Assign a Key! (Press Go then Refresh)";
        setWeather();
    } else {
        $.ajax({
                url: "https://api.darksky.net/forecast/" + DarkSkyKey + "/" + lat + "," + long,
                method: "GET"
            })
            .fail(function(XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.readyState == 4) {
                    console.log("HTTP Error");
                    DarkSkyKey = "null";
                    weatherString = "Invalid Key. Right click to change. (Press Go then Refresh)";
                    setWeather();
                } else if (XMLHttpRequest.readyState == 0) {
                    console.log("Network Error");
                    DarkSkyKey = "null";
                    weatherString = "Invalid Key. Right click to change. (Press Go then Refresh)";
                    setWeather();

                } else {
                    console.log("wat");
                    DarkSkyKey = "null";
                    weatherString = "Invalid Key. Right click to change. (Press Go then Refresh)";
                    setWeather();

                }
            })
            .done(function(response) {
                summary = response.currently.summary;
                console.log(response);

                if (summary == "Snow") {
                    snow(250);
                } else if (summary == "Light Snow" || summary == "Flurries") {
                    snow(25);
                } else if (summary == "rain") {
                    rain();
                }




                for (var num = 0; num < 5; num++) {
                    $('#day' + (num + 1) + ' p:first').html(Math.round(response.daily.data[num + 1].temperatureMin) + '&deg;' + " - " + Math.round(response.daily.data[num].temperatureMax) + '&deg;');
                    $('#day' + (num + 1) + ' p:nth-child(3)').text(response.daily.data[num + 1].summary);
                }
                $('#weekSum').text(response.daily.summary);

                precip = response.currently.precipProbability;
                temperature = response.currently.temperature;
                humidity = response.currently.humidity;

                setWeatherString();
                setWeather();
            });
    }
}
//****//
function setWeatherString() {
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
    var d = new Date();
    console.log("called weather: " + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds());
}

function setWeatherKey() {
    DarkSkyApi = $("#keyInput").val();
    chrome.storage.sync.set({
        'apiKey': DarkSkyApi
    }, function() {});
    $("#weather").show(150);
    $('#changeKey').hide(150);
    //callWeather();
    setWeatherString();
    setWeather();
}

function cancelWeatherKey() {
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
    success: function(response) {
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
    error: function(XMLHttpRequest, textStatus, errorThrown) {
        if (XMLHttpRequest.readyState == 4) {
            console.log("HTTP Error");
        } else if (XMLHttpRequest.readyState == 0) {
            console.log("Network Error");
        } else {
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




$(function() {
    $("#name").on("contextmenu", function(e) {
        $('#changeName').show(100); //show textbox
        $(this).hide(100);
        $('#inputName').focus();
        //$('#changeName').select();
        welcomeMessage = "Would you like to change your name? ";
        resetName();
    });
});


/*
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
*/
var stage = true;
$(function() {
    $('#weather').on('click', function() {
        $('#weather').hide();
        modal.style.display = "block";
                /*if (stage == true) {
            weatherString = precip + "% Chance of Precipitation | " + summary + " | Humidity: " + Math.round(humidity * 100) + "%";
            setWeather();
            stage = false;
        } else if (stage == false) {
            setWeatherString();
            setWeather();
            stage = true;
        }*/

    });
});
var modal = document.getElementById('weatherTab');
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    $(modal).hide("slide", {
        direction: "down"
    }, 250);
    // modal.style.display = "none";
    $('#weather').show("slide", {
        direction: "down"
    }, 500);


}
window.onclick = function(event) {
    if (event.target == modal) {
 $(modal).hide("slide", {
        direction: "down"
    }, 250);
   $('#weather').show("slide", {
        direction: "down"
    }, 500);
    }
}


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
$(function() {
    $("#weather").on("contextmenu", function(e) {
        $('#changeKey').show(100); //show textbox
        $(this).hide(100);
        $('#inputKey').focus();
        return false;
    });
});



$(document).keydown(function(e) {
    if (e.which == 37) {
        if ($('#mySidenav').css("width") == "0px") {
            openNav();
            //console.log("Left");
        } else {
            closeNav();
            //console.log("Left Off");
        }

    }
    if (e.which == 39) {
        if ($('#myAppWindow').css("width") == "0px") {
            openApp();
            //console.log("right");
        } else {
            closeApp();
            //console.log("right Off");
        }

    }

    //e.preventDefault(); // prevent the default action (scroll / move caret)
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

function openNav() {
    document.getElementById("mySidenav").style.width = "15em";
    document.getElementById("openNav").style.visibility = "hidden";

}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("openNav").style.visibility = "visible";

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
//***********************//


function snow(amount) {
    console.log("snow");
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    //canvas dimensions
    var W = window.innerWidth;
    var H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    //snowflake particles
    var mp = amount; //max particles
    var particles = [];
    for (var i = 0; i < mp; i++) {
        particles.push({
            x: Math.random() * W, //x-coordinate
            y: Math.random() * H, //y-coordinate
            r: Math.random() * 4 + 1, //radius
            d: Math.random() * mp //density
        })
    }

    //Lets draw the flakes
    function draw() {
        ctx.clearRect(0, 0, W, H);

        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.beginPath();
        for (var i = 0; i < mp; i++) {
            var p = particles[i];
            ctx.moveTo(p.x, p.y);
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
        }
        ctx.fill();
        update();
    }

    //Function to move the snowflakes
    //angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
    var angle = 0;

    function update() {
        angle += 0.01;
        for (var i = 0; i < mp; i++) {
            var p = particles[i];
            //Updating X and Y coordinates
            //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
            //Every particle has its own density which can be used to make the downward movement different for each flake
            //Lets make it more random by adding in the radius
            p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
            p.x += Math.sin(angle) * 2;

            //Sending flakes back from the top when it exits
            //Lets make it a bit more organic and let flakes enter from the left and right also.
            if (p.x > W + 5 || p.x < -5 || p.y > H) {
                if (i % 3 > 0) //66.67% of the flakes
                {
                    particles[i] = {
                        x: Math.random() * W,
                        y: -10,
                        r: p.r,
                        d: p.d
                    };
                } else {
                    //If the flake is exitting from the right
                    if (Math.sin(angle) > 0) {
                        //Enter from the left
                        particles[i] = {
                            x: -5,
                            y: Math.random() * H,
                            r: p.r,
                            d: p.d
                        };
                    } else {
                        //Enter from the right
                        particles[i] = {
                            x: W + 5,
                            y: Math.random() * H,
                            r: p.r,
                            d: p.d
                        };
                    }
                }
            }
        }
    }

    //animation loop
    setInterval(draw, 33);
}

//}


function rain() {
    console.log("rain");
    var canvas = $('#canvas')[0];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var w = canvas.width;
        var h = canvas.height;
        ctx.strokeStyle = 'rgba(174,194,224,0.5)';
        ctx.lineWidth = 1;
        ctx.lineCap = 'round';


        var init = [];
        var maxParts = 1000;
        for (var a = 0; a < maxParts; a++) {
            init.push({
                x: Math.random() * w,
                y: Math.random() * h,
                l: Math.random() * 1,
                xs: -4 + Math.random() * 4 + 2,
                ys: Math.random() * 10 + 10
            })
        }

        var particles = [];
        for (var b = 0; b < maxParts; b++) {
            particles[b] = init[b];
        }

        function draw() {
            ctx.clearRect(0, 0, w, h);
            for (var c = 0; c < particles.length; c++) {
                var p = particles[c];
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
                ctx.stroke();
            }
            move();
        }

        function move() {
            for (var b = 0; b < particles.length; b++) {
                var p = particles[b];
                p.x += p.xs;
                p.y += p.ys;
                if (p.x > w || p.y > h) {
                    p.x = Math.random() * w;
                    p.y = -20;
                }
            }
        }

        setInterval(draw, 30);

    }
}

/*
        _         _         _         _    
       | |       | |       | |       | |   
   __ _| | ____ _| | ____ _| | ____ _| | __
  / _` | |/ / _` | |/ / _` | |/ / _` | |/ /
 | (_| |   < (_| |   < (_| |   < (_| |   < 
  \__, |_|\_\__, |_|\_\__, |_|\_\__, |_|\_\
   __/ |     __/ |     __/ |     __/ |     
  |___/     |___/     |___/     |___/      */


/*
var skycons = new Skycons({"color": "pink"});
// on Android, a nasty hack is needed: {"resizeClear": true}

// you can add a canvas by it's ID...
skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);

// ...or by the canvas DOM element itself.
skycons.add(document.getElementById("icon2"), Skycons.RAIN);

// if you're using the Forecast API, you can also supply
// strings: "partly-cloudy-day" or "rain".

// start animation!
skycons.play();

// you can also halt animation with skycons.pause()

// want to change the icon? no problem:
skycons.set("icon1", Skycons.PARTLY_CLOUDY_NIGHT);

// want to remove one altogether? no problem:
skycons.remove("icon2");*/