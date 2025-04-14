import React from "react";

export default function App() {
  const [starWarsData, setStarWarsData] = React.useState({});
  const [count, setCount] = React.useState(0);

  /**
   * Challenge part 1:
   * Fetch the data from this url: "https://swapi.dev/api/people/1"
   * and save it in the starWarsData state. Make sure you don't
   * get stuck in an infinite rendering loop!
   */

  /**
   * Challenge part 2:
   * Combine the "count" state with the request URL
   * so that pressing the "Get next character" button
   * will get a new character from the Star Wars API.
   * Remember to consider the dependencies array!
   */

  React.useEffect(() => {
    fetch(`https://swapi.dev/api/people/${count}`)
      .then((res) => res.json())
      .then((data) => setStarWarsData(data));
  }, [count]);
  return (
    <div>
      <h2>The count is {count}</h2>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>
        Add
      </button>
      <pre>{JSON.stringify(starWarsData, null, 2)}</pre>
    </div>
  );
}
