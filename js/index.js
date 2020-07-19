const messageList = [" Hey you ! Welcome on my developper portfolio !", 
"I'm Hugo, a french developper. You can find here some of my projects as well as a regular resume (if you're a recruiter).", 
"If you're interested in any of them, feel free to follow me on <a href=\"https://github.com/Makunda\">Github<\/a>"];

function getTimestampAsString () {
	var objToday = new Date(),
	curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
	curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
	curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
	curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
	return today = "Today at " + curHour + ":" + curMinute + ":" + curSeconds + curMeridiem;
}

function addMessage ( text ) {
	var message = `<div class="message"> <span class="message-timestamp">${getTimestampAsString()}</span></i> - ${text} </div>`;
	document.getElementById('message_chat').innerHTML += message;
}

function setMessageCount ( num ) {
	var els = document.getElementsByClassName("message-badge");
	Array.prototype.forEach.call(els, function(el) {
		el.textContent = num;
	});
}

function displayCursor () {
	var cursorElement = document.getElementById('cursor');
	// Diplay and add bounce animation
	cursorElement.style.display = "flex";

	var classes = cursorElement.className.split(" ");
	var i = classes.indexOf("bounceInAnimation");
	if (i <= 0) {
		classes.push("bounceInAnimation");
		cursorElement.className = classes.join(" "); 
	} else if  (i >= 0) {
		classes.splice(i, 1);
		cursorElement.className = classes.join(" "); 
		classes.push("bounceInAnimation");
		cursorElement.className = classes.join(" "); 
	}
	
	
} 

function hideCursor () {
	var cursorElement = document.getElementById('cursor');
	cursorElement.style.display = "none"; 
	var classes = cursorElement.className.split(" ");
	var i = classes.indexOf("bounceInAnimation");
	if (i >= 0) {
		classes.splice(i, 1);
	}
}

function printNextMessage (index, delay) {
	if (messageList.length <=  index) {
        return -1;
	} else {
		var text = messageList[index];
		addMessage(text);	
		setMessageCount(index+1);
		displayCursor();
		if (messageList.length <=  index + 1) {
			hideCursor();
			return -1;
		} 
		setTimeout(function(){
			hideCursor();
			printNextMessage(++index, delay);
		}, delay);
	}
	
}



displayCursor();
setTimeout(function(){
printNextMessage(0, 3500);
}, 2500);


