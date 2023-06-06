import React from "react";
import StudentTopNavbar from "../MobileNav/StudentTopNavbar";
import "./markscalc.css";
import { motion } from "framer-motion";

const CgpaMarksDashboard = () => {
  return (
    <>
      <StudentTopNavbar text={"Marks"} />
      
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
        className="text-center"
      ></div>
      <div className="rick">
        <a
          style={{ textDecoration: "none" , fontSize: '30px', textAlign: 'center'}}
          href="https://youtu.be/xvFZjo5PgG0"
        >
          👽👾🛸
        </a>
      </div>
      <motion.div drag class="inner-construction"></motion.div>
      <motion.div
        className="dance"
        animate={{
          scale: [1.4, 1, 1.4, 1, 1.4],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          rotate: [0, 0, 270, 270, 0],
          x: [-100, 0, 100, 0, -100],
          backgroundColor: [
            "#9e1d65",
            "#9e1d6400",
            "#9e1d65",
            "#9e1d6400",
            "#9e1d65",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      ></motion.div>
      <div className="devl"><h4 style={{color: '#777'}}>Under Development</h4></div>
    </>
  );
};

export default CgpaMarksDashboard;
