/**
 * Don't look at the JS code, it's dirty 
 */
var singletonChatConsole = null;

class ChatConsole {

	sections = [{ text : "Projects", action : "#projects" },
				{ text : "Professionals experiences", action : "#experience"} ];

	messageList = [" Hey you ! Welcome on my developper portfolio !", 
	"I'm Hugo, a french developper. You can find here some of my projects as well as a regular resume (if you're a recruiter).", 
	"If you're interested in any of them, feel free to follow me on <a href=\"https://github.com/Makunda\">Github<\/a>"];
	
	questions = { recruiter : { question : "Quick question to start. Are you a recruiter ?", answers : [ { text : "Yes I am.", action : "isRecruiter" }, { text : "No I'm just a random citizen !", action : "normalMode" } ]},
				 sections : { question : "What do you want to see ?", answers : this.sections}
	}

	getTimestampAsString () {
		var objToday = new Date(),
		curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
		curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
		curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
		curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
		return "Today at " + curHour + ":" + curMinute + ":" + curSeconds + curMeridiem;
	}

	scrollChat () {
		var elem = document.getElementById('toast_text');
		elem.scrollTop = elem.scrollHeight;
	}
	
	addMessage ( text ) {
		var message = `<div class="message"> <span class="message-timestamp">${this.getTimestampAsString()}</span></i> - ${text} </div>`;
		document.getElementById('message_chat').innerHTML += message;
		this.scrollChat()
	}

	addQuestion (text ) {
		var message = `<div class="question"> ${text} </div>`;
		document.getElementById('message_chat').innerHTML += message
		this.scrollChat()
	}

	cleanQuestionField () {
		document.getElementById('answer_chat').innerHTML = "<i> Choose your reply here </i>";
	}

	askQuestion ( questionStruct ) {
		this.addMessage( questionStruct.question );
		var answersElement = document.getElementById('answer_chat');
		this.buildAnswers( answersElement, questionStruct.answers );
	}

	buildAnswers( element, answers ) {
		element.innerHTML = "";
		console.log(answers);
		
		for( var it in answers ) {
			var button = document.createElement("button");
			button.className = "btn btn-primary";
			button.innerHTML = answers[it].text;
			button.setAttribute("onclick", `singletonChatConsole["${answers[it].action}"]()`);
			element.appendChild(button);
			console.log("Created button for " + answers[it].action);
		}
	}
	
	setMessageCount ( num ) {
		var els = document.getElementsByClassName("message-badge");
		Array.prototype.forEach.call(els, function(el) {
			el.textContent = num;
		});
	}
	
