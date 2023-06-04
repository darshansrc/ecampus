import React, { useState ,useEffect} from "react";
import { useUserAuth } from "../Backend/context/UserAuthContext";
import { db } from "../Backend/Firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import FacultySidebar from "./FacultySidebar";
import FacultyMobileNav from "./FacultyMobileNav";
import StudentTopNavbar from "../Student/MobileNav/StudentTopNavbar";





const FacultyDashboard = () => {
  const { user } = useUserAuth();
  const [usn, setUsn] = useState("");
  const [data, setData] = useState([]);

  const getUserData = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUsn(userData.usn);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (user) {
    getUserData(user.uid);
  }

  useEffect(() => {
    if (user) {
      getUserData(user.uid);
    }
  }, [user]);

  return (
    <>
      <StudentTopNavbar text={"Home"} />
      <FacultyMobileNav/>
      <div className="dashboard-container">
        <div className="dashboard-box">
          {user && user.photoURL && (
            <img
              src={user.photoURL}
              alt="Profile"
              className="profile-image"
            />
          )}
          <h2 className="welcome-text">
            Welcome {user && user.displayName}
          </h2>

          <div className="dashboard-section">
  <h3 className="section-title">Mark Attendance</h3>
  <p className="section-description">
    Record attendance for your subjects.
  </p>
</div>
<div className="dashboard-section">
  <h3 className="section-title">Attendance History</h3>
  <p className="section-description">
    View and export attendance data from previous sessions.
  </p>
</div>
<div className="dashboard-section">
  <h3 className="section-title">New Feature Suggestions</h3>
  <p className="section-description">
    Provide feedback and suggestions for new features, as well as report bugs.
  </p>
</div>
        </div>
        <div className="notices-container">
          <h3 className="notices-title">Notices</h3>
          <div className="notices-content">
            <p>No notices at the moment.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FacultyDashboard;
