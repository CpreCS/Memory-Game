let highScores = [];
let savedScores = localStorage.getItem('highScores')
  if(savedScores) {
    highScores = JSON.parse(savedScores);
  }

// Array of the card values being matched
const uniqueValues = [
  'images/law.jpg',
  'images/luffy.jpg',
  'images/roger.jpg',
  'images/sanji.jpg',
  'images/shanks.jpg',
  'images/zoro.jpg'
];
const cardDeck = uniqueValues.concat(uniqueValues);
const cardGrid = document.querySelector('.card-game-grid');

// Light mode activation
const navLogo = document.querySelector('.nav-logo');
const lightMode = document.querySelector('.mode-switch');

lightMode.addEventListener('click',() => {
  document.body.classList.toggle('light-mode'); 

  if(document.body.classList.contains('light-mode')){
    lightMode.innerHTML = 'Dark Mode';
    navLogo.src = 'svg/nav-logo.svg';
  } else{
    lightMode.innerHTML = 'Light Mode';
  }
});

// Shuffle board layout
function shuffleArray(cardDeck) {
  for (let i = cardDeck.length - 1; i >= 1; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [cardDeck[i], cardDeck[j]] = [cardDeck[j], cardDeck[i]];
  }
  return cardDeck;
}
 
  // Global variables
  let flippedCards = [];
  let attempts = 0;
  let clickLimit = false; // Limits card clicks to 2 at a time
  let startTime;
  let timerId;
  let gameStarted = false;

  // Attempts and timer DOM
  const attemptsDisplay = document.querySelector('.attempts-count');
  const timerDisplay = document.querySelector('.timer-display');

  // Stopwatch updater
  function updateTimer() {
    const elapsed = Date.now() - startTime;
    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    const hundredths = Math.floor((elapsed % 1000) / 10);

    const formatted = 
      `${String(minutes).padStart(2, "0")}:` +
      `${String(seconds).padStart(2, "0")}.` +
      `${String(hundredths).padStart(2, "0")}`;

    timerDisplay.textContent = `Time: ${formatted}`;
    return formatted;
  }

// Build & reset the board back to its initial state
function buildBoard() {
  cardGrid.innerHTML = "";
  flippedCards = [];
  attempts = 0;
  clickLimit = false;
  gameStarted = false;
  clearInterval(timerId);
  timerDisplay.textContent = "Time: 00:00.00";
  attemptsDisplay.textContent = "Attempts: 0";

  // Creating cards in a 4x3 format
  shuffleArray(cardDeck);
  cardDeck.forEach(value => {
  
  // Create 4 divs
  const newDiv = document.createElement('div');
  const cardInner = document.createElement('div');
  const cardFront = document.createElement('div');
  const cardBack = document.createElement('div');

  // Add unique classes to the divs
  newDiv.classList.add('card-design');
  cardInner.classList.add('card-inner');
  cardFront.classList.add('card-front');
  cardBack.classList.add('card-back');

  cardFront.style.backgroundImage = `url(${value})`;
  cardInner.dataset.value = value;

  // Nest the divs by appending them
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  newDiv.appendChild(cardInner);
  cardGrid.appendChild(newDiv);

  cardInner.addEventListener('click', function() {
    if(clickLimit) return;
    if(cardInner.classList.contains('flipped')) return;

    // Start timer on very first flip
    if (!gameStarted) {
      gameStarted = true;
      startTime = Date.now();
      timerId = setInterval(updateTimer, 10);
    }

    cardInner.classList.add('flipped');
    flippedCards.push(cardInner);

    if(flippedCards.length === 2) {
      clickLimit = true;
      attempts++;
      attemptsDisplay.textContent = `Attempts: ${attempts}`;
      
      const [cardOne, cardTwo] = flippedCards;

      if (cardOne.dataset.value === cardTwo.dataset.value){
        flippedCards = [];
        clickLimit = false;
          // Stop timer on win
          if (document.querySelectorAll(".card-inner.flipped").length === cardDeck.length) {
            clearInterval(timerId);

          // Fastest score leaderboard
            const newScore = {
              time: updateTimer(),
              attempts: attempts,
              ms: Date.now() - startTime
            };
              highScores.push(newScore);
              highScores.sort((a, b) => a.ms - b.ms);
              highScores = highScores.slice(0, 5);

              localStorage.setItem("highScores", JSON.stringify(highScores));

              let message = `You finished in ${updateTimer()}s\nAttempts: ${attempts}\n\nYour Top 5 Fastest Games:\n`;
              highScores.forEach((score, i) => {
                message += `${i + 1}. ${score.time}s, (${score.attempts} attempts)\n`;
              });
              alert(message);

          } 
      } else{
        setTimeout(()=> {
          cardOne.classList.remove('flipped');
          cardTwo.classList.remove('flipped');
          flippedCards = [];
          clickLimit = false;
        }, 800);
      }
    }
  });
});
}

document.querySelector(".reset-btn").addEventListener("click", buildBoard);


buildBoard();
