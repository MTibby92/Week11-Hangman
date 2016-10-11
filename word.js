// contains all of the methods which will check the letters guessed versus the random word selected
module.exports = function Word(random) {
	this.removedIndex = []
	this.letterArray = random.split('')
	this.charInWord = function(guess) {
		console.log('Value for guess in word.js:', guess)
		// var removedIndex = []
		for (var i in this.letterArray) {
			if (this.letterArray[i] == guess) {
				console.log(i, this.letterArray[i])
				var removed = this.letterArray.splice(i, 1)
				this.removedIndex.push(parseInt(i)+this.removedIndex.length)
			}
		}
		var obj = {
			char: removed[0],
			index: this.removedIndex
		}
		console.log('removedIndex is', this.removedIndex)
		return obj
	}
	this.checkWon = function() {
		if (this.letterArray.length == 0) {
			return true
		} else {
			return false
		}
	}
}