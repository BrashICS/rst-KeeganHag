'use strict';

let wrongGuesses = 0;
let hiddenWord = "";
let randomCategory;
let word;
let userGuesses = [];
let winner = false;
let random = Math.floor(Math.random() * 8);
let moviePicker = getTitle(random).toLowerCase();

const categoryDisplay = document.getElementById('category_display');
const underlineContainer = document.getElementById('underline');
const guessedLettersDisplay = document.getElementById('guessed_letters');
const letterInput = document.getElementById('letter_input');
const enterButton = document.getElementById('enter_button');
const resultMessage = document.getElementById('result_message');
const playAgainButton = document.getElementById('play_again_button');

let categories = [
  'Movies',
  'Disney Movies',
  'MLB Teams',
  'NHL Teams',
  'NBA Teams',
  'NFL Teams',
  '5 Letter Words',
  'Beautiful Words',
  'NBA Players'
];

randomCategory = categories[random];
categoryDisplay.textContent = `Category: ${randomCategory}`;

document.getElementById('play_again_button').hidden = true;

letterInput.addEventListener('keypress', handleUserInput);
enterButton.addEventListener('click', () => handleUserInput(null));

function initGame() {
  wrongGuesses = 0;
  hiddenWord = "";
  userGuesses = [];
  winner = false;
  random = Math.floor(Math.random() * 8);
  moviePicker = getTitle(random).toLowerCase();
  randomCategory = categories[random];
  categoryDisplay.textContent = `Category: ${randomCategory}`;
  word = moviePicker;

  for (let i = 0; i < moviePicker.length; i++) {
    if (moviePicker[i] === " ") {
      hiddenWord += " ";
    } else {
      hiddenWord += "_";
    }
  }

  underlineContainer.textContent = hiddenWord;
  updateGuessedLetters();
  updateHangmanImage();
  letterInput.disabled = false;
  enterButton.disabled = false;
  resultMessage.textContent = "";
  playAgainButton.style.display = "none";
}

function updateGuessedLetters() {
  guessedLettersDisplay.textContent = `Guessed Letters: ${userGuesses.join(", ")}`;
}

function updateHangmanImage() {
  const hangmanImage = document.getElementById('hangman_structure');
  const imageSources = [
    "hangman_rope.png",
    "images/head.jpg",
    "images/Chest.jpg",
    "images/leftArm.jpg",
    "images/RightArm.jpg",
    "images/leftLeg.jpg",
    "images/rightLeg.jpg"
  ];
  hangmanImage.src = imageSources[wrongGuesses];
}

function handleUserInput(event) {
    const userGuess = letterInput.value.toLowerCase();
    let isValidInput = true;
  
    for (let i = 0; i < userGuess.length; i++) {
      const charCode = userGuess.charCodeAt(i);
      if (charCode < 97 || charCode > 122) {
        isValidInput = false;
        break;
      }
    }
  
    if (isValidInput) {
      for (let i = 0; i < userGuess.length; i++) {
        const letter = userGuess[i];
        if (!userGuesses.includes(letter)) {
          userGuesses.push(letter);
          updateGuessedLetters();
          if (word.includes(letter)) {
            updateHiddenWord(letter);
            if (hiddenWord === word) {
              winner = true;
              showResult("You Win!");
              break;
            }
          } else {
            wrongGuesses++;
            updateHangmanImage();
            if (wrongGuesses === 6) {
              showResult(`You Lose! The word was "${word}".`);
              break;
            }
          }
        }
      }
    } else {
      alert("Please enter a word or phrase containing only letters.");
    }
    letterInput.value = "";
}  

function updateHiddenWord(userGuess) {
  let newHiddenWord = "";
  for (let i = 0; i < word.length; i++) {
    if (word[i] === userGuess) {
      newHiddenWord += userGuess;
    } else if (hiddenWord[i] !== "_") {
      newHiddenWord += hiddenWord[i];
    } else {
      newHiddenWord += "_";
    }
  }
  hiddenWord = newHiddenWord;
  underlineContainer.textContent = hiddenWord;
}

function showResult(message) {
  resultMessage.textContent = message;
  letterInput.disabled = true;
  enterButton.disabled = true;
  playAgainButton.style.display = "inline-block";
}

playAgainButton.addEventListener('click', initGame);

initGame(); 

