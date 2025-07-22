/**
 * Adds ship at the <td> id position on the computers board
 */
function addShip(id) {
  tile = document.querySelector("div#computer-board td[id='" + id + "']");

  // create a new ship element
  const ship = document.createElement("img");
  ship.src = "./assets/ship.png";
  document.querySelector(".computer-assets").appendChild(ship);

  // hides the ships
  ship.classList.add("hide");

  // adds the ship to the <td> grid
  tile.appendChild(ship);
}

/**
 * Generates an array of ids between "00" and "99".
 * Used as ship coordinates.
 *
 * @returns {string[]} An array containing six randomly generated numbers between 00 and 99
 */
function generateShipCoords() {
  const board = [];
  const usedNumbers = new Set();

  while (board.length < 6) {
    const randomNumber = Math.floor(Math.random() * 100);

    const paddedNumber = randomNumber.toString().padStart(2, "0");

    if (!usedNumbers.has(paddedNumber)) {
      board.push(paddedNumber);
      usedNumbers.add(paddedNumber);
    }
  }

  return board;
}

/**
 * Saves the computers ship coordinates to the global computer_ships array
 * Spawns in the ships on the computer board
 */
function createComputerBoard() {
  // Keep track of computer ship coordinates
  computer_ships.push(...generateShipCoords());
  computer_ships.forEach((coord) => addShip(coord));
}
