import React from "react";

function Auth() {
  function handleSubmit(e) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const formData = new FormData(formEl);
    const email = formData.get("email");
    const name = formData.get("name");
    console.log(email, " ", name, " ");
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

        <button className="p-4 m-4 bg-orange-400 rounded-lg">Sign In</button>
      </form>
    </div>
  );
}

export default Auth;
