/* GLOBAL VARIABLES */
const player_ships = [];
const computer_ships = [];
let computer_shots = new Set();

const playerHitCountSpan = document.getElementById("playerHitCount");
const playerMissCountSpan = document.getElementById("playerMissCount");
const computerHitCountSpan = document.getElementById("computerHitCount");
const computerMissCountSpan = document.getElementById("computerMissCount");

function getNumberOfPlayerShips() {
  return player_ships.length;
}

// Define getter functions for player counts
function getPlayerHitCount() {
  return parseInt(playerHitCountSpan.textContent);
}

function getPlayerMissCount() {
  return parseInt(playerMissCountSpan.textContent);
}

// Define getter functions for computer counts
function getComputerHitCount() {
  return parseInt(computerHitCountSpan.textContent);
}

function getComputerMissCount() {
  return parseInt(computerMissCountSpan.textContent);
}

// Define getter functions for total counts
function getTotalPlayerCount() {
  return getPlayerHitCount() + getPlayerMissCount();
}

function getTotalComputerCount() {
  return getComputerHitCount() + getComputerMissCount();
}

function getComputerShot() {
  const randomNumber = Math.floor(Math.random() * 100);

  const paddedNumber = randomNumber.toString().padStart(2, "0");

  if (!computer_shots.has(paddedNumber)) {
    computer_shots.add(paddedNumber);
    return paddedNumber;
  }
}

function setAlert(message) {
  let alert = document.querySelector(".alert");
  alert.textContent = message;
}
