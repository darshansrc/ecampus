import React from 'react'
import './FacultyMobileNav.css'
import { BiHome }from 'react-icons/bi'
import {RiHistoryLine} from 'react-icons/ri'
import {CgProfile} from 'react-icons/cg'
import {MdOutlineCoPresent} from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'
import { NavLink } from 'react-router-dom'

const FacultyMobileNav = () => {
  return (
    <>
    <nav class="mobile-bottom-nav">

    
	<div class="mobile-bottom-nav__item " >
	<NavLink style={{textDecoration: 'none'}} 
	to={'/faculty/dashboard'}
	className={ window.location.pathname.endsWith("/dashboard") ? 'active-button' : 'inactive-button'}
	>
		<div class="mobile-bottom-nav__item-content">

			<i><BiHome style={{fontSize: '27px'}}/></i>
			Home
		</div>		
	</NavLink>
	</div>


	<div class="mobile-bottom-nav__item" >
	<NavLink style={{textDecoration: 'none'}}
	to={'/faculty/dashboard/attendance'}

	className={ window.location.pathname.endsWith("/attendance") ? 'active-button' : 'inactive-button'}
	>
		<div class="mobile-bottom-nav__item-content">
			<i class="material-icons"><MdOutlineCoPresent style={{fontSize: '27px'}}/></i>
			Attendance
		</div>
		</NavLink>		
	</div>
	<div class="mobile-bottom-nav__item">
	<NavLink style={{textDecoration: 'none'}}
	to={'/faculty/dashboard/attendance/history'}
	className={ window.location.pathname.endsWith("/history") ? 'active-button' : 'inactive-button'}
	>
		<div class="mobile-bottom-nav__item-content">
			<i class="material-icons"><RiHistoryLine style={{fontSize: '27px'}}/> </i>
			History
		</div>
	</NavLink>		
	</div>
	
	<div class="mobile-bottom-nav__item">
		<div class="mobile-bottom-nav__item-content">
			<i class="material-icons"><CgProfile  style={{fontSize: '27px'}}/></i>
			Profile
		</div>		
	</div>


</nav> 
</>
  )
}

export default FacultyMobileNav;