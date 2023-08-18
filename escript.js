const board = document.getElementById("board");
const cells = document.querySelectorAll("[data-cell]");
const resetButton = document.getElementById("reset-button");
const resultText = document.getElementById("result");

let currentPlayer = "X";
let gameActive = true;

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]           // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a].textContent === currentPlayer && cells[b].textContent === currentPlayer && cells[c].textContent === currentPlayer) {
            cells[a].classList.add("win");
            cells[b].classList.add("win");
            cells[c].classList.add("win");
            gameActive = false;
            return true;
        }
    }

    if (Array.from(cells).every(cell => cell.textContent !== "")) {
        resultText.textContent = "¡Empate!";
        gameActive = false;
        return true;
    }

    return false;
}

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        if (cell.textContent === "" && gameActive) {
            cell.textContent = currentPlayer;
            if (checkWin()) {
                resultText.textContent = `¡${currentPlayer} ganó!`;
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }
    });
});

resetButton.addEventListener("click", () => {
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("win");
    });
    resultText.textContent = "";
    currentPlayer = "X";
    gameActive = true;
});
