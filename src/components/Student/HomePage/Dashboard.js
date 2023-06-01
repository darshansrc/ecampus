import React, { useState ,useEffect} from "react";
import { useUserAuth } from "../../Backend/context/UserAuthContext";
import { db } from "../../Backend/Firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import Sidebar from "../DesktopNav/Sidebar";
import StudentAttendanceTable from "../AttendanceDashboard/StudentAttendanceTable";
import StudentTopNavbar from "../MobileNav/StudentTopNavbar";






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
    <StudentTopNavbar text={'Home'}/>
      {/* <Sidebar /> */}
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
          {usn && <p>USN: {usn}</p>}
          <div>
         

          </div>
        </div>
      </div>
      
    </>
  );
};

export default Dashboard;
