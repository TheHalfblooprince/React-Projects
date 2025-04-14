    Challenge 02 : Create a `Roll Dice` button that will re-roll
    all 10 dice

    Clicking the button should generate a new array of numbers
    and set the `dice` state to that new array (thus re-rendering
    the array to the page)



     Challenge 05: Update the array of numbers in state to be
     an array of objects instead. Each object should look like:
     { value: <random number>, isHeld: false }

     Making this change will break parts of our code, so make
     sure to update things so we're back to a working state



     Challenge 06: Add conditional styling to the Die component
     so that if it's held (isHeld === true), its background color
     changes to a light green (#59E391)

     Remember: currently the Die component has no way of knowing
     if it's "held" or not.


     Challenge 07: Create a function `hold` that takes
     `id` as a parameter. For now, just have the function
     console.log(id).

     Then, figure out how to pass that function down to each
     instance of the Die component so when each one is clicked,
     it logs its own unique ID property. (Hint: there's more
     than one way to make that work, so just choose whichever
     you want)


      Challenge 08: Update the `hold` function to flip
      the `isHeld` property on the object in the array
      that was clicked, based on the `id` prop passed
      into the function.

      Hint: as usual, there's more than one way to
      accomplish this.



     * Challenge 09: Update the `rollDice` function to not just roll
     * all new dice, but instead to look through the existing dice
     * to NOT role any that are being `held`.
     *
     * Hint: this will look relatively similiar to the `hold`
     * function below. When we're "rolling" a die, we're really
     * just updating the `value` property of the die object.
     *



     * Critical thinking time!
     *
     * We want to indicate to the user that the game is over
     * if (1) all the dice are held, and (2) all the dice have
     * the same value.
     *
     * How might we do this? Some questions to consider:
     *
     * 1. Do we need to save a `gameWon` value in state? If so, why?
     *    If not, why not?
     *
     *  Yes, we can to save the gameWon value in state,but we can also derive the gameWon value from the dice state.
     *
     *
     * 2. Do we need to create a side effect to synchronize the `gameWon`
     *    value (whether it's in state or not) with the current state of
     *    the dice?
     *
     *  No, we can derive the state from the dice also.
     *
     * Conclusion:
     *
     * The game won state can be checked by accessing the dice when all the dice are held and checks if all the dice are similar, then we can say that the game has ended.
     *
     *
     */


    /**
     * Challenge 10:
     * Log "Game won!" to the console only if the 2 winning
     * conditions are met.
     *
     * 1. all the dice are being held, and
     * 2. all the dice have the same value
     *
     * For now, no need to even save a variable!
     */

    /**
     * Challenge 11:
     * 1. Create a new `gameWon` variable.
     * 2. If `gameWon` is true, change the button text to
     *    "New Game" instead of "Roll"
     */


    /**
     * Challenge 12:
     * Make the confetti drop when the game is won! 🎉🎊
     */


    Lazy State Initialization,
    In our state method,  const [dice, setDice] = React.useState(generateAllNewDice());
    the generateAllnewDice() function is being run everytime the component is having a re-render
    to avoid, this what we do is use a callback function to make the function only run once when the
    component mounts. we can do it as follows.
     const [dice, setDice] = React.useState( () => generateAllNewDice());
    This ensures the generateAllNewDice() is called only once when the component is mounted.


       /**
     * Challenge 13: Allow the user to play a new game when the
     * button is clicked
     */
