import React from "react";
import { UsersContext } from '../context/UserContext'
function Navbar() {


    const {currentUser} = React.useContext(UsersContext);
    console.log(currentUser)
  return (
    <div className="flex bg-black w-full p-4 justify-between text-orange-500">
      <h1 className="text-5xl ">Postgram</h1>
      <p>{currentUser?.name}</p>
    </div>
  );
}

export default Navbar;