// logic for the game, where the game is called from
var inquirer = require('inquirer')
var randomWord = require('./game.js')
// console.log('Console Log from main.js:', randomWord)

var Word = require('./word.js')
var Letter = require('./letter.js')
var currentWord = new Word(randomWord, undefined)
var currentLetter = new Letter(randomWord)

var counter = 16
var guessesArray = []

function runGame() {
	if (counter > 0) {
		if (counter == 16) {
			var blankWord = currentLetter.initialDisplay()
			// console.log('blankWord (the value returned by initialDisplay() ) is now:', blankWord)
			console.log(blankWord)
			console.log()
			counter--
		}
		// console.log(currentWord.letterArray)
		inquirer.prompt([
		{
			type: 'input',
			name: 'guess',
			message: 'Please enter your guess, you have ' + counter + ' tries remaining',
			validate: function(value) {
				if (value.length > 1 || value.length == 0) {
					return 'Please only enter character at a time'
				}
				for (var i in guessesArray) {
					if (guessesArray[i] == value) {
						return 'That character has already been guessed'
					}
				}

				return true
			},
			filter: function(value) {
				return value.toLowerCase()
			}
		}
			])
		.then(function(answer) {
			// console.log('Answer.guess is:', answer.guess)
			guessesArray.push(answer.guess)
			console.log('So far you have guessed:', guessesArray)
			var guessObject = currentWord.charInWord(answer.guess)
			if (guessObject.char !== undefined) {
				var newDisplayWord = currentLetter.updateDisplay(guessObject)
				currentLetter.displayWord = newDisplayWord
				// console.log('newDisplayWord (the value returned by updateDisplay() ) is now:', newDisplayWord)
				console.log(newDisplayWord)
			} else {
				console.log('Incorrect guess')
				var newDisplayWord = currentLetter.updateDisplay(guessObject)
				// console.log('newDisplayWord (the value returned by updateDisplay() ) is now:', newDisplayWord)
				console.log(newDisplayWord)
				counter -= 1
			}
			// console.log('word array from letters:', currentLetter.wordArray)
			// console.log('Win?', currentLetter.checkWin())
			
			if (counter > 0) {
				if(currentLetter.checkWin()) {
					console.log('You Won! Feel free to play again!')
				} else {
					console.log('\n')
					runGame()
				}
			} else {
				console.log('You ran out of guesses, please try again.')
				console.log('The correct word was:', randomWord)
			} 
		})
	}
}

runGame()