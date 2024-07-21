import { useState } from 'react';
import Login from './pages/login/Login';
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/useAuthContext";
import Home from './pages/home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const { authUser } = useAuthContext();
  
  return (
    <div>
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to={"/login"} />} />
        {/* <Route path="/signup" element={authUser ? <Navigate to={"/"} /> : <SignUp />} /> */}
        <Route path="/login" element={authUser ? <Navigate to={"/"} /> : <Login />} />
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App
