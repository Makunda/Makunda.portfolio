/**
 * Don't look at the JS code, it's dirty 
 */


 /**
  * Constant Declarations
  */
 // Title generator
 possibleName = [ "Java", "C#", "Stack Overflow", "C", "C++", "Programmer", "Program", "Code", "Coding game", "Recruiter", "Big tech company", "Google", "Github", "Bug", "StackOverflow", "Vim", "Ubuntu", "Arch Linux", "Windows", "Linter", "Compilater", "Singleton", "HTML", "CSS", "GoLang"]
 possibleVerbes = ["might be", "should be", "must be", "can be", "is","became","will be"]
 possibleAdjectives = ["adorable", "delightful", "homely", "quaint", "adventurous", "depressed", "horrible", "aggressive", "determined", "hungry", "real", "agreeable", "different", "hurt", "relieved", "alert", "difficult", "repulsive", "alive", "disgusted", "ill", "rich", "amused", "distinct", "important", "angry", "disturbed", "impossible", "scary", "annoyed", "dizzy", "inexpensive", "selfish", "annoying", "doubtful", "innocent", "shiny", "anxious", "drab", "inquisitive", "shy", "arrogant", "dull", "itchy", "silly", "ashamed", "sleepy", "attractive", "eager", "jealous", "smiling", "average", "easy", "jittery", "smoggy", "awful", "elated", "jolly", "sore", "elegant", "joyous", "sparkling", "bad", "embarrassed", "splendid", "beautiful", "enchanting", "kind", "spotless", "better", "encouraging", "stormy", "bewildered", "energetic", "lazy", "strange", "black", "enthusiastic", "light", "stupid", "bloody", "envious", "lively", "successful", "blue", "evil", "lonely", "super", "blue",
 "excited", "long", "blushing", "expensive", "lovely", "talented", "bored", "exuberant", "lucky", "tame", "brainy", "tender", "brave", "fair", "magnificent", "tense", "breakable", "faithful", "misty", "terrible", "bright", "famous", "modern", "tasty", "busy", "fancy", "motionless", "thankful", "fantastic", "muddy", "thoughtful", "calm", "fierce", "mushy", "thoughtless", "careful", "filthy", "mysterious", "tired", "cautious", "fine", "tough", "charming", "foolish", "nasty", "troubled", "cheerful", "fragile", "naughty", "clean", "frail", "nervous", "ugliest", "clear", "frantic", "nice", "ugly", "clever", "friendly", "nutty", "uninterested", "cloudy", "frightened", "unsightly", "clumsy", "funny", "obedient", "unusual", "colorful", "obnoxious", "upset", "combative", "gentle", "odd", "uptight", "comfortable", "gifted", "old-fashioned",
 "concerned", "glamorous", "open", "vast", "condemned", "gleaming", "outrageous", "victorious", "confused", "glorious", "outstanding", "vivacious", "cooperative", "good", "courageous", "gorgeous", "panicky", "wandering", "crazy", "graceful", "perfect", "weary", "creepy", "grieving", "plain", "wicked", "crowded", "grotesque", "pleasant", "wide", "eyed",
 "cruel", "grumpy", "poised", "wild", "curious", "poor", "witty", "cute", "handsome", "powerful", "worrisome", "happy", "precious", "worried", "dangerous", "healthy", "prickly", "wrong", "dark", "helpful", "proud", "dead", "helpless", "putrid", "zany", "defeated", "hilarious", "puzzled", "zealous" ]


//Projects 


class RandomTitleGenerator {

	static setTitle ( text ) {
		document.getElementById('main_title').innerHTML = text;
	} 

	static getTitle() {
		var name = possibleName[Math.floor(Math.random() * possibleName.length)]; 
		var verb = possibleVerbes[Math.floor(Math.random() * possibleVerbes.length)]; 
		var adjective = possibleAdjectives[Math.floor(Math.random() * possibleAdjectives.length)]; 

		var title = `${name} ${verb} ${adjective}`;
		this.setTitle(title);
	}

	constructor() {
		this.getTitle();

	}
}

// This code was stolen from Mister Chuck Grimmett, check is blog here : http://www.cagrimmett.com/til/2018/01/05/css-confetti.html 
class Confetti {
	  
	create(i) {
		var width = Math.random() * 8;
		var height = width * 0.4;
		var colourIdx = Math.ceil(Math.random() * 3);
		var colour = "red";
		switch(colourIdx) {
		  case 1:
			colour = "yellow";
			break;
		  case 2:
			colour = "blue";
			break;
		  default:
			colour = "red";
		}		
		$(`<div style="position: absolute;" class="${colour}-confetti confetti-${i}"></div>`).css({
		  "width" : width+"px",
		  "height" : height+"px",
		  "top" : -Math.random()*20+"%",
		  "left" : Math.random()*100+"%",
		  "opacity" : Math.random()+0.5,
		  "transform" : "rotate("+Math.random()*360+"deg)"
		}).appendTo('#project_section');  
		
		this.drop(i);
	  }
	  
	drop(x) {		
		$('.confetti-'+x).animate({
		  top: "100%",
		  left: "+="+Math.random()*15+"%"
		}, Math.random()*3000 + 3000, function() {
			$('.confetti-'+x).remove();
		});
	  }
	  

	launchConfetti() {
		for (var i = 0; i < 250; i++) {
			this.create(i);
		   
		  }
	  }
	  constructor() {
		
	  }
}



/** Darker bg */
var clientHeight = 0;
let last_known_scroll_position = 0;
let ticking = false;
function darkBackground() {

	last_known_scroll_position = window.scrollY;
  
	if (!ticking) {
	  window.requestAnimationFrame(function() {
		darkBackground();
		ticking = false;
	  });
  
	  ticking = true;
	}

	var bounding = document.getElementById('project_section').getBoundingClientRect();
	if(bounding.y > 0 && bounding.y < 1000) {
		
		opacity = 1 - (bounding.y) / 1000;
		document.getElementById('project_section').style.backgroundColor =  `rgba(52, 58, 64,${opacity})`;
	} else {
		document.getElementById('project_section').style.backgroundColor =  `rgba(52, 58, 64,1)`;
		window.removeEventListener('scroll', darkBackground, false);
		return 1;
	}
	
}



window.addEventListener('scroll', darkBackground, false);


var confetti = new Confetti();
RandomTitleGenerator.getTitle();




