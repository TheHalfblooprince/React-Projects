
import React from "react"
import { useNavigate } from "react-router";
import axios from "axios"
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/useTheme";
import { ThemeToggle } from "../components/toggleTheme";
// Removed useHistory as it is not available in react-router-dom v6
function  Auth(){
  const { isDark } = useTheme();

  // import login from the context
      const {login} = useAuth()

      // Removed history as useHistory is not available in react-router-dom v6

      const [email,setEmail] = React.useState<string>("")

      const [password,setPassword] = React.useState<string>("")

      const navigation = useNavigate()

      
       function handleSignUp(){
        navigation("/SignUp")
      }

      async function handleLogin(){
        try{
          const res = await axios.post('http://localhost:8000/login', {
            email,
            password
          })
  
          if(res.data.token && res.data.user){
            login(res.data.user,res.data.token);
            navigation("/posts")
          }

        }
        catch(error){
          console.error("Error: ", error)
        }
      }

   
  return (
    <div className="flex mt-16 border-1 items-center  justify-center border-orange-400  w-2xl rounded-lg">
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
          type="password"
          placeholder="Enter your Password"
          required
          onChange={(e) => setPassword(e.target.value)}
          minLength={7}
        />

        <button className="p-4 m-4 bg-orange-400 rounded-lg cursor-pointer" onClick={handleLogin}>Login</button>
        <p className="mt-10 text-center text-sm boder-1 border-b border-orange-300 text-orange-500 cursor-pointer" onClick={handleSignUp}>Don't have an Account? SignUp</p>
      </div>
    </div>
  );
}

export default Auth;