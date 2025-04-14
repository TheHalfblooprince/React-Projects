import React, { useState } from "react";
import { languages } from "./languages";
import clsx from "clsx";
import { getFarewellText, getRandomWord } from "./utils";
import ReactConfetti from "react-confetti";

function Header() {
  // State Values
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [gussedLetters, setGussedLetters] = useState([]);

  // Derived Values

  const wrongGuessCount = gussedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

  const isGameWon = currentWord
    .split("")
    .every((letter) => gussedLetters.includes(letter));

  const isGameLost = wrongGuessCount >= languages.length - 1;

  const isGameOver = isGameWon || isGameLost;

  const lastGussedLetter = gussedLetters[gussedLetters.length - 1];

  const isLastGussedLetterisCorrect =
    lastGussedLetter && !currentWord.includes(lastGussedLetter);

  // console.log("Last Gussed Letter: ", lastGussedLetter);
  // console.log("Last Gussed Letter Is Correct: ", isLastGussedLetterisCorrect);

  // Static Values.

  function addGuessedLetter(letter) {
    setGussedLetters((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    );
  }

  const alphabets = "abcdefghijklmnopqrstuvwxyz";

  const keyboardElements = Array.from(alphabets).map((letter) => {
    const isGuessed = gussedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isIncorrect = isGuessed && !currentWord.includes(letter);

    const buttonClass = clsx(" text-black m-2 p-4 rounded-md cursor-pointer", {
      "bg-yellow-500": !isGuessed,
      "bg-[#10A95B]": isCorrect,
      "bg-[#EC5D49]": isIncorrect,
    });

    return (
      <button
        onClick={() => addGuessedLetter(letter)}
        className={buttonClass}
        disabled={isGameOver}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  const lettersArray = Array.from(currentWord).map((letter) => {
    const shouldRevealLetter = isGameLost || gussedLetters.includes(letter);
    const letterClass = clsx(
      "m-4 text-md border-b-1  font-bold p-4 border-b-[#F9F4DA]",
      {
        "text-red-500": isGameLost && !gussedLetters.includes(letter),
      }
    );
    return (
      <span className={letterClass} key={currentWord.indexOf(letter)}>
        {shouldRevealLetter ? letter.toUpperCase() : ""}
      </span>
    );
  });

  const languageElements = languages.map((lang, index) => {
    const isLanguageLost = index < wrongGuessCount;
    const styles = {
      backgroundColor: isLanguageLost
        ? "rgba(0, 0, 0, 0.7)"
        : lang.backgroundColor,
      color: isLanguageLost ? "#aaa" : lang.color,
      opacity: isLanguageLost ? 0.6 : 1,
      borderRadius: 12,
      padding: 8,
      marginTop: 12,
      display: "inline-block",
      marginRight: 8,
    };

    return (
      <span className="p-2 mt-6" style={styles} key={lang.name}>
        {isLanguageLost ? "💀 " : ""}
        {lang.name}
      </span>
    );
  });

  const gameClass = clsx(
    "mt-6 w-full rounded-md",
    isGameWon && "bg-green-500",
    isGameLost && "bg-red-500 mt-6 w-full rounded-md",
    !isGameOver && "bg-[ #282726;]"
  );

  function renderGameStatus() {
    if (!isGameOver && isLastGussedLetterisCorrect) {
      return <p>{getFarewellText(languages[wrongGuessCount - 1].name)}</p>;
    }

    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      );
    }

    if (isGameLost) {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      );
    } else {
      return null;
    }
  }

  function resetGame() {
    setCurrentWord(getRandomWord());
    setGussedLetters([]);
  }

  return (
    <div className="w-150 flex flex-col border border-smoke p-4 m-2 select-none items-center text-center">
      {isGameWon && <ReactConfetti recycle={false} numberOfPieces={1000} />}
      <h3 className="flex justify-center items-center text-[#F9F4DA]">
        Assembly: ENDGAME
      </h3>
      <p className="flex justify-center items-center text-center p-2 max-w-100">
        Guess the word under 8 attempts to keep the programming world safe from
        Assembly!
      </p>

      <section className={gameClass}>{renderGameStatus()}</section>

      <section className="flex flex-wrap max-w-md items-center justify-center gap-1">
        {languageElements}
      </section>

      <section className="flex items-center justify-center mt-10 bg-[#323232]">
        {lettersArray}
      </section>

      <section className="flex flex-wrap mt-10 max-w-md items-center justify-center">
        {keyboardElements}
      </section>

      {isGameOver && (
        <button
          className="bg-[#11B5E5] mt-5 p-4 w-sm rounded-lg text-black border-1 border-amber-50 cursor-pointer"
          onClick={resetGame}
        >
          New Game
        </button>
      )}
    </div>
  );
}

export default Header;
