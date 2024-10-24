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
    const gameState = Array(9).fill(null);

    // Loop through each div and add event listeners for click events
    sq.forEach(function(square, index) {
        square.addEventListener('click', function() {
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
                // Switch turns
                xTurn = !xTurn;
            } else {
                // If the square has already been clicked, show red background
                square.style.backgroundColor = 'red';
                // Log a message telling the user to select another square
                //console.log("Square already used! Please select another square.");
                alert("Square already used! Please select another square.");
                // Reset background color after a delay
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
});
