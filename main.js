// logic for the game, where the game is called from
var randomWord = require('./game.js')
console.log('Console Log from main.js:', randomWord)
console.log(typeof randomWord)

var Word = require('./word.js')
var currentWord = new Word(randomWord)
console.log(currentWord.letterArray)
console.log(currentWord.charInWord())
console.log(currentWord.letterArray)
console.log(currentWord.checkWon())