var Word = require("./word");
var prompt = require("prompt");
var colors = require("colors/safe");

var gameLogic = {
	guesses: 8,
	wordIndex: 0,
	guessedLetters: [],
	currentWord: {},
	//always use UPPERCASE in answers
	words: [
		["HBO sitcom about a well-to-do startup company...", "SILICON VALLEY"],
		["Character on 'The Big Bang Theory' with a genius IQ...", "SHELDON COOPER"],
		["Largest planet in our solar system...", "JUPITER"],
		["Smallest (ex)planet in our solar system...", "PLUTO"],
		["Plays 'Rachel' on the show 'Friends'...", "JENNIFER ANNISTON"],
		["Some might call this underwater creature 'the unicorn of the sea'...", "NARWHAL"],
		["Famous Orca Whale...", "SHAMOO"],
	],
	//settings for the guess letter user input
	promptSchema: {
	    properties: {
	      guess: {
	      	description: colors.white('Guess a Letter'),
	        pattern: /^[a-zA-Z]+$/,
	        message: colors.red('Single Letter Guesses Only!'),
	        required: true,
	        maxLength: 1,
	      }
	}
  },

	newWord: function(){
		//clear guessed letters
		this.guessedLetters = [];

		//determines if game is over or not
		if (this.wordIndex < this.words.length) {

			//welcome message if this is the first word
			if (this.wordIndex === 0) {
				console.log(colors.cyan.bold("\nWelcome To Constructor Hangman! Good Luck!"));
			} else {
				console.log(colors.cyan.bold("\nNew Word!"));
			}

			//creates new word and resets guesses
			this.currentWord = new Word(this.words[this.wordIndex][1]);
			this.guesses = 8;
			this.wordIndex++;
			this.currentWord.buildWordArray();
			//gets user input
			this.userInput();
		} else {
			console.log(colors.cyan("\nGame Over Thanks For Playing!\n"));
		}
	},

	processGuess: function(guess){
		//set guess to uppercase
		var upperGuess = guess.toUpperCase();

		//checks if letter has been guessed
		if (this.guessedLetters.indexOf(upperGuess) > -1){
			console.log(colors.yellow.bold("\nThat Letter Has Already Been Guessed! Try again..."));
			this.userInput();
			//exit function
			return;
		}

		//adds to guessed letters array
		this.guessedLetters.push(upperGuess);


		//returns if guess was in word or not, also if word is completed
		var result = this.currentWord.guessLetter(upperGuess);

		//different cases depending on result...
		if (result === "match"){
			//if guess has a match in word
			console.log(colors.green.bold("\nWe Got A Match!"));
			//take new guess
			this.userInput();
		} else if (result === "no-match"){
			//guess did not match letters in word
			console.log(colors.red.bold("\nBummer! No Match!"));
			//removes a guess
			this.guesses--;
			//determines if user still has guesses left
			if (this.guesses === 0){
				//no guesses left
				console.log(colors.red.bold("\nYou Are Out Of Guesses!"));
				this.newWord();
			} else {
				//takes new guess
				this.userInput();
			}
		} else {
			//word was successfully guessed
			console.log(colors.green.bold("\nNicely Done! That Is The Correct Answer!"));
			this.currentWord.displayWord();
			this.newWord();
		}

	},

	userInput: function (){
		//display guesses, clue, and current word to user
		console.log("\nGuesses Remaining:", this.guesses);
		console.log("Clue:", this.words[this.wordIndex - 1][0]);
		this.currentWord.displayWord()

		//prompt
		prompt.start();
		//get user input
		prompt.get(this.promptSchema, function (err, result) {
		    //pass user input to determine outcome of guess
		    gameLogic.processGuess(result.guess)
		  });
	}
}

// start game
gameLogic.newWord();
