import React from "react";
import chefClaude from "../assets/images/chef-claude-icon.png";
function Header() {
  return (
    <div>
      <header class="flex items-center justify-center shadow-xl border-2 rounded-lg border-indigo-200 ">
        <img src={chefClaude} alt="chef-claude" />
        <h1 class="text-3xl font-bold text-indigo-600 m-4 ">Chef Claude</h1>
      </header>
    </div>
  );
}

export default Header;
