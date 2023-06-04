import { React, useState } from "react";

import { MdArrowBackIos } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ThreeDotModal from "../Student/MobileNav/Modal/ThreedotModal/ThreeDotModal";
import { AnimatePresence } from "framer-motion";

const FacultyTopNavbar = ({ text, handleLogout }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <> 
      <nav className="StudentTopNavbar">
        <div className="leftIcon" onClick={goBack}>
          <MdArrowBackIos />
        </div>
        <div className="centerText">
          <h5 style={{ fontSize: "17px" }}>{text}</h5>
        </div>
        <button
          style={{ border: "none", backgroundColor: "transparent" ,color: 'black'}}
          className="rightIcon"
          onClick={() => (modalOpen ? close() : open())}
        >
          <BsThreeDotsVertical />
        </button>
      </nav>
      <AnimatePresence>
        {modalOpen && (
          <ThreeDotModal
            modalOpen={modalOpen}
            handleClose={() => close()}
            handleLogout={handleLogout}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default FacultyTopNavbar;
