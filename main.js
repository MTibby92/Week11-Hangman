// logic for the game, where the game is called from
var inquirer = require('inquirer')
var randomWord = require('./game.js')
console.log('Console Log from main.js:', randomWord)
console.log(typeof randomWord)

var Word = require('./word.js')
var currentWord = new Word(randomWord)
console.log(currentWord.letterArray)
console.log(currentWord.charInWord())
console.log(currentWord.letterArray)
console.log(currentWord.checkWon())

var counter = 15

function runGame() {
	while (counter > 0) {
		console.log(currentWord.letterArray)
		inquirer.prompt([
		{
			type: 'input',
			name: 'guess',
			message: 'Please enter your guess, you have ' + counter + ' tries remaining'
		}
			])
		.then(function(answer) {
			currentWord.charInWord()
			console.log('Win?', currentWord.checkWon())
			counter -= 1
			if (counter > 0) {
				runGame()
			}
		})
	}
}

runGame()