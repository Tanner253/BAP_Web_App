import React from 'react';

const Sparkle = () => {
    const style = {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 2 + 1}s`,
        animationDelay: `${Math.random() * 1}s`,
    };
    return <div className="absolute w-1.5 h-1.5 bg-white rounded-full sparkle" style={style}></div>;
};

export default Sparkle; 