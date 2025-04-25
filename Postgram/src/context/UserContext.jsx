import React, {createContext,use,useEffect,useState} from "react";

export const UsersContext = createContext();

export const UserProvider = ({children}) => {

    const[usersData,setUsersData] = useState([]);
    // const[user,setUser] = useState(null);

    const [currentUser,setCurrentUser] = useState(null);

    // Load user from localStorage on first load
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);


    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
          .then((res) => res.json())
          .then((data) => setUsersData(data))
          .catch((err) => console.log(err));
      }, []);
    
  return (
    <UsersContext.Provider value={{ usersData, setUsersData, currentUser,setCurrentUser}}>
    {children}
  </UsersContext.Provider>
  )
}
