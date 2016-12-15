var currentdate = new Date(); 

(function(name) {
	var nameString = "Gavri";
	name.getElementsByTagName("name")[0].innerHTML = "Welcome,"+ nameString;
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

setTimeout(function(){
   window.location.reload(1);
}, 1000);