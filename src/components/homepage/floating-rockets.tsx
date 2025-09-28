'use client';

import React, { useState, useEffect } from 'react';

type RocketStyle = {
  id: number;
  delay: string;
  duration: string;
  left: string;
  size: string;
  rotation: string;
};

const RocketIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    className={className}
    fill="currentColor"
  >
    <g transform="rotate(45 50 50)">
      <path
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
        d="M 40 90 L 40 60 L 20 70 L 20 95 L 40 90"
      />
      <path
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
        d="M 60 90 L 60 60 L 80 70 L 80 95 L 60 90"
      />
      <path
        stroke="currentColor"
        strokeWidth="4"
        d="M 50 10 C 40 20 40 80 50 90 C 60 80 60 20 50 10 Z"
      />
      <path
        stroke="currentColor"
        strokeWidth="4"
        d="M 45 88 A 20 20 0 0 0 55 88 C 52 95 48 95 45 88 Z"
      />
      <circle cx="50" cy="35" r="4" />
      <circle cx="50" cy="50" r="4" />
    </g>
  </svg>
);


export function FloatingRockets() {
  const [rockets, setRockets] = useState<RocketStyle[]>([]);

  useEffect(() => {
    const generatedRockets = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      delay: `${Math.random() * 10}s`,
      duration: `${20 + Math.random() * 15}s`,
      left: `${Math.random() * 100}%`,
      size: `${1.5 + Math.random() * 2.5}rem`,
      rotation: `rotate(${Math.random() * 45 - 22.5}deg)`,
    }));
    setRockets(generatedRockets);
  }, []);

  if (rockets.length === 0) {
    return null;
  }

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {rockets.map((rocket) => (
        <div
          key={rocket.id}
          className="absolute bottom-0 animate-float"
          style={{
            left: rocket.left,
            animationDelay: rocket.delay,
            animationDuration: rocket.duration,
          }}
        >
          <RocketIcon
            className="text-blue-800/20"
            style={{
              width: rocket.size,
              height: rocket.size,
              transform: rocket.rotation,
            }}
          />
        </div>
      ))}
    </div>
  );
}
