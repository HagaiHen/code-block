import { useState } from 'react';
import Login from './pages/login/Login';
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/useAuthContext";
import Home from './pages/home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App
