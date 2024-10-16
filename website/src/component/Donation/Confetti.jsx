import React, { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

const Confetti = ({ showConfetti }) => {
  const [windowDimention, setwindowDimention] = useState({
    width: window.innerWidth,
    heigth: window.innerHeight,
  });

  const detectSize = () => {
    setwindowDimention({
      width: window.innerWidth,
      heigth: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);
    return () => {};
  }, [windowDimention]);

  return (
    <div>
      {showConfetti && (
        <ReactConfetti
          width={windowDimention.width}
          height={windowDimention.heigth}
          tweenDuration={1}
        />
      )}
    </div>
  );
};

export default Confetti;
