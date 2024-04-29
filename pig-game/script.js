'use strict';
const firstPlayer = document.querySelector('.player--0');
const secPlayer = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore, activePlayer, scores, playing;

const init = function () {
  playing = true;
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  firstPlayer.classList.add('player--active');
  secPlayer.classList.remove('player--active');
  firstPlayer.classList.remove('player--winner');
  secPlayer.classList.remove('player--winner');
};
init();

btnRoll.addEventListener('click', () => {
  if (playing) {
    diceEl.classList.remove('hidden');

    let randomDice = Math.trunc(Math.random() * 6) + 1;
    //   diceEl.src = `dice-${randomDice}.png`;
    diceEl.setAttribute('src', `dice-${randomDice}.png`);
    if (randomDice !== 1) {
      currentScore += randomDice;
      // current0El.textContent = currentScore;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      currentScore = 0;
      firstPlayer.classList.toggle('player--active');
      secPlayer.classList.toggle('player--active');
    }
  }
});
btnHold.addEventListener('click', () => {
  if (playing) {
    // adding scores
    scores[activePlayer] = scores[activePlayer] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //winner
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
      diceEl.classList.add('hidden');
    } else {
      //switchingplayers
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      currentScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      firstPlayer.classList.toggle('player--active');
      secPlayer.classList.toggle('player--active');
    }
  }
});
btnNew.addEventListener('click', init);
