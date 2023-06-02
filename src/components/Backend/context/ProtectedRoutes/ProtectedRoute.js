import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../UserAuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../Firebase/firebase';

const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserData(userData);
          } else {
            // Handle the case where the user document does not exist
            // You can redirect the user or show an error message
          }
        } catch (error) {
          // Handle any errors that occur during Firestore query
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchData();
  }, [user]);

  if (!user) {
    return <Navigate to="/student" />;
  }

  if (!userData) {
    return null; // or show a loading spinner/placeholder while waiting for userData
  }

  if (userData.type === 'student') {
    return children;
  } else {
    return <Navigate to="/student" />;
  }
};

export default ProtectedRoute; 