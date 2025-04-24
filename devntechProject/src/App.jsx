import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import AuthPage from "./pages/AuthPage";
import PostsPage from "./pages/PostsPage";

const AppRoutes = () => {
  const { user } = useAuth();
  return (
    <Routes>
      <Route
        path="/"
        element={user ? <PostsPage /> : <Navigate to="/auth" />}
      />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/posts" element={<PostsPage />} />
    </Routes>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

