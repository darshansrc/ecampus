
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './components/HomePage/Home';
import Faculty from './components/Faculty/Faculty';
import Student from './components/Student/AuthPage/Student';
import Department from './components/Department/Department';
import Signup from './components/Student/AuthPage/Signup';


import ProtectedRoute from './components/Backend/context/ProtectedRoutes/ProtectedRoute';

import { UserAuthContextProvider } from './components/Backend/context/UserAuthContext';
import AdminProtectedRoute from './components/Backend/context/ProtectedRoutes/AdminProtectedRoute';
import AdminDashboard from './components/Department/AdminDashboard';
import ManageFaculty from './components/Department/ManageFaculty';


import AttendanceSession from './components/Faculty/AttendanceSession';
import Events from './components/OtherPages/Events';
import FacultyProtectedRoute from './components/Backend/context/ProtectedRoutes/FacultyProtectedRoute';
import { AttendanceTable } from './components/Faculty/AttendanceTable';
import FacultyDashboard from './components/Faculty/FacultyDashboard';
import StudentMobileNav from './components/Student/MobileNav/StudentMobileNav';
import StudentAttendanceTable from './components/Student/AttendanceDashboard/StudentAttendanceTable';
import cgpaMarksDashboard from './components/Student/CGPA/cgpaMarksDashboard'
import Dashboard from './components/Student/HomePage/Dashboard';

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
    

        <Route
                path="/student/dashboard" 
                element={
                  <ProtectedRoute >
                    <Dashboard/>
                    <StudentMobileNav/>
                  </ProtectedRoute>
                }
              />
        <Route
                path="student/dashboard/attendance" 
                element={
                  <ProtectedRoute >
                  <StudentAttendanceTable />
                    <StudentMobileNav/>
                  </ProtectedRoute>
                }
              />
        <Route
                path="/student/dashboard/course" 
                element={
                  <ProtectedRoute >
                   <StudentMobileNav/>
                  </ProtectedRoute>
                }
              />
        <Route
                path="/student/dashboard/profile" 
                element={
                  <ProtectedRoute >
                     <StudentMobileNav/>
                  </ProtectedRoute>
                }
              />

        <Route
                path="/student/dashboard/marks" 
                element={
                  <ProtectedRoute >
                     <cgpaMarksDashboard/>
                     <StudentMobileNav/>
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
                    <FacultyDashboard/>
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
                path="/faculty/dashboard/attendance/history" 
                element={
                  <FacultyProtectedRoute >
                    <AttendanceTable/>
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
