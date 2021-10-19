'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1')
const score0El = document.getElementById('score--0');
const score1El = document.getElementById("score--1");
// both of these get the element by ID the same. 
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')

//declaring the variables but not assigning them a value so that you can use them in the init function and assign the values there.
let scores, currentScore, activePlayer, playing;

//starting game values
const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    current0El.textContent = 0;
    current1El.textContent = 0;
    score1El.textContent = 0;
    score0El.textContent = 0;
    diceEl.classList.add('hidden');
    player0El.classList.remove("player--winner")
    player1El.classList.remove("player--winner")
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    //toggle will add the class if it is not there or remove the class if it is there
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
} 
//rolling dice functionality
btnRoll.addEventListener("click", function(){
    if (playing){
//1. generate a random dice roll.
const dice = Math.trunc(Math.random() * 6 ) + 1
//2. display the dice.
diceEl.classList.remove('hidden');
diceEl.src = `dice-${dice}.png`;
//3. check for a rolled 1.
if (dice !== 1) {
//add dice to current score
currentScore += dice;
document.getElementById(`current--${activePlayer}`).textContent = currentScore;
} else {
    // switch to next player
  switchPlayer(); }
}
});

btnHold.addEventListener('click', function () {
    if (playing) {
    //1. add current score to active player score
    scores[activePlayer] += currentScore;
document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    //2. check score to see if 100 if yes finish game if not switch player
    if(scores[activePlayer] >= 100) {
        playing = false;
        diceEl.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        alert("Nice win wanka");

    } else {
        switchPlayer ();

    }

    }
}); 

btnNew.addEventListener("click", init); //as soon as the user clicks new button javascript will call the init function, there is no need to call it in the code. 


