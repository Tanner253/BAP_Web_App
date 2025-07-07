import React from 'react';

const ActionButton = ({ onClick, children, className = '', tooltip }) => (
    <div className="relative group">
        <button onClick={onClick} className={`bg-gray-700 hover:bg-gray-600 text-white font-bold p-3 rounded-full transition-all transform hover:scale-110 ${className}`}>
            {children}
        </button>
        {tooltip && (
            <div className="absolute bottom-full mb-2 w-max bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {tooltip}
            </div>
        )}
    </div>
);

export default ActionButton; 