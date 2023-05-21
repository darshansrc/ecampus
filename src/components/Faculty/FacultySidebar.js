import { useState } from 'react';
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../Backend/context/UserAuthContext";
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import {BsFillPersonFill} from 'react-icons/bs';
import './FacultySidebar.css'
import { NavLink } from "react-router-dom";



function FacultySidebar() {
  const [isOpen, setIsOpen] = useState(false);


  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/student");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      
      <nav className="facultysidebar">

        <ul className="list-unstyled">
        <p className="accountinfo">DASHBOARD</p>

        <li>
            <Link to="/faculty/dashboard">Home</Link>
          </li>
          <li>
            <Link to="/faculty/dashboard/marks">Sem Marks</Link>
          </li>
          <li>
            <NavLink to="/faculty/dashboard/attendance">Attendance</NavLink>
    
          </li>
          <li class="nav-item">
        <NavLink
              className={({ isActive }) => isActive ? 'active-link' : 'inactive-link'}
              
              to="/">
              Home
        </NavLink>
        </li> 
        </ul>
        <div>
          <p className="accountinfo">ACCOUNT</p>
          <ul>
            <li>
              <Link to=""><BsFillPersonFill style={{ marginRight: '0px', marginBottom: '3px' }} /> Personal Info</Link>
            </li>
            <li>
              <button className="logoutbutton" onClick={handleLogout}>
                <FiLogOut style={{ marginRight: '4px', marginBottom: '2px' }} />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}


export default FacultySidebar