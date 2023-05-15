


import "./Student.css"
import {  Alert } from "react-bootstrap";
import { UilEyeSlash, UilEye } from '@iconscout/react-unicons'; 

import { useUserAuth } from "./context/UserAuthContext";


import React, { useState } from "react";
import {  NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";


const Department = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {  googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        const user = res.user;
        if (user.email.includes("hodise.rvitm@rvei.edu.in")) {

          navigate("/department/admin-dashboard"); // Navigate to the desired page
        } else {
          setError("Invalid Credentials");
        }
      })
      .catch((err) => {
        setError(err.message);
      });
    } catch (err) {
      setError(err.message);
    }
  };



  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="logincontainer" style={{paddingTop: '65px'}}>
      <form >
   

        <div class="form-group" style={{paddingBottom: '15px'}}>
          <input type="text" class="form-control" name='email' id="email"  
          value = {email}
          onChange = {(e) => setEmail(e.target.value)}
          required/>
          <label for="email" style={{marginLeft: '5px'}}>Enter Email address</label>
        </div>
        <div class="form-group" style={{paddingBottom: '0px'}}>
          <input  type={passwordShown ? "text" : "password"} class="form-control" name='password' id="password" 
          value = {password}
          onChange = {(e) => setPassword(e.target.value)}
          required/>
          <label for="password" style={{marginLeft: '5px'}}>Enter Password</label>
          <button onClick={togglePasswordVisibility} className="passwordbutton">
          {passwordShown ? <UilEye /> : <UilEyeSlash />}
        </button>
        </div>
        {error && <Alert variant="danger" style={{fontSize: '12px'}}>{error}</Alert>}
        
        <button type="submit" name="signup" id="signup" className="btn btn-primary" onClick={handleSubmit}>Log In</button>
 


      </form>

    </div>




  )
}

export default Department;