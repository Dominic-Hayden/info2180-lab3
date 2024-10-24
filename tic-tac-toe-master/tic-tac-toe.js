document.addEventListener("DOMContentLoaded", function() {

    // Select all divs in the game board
    const sq = document.querySelectorAll('#board div'); // board div is used in JavaScript to select all <div> elements that are children of the element with the id="board"
    
    // Loop through each div and add the 'square' class
    sq.forEach(function(square) {
        square.classList.add('square');
    });

//////////////////////////////////////////////////////////////////////////////
    //Exercise 2
////////////////////////////////////////////////////////////////////////////

    // Track whether it's X's or O's turn (true for X and false for O)
    let xTurn = true;

    /* Initialize an empty array to keep track of the state of the game after each
       square is clicked so that you can use it later to check which user has won */
    let gameState = Array(9).fill(null);

    // Flag to check if the game has been won
    let gameWon = false;

    // Winning combinations (rows, columns, and diagonals)
    const winningCombinations = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal from top-left to bottom-right
        [2, 4, 6]  // Diagonal from top-right to bottom-left
    ];

//////////////////////////////////////////////////////////////////////////////
    //Exercise 4
////////////////////////////////////////////////////////////////////////////

    // Function to check if there's a winner
    function checkWinner() {
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return gameState[a]; // Return 'X' or 'O' if we have a winner
            }
        }
        return null; // No winner yet
    }

    // Function to update the status when there is a winner
    function updateStatus(winner) {
        const statusDiv = document.getElementById('status');
        statusDiv.textContent = 'Congratulations! ${winner} is the Winner!'; // Display winner message
        statusDiv.classList.add('you-won'); // Add the 'you-won' class for styling
        gameWon = true; // Set the gameWon flag to true, indicating the game has ended
    }

//////////////////////////////////////////////////////////////////////////////
    //Exercise 5
////////////////////////////////////////////////////////////////////////////

    // Function to reset the game state
    function resetGame() {
        gameState = Array(9).fill(null); // Reset game state
        sq.forEach(function(square) {
            square.textContent = ''; // Clear X's and O's
            square.classList.remove('X', 'O'); // Remove X and O classes
            square.style.backgroundColor = ''; // Clear background color
        });
        const statusDiv = document.getElementById('status');
        statusDiv.textContent = 'Move your mouse over a square and click to play an X or an O.'; // Reset the status message
        statusDiv.classList.remove('you-won'); // Remove the 'you-won' class
        xTurn = true; // Set it to X's turn again
        gameWon = false; // Reset the gameWon flag
    }

    // Loop through each div and add event listeners for click events
    sq.forEach(function(square, index) {
        square.addEventListener('click', function() {
            // Do not allow further moves if the game has already been won
            if (gameWon) {
                alert("The game is over. Please start a new game.");
                return;
            }

            // Ensure the square has not been clicked before
            if (gameState[index] === null) {
                // Add 'X' or 'O' to the square based on the current turn
                if (xTurn) {
                    square.textContent = 'X';  // Place an X
                    square.classList.add('X');  // Add class X for styling
                    gameState[index] = 'X';     // Update game state
                } else {
                    square.textContent = 'O';  // Place an O
                    square.classList.add('O');  // Add class O for styling
                    gameState[index] = 'O';     // Update game state
                }

                // Check for a winner after each move
                const winner = checkWinner();
                if (winner) {
                    updateStatus(winner); // Update the status with the winner's message
                    return; // Stop the game once there is a winner
                }

                // Switch turns
                xTurn = !xTurn;
            } else {
                // If the square has already been clicked, show red background
                square.style.backgroundColor = 'red';
                alert("Square already used! Please select another square.");
                setTimeout(function() {
                    square.style.backgroundColor = ''; // Reset background color
                }, 1500); // 1.5 secs
            }
        });

//////////////////////////////////////////////////////////////////////////////
    //Exercise 3
////////////////////////////////////////////////////////////////////////////
    
        // Change style on mouseover
        square.addEventListener('mouseover', function() {
            square.classList.add('hover'); // Add the hover class
        });

        // Change style back on mouseout
        square.addEventListener('mouseout', function() {
            square.classList.remove('hover'); // Remove the hover class
        });
    });

//////////////////////////////////////////////////////////////////////////////
    //Exercise 5 - Reset Game
////////////////////////////////////////////////////////////////////////////

    // Add click event to the "New Game" button to reset the game
    const newGameButton = document.querySelector('.btn');
    newGameButton.addEventListener('click', resetGame);

});
