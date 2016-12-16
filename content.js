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
setWelcomeMessage();
setName();
setTheDate();
setTheTime();
function setWelcomeMessage(){
if(hours < 11 && hours > 4){
	welcomeMessage = "Good Morning, "
	}
else if(hours  >= 12 && hours < 17){
	welcomeMessage = "Good Afternoon, "
	}
else if(hours >= 17 && hours < 21){
	welcomeMessage = "Good Evening, "
	}
else if(hours >= 21 && hours <= 4){
	welcomeMessage = "Good Afternoon "
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
//function
setWelcomeMessage();
setName();
setTheDate();
setTheTime();   
}, 1000);