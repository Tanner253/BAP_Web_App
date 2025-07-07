import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Intro = ({ onAnimationEnd }) => {

  useEffect(() => {
    // Set a timer to ensure the GIF plays through before transitioning.
    // 3.8 seconds should be enough for the "bap" animation.
    const introTimer = setTimeout(onAnimationEnd, 3800);
    return () => clearTimeout(introTimer);
  }, [onAnimationEnd]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute top-0 left-0 w-full h-full z-40"
    >
      <img
        src="/assets/intro-bap.gif"
        alt="Cat bapping the screen"
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
};

export default Intro; 