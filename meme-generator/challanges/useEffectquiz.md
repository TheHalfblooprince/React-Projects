1. In what way are React components meant to be "pure functions"

In Functional programming, pure functions are such functions which are supposed to return the same result given the same inputs and have no side effects.

2. What is a "side effect" in React? What are some examples?

Side efefcts are those uncontrolled components which React does not handles on its own.

3. What is NOT a "side effect" in React? Examples?

We can say the contolled components are not side Effects in react, like state variables.

4. When does React run your useEffect function? When does it NOT run
   the effect function?

   React Runs a useEffect function everytime there is a re-render in the component. It does not run the state when the state of the state remains unchanged, i.e it remains the same during the component's execution.

5. How would you explain what the "dependecies array" is?

We can say as the name suggests, the dependecies array is the array which holds the value of the state variable the effect function is supposed to listen to the changes made in that variable and renders the component only when the value of that item in the dependecies array is changed.
