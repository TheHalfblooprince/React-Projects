import  { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext"; // Make sure path is correct


function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Debug user data when component mounts and when user changes
  useEffect(() => {
    console.log("Navbar mounted, auth state:", { user });
    
    // Check localStorage directly
    const localStorageUser = localStorage.getItem('user');
    console.log("User from localStorage:", localStorageUser);
    
    if (localStorageUser) {
      try {
        const parsedUser = JSON.parse(localStorageUser);
        console.log("Parsed user:", parsedUser);
        console.log("Email from parsed user:", parsedUser.email);
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
      }
    }
  }, [user]);

  function handleLogOut() {
    console.log("Logout clicked");
    logout();
    navigate("/");
  }

  return (
    <div className="flex bg-black w-full p-4 justify-between text-orange-500">
      <h1 className="text-5xl">Postgram</h1>
      <div className="flex flex-col items-end">    
        {user && 
          <>
            <p className="text-center text-orange-400 mt-3">
              {user.email || "No email found"}
            </p>

            <button
              onClick={handleLogOut}
              className="p-2 mt-2 rounded-lg text-center bg-red-500 text-black cursor-pointer"
            >
              Log Out
            </button>
          </>
       }
      </div>
    </div>
  );
}

export default Navbar;