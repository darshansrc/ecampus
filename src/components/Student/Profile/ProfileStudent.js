import React, { useState, useEffect } from "react";
import { useUserAuth } from "../../Backend/context/UserAuthContext";
import { db } from "../../Backend/Firebase/firebase";
import { doc, getDoc, collection, addDoc, Timestamp } from "firebase/firestore";
import Sidebar from "../DesktopNav/Sidebar";
import { FiLogOut } from "react-icons/fi";
import "./StudentProfile.css";
import StudentTopNavbar from "../MobileNav/StudentTopNavbar";
import { Link } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";

const ProfileStudent = () => {
  const { user, logOut } = useUserAuth();
  const [usn, setUsn] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmitFeedback = async () => {
    if (feedback.trim() === "") {
      return; // Do not submit empty feedback
    }

    try {
      const feedbackRef = collection(db, "feedback");
      await addDoc(feedbackRef, {
        email: user.email,
        name: user.displayName,
        message: feedback,
        time: Timestamp.now(),
      });

      // Clear the feedback input and show "Submitted Successfully" message
      setFeedback("");
      setIsSubmitted(true);
      setIsModalOpen(false);

      // Reset the "Submitted Successfully" message after 2 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
     <StudentTopNavbar text={'Profile'}/>
    {isModalOpen && <div className="blur-background" />}
      <Sidebar />
      <div
        className="table-containerr"
        style={{
          marginTop: "60px",
          padding: "15px",
          maxWidth: "450px",
          marginBottom: "80px",
        }}
      >
        <h4>Personal Info</h4>
        <div className="attendance-card">
          {user && user.photoURL && (
            <img src={user.photoURL} alt="Profile" className="profile-image" />
          )}
          <div style={{ alignItems: "center" }}>
            <h5 style={{ marginLeft: "20px" }}>{user && user.displayName}</h5>
            <p
              style={{
                marginLeft: "20px",
                marginBottom: "0px",
                fontSize: "15px",
              }}
            >
              {user.email}
              <br /> USN: {usn} <br />{" "}
            </p>
          </div>
        </div>
      </div>


      <nav className="profile-info">

        <div>
          <p className="accountinfo">ACCOUNT</p>
          <ul>

            <li>
              <button className="logoutbutton" onClick={handleLogout}>
                <FiLogOut style={{ marginRight: '4px', marginBottom: '2px' }} />
                Logout
              </button>
            </li>
            <li>
            <button className="logoutbutton" onClick={() => setIsModalOpen(true)}>
                Submit Feedback
            </button>
            </li>
            <li>
            <button  className="logoutbutton">
            <Link  to="/student/dashboard">About</Link>
            </button>
          </li>
          </ul>
        </div>
      </nav>

      {isModalOpen && (
        <div className="feedback-modal">
          <div className="feedback-modal-content">
            <h3>Provide Feedback</h3>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Enter your feedback..."
              className="feedback-input"
            />
            <div className="modal-buttons">
              <button className="submit-button" onClick={handleSubmitFeedback}>
                Submit
              </button>
              <button
                className="cancel-button"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isSubmitted && (
        <div className="success-message">
          <p>Submitted Successfully!</p>
        </div>
      )}
    </>
  );
};

export default ProfileStudent;
