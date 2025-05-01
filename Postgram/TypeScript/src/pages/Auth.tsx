import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router";
import {signInWithEmailAndPassword,createUserWithEmailAndPassword, db} from "../firebase";
import { getAuth } from "firebase/auth";
import { doc,setDoc } from "firebase/firestore";
import { UsersContext } from '../context/UserContext'
function Auth() {
   
  // Context values.
  const context = React.useContext(UsersContext);
  if(!context){
    throw new Error("UsersContext Must be used within a UserProvider")
  }
  const {login,setLoginState,currentUser,setCurrentUser} = context;


  // states to store email and password of the user.
  const[email,setEmail] = useState("");

  const [password,setPassword]= useState("");

 

  const navigate = useNavigate();

  // function to handle the submit event of the form. 

  const reset  = () => {
    setEmail("");
    setPassword("");
  }

  useEffect(() => {
    setCurrentUser(null);
  },[currentUser])

  console.log("Login State: ",login);


  function handleSignUp(){
    console.log("Sign Up");
    const auth = getAuth();
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential) => {
      const user = userCredential.user;
      setDoc(doc(db,"users",user.uid), {
        email:email,
      })
      console.log("user created",user);
      setEmail("");
      setPassword("");
      console.log("User Created, Now Enter your Credentials and hit Sign In");
    })
    .catch((error) => {
      switch(error.code){
        case "auth/email-already-in-use":
          alert("Email already in use");
          break;
        case "auth/invalid-email":
          alert("Invalid Email");
          break;
        case "auth/weak-password":
          alert("Weak Password");
          break;
        default:
          alert("Something went wrong");
          console.error("SignUp Error:", error); 
          break;
      }
      reset();
    })

  }


  function handleLogin(){
     console.log("Login")
      const auth = getAuth();
      signInWithEmailAndPassword(auth,email,password)
      .then((userCredential) => {
        // Signed in.
        const user = userCredential.user;
        console.log("User Signed In", user);
        setLoginState(true);
        navigate("/posts");
        reset();
      })
      .catch((error) => {
        switch(error.code){
          case "auth/user-not-found":
            alert("User not found");
            break;
          case "auth/wrong-password":
            alert("Wrong Password");
            break;
          case "auth/invalid-email":
            alert("Invalid Email");
            break;
          default:
            alert("Something went wrong");
            console.error("Login Error:", error); 
            break;
        }
        reset();
      })
  }


  return (
    <div className="flex mt-16 border-1 items-center justify-center border-orange-400 w-2xl rounded-lg">
      <div className="w-full p-4 flex flex-col ">

        <label className="text-orange-500" htmlFor="email">
          Email :{" "}
        </label>
        <input
          className="m-4 bg-white p-4"
          type="email"
          name="email"
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
      
          required
        />

        <label className="text-orange-500" htmlFor="name">
          Password:
        </label>
        <input
          className="m-4 bg-white p-4"
          onChange={(e)=> setPassword(e.target.value)}
          type="password"
          placeholder="Enter your Password"
          required
        />

        <button className="p-4 m-4 bg-orange-400 rounded-lg" onClick={handleLogin}>Sign In</button>
        <p className="mt-10 text-center text-sm boder-1 border-b border-orange-300 text-orange-500 cursor-pointer" onClick={handleSignUp}>Don't have an Account? SignUp</p>
      </div>
    </div>
  );
}

export default Auth;