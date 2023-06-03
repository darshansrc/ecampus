import React, { useState ,useEffect} from "react";
import { useUserAuth } from "../../Backend/context/UserAuthContext";
import { db } from "../../Backend/Firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import StudentTopNavbar from "../MobileNav/StudentTopNavbar";
import './Dashboard.css'
import {BsFilter} from 'react-icons/bs'





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
    <StudentTopNavbar text={'Home'} />
      <div style={{ marginTop: "75px" }}>
        <div className="p-1 box mt-3 text-center">
          {user && user.photoURL && (
            <img
              src={user.photoURL}
              alt="Profile"
              style={{ width: "100px", borderRadius: "50px" }}
            />
          )}
          <h2 className="pt-2 mb-0">Welcome {user && user.displayName}</h2>
          <div>
         

          </div>
        </div>

      </div>
      
    </>
  );
};

export default Dashboard;
