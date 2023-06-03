import React from "react";

import { RiBookMarkLine } from "react-icons/ri";
import { BiHome } from "react-icons/bi";
import { TbReport } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import { BsPersonCheck } from "react-icons/bs";
import { useUserAuth } from "../../Backend/context/UserAuthContext";
import "./StudentMobileNav.css";

const StudentMobileNav = () => {
  const { user } = useUserAuth();

  return (
    <>
      <nav class="mobile-bottom-nav">
        <div class="mobile-bottom-nav__item ">
          <NavLink
            style={{ textDecoration: "none" }}
            to={"/student/dashboard"}
            className={
              window.location.pathname.endsWith("/dashboard")
                ? "active-button"
                : "inactive-button"
            }
          >
            <div class="mobile-bottom-nav__item-content">
              <i>
                <BiHome style={{ fontSize: "25px" }} />
              </i>
              Home
            </div>
          </NavLink>
        </div>

        <div class="mobile-bottom-nav__item ">
          <NavLink
            style={{ textDecoration: "none" }}
            to={"/student/dashboard/attendance"}
            className={
              window.location.pathname.endsWith("/attendance")
                ? "active-button"
                : "inactive-button"
            }
          >
            <div class="mobile-bottom-nav__item-content">
              <i class="material-icons">
                <BsPersonCheck style={{ fontSize: "25px" }} />
              </i>
              Attendance
            </div>
          </NavLink>
        </div>

        <div class="mobile-bottom-nav__item">
          <NavLink
            style={{ textDecoration: "none" }}
            to={"/student/dashboard/course"}
            className={
              window.location.pathname.endsWith("/course")
                ? "active-button"
                : "inactive-button"
            }
          >
            <div class="mobile-bottom-nav__item-content">
              <i class="material-icons">
                <RiBookMarkLine style={{ fontSize: "25px" }} />{" "}
              </i>
              Course
            </div>
          </NavLink>
        </div>

        <div class="mobile-bottom-nav__item">
          <NavLink
            style={{ textDecoration: "none" }}
            to={"/student/dashboard/marks"}
            className={
              window.location.pathname.endsWith("/marks")
                ? "active-button"
                : "inactive-button"
            }
          >
            <div class="mobile-bottom-nav__item-content">
              <i class="material-icons">
                <TbReport style={{ fontSize: "25px" }} />{" "}
              </i>
              Grades
            </div>
          </NavLink>
        </div>

        <div class="mobile-bottom-nav__item">
    <NavLink style={{textDecoration: 'none'}}
	to={'/student/dashboard/profile'}
	className={ window.location.pathname.endsWith("/profile") ? 'active-button' : 'inactive-button'}>
		<div class="mobile-bottom-nav__item-content">
			<i class="material-icons">
			{user.photoURL ?             <img
              src={user.photoURL}
              alt="Profile"
              style={ window.location.pathname.endsWith("/profile") ? {width: "25px", border: '1px solid #9e1d65'} : { width: "25px"} }
              className='profile-image'
            /> :<CgProfile  style={{fontSize: '25px'}}/>}
			
			</i>
			Profile
		</div>	
        </NavLink>	
	</div>

      </nav>
    </>
  );
};

export default StudentMobileNav;
