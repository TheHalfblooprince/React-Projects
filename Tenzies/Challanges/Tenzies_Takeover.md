    Challenge 1: Setup the React App
    Goal: Create a React project and add the basic structure.
    Tasks:
    ✅ Initialize a React project using Vite or Create React App.
    ✅ Set up the App.js file with a main container.
    ✅ Display a title and instructions for the game.

    ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    Challenge 2: Create the Dice Component
    Goal: Build a reusable Die component.
    Tasks:
    ✅ Create a Die.js file inside components/.
    ✅ Accept value, isHeld, and hold() as props.
    ✅ Display a number (1-6) inside a styled box.
    ✅ Change background color if isHeld is true.

    ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    Challenge 3: Generate and Display 10 Dice
    Goal: Create and store an array of dice in state.
    Tasks:
    ✅ Use useState to hold an array of 10 dice.
    ✅ Each die should have a random value (1-6) and an isHeld property.
    ✅ Render the dice using .map() inside the App component.
    ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    Challenge 4: Implement the Roll Dice Feature
    Goal: Implement the rollDice function.
    Tasks:
    ✅ Add a "Roll" button that triggers rollDice().
    ✅ On click, update only the non-held dice with new random values.
    ✅ Ensure held dice keep their values.

    ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    Challenge 5: Implement the Hold Dice Feature
    Goal: Allow users to freeze dice at their current values.
    Tasks:
    ✅ Create a hold(id) function that toggles isHeld.
    ✅ When a die is clicked, its color should change to indicate it’s held.

    ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    Challenge 6: Detect Winning Condition
    Goal: Check when all dice have the same value and are held.
    Tasks:
    ✅ Add a gameWon boolean that checks if all dice are the same.
    ✅ If gameWon is true, change the button text to "New Game".

    ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    Challenge 7: Implement the New Game Feature
    Goal: Reset the game when the user wins.
    Tasks:
    ✅ Modify rollDice() so that if gameWon is true, clicking resets all dice.

    ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------


    Challenge 8: Add Confetti Effect 🎉
    Goal: Celebrate the win!
    Tasks:
    ✅ Install and import ReactConfetti.
    ✅ Show the confetti when gameWon is true.

    ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------


    Challenge 9: Improve UI with TailwindCSS
    Goal: Style the game nicely using Tailwind.
    Tasks:
    ✅ Center the game board.
    ✅ Style the dice with a rounded box.
    ✅ Make the "Roll" button more visually appealing.

    ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------


    Challenge 10: Add Keyboard Accessibility
    Goal: Improve accessibility by allowing keyboard controls.
    Tasks:
    ✅ Use useRef to focus the button when the game is won.
    ✅ Allow pressing "Enter" or "Space" to roll the dice.

    ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
