import { useState } from 'react';
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../../Backend/context/UserAuthContext";
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import {BsFillPersonFill} from 'react-icons/bs';
import './Sidebar.css';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  }

  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/department");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      
      <nav className="studentsidebar">

        <ul className="list-unstyled">
        <p className="accountinfo">DASHBOARD</p>

        <li>
            <Link to="/student/dashboard">Home</Link>
          </li>
          <li>
            <Link to="/student/dashboard/marks">Sem Marks</Link>
          </li>
          <li>
            <Link to="/student/dashboard/attendance">Attendance</Link>
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


export default Sidebar