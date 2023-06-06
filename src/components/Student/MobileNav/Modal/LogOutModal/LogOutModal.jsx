import { motion } from "framer-motion";
import Backdrop from "../Backdrop/Backdrop";
import "./LogOutModal.css";

const Flip = {
  hidden: {
    y: 100,
    opacity: 0,
    transition: {
      delay: 0.3,
    },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    y: 100,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const LogOutModal = ({ handleClose, handleLogout }) => {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="Logout-Modal"
        variants={Flip}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <ul>
          <li onClick={handleLogout}>LOG OUT</li>
          <li onClick={handleClose}>CANCEL</li>
        </ul>
      </motion.div>
    </Backdrop>
  );
};

export default LogOutModal;
