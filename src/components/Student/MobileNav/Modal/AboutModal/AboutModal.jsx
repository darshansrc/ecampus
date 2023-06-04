import { motion } from "framer-motion";
import Backdrop from "../Backdrop/Backdrop";
import "./AboutModal.css";
import { SiFirebase } from "react-icons/si";
import { SiReact } from "react-icons/si";

const Flip = {
  hidden: {
    transform: "scale(0) rotateX(-360deg)",
    opacity: 0,
    transition: {
      delay: 0.3,
    },
  },
  visible: {
    transform: " scale(1) rotateX(0deg)",
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    transform: "scale(0) rotateX(360deg)",
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const AboutModal = ({ handleClose }) => {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="About-Modal"
        variants={Flip}
        initial="hidden"
        animate="visible"
        whileInView={{
          backgroundImage: [
            "linear-gradient(#000000,#000000)",
            "linear-gradient(#2af1ff,#000000)",
            "linear-gradient(#003cffde,#2af1ff)",
            "linear-gradient(#000000,#003cffde)",
            "linear-gradient(#000000,#000000)",
          ],
        }}
        transition={{
          duration: 0.5,
          delay: 0.7,
        }}
        exit="exit"
      >
        <h1 style={{ color: "white" }}>Developed By</h1>
        <ul style={{ listStyle: "none", padding: "0" }}>
          <div style={{ display: "flex" }}>
            <motion.li
              initial={{ x: -200, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{
                duration: 1,
              }}
            >
              Darshan Gowda
            </motion.li>
            <li>and</li>
            <motion.li
              initial={{ x: 200, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{
                duration: 1,
              }}
            >
              Dhyaan Kotian
            </motion.li>
          </div>
          <motion.li
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              duration: 1.5,
            }}
          >
            <span>Using&nbsp;</span>
            <span style={{ whiteSpace: "nowrap" }}>
              <SiReact style={{ color: "lightblue" }} />
              <span style={{ color: "lightblue" }}>ReactJS</span>
            </span>
            &nbsp;and&nbsp;
            <span style={{ whiteSpace: "nowrap" }}>
              <SiFirebase style={{ color: "yellow" }} />
              <span style={{ color: "yellow" }}>FireBase</span>
            </span>
          </motion.li>
        </ul>
      </motion.div>
    </Backdrop>
  );
};

export default AboutModal;
