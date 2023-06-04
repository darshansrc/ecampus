import { motion } from "framer-motion";
import { SiFirebase, SiReact } from "react-icons/si";
import Backdrop from "../Backdrop/Backdrop";
import "./AboutModal.css";

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



const AboutModal = ({ handleClose }) => {
  return (
    <Backdrop onClick={handleClose}>
<motion.div
  onClick={(e) => e.stopPropagation()}
  className="About-Modal"
  variants={Flip}
  initial="hidden"
  animate="visible"
  transition={{
    duration: 0.5,
    delay: 0,
  }}
  exit="exit"
  style={{
    backgroundColor: '#eee', // Set the background color
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)' // Add a shadow effect
  }}
>

        <h1 className="title" style={{color: 'black',paddingTop: '20px'}}>Developed By</h1>
        <ul className="developer-list" style={{listStyle: 'none',marginRight: '32px',color: 'black'}}>
          <motion.li
            initial={{ x: -200, opacity: 0 }}
            style={{color: 'black'}}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
            }}
          >
            Darshan&nbsp;Gowda
          </motion.li>
          <li className="developer-item-separator" style={{color: 'black'}}>and</li>
          <motion.li
            initial={{ x: 200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            style={{color: 'black'}}
            transition={{
              duration: 0.5,
            }}
          >
            Dhyaan&nbsp;Kotian
          </motion.li>
        </ul>
        <motion.p
          className="technology-description"
          style={{color: 'black'}}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 1,
          }}
        >
          Built with <SiReact className="technology-icon" /> <span>ReactJS</span> and{" "}
          <SiFirebase className="technology-icon" /> Firebase
        </motion.p>
      </motion.div>
    </Backdrop>
  );
};

export default AboutModal;
