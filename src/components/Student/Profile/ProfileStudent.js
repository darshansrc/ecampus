import React, { useState, useEffect } from "react";
import { useUserAuth } from "../../Backend/context/UserAuthContext";
import { db } from "../../Backend/Firebase/firebase";
import { doc, getDoc, collection, addDoc, Timestamp } from "firebase/firestore";
import { FiLogOut } from "react-icons/fi";
import "./StudentProfile.css";
import StudentTopNavbar from "../MobileNav/StudentTopNavbar";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { VscFeedback } from "react-icons/vsc";
import { SiStylelint } from "react-icons/si";
import { RxInfoCircled } from "react-icons/rx";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 200,
    },
  },
};

const ProfileStudent = () => {
  const { user, logOut } = useUserAuth();
  const [usn, setUsn] = useState("");
  const [feedback, setFeedback] = useState("");
  const [IsFeedBackModalOpen, setIsFeedBackModalOpen] = useState(false);
  const [isFeedBackSubmitted, setIsFeedBackSubmitted] = useState(false);

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

      // Clear the feedback input and show "FeedBackSubmitted Successfully" message
      setFeedback("");
      setIsFeedBackSubmitted(true);
      setIsFeedBackModalOpen(false);

      // Reset the "FeedBackSubmitted Successfully" message after 2 seconds
      setTimeout(() => {
        setIsFeedBackSubmitted(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <StudentTopNavbar text={"Profile"} handleLogout={() => handleLogout()} />
      {IsFeedBackModalOpen && <div className="blur-background" />}
      <div className="profile-container">
        <div className="profile-content">
          {user && user.photoURL && (
            <img src={user.photoURL} alt="Profile" className="profile-image" />
          )}
          <div>
            <h5 className="profile-name">{user && user.displayName}</h5>
            <p className="profile-email-usn">
              {user.email}
              <br /> USN: {usn} <br />{" "}
            </p>
          </div>
        </div>
      </div>

      <div class="profile-info-container">
        <div className="accountinfo">
          <p>ACCOUNT</p>
          <ul>
            <li>
              <button
                style={{ border: "none", backgroundColor: "transparent" }}
                onClick={() => setIsFeedBackModalOpen(true)}
              >
                <VscFeedback
                  style={{ marginRight: "4px", marginBottom: "2px" }}
                />
                Submit Feedback
              </button>
            </li>
            <li>
              <button
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <RxInfoCircled
                  style={{ marginRight: "4px", marginBottom: "2px" }}
                />
                <Link to="/student/dashboard">About</Link>
              </button>
            </li>
            <li>
              <button
                style={{
                  padding: 0,
                }}
                className="logoutbutton"
                onClick={handleLogout}
              >
                <FiLogOut style={{ marginRight: "4px", marginBottom: "2px" }} />
                Logout
              </button>
            </li>
          </ul>
        </div>
        <div className="Preferences">
          <b>
            <p>PREFERENCES</p>
          </b>
          <ul>
            <li>
              <button
                style={{ border: "none", backgroundColor: "transparent" }}
              >
                <SiStylelint
                  style={{ marginRight: "4px", marginBottom: "2px" }}
                />
                Themes
              </button>
            </li>
          </ul>
        </div>
      </div>

      <AnimatePresence>
        {IsFeedBackModalOpen && (
          <motion.div
            className="feedback-modal"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="feedback-modal-content">
              <h3 style={{ textAlign: "center" }}>Provide Feedback</h3>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Enter your feedback..."
                className="feedback-input"
              />
              <div className="modal-buttons">
                <button
                  className="submit-button"
                  onClick={handleSubmitFeedback}
                >
                  Submit
                </button>
                <button
                  className="cancel-button"
                  onClick={() => setIsFeedBackModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {isFeedBackSubmitted && (
        <div className="success-message">
          <p>Submitted Successfully!</p>
        </div>
      )}
    </>
  );
};

export default ProfileStudent;