	displayCursor () {
		var cursorElement = document.getElementById('cursor');
		// Display and add bounce animation
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
	
	hideCursor () {
		var cursorElement = document.getElementById('cursor');
		cursorElement.style.display = "none"; 
		var classes = cursorElement.className.split(" ");
		var i = classes.indexOf("bounceInAnimation");
		if (i >= 0) {
			classes.splice(i, 1);
		}
	}
	
	printNextMessage (index, delay) {
		if (this.messageList.length <=  index) {
			this.startQuestionPhase();
			return -1;
		} else {
			var text = this.messageList[index];
			this.addMessage(text);	
			this.setMessageCount(index+1);
			this.displayCursor();
			var c = this;
			setTimeout(function(){
				c.hideCursor();
				c.printNextMessage(++index, delay);
			}, delay);
		}
		
	}

	startQuestionPhase () {
		console.log("Question phase started")
		// Is the user a recruiter ? 
		this.askQuestion(this.questions.recruiter);
	}

	isRecruiter () {
		this.cleanQuestionField();
		this.addQuestion("Yes, I'm a beautiful recruiter.");
		this.displayCursor();
		var self = this;
		// horrible nesterd timeout, but I didn't had a lot of time
		setTimeout(function() {
			self.addMessage("Hello, [Recruiter Name Here], must be the pride of [Recruiter Hometown Here]");
			setTimeout(function() {
				self.addMessage("You can download my resume by clicking here <a href='#'>French resume</a> / <a href='#'>English resume</a>");
			}, 1000);
		}, 1000);
		RandomTitleGenerator.setTitle("Recruiters are awesome.")
	}

	normalMode () {
		this.cleanQuestionField();
		this.addQuestion("I'm a random.");
	}

	constructor() {
		if( singletonChatConsole !== null) {
			Object.assign(this, singletonChatConsole);
		} else {
			singletonChatConsole = this;
		}
		this.displayCursor();
		var c = this; 
	    setTimeout(function(){
			c.printNextMessage(0, 3500);
		}, 2500);
	  }
}


class RandomTitleGenerator {
	static possibleName = [ "Java", "C#", "Stack Overflow", "C", "C++", "Programmer", "Program", "Code", "Coding game", "Recruiter", "Big tech company", "Google", "Github", "Bug", "StackOverflow", "Vim", "Ubuntu", "Arch Linux", "Windows", "Linter", "Compilater", "Singleton", "HTML", "CSS", "GoLang"]
	static possibleVerbes = ["might be", "should be", "must be", "can be", "is","became","will be"]
	static possibleAdjectives = ["adorable", "delightful", "homely", "quaint", "adventurous", "depressed", "horrible", "aggressive", "determined", "hungry", "real", "agreeable", "different", "hurt", "relieved", "alert", "difficult", "repulsive", "alive", "disgusted", "ill", "rich", "amused", "distinct", "important", "angry", "disturbed", "impossible", "scary", "annoyed", "dizzy", "inexpensive", "selfish", "annoying", "doubtful", "innocent", "shiny", "anxious", "drab", "inquisitive", "shy", "arrogant", "dull", "itchy", "silly", "ashamed", "sleepy", "attractive", "eager", "jealous", "smiling", "average", "easy", "jittery", "smoggy", "awful", "elated", "jolly", "sore", "elegant", "joyous", "sparkling", "bad", "embarrassed", "splendid", "beautiful", "enchanting", "kind", "spotless", "better", "encouraging", "stormy", "bewildered", "energetic", "lazy", "strange", "black", "enthusiastic", "light", "stupid", "bloody", "envious", "lively", "successful", "blue", "evil", "lonely", "super", "blue",
	"excited", "long", "blushing", "expensive", "lovely", "talented", "bored", "exuberant", "lucky", "tame", "brainy", "tender", "brave", "fair", "magnificent", "tense", "breakable", "faithful", "misty", "terrible", "bright", "famous", "modern", "tasty", "busy", "fancy", "motionless", "thankful", "fantastic", "muddy", "thoughtful", "calm", "fierce", "mushy", "thoughtless", "careful", "filthy", "mysterious", "tired", "cautious", "fine", "tough", "charming", "foolish", "nasty", "troubled", "cheerful", "fragile", "naughty", "clean", "frail", "nervous", "ugliest", "clear", "frantic", "nice", "ugly", "clever", "friendly", "nutty", "uninterested", "cloudy", "frightened", "unsightly", "clumsy", "funny", "obedient", "unusual", "colorful", "obnoxious", "upset", "combative", "gentle", "odd", "uptight", "comfortable", "gifted", "old-fashioned",
	"concerned", "glamorous", "open", "vast", "condemned", "gleaming", "outrageous", "victorious", "confused", "glorious", "outstanding", "vivacious", "cooperative", "good", "courageous", "gorgeous", "panicky", "wandering", "crazy", "graceful", "perfect", "weary", "creepy", "grieving", "plain", "wicked", "crowded", "grotesque", "pleasant", "wide", "eyed",
	"cruel", "grumpy", "poised", "wild", "curious", "poor", "witty", "cute", "handsome", "powerful", "worrisome", "happy", "precious", "worried", "dangerous", "healthy", "prickly", "wrong", "dark", "helpful", "proud", "dead", "helpless", "putrid", "zany", "defeated", "hilarious", "puzzled", "zealous" ]

	static setTitle ( text ) {
		document.getElementById('main_title').innerHTML = text;
	} 

	static getTitle() {
		var name = this.possibleName[Math.floor(Math.random() * this.possibleName.length)]; 
		var verb = this.possibleVerbes[Math.floor(Math.random() * this.possibleVerbes.length)]; 
		var adjective = this.possibleAdjectives[Math.floor(Math.random() * this.possibleAdjectives.length)]; 

		var title = `${name} ${verb} ${adjective}`;
		this.setTitle(title);
	}

	constructor() {
		this.getTitle();
	}
}

//Start
var chat = new ChatConsole();
RandomTitleGenerator.getTitle();




