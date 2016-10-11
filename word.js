// contains all of the methods which will check the letters guessed versus the random word selected
module.exports = function Word(random) {
	this.guess = process.argv[2]
	this.letterArray = random.split('')
	this.charInWord = function() {
		for (var i in this.letterArray) {
			if (this.letterArray[i] == this.guess) {
				var removed = this.letterArray.splice(i, 1)
			}
		}
	}
	this.checkWon = function() {
		if (this.letterArray.length == 0) {
			return true
		} else {
			return false
		}
	}
}