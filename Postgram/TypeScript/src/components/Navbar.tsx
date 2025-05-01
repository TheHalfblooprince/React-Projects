import React from "react";
import { UsersContext } from '../context/UserContext'
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import { auth } from "../firebase";
function Navbar() {

    const navigaton = useNavigate();

    const context = React.useContext(UsersContext);
    if(!context){
        throw new Error("UserContext must be used within a UserProvider");
    }
    const {currentUser,setCurrentUser,login,setLoginState} = context
    
    console.log("Current User: " ,currentUser?.email)

    const handleLogOut = async() => {
      try{
        await signOut(auth);
        setCurrentUser(null);
        setLoginState(false);
        navigaton("/")
      }
      catch(err:string | any){
        console.log(err.message);
      }
    }

  return (
    <div className="flex bg-black w-full p-4 justify-between text-orange-500">
      <h1 className="text-5xl ">Postgram</h1>
      <div>
     {    
        currentUser && <p className="text-center mt-3">{currentUser?.email}</p>    
     } 
     {login && <button onClick={handleLogOut} className="p-2 mt-6 rounded-lg text-center bg-red-500 text-black cursor-pointer">Log Out</button>}
      </div>
    </div>
  );
}

export default Navbar;