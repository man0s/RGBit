var game = {
	difficulty: 3,
	color: [],
	pickedColor: null,
	clickedColor: null,
	circle: document.querySelectorAll(".circle"),
	colorDisplay: document.getElementById("colorDisplay"),
	msgDisplay: document.getElementById("msg"),
	resetButton:document.querySelector("#reset"),
	modeButtons: document.querySelectorAll(".mode"),
	h1: document.getElementsByTagName("h1")[0],
	init: function(){
		game.setUpModeButtons();
		game.setUpCircles();
		game.reset();
	},
	setUpModeButtons: function (){
		for(var i = 0; i < game.modeButtons.length; i++) {
			game.modeButtons[i].addEventListener("click" , function (){
				var ezindex; //index of easy button
				if (this.textContent === "Easy") {
					ezindex = 0;
					game.modeButtons[ezindex].classList.add("selected");
					game.modeButtons[ezindex].disabled = true;
					game.modeButtons[ezindex+1].disabled = false;
					game.modeButtons[ezindex+1].classList.remove("selected");
					game.changeMode(3);
				} else {
					ezindex=1;
					game.modeButtons[ezindex].classList.add("selected");
					game.modeButtons[ezindex].disabled = true;
					game.modeButtons[ezindex-1].disabled = false;
					game.modeButtons[ezindex-1].classList.remove("selected");
					game.changeMode(6);
				}
							
				game.reset();
			});
		}
	},
	setUpCircles: function(){
		for(i = 0; i < game.circle.length; i++) {
			//add initial colors
			game.circle[i].style.backgroundColor = game.color[i];
			// add click listeners
			game.circle[i].addEventListener("click", game.clickCheck);
		}
	},
	changeMode: function(num){
		game.difficulty = num;
	},
	reset: function(){
		game.color = game.generateRandomColors(game.difficulty);
		game.pickedColor = game.pickColor();
		game.colorDisplay.textContent = game.pickedColor;
		for(var i = 0; i < game.circle.length; i++) {
			if(game.color[i]) {
				game.circle[i].style.display = "block";
				game.circle[i].style.backgroundColor = game.color[i];	
			}
			else {
				game.circle[i].style.display = "none";			}
		}
		game.resetButton.textContent = "New Colors";
		game.msgDisplay.textContent = null;
		game.h1.style.backgroundColor = "#42A8C0";

		game.resetButton.addEventListener("click", game.reset);
	},
	clickCheck: function(){
		var clickedColor = this.style.backgroundColor;
		//comparison
		if(clickedColor === game.pickedColor) {
			game.msgDisplay.textContent = "Correct!";
			game.resetButton.textContent = "Play Again?";
			game.changeColors(clickedColor);
			game.h1.style.backgroundColor = clickedColor;
		} else {
			this.style.backgroundColor = "#232323";
			this.style.boxShadow = "none"; //removes shadow
			game.msgDisplay.textContent = "Try again..";
		}
	},
	changeColors: function(clr){
		for(var i = 0; i < game.circle.length; i++) {
			game.circle[i].style.backgroundColor = clr;		
		}
	},
	pickColor: function(){
		var random = Math.floor(Math.random() * game.color.length);
		return game.color[random];
	},
	generateRandomColors: function(diff){
		var arr = [];
		for(var i = 0;i < diff; i++) {
			arr.push(game.randomColor());
		}
		return arr;
	},
	randomColor: function(){
		var R = Math.floor((Math.random() * 256));
		var G = Math.floor((Math.random() * 256));
		var B = Math.floor((Math.random() * 256));
		return "rgb(" + R + ", " + G + ", " + B + ")";
		}
};

game.init();