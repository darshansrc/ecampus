import React, { useState, useEffect } from 'react';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';

function MoveToTop() {

  const [scrollFactor, setScrollFactor] = useState(false);


  const scrollOptions = {
    behavior: 'smooth',
    duration: '5000ms', // Set the duration in milliseconds
  };

  const handleScroll = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const currentPosition = window.pageYOffset;
    const newScrollFactor = currentPosition > maxScroll / 2;

    setScrollFactor(newScrollFactor);
  };

  const handleMoveToTop = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollFactor) {
      window.scrollTo({ top: 0, ...scrollOptions });
    } else {
      window.scrollTo({ top: maxScroll, ...scrollOptions });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      { (
        <button className="move-to-top-button" onClick={handleMoveToTop}>
          {scrollFactor ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
        </button>
      )}
    </div>
  );
}

export default MoveToTop;
