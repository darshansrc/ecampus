import { motion } from "framer-motion";
import Backdrop from "../Backdrop/Backdrop";
import "./ThreeDotModal.css";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { GoReport } from "react-icons/go";
import { CgProfile } from "react-icons/cg";

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

const ThreeDotModal = ({ handleClose, handleLogout }) => {
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
            <button
              style={{
                border: "none",
                backgroundColor: "transparent",
              }}
            >
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/student/dashboard/profile"
              >
                Profile
              </Link>
            </button>
          </li>
          <li>
            <button
              style={{
                border: "none",
                backgroundColor: "transparent",
                padding: 0,
              }}
              onClick={handleLogout}
            >
              <FiLogOut style={{ marginRight: "4px", marginBottom: "2px" }} />
              Logout
            </button>
          </li>
          <li>
            <button
              style={{
                border: "none",
                backgroundColor: "transparent",
                padding: 0,
              }}
            >
              <GoReport style={{ marginRight: "4px", marginBottom: "2px" }} />
              Report Bugs
            </button>
          </li>
        </ul>
      </motion.div>
    </Backdrop>
  );
};

export default ThreeDotModal;
