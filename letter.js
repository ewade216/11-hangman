Letter = function (letter) {
	this.value = letter;
	this.beenGuessed = false;

	//determines the value to log depending if the letter has been guessed
	this.returnValue = function() {
		if (this.letter === " ") {
			return "   ";
		} else {
			if (this.beenGuessed === true){
				return this.value + " ";
			} else {
				return "_ ";
			}
		}

	};

	//determines if the guess matches the value
	this.checkGuess = function(guess) {

		if (guess === this.value) {
			//if letter has not been guessed but is a match
			this.beenGuessed = true;
			return "correct";
		} else {
			//if letter has not been gussed and is NOT a match
			return "incorrect";
		}
	}
}

module.exports = Letter;

// Testing data
// var test = new Letter("b");
// console.log(test.value);
// console.log(test.beenGuessed);
// console.log(test.returnValue());
// console.log(test.checkGuess("a"));
// console.log(test.beenGuessed);
// console.log(test.returnValue());
// console.log(test.checkGuess("b"));
// console.log(test.beenGuessed);
// console.log(test.returnValue());
