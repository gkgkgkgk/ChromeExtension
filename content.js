//*****************************//

var currentdate = new Date(); 
var welcomeMessage = "";
var dateDay = currentdate.getDate();
var month = currentdate.getMonth()
var year = currentdate.getFullYear();
var hours = currentdate.getHours();
var minutes = currentdate.getMinutes();
var seconds = currentdate.getSeconds();
var status = "AM";
var weatherString = "weather";
setWelcomeMessage();
setName();
setTheDate();
setTheTime();

function setWelcomeMessage(){
if(hours <= 12 && hours > 4){
	welcomeMessage = "Good Morning, "
	}
else if(hours > 12 && hours < 17){
	welcomeMessage = "Good Afternoon, "
	}
else if(hours >= 17){
	welcomeMessage = "Good Evening, "
	}
else {
	welcomeMessage = "Out of bounds";
	}
}
function setName(){
(function(name) {
	var nameString = "Gavri";
	name.getElementsByTagName("name")[0].innerHTML = welcomeMessage + nameString;
})(this.document);
}

function setTheDate(){
(function(d) {
	var date = (month+1) + "/"
                + dateDay  + "/" 
                + year;
	
  d.getElementsByTagName("date")[0].innerHTML = date;
})(this.document);
}

function setTheTime(){
(function(c){
	var newHours = hours;
	if(hours > 12){
		status = "PM";
		newHours -= 12;
		}
	else{
		newHours = hours;
		status = "AM";
		}
	var time = newHours + ":"  
                + minutes + ":" 
                + seconds + " "+
                status;		
	  c.getElementsByTagName("time")[0].innerHTML = time;

})(this.document); 
}

//***********WEATHER API AND FUNCTION***********//

$.ajax({
	url:"https://api.darksky.net/forecast/62296b6b9da67149d9f8d8f4e2949f**/40.893247,-74.011654",
	method:"GET"
	}).done(function(response){
		console.log(response.currently.temperature);
if(response.currently.temperature< 0){
	weatherString = "Its "+response.currently.temperature+" degrees..... ITS FREEZING!";
}
else if(response.currently.temperature< 32){
	weatherString = "Its "+response.currently.temperature+" degrees..... bundle up!";
}
else if(response.currently.temperature< 50){
	weatherString = "Its "+response.currently.temperature+" degrees outside..... you need a light jacket.";
}
else if(response.currently.temperature< 80){
	weatherString = "Its "+response.currently.temperature+" degrees outside..... no need for extra layers!";
}
else if(response.currently.temperature< 100){
	weatherString = "Its "+response.currently.temperature+" degrees outside..... wear shorts and a t-shirt!";
}
else {
	weatherString = "Its "+response.currently.temperature+" degrees..... its boiling out.";
}
setWeather();
});


function setWeather(){
	(function(weather){
		  weather.getElementsByTagName("weather")[0].innerHTML = weatherString;
})(this.document); }
//***********END OF WEATHER API AND FUNCTION***********//






//*****************************//
setInterval(function(){
//get the variables
hours = currentdate.getHours();
year = currentdate.getFullYear();
hours = currentdate.getHours();
minutes = currentdate.getMinutes();
seconds = currentdate.getSeconds();
currentdate = new Date(); 
welcomeMessage = "";
setWelcomeMessage();
setName();
setTheDate();
setTheTime();   
}, 1000);