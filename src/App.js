import './App.css';
import { Route, Routes, BrowserRouter, useNavigate } from 'react-router-dom';
import Register from './components/Register'
import Home from './components/Home'
import Login from './components/Login'
import Profile from './components/Profile'
import React, { useState, useEffect } from 'react';
import axios from "axios";

function App() {
  const [loggedInStatus, setloggedInStatus] = useState("NOT_LOGGED_IN");
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    checkLoginStatus()
  }, []);

  const checkLoginStatus = () => {
   
    axios
    .get("http://localhost:3000/logged_in", { withCredentials: true })
    .then(response => {
      if (
        response.data.logged_in &&
        loggedInStatus === "NOT_LOGGED_IN"
      ) {
        console.log("ok")
        setloggedInStatus("LOGGED_IN")
        setUser(response.data.user)
      } else if (
        !response.data.logged_in &&
        (loggedInStatus === "LOGGED_IN")
        
      ) {
        setloggedInStatus("NOT_LOGGED_IN")
        setUser({})
      }
    })
    .catch(error => {
      console.log("check login error", error);
    });
  }

  const handleLogout = () =>{
    setloggedInStatus("NOT_LOGGED_IN")
    setUser({})
  }

  const handleLogin = (data) =>{
    setloggedInStatus("LOGGED_IN")
    setUser(data.user)
  }
  return (
    <div className="App">
        <Routes>
            <Route path="register" element={<Register/>}/>
            <Route path="/" element={<Home loggedInStatus = {loggedInStatus} user = {user} handleLogout = {handleLogout}/>}/>
            <Route path="login" element={<Login handleLogin = {handleLogin}/>}/>
            <Route path="/profile" element={<Profile loggedInStatus = {loggedInStatus} user = {user} handleLogout = {handleLogout}/>}/>
        </Routes>
    </div>
  );
}

export default App;
