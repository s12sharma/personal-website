/* draggable element */
const ships = document.querySelectorAll(".ship-assets");

ships.forEach((ship) => {
  ship.addEventListener("dragstart", dragStart);
  ship.addEventListener("dragend", dragEnd);
});

/**
 * Adds event listeners to the draggable ship elements to handle the dragstart and dragend events.
 * Sets the data to be transferred during drag and hides the dragged ship temporarily.
 */
function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
  setTimeout(() => {
    e.target.classList.add("hide");
  }, 0);
}

let shipDropped = false;
/**
 * Handles the dragend event on draggable ship elements.
 * If the ship wasn't dropped inside a <td>, ensures that it remains visible after dragging.
 */
function dragEnd(e) {
  if (!shipDropped) {
    e.target.classList.remove("hide");
  }
  shipDropped = false;
}

/* drop targets */
const boxes = document.querySelectorAll(".draggable");

boxes.forEach((box) => {
  box.addEventListener("dragenter", dragEnter);
  box.addEventListener("dragover", dragOver);
  box.addEventListener("dragleave", dragLeave);
  box.addEventListener("drop", drop);
});

/**
 * Handles the dragenter event on drop targets.
 * Prevents the default behavior and adds visual indication of drag over.
 */
function dragEnter(e) {
  e.preventDefault();
  e.target.classList.add("drag-over");
}

/**
 * Handles the dragover event on drop targets.
 * Prevents the default behavior and adds visual indication of drag over.
 */
function dragOver(e) {
  e.preventDefault();
  e.target.classList.add("drag-over");
}

/**
 * Handles the dragleave event on drop targets.
 * Removes the visual indication of drag over.
 */
function dragLeave(e) {
  e.target.classList.remove("drag-over");
}

/**
 * Handles the drop event on drop targets.
 * Removes the visual indication of drag over, clones the draggable element,
 * and appends it to the drop target.
 * Also updates the state of the game based on the dropped ship's position.
 */
function drop(e) {
  e.target.classList.remove("drag-over");

  // get the draggable element
  const id = e.dataTransfer.getData("text/plain");
  const draggable = document.getElementById(id);

  // create a clone of the draggable element
  const clone = draggable.cloneNode(true);
  e.target.appendChild(clone);

  draggable.classList.remove("hide");

  // make the <td> an invalid drop target
  e.target.removeEventListener("dragenter", dragEnter);
  e.target.removeEventListener("dragover", dragOver);
  e.target.removeEventListener("drop", drop);

  // Keep track of player ship coordinates
  player_ships.push(e.target.getAttribute("id"));

  shipDropped = true;
}
