import React from 'react'
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import "./Navbar.css"
import logo from "../Images/logo.png";
import { FaBars, FaTimes,FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import { useEffect } from 'react';

const Navbar = () => {

  const [isExpanded, setIsExpanded] = useState(false);
  const [isRotated, setIsRotated] = useState(false);

  const toggleMenu = () => {
    setIsExpanded(prevExpanded => !prevExpanded);
    setIsRotated(prevRotated => !prevRotated || !isExpanded);
  };

  const [collapsed, setCollapsed] = useState(true);
  
  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  return (
  
    <div style={{position: 'fixed' }}>
        <nav class="navbar navbar-expand-lg bg-body-tertiary" style={{borderBottom: '1.5px solid #ececf1', padding: '0' ,width: '100%',position: 'fixed',top: '0',backgroundColor: 'rgba(255,255,255,0.5)',fontFamily: "'Golos Text', sans-serif" ,zIndex: '9999'}} >
      <div class="container-fluid" style={{padding: '0',margin: '0',zIndex: '0'}} >
      <NavLink to="/" className="navbar-brand" style={{ padding: '0', margin: '0' }}>
      <img src={logo} alt="logo" height="65" />
   </NavLink>
    <button className={`navbar-toggler${collapsed ? ' collapsed' : ' '}`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{marginRight: '10px' ,border: '0',zIndex: '99999'}} onClick={toggleNavbar}>
    {collapsed ? <FaBars style={{border: 'none', borderRadius: '0px'}}/> : <FaTimes style={{border: 'none', borderRadius: '0px'}} /> }
    </button>

    <div className={`collapse navbar-collapse${collapsed ? ' collapsing' : ' show'}`} id="navbarSupportedContent" style={{zIndex: '99998'}}>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0" >
        <li class="nav-item" style={{paddingLeft: '50px'}}>
        <NavLink
              className={({ isActive }) => isActive ? 'active-link' : 'inactive-link'}
              onClick={toggleNavbar}
              to="/">
              Home
        </NavLink>
        </li> 
        <li class="nav-item" style={{paddingLeft: '50px'}}>
        <NavLink
          className={({ isActive }) => isActive || window.location.pathname.startsWith("/student") ? 'active-link' : 'inactive-link'}
          onClick={toggleNavbar}
          to="/student/dashboard"
        >
          Student
        </NavLink>
        </li>
        <li class="nav-item" style={{paddingLeft: '50px'}}>
        <NavLink
              className={({ isActive }) => isActive || window.location.pathname.startsWith("/department") ? 'active-link' : 'inactive-link'}
              to="/department/admin-dashboard">
              Department
        </NavLink>
        </li>
        <li class="nav-item" style={{paddingLeft: '50px'}}>
        <NavLink
              className={({ isActive }) => isActive ? 'active-link' : 'inactive-link'}
              to="/faculty">
              Faculty
        </NavLink>
        </li>
        <li class="nav-item" style={{paddingLeft: '50px'}}>
        <NavLink
              className={({ isActive }) => isActive ? 'active-link' : 'inactive-link'}
              to="/about ">
              Parent
        </NavLink>
        </li>
        <li class="nav-item" style={{paddingLeft: '50px'}}>
        <NavLink
              className={({ isActive }) => isActive ? 'active-link' : 'inactive-link'}
              to="/events">
              Events & Newsletter
        </NavLink>
        </li>

        <div class="nav-dropdown" style={{paddingLeft: '0px', display: collapsed ? 'block' : 'none'}}>
        <li class="nav-item dropdown" >
          <a class="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" style={{padding: '2.4px',paddingLeft: '40px'}} >
            About
          </a>
          <ul class="dropdown-menu">
            <li>
            <NavLink
              className={({ isActive }) => isActive ? 'active-link' : 'inactive-link' } style= {{marginLeft: '18px'}}
              to="/about">
              About E-Campus
            </NavLink>
            </li>
            <li>
            <NavLink
              className={({ isActive }) => isActive ? 'active-link' : 'inactive-link' } style= {{marginLeft: '18px'}}
              to="/developer">
              About Developers
            </NavLink>
            </li>
            <li><hr class="dropdown-divider"/></li>
            <li>
            <NavLink
              className={({ isActive }) => isActive ? 'active-link' : 'inactive-link' } style= {{marginLeft: '18px'}}
              to="/feedback">
              Submit Feedback
            </NavLink>
            </li>
          </ul>
        </li>
        </div>

        <li class="nav-item" style={{display: collapsed ? 'none' : 'block'}}>
        <a onClick={toggleMenu} style={{ paddingLeft: '40px', fontSize: '17px', color: isExpanded ? 'black' : 'black' }}>
      About
      <a style={{ paddingLeft: '60%', fontSize: '20px', fontWeight: 'bolder' }}>
        {isExpanded ? (
          <FaTimes style={{ fontSize: '14px', color: '#2c2c2c' }} />
        ) : (
          <FaPlus style={{ fontSize: '14px', color: '#2c2c2c', transform: isRotated ? 'rotate(45deg)' : 'none', transition: 'rotate 300ms' }} />
        )}
      </a>
    </a>

          <div class="about-menu" style={{ maxHeight: isExpanded ? '500px' : '0px', transition: ' 300ms ', overflow: 'hidden' }}>
            <li style={{ padding: '3px', paddingTop: '6px' }}><a href="#" class="about-item">About E-Campus</a></li>
            <li style={{ padding: '3px' }}><a href="#" class="about-item">About Developers</a></li>
            <li style={{ padding: '3px' }}><a href="#" class="about-item">Submit Feedback</a></li>
          </div>
        </li>
        

      </ul>


    </div>
  </div>
</nav>
</div>


 
  )
}

export default Navbar