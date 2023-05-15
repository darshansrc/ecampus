import React from 'react'
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import "./Navbar.css"
import logo from "../Images/logo.png";
import { FaBars, FaTimes,FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import { useEffect } from 'react';
import { MenuToggle } from './MenuToggle';
import { useAnimate } from 'framer-motion';

function useMenuAnimation(isOpen) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const animationDuration = 0.5;

    animate(
      [
        [
          "path.top",
          { d: isOpen ? "M 3 16.5 L 17 2.5" : "M 2 2.5 L 20 2.5" },
          { at: "<", duration: animationDuration }
        ],
        ["path.middle", { opacity: isOpen ? 0 : 1 }, { at: "<", duration: animationDuration }],
        [
          "path.bottom",
          { d: isOpen ? "M 3 2.5 L 17 16.346" : "M 2 16.346 L 20 16.346" },
          { at: "<", duration: animationDuration }
        ],
      ],
      {
        easing: "ease-out" 
      }
    );
  }, [isOpen]);

  return scope;
}

const Navbar = () => {

  const [collapsed, setCollapsed] = useState(true);
  const [isOpen, setIsOpen] = useState(false);


  const toggleNavbar = () => {
    setCollapsed(!collapsed);
    setIsOpen(!isOpen);
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const [isRotated, setIsRotated] = useState(false);

  const scope = useMenuAnimation(isOpen);


  const toggleMenu = () => {
    setIsExpanded(prevExpanded => !prevExpanded);
    setIsRotated(prevRotated => !prevRotated || !isExpanded);
  };

  return (
  
    <div style={{position: 'fixed' }} ref={scope}>
        <nav class="navbar navbar-expand-lg bg-body-tertiary" style={{borderBottom: '1.5px solid #ececf1', padding: '0' ,width: '100%',position: 'fixed',top: '0',backgroundColor: 'rgba(255,255,255,0.5)',fontFamily: "'Golos Text', sans-serif" ,zIndex: '9999'}} >
      <div class="container-fluid" style={{padding: '0',margin: '0',zIndex: '0'}} >
      <NavLink to="/" className="navbar-brand" style={{ padding: '0', margin: '0' }}>
      <img src={logo} alt="logo" height="65" />
   </NavLink>
    <button  class="navbar-toggler"  type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{marginRight: '0',paddingRight: '0' ,border: '0',zIndex: '99999'}} onClick={toggleNavbar}>
    <MenuToggle toggle={() => setIsOpen(!isOpen)} />
    </button>

    <div className={`collapse navbar-collapse${collapsed ? ' ' : ' show'}`} id="navbarSupportedContent" style={{zIndex: '99998'}}>
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
              onClick={toggleNavbar}
              to="/department/admin-dashboard">
              Department
        </NavLink>
        </li>
        <li class="nav-item" style={{paddingLeft: '50px'}}>
        <NavLink
              className={({ isActive }) => isActive ? 'active-link' : 'inactive-link'}
              onClick={toggleNavbar}
              to="/faculty">
              Faculty
        </NavLink>
        </li>
        <li class="nav-item" style={{paddingLeft: '50px'}}>
        <NavLink
              className={({ isActive }) => isActive ? 'active-link' : 'inactive-link'}
              onClick={toggleNavbar}
              to="/about ">
              Parent
        </NavLink>
        </li>
        <li class="nav-item" style={{paddingLeft: '50px'}}>
        <NavLink
              className={({ isActive }) => isActive ? 'active-link' : 'inactive-link'}
              onClick={toggleNavbar}
              to="/events">
              Events & Newsletter
        </NavLink>
        </li>

        <div className="nav-dropdown" style={{ paddingLeft: '0px', display: window.innerWidth <= 992 ? 'none' : 'block' }}>
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

        <li className="nav-item" style={{display: window.innerWidth <= 992 ? 'block' : 'none'}}>

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
