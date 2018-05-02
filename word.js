var Letter = require("./letter");

var Word = function(newWord){
	this.wordArray = [];
	this.word = newWord;

	//builds out the word array for a new word, called once for each new word
	this.buildWordArray = function(){
		for (i = 0; i < this.word.length; i++){
			var newValue = new Letter(this.word[i]);

			//if the value is a space want to set beenGuessed to true
			if (newValue.value === " "){
				newValue.beenGuessed = true;
			}
			//add letter object to wordArray (including spaces)
			this.wordArray.push(newValue)
		}
	}

	//prints current word
	this.displayWord = function(){
		var displayString = "";

		for (i=0; i < this.wordArray.length; i++){
			displayString += this.wordArray[i].returnValue();
		}

		console.log("\n",displayString,"\n");
	}

	//takes guess and determines if there is a match, also determines if word has been guessed
	this.guessLetter = function(guess){
		var correctLetters = 0;
		var falseGuessedCount = 0;

		for (i=0; i < this.wordArray.length; i++){
			//run guess function, returns correct or incorrect
			var guessOutcome = this.wordArray[i].checkGuess(guess);
			//keeep track if there is a match
			if (guessOutcome === "correct") {
				correctLetters++;
			}

			//looking for objects with beenGuessed
			if (this.wordArray[i].beenGuessed === false){
				falseGuessedCount ++;
			}
		}
		//If no beenGuessed = false then we know word has been completed
		if (falseGuessedCount === 0) {
			return "word-complete"
		} else {
			//other wise the word has not been completed and will return result of the guess
			if (correctLetters > 0){
				return "match";
			} else {
				return "no-match";
			}
		}
	}//end guess letter
}//end word

module.exports = Word;

//test data
// var test = new Word("testing this stuff");
// test.buildWordArray();
// test.displayWord();
// console.log(test.guessLetter("t"));
// console.log(test.guessLetter("x"));
// test.displayWord();
