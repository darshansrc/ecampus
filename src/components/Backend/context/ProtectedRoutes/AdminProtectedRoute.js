


import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../UserAuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../Firebase/firebase';

const AdminProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data();
        setUserData(userData);
      }
    };

    fetchData();
  }, [user]);

  if (!user) {
    return <Navigate to="/department" />;
  }

  if (!userData) {
    // Handle the case where userData is still loading
    return null; // or you can show a loading spinner/placeholder
  }

  if (userData.type === 'admin') {
    return children;
  } else {
    // Handle other user types (e.g., redirect to appropriate route)
    return <Navigate to="/department" />;
  }
};

export default AdminProtectedRoute;
