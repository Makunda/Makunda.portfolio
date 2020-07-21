 // Singletons 
 var singletonChatConsole = null;

 /**
  * Class in charge of the interaction in the chat 
  * Run as a singleton
  * @class ChatConsole
  */
 class ChatConsole {
 
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
         
         for( var it in answers ) {
             var button = document.createElement("button");
             button.className = "btn btn-primary";
             button.innerHTML = answers[it].text;
             button.setAttribute("onclick", `singletonChatConsole["${answers[it].action}"]()`);
             element.appendChild(button);
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
         // Is the user a recruiter ? 
         this.askQuestion(this.questions.recruiter);
     }
 
     isRecruiter () {
         // Reset message count & questions
         this.setMessageCount(0);
         this.cleanQuestionField();
 
         this.addQuestion("Yes, I'm a beautiful recruiter.");
         this.displayCursor();
         var self = this;
         // horrible nesterd timeout, but I didn't had a lot of time
         setTimeout(function() {
             self.setMessageCount(1);
             self.addMessage("Hello, [Recruiter Name Here], must be the pride of [Recruiter Hometown Here]");
             setTimeout(function() {
                 self.setMessageCount(2);
                 self.addMessage("You can download my resume by clicking here <a href='static/pdf/CV_Hugo_Joby_2.pdf'>French resume</a> / <a href='#'>English resume</a>");
                 self.hideCursor();
             }, 1000);
         }, 1000); 
         RandomTitleGenerator.setTitle("Recruiters are awesome.");
         
     }
     
 
     normalMode () {
         // Reset message count & questions
         this.setMessageCount(0);
         this.cleanQuestionField();
 
         this.addQuestion("I'm a random.");
         this.displayCursor();
         var self = this;
         // horrible nesterd timeout, but I didn't had a lot of time
         setTimeout(function() {
             self.setMessageCount(1);
             self.addMessage("You're welcome ! Feel free to take a tour");
             setTimeout(function() {
                 self.setMessageCount(2);
                 self.addMessage("You can re-use any code you want (or propose some improvements), if you do, don't forget to cite, it's always cool.");
                 self.hideCursor();
             }, 1000);
         }, 1000);
         RandomTitleGenerator.setTitle("You are awesome.");
         
     }
 
     constructor() {
         if( singletonChatConsole !== null) {
             Object.assign(this, singletonChatConsole);
         } else {
             
             this.sections = [{ text : "Projects", action : "#projects" },
             { text : "Professionals experiences", action : "#experience"} ];
             
             this.messageList = [" Hey you ! Welcome on my developper portfolio !", 
             "I'm Hugo, a french developper. You can find here some of my projects as well as a regular resume (if you're a recruiter).", 
             "If you're interested in any of them, feel free to follow me on <a href=\"https://github.com/Makunda\">Github<\/a>"];
             
             this.questions = { recruiter : { question : "Quick question to start. Are you a recruiter ?", answers : [ { text : "Yes I am.", action : "isRecruiter" }, { text : "No I'm just a random citizen !", action : "normalMode" } ]},
             sections : { question : "What do you want to see ?", answers : this.sections}};
             
             singletonChatConsole = this;
         }
 
         this.displayCursor();
         var c = this; 
         setTimeout(function(){
             c.printNextMessage(0, 3500);
         }, 2500);
       }
 }

 //Start
var chat = new ChatConsole();
