import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import SignUp from "./pages/SignUp";
import Posts from "./pages/Posts";
import { BrowserRouter,Routes,Route, Navigate } from "react-router";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { useEffect } from "react";
import { ThemeProvider } from "./context/useTheme";

// protected route component.
interface ProtectedRouteProps  {
  children: React.ReactNode
}

const ProtectedRoute = ({children}: ProtectedRouteProps) => {
  const {token} = useAuth()

  if(!token){
    return<Navigate to="/"/>
  }

  return <>{children}</>;

}

// Component to initialize user from localStorage on app start
const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const { user, token } = useAuth();
  
  useEffect(() => {
    // Debug information
    console.log("App mounted, current auth state:", { user, token });
    console.log("localStorage token:", localStorage.getItem('token'));
    console.log("localStorage user:", localStorage.getItem('user'));
  }, []);
  
  return <>{children}</>;
};



function AppRoutes() {
  const { user } = useAuth();
  useEffect(() => {
    console.log("Routes rendered with user:", user);
  }, [user]);
  return (
    <AuthInitializer>

    <div className="flex flex-col items-center">
      <Navbar />
      <Routes>
            <Route path="/" element={<Auth />}/>
            <Route path="/SignUp" element={<SignUp />}/>

            <Route path="/posts" element={
              <ProtectedRoute>
                <Posts />
              </ProtectedRoute>
            } 
            />
            {/* {
                  Routes for unkown paths. 
            } */}
            <Route path="*" element={<Auth />}/>
      </Routes>
    </div>
    </AuthInitializer>
  );
}


function App(){
  useEffect(() => {
    const selectedTheme = localStorage.getItem('theme');

    if (selectedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return(
    <ThemeProvider>
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>

    </ThemeProvider>
    
  )
}

export default App;