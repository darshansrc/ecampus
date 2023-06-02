import React, { useState } from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai'

function MoveToTop() {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 600) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const handleMoveToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Attach scroll event listener
  window.addEventListener('scroll', handleScroll);

  return (
    <div>
      {showButton && (
        <button className="move-to-top-button" onClick={handleMoveToTop}>
          <AiOutlineArrowUp/>
        </button> 
      )}
      {/* Rest of your component */}
    </div>
  );
}

export default MoveToTop;
