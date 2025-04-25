import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UsersContext } from "../context/UserContext";
function SignUp() {


    const {usersData,setUsersData} = React.useContext(UsersContext);

    const navigate = useNavigate();

    // create a function to handle the form submission
    // and get the values of the inputs and log them to the console.

  function handleSubmit(e) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const newUser = {
     id: usersData.length + 1,
     name: formData.name,
     email: formData.email,
    };
    // console.log(newUser)
    
  

    // Check if the newUser is present in the usersData array.
    const userPresent = usersData.some((user) => user.email === newUser.email && user.name === newUser.name);
    // now proceed to sign in the user. by navigating to the Posts Page.
    if (userPresent) {
        alert("User already exists");
        navigate("/");
    } else{
        setUsersData((prevUsers) => [...prevUsers, newUser]);
        alert("User created successfully");
        navigate("/");
    }
    
    formEl.reset();

  }



  return (
    <div className="flex mt-16 border-1 items-center justify-center border-orange-400 w-2xl rounded-lg">
      <form className="w-full p-4 flex flex-col " onSubmit={handleSubmit}>
        <label className="text-orange-500" htmlFor="name">
          Name:
        </label>
        <input
          className="m-4 bg-white p-4"
          type="text"
          name="name"
          id="name"
          placeholder="Enter your Name"
          required
        />

        <label className="text-orange-500" htmlFor="email">
          Email :{" "}
        </label>
        <input
          className="m-4 bg-white p-4"
          type="email"
          name="email"
          placeholder="Enter your Email"
          id="email"
          required
        />

        <button className="p-4 m-4 bg-orange-400 rounded-lg">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;