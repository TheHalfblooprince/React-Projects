import React, {createContext,useEffect,useState} from "react";
import {auth,db} from "../firebase"
import { doc,getDoc } from "firebase/firestore";
import {User,UserContextType}  from "../types/Usertypes"


export const UsersContext = createContext<UserContextType | undefined>(undefined);

type UserProiverProps = {
    children: React.ReactNode
}

export const UserProvider:React.FC<UserProiverProps> = ({children}) => {

    const [currentUser,setCurrentUser] = useState<User | null>(null)
    const[login,setLoginState] = useState<boolean>(false);
    // fetch currentUser from firebase auth.

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async(user) => {
        if(user){
          const userDocRef = doc(db,"users",user.uid);
          const userDocSnap =  await getDoc(userDocRef);

          if(userDocSnap.exists()){
            setCurrentUser({ uid: user.uid, email:user.email || "", ...userDocSnap.data() });
          }else {
            setCurrentUser(null)
          }
        }
      })
      return(() => unsubscribe());
    },[])

    
  return (
    <UsersContext.Provider value={{currentUser,setCurrentUser,login,setLoginState}}>
    {children}
  </UsersContext.Provider>
  )
}
