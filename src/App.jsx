import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Intro from './components/Intro';
import MemeStudio from './components/MemeStudio';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isBlinking, setIsBlinking] = useState(false);

  const handleIntroEnd = () => {
    setIsBlinking(true);
    setTimeout(() => {
      setShowIntro(false);
      setIsBlinking(false);
    }, 800); // Duration of the blink
  };

  return (
    <div className="relative w-full h-full bg-black">
      <AnimatePresence>
        {showIntro && <Intro onAnimationEnd={handleIntroEnd} />}
      </AnimatePresence>

      <AnimatePresence>
        {isBlinking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, times: [0, 0.4, 0.6, 1] }}
            className="absolute top-0 left-0 w-full h-full bg-black z-50"
          />
        )}
      </AnimatePresence>

      {!showIntro && <MemeStudio />}
    </div>
  );
}

export default App; 