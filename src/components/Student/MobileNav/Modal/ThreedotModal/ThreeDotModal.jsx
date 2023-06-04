import { motion } from "framer-motion";
import Backdrop from "../Backdrop/Backdrop";
import "./ThreeDotModal.css";
import { Link, Navigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { GoReport } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { useUserAuth } from "../../../../Backend/context/UserAuthContext";


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

const ThreeDotModal = ({ handleClose }) => {

  const { user, logOut } = useUserAuth();

const handleLogout = async () => {
  try {
    await logOut();
  } catch (error) {
    console.log(error.message);
  }
};

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="modal3dots"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <ul style={{ listStyle: "none" }}>
          <li>
            <CgProfile style={{ marginRight: "4px", marginBottom: "2px" }} />
            <span
              style={{
                border: "none",
                backgroundColor: "transparent",
              }}
            >
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/student/dashboard/profile"
              >
              &nbsp;  Profile
              </Link>
            </span>
          </li>
          <li>
            <span
              style={{
                border: "none",
                backgroundColor: "transparent",
                padding: 0,
              }}
              onClick={handleLogout}
            >
              <FiLogOut style={{ marginRight: "4px", marginBottom: "2px" }} />
              &nbsp; Logout
            </span>
          </li>
          <li>
            <span
              style={{
                border: "none",
                backgroundColor: "transparent",
                padding: 0,
              }}

            >
                            <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/student/dashboard/profile"
              >
              <GoReport style={{ marginRight: "4px", marginBottom: "2px" }} />
              &nbsp; Report Bugs
              </Link>
            </span>
          </li>
        </ul>
      </motion.div>
    </Backdrop>
  );
};

export default ThreeDotModal;
