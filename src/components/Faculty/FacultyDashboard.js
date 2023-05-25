import React, { useState ,useEffect} from "react";
import { useUserAuth } from "../Backend/context/UserAuthContext";
import { db } from "../Backend/Firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import FacultySidebar from "./FacultySidebar";
import FacultyMobileNav from "./FacultyMobileNav";
import StudentTopNavbar from "../Student/MobileNav/StudentTopNavbar";



const FacultyDashboard = () => {
  const { user } = useUserAuth();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <>
    <StudentTopNavbar text={'Home'}/>
    {/* {isMobile ? <FacultySidebar/> : <FacultyMobileNav/>} */}
    <FacultyMobileNav/>

      <div style={{ marginTop: "75px" }}>
        <div className="p-4 box mt-3 text-center">
          {user && user.photoURL && (
            <img
              src={user.photoURL}
              alt="Profile"
              style={{ width: "100px", borderRadius: "50px" }}
            />
          )}
          <h2>Welcome {user && user.displayName}</h2>
          {user && <p>Email: {user.email}</p>}
   
          <div>
     
          </div>
        </div>
      </div>
    </>
  );
};

export default FacultyDashboard;
