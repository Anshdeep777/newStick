import React, { useState } from "react";

const NavButton = ({ icon: Icon, label, isActive = false, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative group">
      <button
        className={`
          w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ease-out
          ${isActive 
            ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25" 
            : "text-gray-400 hover:bg-gray-800/60 hover:text-white hover:shadow-lg hover:shadow-gray-900/20"
          }
          hover:scale-105 active:scale-95
          backdrop-blur-sm border border-transparent hover:border-gray-700/50
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <Icon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
      </button>

      {/* Tooltip */}
      <div
        className={`
          absolute left-16 top-1/2 -translate-y-1/2 z-50 px-3 py-2 
          bg-gray-900/95 text-white text-sm font-medium rounded-lg
          backdrop-blur-sm border border-gray-700/50
          shadow-xl shadow-black/20
          transition-all duration-200 ease-out
          ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"}
        `}
      >
        {label}
        {/* Arrow */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900/95"></div>
      </div>
    </div>
  );
};

export default NavButton;
