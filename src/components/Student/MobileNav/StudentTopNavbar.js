import React from 'react';
import './StudentTopNavbar.css';
import { MdArrowBackIos } from 'react-icons/md';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const StudentTopNavbar = ({ text }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <nav className='StudentTopNavbar'>
       <div className='leftIcon' onClick={goBack}>
        <MdArrowBackIos />
      </div>
      <div className='centerText'>
        <h5 style={{fontSize: '17px'}}>{text}</h5>
      </div>
      <div className='rightIcon'>
        <BsThreeDotsVertical />
      </div> 
    </nav>
  );
};

export default StudentTopNavbar;
