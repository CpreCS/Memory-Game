Memory Game
This project is a simple memory card game built with HTML, CSS, and JavaScript. The purpose of the game is to flip cards, find matching pairs, and clear the board. I extended the project with features like a stopwatch timer, attempts counter, light/dark mode, and high score tracking with localStorage. This project gave me practice with DOM manipulation, state management, and browser storage. 

Motivation
The motivation for building this was to practice creating a full, interactive application in the browser without relying on frameworks. My personal goal was to move beyond static pages and strengthen my understanding of JavaScript logic, CSS layouts, and saving data. I also wanted to show that I can take a simple concept and add onto it with new features.

Getting Started / How to Play
You can play the game directly here:  
 (https://CpreCS.github.io/Memory-Game/)  

If you want to run it locally:  
1. Clone the repository.  
2. Open 'index.html' in your browser.  

How to play
- Flip two cards at a time to try and find matching pairs.  
- The game ends once all pairs are matched.  
- A timer (stopwatch format) starts on your first flip and stops once the last match is found.  
- An attempts counter tracks how many guesses you made (every 2 flips = 1 attempt).  
- At the end of the game, your time and attempts are shown along with your top 5 fastest runs saved in your browser via localStorage.  

Features
- Card flipping and pair matching  
- Timer in stopwatch format (`MM:SS.hh`) that starts on the first flip  
- Attempts counter (every two flips = one attempt)  
- High scores saved with localStorage (keeps your last 5 fastest games)  
- Light/Dark mode toggle  
- Reset/Restart button  
- Alert popup at the end showing your results and high scores  

 What I Learned
- Creating and styling a card grid using CSS Grid
- Dynamically generating elements with JavaScript  
- Handling game state (flipped cards, attempts, timer, click limits)  
- Using localStorage and JSON to keep track of high scores 

Future Ideas
- Add smoother card flip animations  
- Show high scores on the page instead of just in an alert  
- Add more difficulty levels by allowing the player to choose the amount of cards that are present on the screen.
