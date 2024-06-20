const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const currentScore0 = document.getElementById("current--0");
const currentScore1 = document.getElementById("current--1");
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
const dice = document.querySelector(".dice");

// let score_0, score_1, currentscore_0, currentscore_1, activePlayer, playing;
let scores, currentscore, activePlayer, playing;

function init() {
  scores = [0, 0];
  currentscore = 0;
  activePlayer = 0;
  playing = true;

  score0.textContent = scores[0]; // =0
  score1.textContent = scores[1]; // =0
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  dice.hidden = true;

  player0.classList.add("player--active");
  player1.classList.remove("player--active");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
}

init();

function switchPlayer() {
  currentscore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer == 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
}

document.getElementById("btn-roll-dice").addEventListener("click", () => {
  if (playing) {
    // playing == true
    const diceNb = Math.trunc(Math.random() * 6) + 1;
    console.log(diceNb);
    dice.hidden = false;
    dice.src = `dice-${diceNb}.png`;
    if (diceNb != 1) {
      currentscore += diceNb;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentscore;
    } else {
      switchPlayer();
    }
  }
});
document.getElementById("btn-new-game").addEventListener("click", init);
document.getElementById("btn-hold").addEventListener("click", () => {
  if (playing) {
    scores[activePlayer] += currentscore;
    if (activePlayer == 0) score0.textContent = scores[0];
    else score1.textContent = scores[1];

    if (scores[activePlayer] >= 20) {
      playing = false;
      dice.hidden = true;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player-active");
    } else {
      switchPlayer();
    }
  }
});
