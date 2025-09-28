'use client';

import { Rocket } from 'lucide-react';
import React, { useState, useEffect } from 'react';

type RocketStyle = {
  id: number;
  delay: string;
  duration: string;
  left: string;
  size: string;
  rotation: string;
};

export function FloatingRockets() {
  const [rockets, setRockets] = useState<RocketStyle[]>([]);

  useEffect(() => {
    const generatedRockets = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      delay: `${Math.random() * 10}s`,
      duration: `${20 + Math.random() * 15}s`,
      left: `${Math.random() * 100}%`,
      size: `${1 + Math.random() * 1.5}rem`,
      rotation: `rotate(${Math.random() * 45 - 22.5}deg)`,
    }));
    setRockets(generatedRockets);
  }, []);

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
          <Rocket
            className="text-primary-foreground/20"
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
