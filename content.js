//*****************************//
// running once to initialize //
var currentdate = new Date(); 
var welcomeMessage = "";
if(currentdate.getHours() < 11 && currentdate.getHours() > 4){
	welcomeMessage = "Good Morning, "
	}
else if(currentdate.getHours() >= 12){
	welcomeMessage = "Good Afternoon, "
	}
else if(currentdate.getHours() >= 17){
	welcomeMessage = "Good Evening, "
	}
else if(currentdate.getHours() >= 21 && currentdate.getHours() <= 4){
	welcomeMessage = "Good Afternoon "
	}
else {
	welcomeMessage = "Ya failed!";
	}

(function(name) {
	var nameString = "Gavri";
	name.getElementsByTagName("name")[0].innerHTML = welcomeMessage + nameString;
})(this.document);

(function(d) {
	var date = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear();
	
  d.getElementsByTagName("date")[0].innerHTML = date;
})(this.document);


(function(c){
	var time = currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();			
	  c.getElementsByTagName("time")[0].innerHTML = time;

})(this.document);  
//*****************************//

//____________________//
setInterval(function(){
var welcomeMessage = "";
var currentdate = new Date(); 
if(currentdate.getHours() < 11 && currentdate.getHours() > 4){
	welcomeMessage = "Good Morning, "
	}
else if(currentdate.getHours() >= 12){
	welcomeMessage = "Good Afternoon, "
	}
else if(currentdate.getHours() >= 17){
	welcomeMessage = "Good Evening, "
	}
else if(currentdate.getHours() >= 21 && currentdate.getHours() <= 4){
	welcomeMessage = "Good Afternoon "
	}
else {
	welcomeMessage = "Ya failed!";
	}


(function(name) {
	var nameString = "Gavri";
	name.getElementsByTagName("name")[0].innerHTML = welcomeMessage + nameString;
})(this.document);

(function(d) {
	var date = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear();
	
  d.getElementsByTagName("date")[0].innerHTML = date;
})(this.document);


(function(c){
	var time = currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();			
	  c.getElementsByTagName("time")[0].innerHTML = time;

})(this.document);   
}, 1000);