import React from 'react';
import './StudentTopNavbar.css';
import { MdArrowBackIos } from 'react-icons/md';
import { BiMessageDetail } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const StudentTopNavbar = ({ text }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <nav className='StudentTopNavbar'>
      {/* <div className='leftIcon' onClick={goBack}>
        <MdArrowBackIos />
      </div>
      <div className='centerText'>
        <h5 >{text}</h5>
      </div>
      <div className='rightIcon'>
        <BiMessageDetail />
      </div> */}
    </nav>
  );
};

export default StudentTopNavbar;
