import React, { useState, useRef } from "react";

export const Icon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
      />
    </svg>
  );
};

export const EvervaultCard = ({ children, className, text }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });

      // Calculate rotation based on mouse position
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (mousePosition.y - centerY) / 20;
      const rotateY = -(mousePosition.x - centerX) / 20;

      setCardPosition({ x: rotateX, y: rotateY });
    }
  };

  const handleMouseLeave = () => {
    setCardPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative h-full w-full rounded-lg overflow-hidden transition-transform duration-200 ease-out ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${cardPosition.x}deg) rotateY(${cardPosition.y}deg)`,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
      {text && (
        <div
          className="absolute inset-0 w-full h-full flex items-center justify-center text-white pointer-events-none"
          style={{
            opacity: Math.abs(cardPosition.x * cardPosition.y) / 100,
          }}
        >
          <p className="font-bold text-xl">{text}</p>
        </div>
      )}
    </div>
  );
};