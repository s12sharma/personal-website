let resetFlag = true;
let gameOver = false;
let playMsgFlag = true;
let computerShots = generateShipCoords();

const resetButton = document.querySelector(".reset-button");
resetButton.addEventListener("click", resetGame);

/**
 * Handles the main game logic including resetting the game, checking if it's the player's turn,
 * and determining the winner.
 */
function gameLogic() {
  if (resetFlag) {
    createComputerBoard();
    resetFlag = false;
  }

  if (getNumberOfPlayerShips() == 6 && playMsgFlag) {
    setAlert("Time to battle!");
    playMsgFlag = false;
  }

  if (
    getNumberOfPlayerShips() == 6 &&
    getPlayerHitCount() != 6 &&
    getComputerHitCount() != 6
  ) {
    turnLogic();
  } else {
    if (!gameOver) {
      setAlert("Place your ships!");
    }
    stopPlayerShoot();
  }

  if (!gameOver) {
    getWinner();
  }
}

/**
 * Handles the logic for determining whose turn it is to shoot.
 * Determines whether it's the player's or computer's turn based on the total number of shots fired.
 */
function turnLogic() {
  if (getTotalPlayerCount() == getTotalComputerCount()) {
    letPlayerShoot();
  } else {
    letComputerShoot();
  }
}

/**
 * Handles the click event on the grid cells (td) of the computer's board.
 * Changes the background color of the clicked cell based on whether it's a hit or miss.
 * Updates the player's hit and miss counts accordingly.
 */
function tdClickHandler() {
  const targetID = this.getAttribute("id");
  // if <td> clicked is a ship
  if (!this.style.backgroundColor) {
    if (computer_ships.includes(targetID)) {
      this.style.backgroundColor = "red";
      playerHitCountSpan.textContent = getPlayerHitCount() + 1;
      setAlert("That was a HIT!");
      // if <td> clicked is NOT a ship
    } else {
      this.style.backgroundColor = "blue";
      playerMissCountSpan.textContent = getPlayerMissCount() + 1;
      setAlert("Aw that was a MISS.");
    }
  } else {
    setAlert("You already bombed that spot!");
  }
}

/**
 * Enables the player to shoot by adding event listeners to the grid cells of the computer's board.
 */
function letPlayerShoot() {
  const tds = document.querySelectorAll("div#computer-board td");
  tds.forEach(function (td) {
    td.addEventListener("click", tdClickHandler);
  });
  document.body.addEventListener("mousedown", handleDocumentClick);
}

/**
 * Disables the player from shooting by removing event listeners from the grid cells of the computer's board.
 */
function stopPlayerShoot() {
  const tds = document.querySelectorAll("div#computer-board td");
  tds.forEach(function (td) {
    td.removeEventListener("click", tdClickHandler);
  });
  document.body.removeEventListener("mousedown", handleDocumentClick);
}

function handleDocumentClick(event) {
  if (!event.target.closest("#computer-board")) {
    setAlert("Please click inside the computer board.");
  }
}

/**
 * Handles the logic for the computer to shoot by selecting a random target cell on the player's board.
 * Changes the background color of the selected cell based on whether it's a hit or miss.
 * Updates the computer's hit and miss counts accordingly.
 */
function letComputerShoot() {
  let shotCoord = getComputerShot();

  const td = document.querySelectorAll(
    "div#player-board td[id='" + shotCoord + "']"
  )[0];

  if (player_ships.includes(shotCoord)) {
    td.style.backgroundColor = "red";
    computerHitCountSpan.textContent = getComputerHitCount() + 1;
  } else {
    td.style.backgroundColor = "blue";
    computerMissCount++;
    computerMissCountSpan.textContent = getComputerMissCount() + 1;
  }
}

/**
 * Resets the game by setting resetFlag to true.
 */
function resetGame() {
  resetFlag = true;
}

/**
 * Determines the winner of the game based on the hit counts of the player and computer.
 * Displays an alert message if there's a winner.
 */
function getWinner() {
  if (getPlayerHitCount() == 6) {
    alert("PLAYER WINS");
    setAlert("PLAYER WINS");
    gameOver = true;
  } else if (getComputerHitCount() == 6) {
    alert("COMPUTER WINS");
    setAlert("COMPUTER WINS");
    gameOver = true;
  }
}

setInterval(gameLogic, 5);
