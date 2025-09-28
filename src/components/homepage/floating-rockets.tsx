'use client';

import { Rocket } from 'lucide-react';
import React from 'react';

export function FloatingRockets() {
  const rockets = React.useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    id: i,
    delay: `${Math.random() * 10}s`, // Random animation delay up to 10s
    duration: `${20 + Math.random() * 15}s`, // Random animation speed between 20s and 35s
    left: `${Math.random() * 100}%`, // Random horizontal position
    size: `${1 + Math.random() * 1.5}rem`, // Random size between 1rem and 2.5rem
  })), []);

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
              transform: `rotate(${Math.random() * 45 - 22.5}deg)`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
