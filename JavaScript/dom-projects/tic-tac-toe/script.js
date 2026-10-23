const arr = new Array(9).fill("");
/**
 * row: 012, 345, 678
 * col: 036, 147, 258
 * dig: 048, 246
 */

function checkWinner(player) {
    // if(arr[0] == player)
}

const board = document.getElementById("board");

let turn = "X";

board.addEventListener("click", (e) => {
  const cell = e.target;

  if (cell === board) {
    return;
  }
  cell.textContent = turn;

  turn === "X" ? (turn = "O") : (turn = "X");
});
