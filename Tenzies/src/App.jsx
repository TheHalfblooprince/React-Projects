import React, { isValidElement } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import ReactConfetti from "react-confetti";
import { useState, useEffect, useRef } from "react";
export default function App() {
  const [dice, setDice] = useState(generateAllNewDice());

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

  const diceArray = dice.map((diceObj) => (
    <Die
      value={diceObj.value}
      isHeld={diceObj.isHeld}
      key={diceObj.id}
      hold={() => hold(diceObj.id)}
    />
  ));

  function hold(id) {
    console.log(id);
    setDice(
      dice.map((item) =>
        item.id === id ? { ...item, isHeld: !item.isHeld } : { ...item }
      )
    );
  }

  function handleRoll() {
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
  return (
    <main>
      {gameWon && <ReactConfetti />}
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div class="bg-white select-none p-8 rounded-md shadow-lg max-w-sm flex flex-wrap gap-4 items-center justify-center">
          <h1 className="font-bold  text-2xl ">Tenzies</h1>
          <p className="instructions">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
          {diceArray}
        </div>

        <div class="m-10">
          <button
            onClick={handleRoll}
            class="p-3 bg-indigo-500 rounded-lg w-32 select-none cursor-pointer text-white"
          >
            {gameWon ? "New Game" : "Roll Dice"}
          </button>
        </div>
      </div>
    </main>
  );
}
