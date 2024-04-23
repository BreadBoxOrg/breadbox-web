import React, { useState, useEffect } from 'react';

const ScrollToTopArrow = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    const header = document.querySelector('header');
    if (header) {
      header.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const lastSection = document.querySelector('section:last-of-type');
      if (lastSection) {
        const { top, bottom } = lastSection.getBoundingClientRect();
        const isVisible = top <= window.innerHeight && bottom >= 0;
        setIsVisible(isVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="fixed top-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex flex-col items-center">
        <div className="animate-bounce bg-white p-2 w-10 h-10 ring-1 ring-slate-900/5 dark:ring-slate-200/20 shadow-lg rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-[#189172]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ScrollToTopArrow;