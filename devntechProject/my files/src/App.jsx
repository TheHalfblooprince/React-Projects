import { useState } from "react";
import Navbar from "./components/navbar";
import Auth from "./components/Auth";

function App() {
  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <Auth />
    </div>
  );
}

export default App;
