import React, { useState, useEffect } from "react";
import { useUserAuth } from "../../Backend/context/UserAuthContext";
import { db } from "../../Backend/Firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import StudentTopNavbar from "../MobileNav/StudentTopNavbar";
import "./Dashboard.css";
import { BsFilter } from "react-icons/bs";


const Dashboard = () => {
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
            <h3 className="section-title">Your Attendance</h3>
            <p className="section-description">
              View your attendance records and track your progress.
            </p>
          </div>
          <div className="dashboard-section">
            <h3 className="section-title">Material Links</h3>
            <p className="section-description">
              Access study materials, lecture notes, and other resources.
            </p>
          </div>
          <div className="dashboard-section">
            <h3 className="section-title">Timetable</h3>
            <p className="section-description">
              Check your class schedule and important dates.
            </p>
          </div>
        </div>
        <div className="notices-container">
          <h3 className="notices-title">Notices by Teachers</h3>
          <div className="notices-content">
            <p>No notices at the moment.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
