import React from 'react';

const ScrollDownArrow = () => {
  const handleClick = () => {
    const nextSection = document.querySelector('section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer opacity-25"
      onClick={handleClick}
    >
      <div className="flex flex-col items-center">
        <div className="animate-bounce bg-white p-2 w-10 h-10 ring-1 ring-slate-900/5 dark:ring-slate-200/20 shadow-lg rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-[#189172]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ScrollDownArrow;