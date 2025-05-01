import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import Posts from "./pages/Posts";
import { UserProvider } from "./context/UserContext";
import { BrowserRouter,Routes,Route } from "react-router";

function App() {
  return (
    <div className="flex flex-col items-center">
      <UserProvider>
      <BrowserRouter>
      <Navbar />
      <Routes>
            <Route path="/" element={<Auth />}/>
            <Route path="/posts" element={<Posts />} />
      </Routes>
      </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;