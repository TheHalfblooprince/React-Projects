import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import ReactConfetti from "react-confetti";
import { useState, useEffect, useRef } from "react";
export default function App() {
  const [dice, setDice] = React.useState(() => generateAllNewDice());
  const buttonRef = useRef(null);
  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  useEffect(() => {
    if (gameWon && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [gameWon]);

  const diceArray = dice.map((diceObj) => (
    <Die
      key={diceObj.id}
      value={diceObj.value}
      isHeld={diceObj.isHeld}
      hold={() => hold(diceObj.id)}
    />
  ));

  function rollDice() {
    if (gameWon) {
      setDice(generateAllNewDice());
    } else {
      setDice((oldDice) =>
        oldDice.map((item) =>
          item.isHeld
            ? { ...item }
            : { ...item, value: Math.ceil(Math.random() * 6) }
        )
      );
    }
  }

  function hold(id) {
    // console.log(id);
    // flip the isHeld Property
    setDice((prevDice) =>
      prevDice.map((item) => {
        return item.id === id ? { ...item, isHeld: !item.isHeld } : { ...item };
      })
    );
  }

  return (
    <main>
      {gameWon && <ReactConfetti />}
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div class="bg-white p-8 rounded-md shadow-lg max-w-sm flex flex-wrap gap-4 items-center justify-center">
          <h1 className="font-bold  text-2xl ">Tenzies</h1>
          <p className="instructions">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
          {diceArray}
        </div>
        <div class="m-10">
          <button
            ref={buttonRef}
            onClick={rollDice}
            class="p-3 bg-indigo-500 rounded-lg w-32 select-none cursor-pointer text-white"
          >
            {gameWon ? "New Game" : "Roll"}
          </button>
        </div>
      </div>
    </main>
  );
}
