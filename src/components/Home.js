import React from 'react'
import { NavLink } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import './Home.css'
import { BiLinkExternal} from "react-icons/bi";

const Home = () => {
  return (
    <>
    <div style={{paddingTop:'60px' , backgroundColor: 'rgb(240,240,240)'}}>
  <div class="px-4 py-5 my-5 text-center">

    <h1 class="display-5 fw-bold">Welcome to E-Campus</h1>
    <div class="col-lg-6 mx-auto">
      <p  style={{paddingTop: '30px',paddingBottom: '20px'}}>RVITM E-Campus is a platform that simplifies the process of Attendance and tracking of students' CGPA. With the easy-to-use interface, you can now view and analyze your academic progress, check your results, and track your CGPA with just a few clicks. Our advanced analytics tools help you identify areas of improvement and excel in your academic journey.</p>
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
      
        <button type="button" class="btn btn-primary btn-lg px-4 gap-3" style={{backgroundColor: '#9f1765', border: '0',marginBottom: '10px'}}>
        <NavLink
              to="/student" style={{textDecoration: 'none',color: 'rgb(240,240,240)'}}>
              Sign In as Student
        </NavLink>
        </button>

        <button type="button" class="btn btn-outline-secondary btn-lg px-4"style={{ marginBottom: '10px'}}>
        <NavLink
              to="/faculty" style={{textDecoration: 'none',color: 'rgb(0,0,0)'}}>
              Sign In as Faculty
        </NavLink>
        </button>
        <a style={{paddingTop: '10px'}}>
        <NavLink
              to="/department" style={{textDecoration: 'none'}}>
              Login to Department <BiLinkExternal style={{marginBottom: '1px'}}/>
        </NavLink>         
        </a>
      </div>
    </div>
  </div>
    </div>
       
    <div>
    <div style={{paddingTop:'0px' , backgroundColor: 'rgb(255,255,255)'}}>
  <div class="px-4  text-center">

    <h4 >Attendace Tracking Made easy</h4>
    <div class="col-lg-6 mx-auto">
      <p  style={{paddingTop: '20px',paddingBottom: '20px'}}>Track your attendance percentage in each subject effortlessly and quickly! Say goodbye to manual entries in the attendance register . Click below to check your attendance now.</p>
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">

        <a style={{paddingTop: '0px',marginBottom: '30px'}}>
        <NavLink
              to="/department" style={{textDecoration: 'none'}}>
              Check Attendance <BiLinkExternal style={{marginBottom: '1px'}}/>
        </NavLink>       
          
        </a>
        
      </div>
    </div>
  </div>
    </div>
    </div>
    <div class="containerr " style={{backgroundColor: 'rgb(240,240,240)' , margin: '0'}}>
  <footer class="py-3 " style={{margin: '0'}}>
    <ul class="nav justify-content-center  pb-3 mb-3" style={{margin: '0'}}>
      <li class="nav-item"><a href="#" style={{textDecoration: 'none' , color: 'black'}}>Student</a></li>
      <li class="nav-item"><a href="#" style={{textDecoration: 'none' , color: 'black'}}>Department</a></li>
      <li class="nav-item"><a href="#" style={{textDecoration: 'none' , color: 'black'}}>Faculty</a></li>
      <li class="nav-item"><a href="#" style={{textDecoration: 'none' , color: 'black'}}>About</a></li>
    </ul>
    <p class="text-center text-body-secondary">&copy; 2023 SDC RVITM</p>
  </footer>
</div>
</>
  )
}

export default Home 