import React, { useEffect, useState } from "react";

function Body() {
  const [meme, setMeme] = useState({
    topText: "One Does not Simply",
    bottomText: "walk into Mordor",
    imageUrl: "http://i.imgflip.com/1bij.jpg",
  });

  const [allmemes, setAllmemes] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllmemes(data.data.memes));
  }, []);

  function getMemeImage() {
    const randomIndex = Math.floor(Math.random() * allmemes.length);
    console.log(allmemes);
    const randomImage = allmemes[randomIndex]?.url;
    console.log(randomImage);
    setMeme((prevMeme) => ({
      ...prevMeme,
      imageUrl: randomImage,
    }));
  }

  function handleChange(event) {
    const { value, name } = event.currentTarget;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <div class="px-30 py-30">
      <div class="flex  items-center justify-center">
        <label class="font-bold select-none">
          Top Text
          <input
            type="text"
            class="border p-2 ml-4 mr-4 focus:bg-blue-300 rounded-lg"
            placeholder="one does not simply"
            onChange={handleChange}
            name="topText"
            value={meme.topText}
          />
        </label>
        <label class="font-bold select-none">
          Bottom Text
          <input
            type="text"
            class="border p-2 ml-4 mr-4 focus:bg-blue-300 rounded-lg"
            placeholder="walk into mordor"
            onChange={handleChange}
            name="bottomText"
            value={meme.bottomText}
          />
        </label>
      </div>
      <div class="flex items-center justify-center select-none">
        <button
          onClick={getMemeImage}
          class="flex bg-purple-500 cursor-pointer items-center justify-center mt-20 p-3 rounded-lg"
        >
          Get a new meme image
        </button>
      </div>
      <div class="flex flex-col relative items-center justify-center mt-16 ">
        <img src={meme.imageUrl} class="rounded-lg h-auto" />
        <span class="absolute top-0 font-bold text-3xl text-white select-none">
          {meme.topText}
        </span>
        <span class="absolute bottom-0 font-bold text-3xl text-white select-none">
          {meme.bottomText}
        </span>
      </div>
    </div>
  );
}

export default Body;
