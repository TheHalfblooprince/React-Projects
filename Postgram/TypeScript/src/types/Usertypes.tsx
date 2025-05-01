 export interface User {
    uid: string;
    email: string
}

export interface UserContextType {
    currentUser: User | null;
    setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
    login: boolean;
    setLoginState: React.Dispatch<React.SetStateAction<boolean>>
}

