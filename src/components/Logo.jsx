import React from 'react';

const Logo = ({ className = 'h-8 w-auto' }) => (
  <svg
    className={className}
    viewBox="0 0 180 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="50%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#ec4899" />
      </linearGradient>
    </defs>
    <path
      d="M20 40C9.33333 40 0 30.6667 0 20C0 9.33333 9.33333 0 20 0C29.6667 0 38 7 40 16"
      stroke="url(#logo-gradient)"
      strokeWidth="4"
    />
    <text
      x="48"
      y="28"
      fontFamily="Fredoka, sans-serif"
      fontSize="24"
      fontWeight="bold"
      fill="url(#logo-gradient)"
    >
      ColorInYou
    </text>
  </svg>
);

export default Logo;