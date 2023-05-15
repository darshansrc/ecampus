
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './components/Home';
import Faculty from './components/Faculty';
import Student from './components/Student';
import Department from './components/Department';

import Signup from './components/Signup';
import Attendance from './components/Attendance';



import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';


import { UserAuthContextProvider } from './components/context/UserAuthContext';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import AdminDashboard from './components/AdminDashboard';
import ManageFaculty from './components/ManageFaculty';
import AttendanceDashboard from './components/AttendanceDashboard';
import FacultySidebar from './components/FacultySidebar';
import AttendanceSession from './components/AttendanceSession';
import Events from './components/Events';
import FacultyProtectedRoute from './components/FacultyProtectedRoute';

function App() {



  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <UserAuthContextProvider>
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/faculty" element = {<Faculty/>}/>
        <Route path="/student" element = {<Student/>}/>
        <Route path="/student/signup" element = {<Signup/>}/>
        <Route path="/department" element = {<Department/>}/>   
        <Route path="/attendance" element = {<Attendance />}/>     

        <Route
                path="/student/dashboard" 
                element={
                  <ProtectedRoute >
                    <Dashboard/>
                  </ProtectedRoute>
                }
              />
        <Route
                path="/student/dashboard/attendance" 
                element={
                  <ProtectedRoute >
                    <AttendanceDashboard/>
                  </ProtectedRoute>
                }
              />

          <Route
                path="/department/admin-dashboard"
                element={
                  <AdminProtectedRoute >
                    <AdminDashboard/> 
                  </AdminProtectedRoute>
                }
              />

          <Route
                path="/department/admin-dashboard/manage-faculty"
                element={
                  <AdminProtectedRoute >
                    <ManageFaculty/> 
                  </AdminProtectedRoute>
                }
              />
            <Route
                path="/faculty/dashboard" 
                element={
                  <FacultyProtectedRoute>
                    <FacultySidebar/>
                  </FacultyProtectedRoute>
                }
              />
            <Route
                path="/faculty/dashboard/attendance" 
                element={
                  <FacultyProtectedRoute >
                    <AttendanceSession/>
                  </FacultyProtectedRoute>
                }
              />
            <Route
                path="/events" 
                element={
                    <Events/>
                }
              />
        
          </Routes>


      </UserAuthContextProvider>
      
     </BrowserRouter>


    </> 
  );
}

export default App;
