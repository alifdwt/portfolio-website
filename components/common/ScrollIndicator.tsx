"use client";

import { ChevronDownIcon } from "lucide-react";

const ScrollIndicator = ({ text }: { text: string }) => {
  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      const offsetTop = aboutSection.offsetTop - 80; // Account for fixed header
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="flex justify-center">
      <button
        onClick={handleScrollToAbout}
        className="group flex cursor-pointer flex-col items-center rounded-lg p-2 transition-all duration-300 hover:scale-110  focus:outline-none"
        aria-label="Scroll to About section"
      >
        <span className="mb-4 text-sm text-gray-400 transition-colors group-hover:text-gray-300">
          {text}
        </span>
        <div className="relative flex h-10 w-6 justify-center rounded-full border border-gray-400 transition-colors group-hover:border-gray-300">
          <ChevronDownIcon className="absolute top-2 h-4 w-4 animate-bounce text-gray-400 transition-colors group-hover:text-gray-300" />
        </div>
      </button>
    </div>
  );
};

export default ScrollIndicator;
