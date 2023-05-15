import { useState } from 'react';
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "./context/UserAuthContext";
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import {BsFillPersonFill} from 'react-icons/bs';
import './Sidebar.css';

function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  }

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
      
      <nav className={`sidebar ${isOpen ? 'open' : ''}`}>

        <ul className="list-unstyled">
        <p className="accountinfo">DASHBOARD</p>

          <li>
            <Link to="/department/admin-dashboard/marks">Result Analysis </Link>
          </li>
          <li>
            <Link to="/department/admin-dashboard/manage-faculty">Manage Faculty</Link>
          </li>
          <li>
            <Link to="/department/admin-dashboard/attendance">Progress Report</Link>
          </li>
          <li>
            <Link to="https://docs.google.com/spreadsheets/d/1pE9aMcx0RBJSEUndxhFuoyKcEaN1CR5_">CO Mapping</Link>
          </li>
        </ul>
        <div>
          <p className="accountinfo">ACCOUNT</p>
          <ul>

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


export default AdminSidebar