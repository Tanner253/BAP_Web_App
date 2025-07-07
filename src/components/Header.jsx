import React from 'react';
import { motion } from 'framer-motion';
import { BsTwitterX } from 'react-icons/bs';
import { FaChartLine } from 'react-icons/fa';

const Header = ({ onHireMeClick }) => {
  return (
    <motion.header 
      className="absolute top-0 left-0 w-full p-4 z-20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 50 }}
    >
      <div className="mx-auto max-w-5xl bg-brand-purple/50 backdrop-blur-sm border border-brand-yellow/30 rounded-full flex justify-between items-center p-2 pl-6 shadow-lg">
        <div className="flex items-center">
            <button 
              onClick={onHireMeClick}
              className="text-brand-yellow font-mono text-lg hover:text-white transition-colors mr-4 hire-me-pulse"
              title="Hire Me"
            >
              &lt;/&gt;
            </button>
            <h1 className="text-3xl font-display text-brand-yellow drop-shadow-lg tracking-wider">$BAP</h1>
        </div>
        <div className="flex items-center space-x-2">
            <a href="https://x.com/i/communities/1932866785465798976" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-10 rounded-full bg-brand-pink text-white font-bold hover:bg-pink-600 transition-colors" title="Community">
              <BsTwitterX size={20} />
            </a>
            <a href="https://dexscreener.com/solana/6rhxtxpyfchugazc7enpwbi49pvcybaiv1mprbuacxtb" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-10 rounded-full bg-brand-yellow text-brand-purple font-bold hover:bg-yellow-400 transition-colors" title="Chart">
              <FaChartLine size={20} />
            </a>
        </div>
      </div>
    </motion.header>
  );
};

export default Header; 