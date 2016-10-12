// logic for the game, where the game is called from
var inquirer = require('inquirer')
var randomWord = require('./game.js')
console.log('Console Log from main.js:', randomWord)
// console.log(typeof randomWord)

var Word = require('./word.js')
var Letter = require('./letter.js')
var currentWord = new Word(randomWord, undefined)
var currentLetter = new Letter(randomWord)
// console.log(currentWord.letterArray)
// console.log(currentWord.charInWord())
// console.log(currentWord.letterArray)
// console.log(currentWord.checkWon())

var counter = 16

function runGame() {
	if (counter > 0) {
		if (counter == 16) {
			var blankWord = currentLetter.initialDisplay()
			console.log('blankWord (the value returned by initialDisplay() ) is now:', blankWord)
			counter--
		}
		console.log(currentWord.letterArray)
		inquirer.prompt([
		{
			type: 'input',
			name: 'guess',
			message: 'Please enter your guess, you have ' + counter + ' tries remaining',
			validate: function(value) {
				if (value.length == 1) {
					return true
				}

				return 'Please only enter one character at a time'
			},
			filter: function(value) {
				return value.toLowerCase()
			}
		}
			])
		.then(function(answer) {
			console.log('Answer.guess is:', answer.guess)
			var guessObject = currentWord.charInWord(answer.guess)
			if (guessObject.char !== undefined) {
				var newDisplayWord = currentLetter.updateDisplay(guessObject)
				currentLetter.displayWord = newDisplayWord
				// console.log('currentLetter.displayWord is:', currentLetter.displayWord)
				console.log('newDisplayWord (the value returned by updateDisplay() ) is now:', newDisplayWord)
			} else {
				console.log('Incorrect guess')
				// console.log('currentLetter.displayWord is:', currentLetter.displayWord)
				var newDisplayWord = currentLetter.updateDisplay(guessObject)
				console.log('newDisplayWord (the value returned by updateDisplay() ) is now:', newDisplayWord)
				counter -= 1
			}
			// console.log('word array from letters:', currentLetter.wordArray)
			console.log('Win?', currentLetter.checkWin())
			
			if (counter > 0) {
				if(currentLetter.checkWin()) {
					console.log('You Won! Feel free to play again!')
				} else {
					runGame()
				}
			} else {
				console.log('You ran out of guesses, please try again.')
			} 
		})
	}
}

runGame()