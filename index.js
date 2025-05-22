const board = document.getElementById("board");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let cells = Array(9).fill("");
let currentPlayer = "X";
let gameActive = true;

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function createBoard() {
  board.innerHTML = "";
  cells.forEach((_, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = index;
    cell.addEventListener("click", handlePlayerMove);
    board.appendChild(cell);
  });
}

function handlePlayerMove(e) {
  const index = e.target.dataset.index;
  if (cells[index] || !gameActive || currentPlayer !== "X") return;

  makeMove(index, "X");

  if (checkGameEnd()) return;

  setTimeout(computerMove, 500); // Small delay for realism
}

function makeMove(index, player) {
  cells[index] = player;
  const cellDiv = board.querySelector(`[data-index='${index}']`);
  cellDiv.textContent = player;
}

function computerMove() {
  if (!gameActive) return;

  const emptyIndices = cells
    .map((cell, index) => (cell === "" ? index : null))
    .filter((index) => index !== null);

  const randomIndex =
    emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  makeMove(randomIndex, "O");

  checkGameEnd();
}

function checkGameEnd() {
  const winner = checkWinner();

  if (winner) {
    statusText.textContent = `Player ${winner} wins!`;
    gameActive = false;
    return true;
  } else if (cells.every((cell) => cell)) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return true;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    return false;
  }
}

function checkWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return null;
}

restartBtn.addEventListener("click", () => {
  cells = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Player X's turn";
  createBoard();
});

createBoard();
