// controls whether or not a letter appears as a "_" or as itself on-screen
module.exports = function Letter(ranWord) {
	this.word = ranWord
	this.wordLength = ranWord.length
	this.wordArray = undefined
	this.displayWord = undefined
	this.initialDisplay = function() {
		var blankStr = ''
		// console.log('in Letter initial display function, this is:', this)
		for (var i=0; i < this.wordLength; i++) {
			blankStr += '- '
		}
		blankStr = blankStr.trim()
		// console.log('blankStr is now:', blankStr)
		this.displayWord = blankStr
		this.wordArray = blankStr.split(' ')
		return blankStr
	}
	this.updateDisplay = function(data) {
		var char = data.char // char that was correctly guessed
		var index = data.index // array of indeces the character needs to be changed on

		if (char !== undefined) { // makes sure that the object has data from a correct guess and not undefined from incorrect guess
			for (var i in index) {
				if (this.wordArray[index[i]] == '-') {
					this.wordArray[index[i]] = char
				}
			}

			var updateString = ''
			for (var j in this.wordArray) {
				updateString = updateString.concat(this.wordArray[j] + ' ')
			}
			// console.log('updateString value is now:', updateString)
			this.displayWord = updateString
			return updateString
		} else {
			console.log('displayWord on incorrect guess:', this.displayWord)
			console.log('wordArray on incorrect guess:', this.wordArray)
			return this.displayWord
		}
		
	}
}