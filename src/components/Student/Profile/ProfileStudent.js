import React, { useState, useEffect } from "react";
import { useUserAuth } from "../../Backend/context/UserAuthContext";
import { db } from "../../Backend/Firebase/firebase";
import { doc, getDoc, collection, addDoc, Timestamp } from "firebase/firestore";
import { FiLogOut } from "react-icons/fi";
import "./StudentProfile.css";
import StudentTopNavbar from "../MobileNav/StudentTopNavbar";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AiOutlineForm } from "react-icons/ai";
import { VscColorMode } from "react-icons/vsc";
import { RxInfoCircled } from "react-icons/rx";
import { ErrorMessage } from "../../MiscComponents/ErrorMessage";
import { MdOutlineNavigateNext } from "react-icons/md";
import Backdrop from "../MobileNav/Modal/Backdrop/Backdrop";
import { CgProfile } from "react-icons/cg";
import defaultprofile from "./None.jpg";
import AboutModal from "../MobileNav/Modal/AboutModal/AboutModal";

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
  const [modalOpen, setModalOpen] = useState(false);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  const [showErrorMessage, setShowErrorMessage] = useState(false);

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

  const handleErrorMsg = () => {
    setShowErrorMessage(true);
  };

  return (
    <>
      <StudentTopNavbar text={"Profile"} handleLogout={() => handleLogout()} />
      {IsFeedBackModalOpen && <div className="blur-background" />}
      <div className="profile-container" style={{ overflow: "hidden" }}>
        <div className="profile-content">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="profile-image"
              style={{ marginRight: "20px" }}
            />
          ) : (
            <img
              src={defaultprofile}
              alt="Profile"
              className="profile-image"
              style={{ marginRight: "20px", border: "1px solid #aaa" }}
            />
          )}
          <div>
            <h5 className="profile-name">{user && user.displayName}</h5>
            <p className="profile-email-usn">
              <span
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Email:&nbsp;{user.email}
              </span>
              <br /> USN:&nbsp;{usn} <br />{" "}
            </p>
          </div>
        </div>
      </div>

      <div class="profile-info-container">
        <div className="accountinfo">
          <p style={{ color: "#777", marginBottom: "20px" }}>ACCOUNT</p>
          <ul>
            <span onClick={() => setIsFeedBackModalOpen(true)}>
              <li
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "normal",
                  width: "100%",
                  fontSize: "16px",
                  marginBottom: "18px",
                  cursor: "pointer",
                }}
              >
                <AiOutlineForm
                  style={{
                    marginRight: "4px",
                    marginBottom: "2px",
                    fontSize: "20px",
                  }}
                />
                &nbsp;&nbsp;Submit&nbsp;Feedback
                <div
                  style={{
                    marginLeft: "auto",
                    position: "absolute",
                    right: "10px",
                  }}
                >
                  <MdOutlineNavigateNext />
                </div>
              </li>
            </span>
            <li
              style={{
                border: "none",
                backgroundColor: "transparent",
                display: "flex",
                alignItems: "center",
                fontWeight: "normal",
                fontSize: "16px",
                marginBottom: "10px",
                cursor: "pointer",
              }}
              onClick={handleLogout}
            >
              <FiLogOut
                style={{
                  marginRight: "4px",
                  marginBottom: "2px",
                  fontSize: "20px",
                }}
              />
              &nbsp;&nbsp;Logout
              <div
                style={{
                  marginLeft: "auto",
                  position: "absolute",
                  right: "10px",
                }}
              >
                <MdOutlineNavigateNext />
              </div>
            </li>
          </ul>
        </div>
        <div className="Preferences">
          <b>
            <p style={{ color: "#777", marginBottom: "20px" }}>PREFERENCES</p>
          </b>
          <ul>
            <li
              style={{
                border: "none",
                backgroundColor: "transparent",
                display: "flex",
                alignItems: "center",
                fontWeight: "normal",
                fontSize: "16px",
                marginBottom: "18px",
                cursor: "pointer",
              }}
              onClick={handleErrorMsg}
            >
              <VscColorMode
                style={{
                  marginRight: "4px",
                  marginBottom: "2px",
                  fontSize: "18px",
                }}
              />
              &nbsp;&nbsp;Themes
              {showErrorMessage && <ErrorMessage message="Coming Soon" />}
              <div
                style={{
                  marginLeft: "auto",
                  position: "absolute",
                  right: "10px",
                }}
              >
                <MdOutlineNavigateNext />
              </div>
            </li>
          </ul>
        </div>
        <div className="Preferences">
          <b>
            <p style={{ color: "#777", marginBottom: "20px" }}>APP</p>
          </b>
          <ul>
            <li
              style={{
                border: "none",
                backgroundColor: "transparent",
                display: "flex",
                alignItems: "center",
                fontWeight: "normal",
                fontSize: "16px",
                marginBottom: "18px",
                cursor: "pointer",
              }}
              onClick={() => (modalOpen ? close() : open())}
            >
              <RxInfoCircled
                style={{
                  marginRight: "4px",
                  marginBottom: "2px",
                  fontSize: "20px",
                }}
              />
              &nbsp;&nbsp;About
              <div
                style={{
                  marginLeft: "auto",
                  position: "absolute",
                  right: "10px",
                }}
              >
                <MdOutlineNavigateNext />
              </div>
            </li>
          </ul>
        </div>
      </div>

      {IsFeedBackModalOpen && (
        <div
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
              <button className="submit-button" onClick={handleSubmitFeedback}>
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
        </div>
      )}

      {isFeedBackSubmitted && (
        <div className="success-message">
          <p>Submitted Successfully!</p>
        </div>
      )}
      <AnimatePresence>
        {modalOpen && (
          <AboutModal modalOpen={modalOpen} handleClose={() => close()} />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProfileStudent;
