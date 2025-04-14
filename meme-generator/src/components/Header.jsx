import React from "react";
import Logo from "../assets/images/troll-face.png";
function Header() {
  return (
    <div class="select-none">
      <header class="bg-purple-400 flex items-center p-6">
        <img class="h-[100px] mr-4 ml-6" src={Logo} alt="Meme-Generator Logo" />
        <h2 class="font-bold text-3xl">Meme Generator</h2>
      </header>
    </div>
  );
}

export default Header;
