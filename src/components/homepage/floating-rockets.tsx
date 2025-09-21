"use client";

import { Rocket } from "lucide-react";
import { useEffect, useState } from "react";

const ROCKET_COUNT = 10;

export function FloatingRockets() {
  const [rockets, setRockets] = useState<Array<{ id: number; style: React.CSSProperties }>>([]);

  useEffect(() => {
    const generateRockets = () => {
      const newRockets = Array.from({ length: ROCKET_COUNT }).map((_, i) => {
        const size = Math.random() * 2 + 1; // 1rem to 3rem
        const left = Math.random() * 100; // 0% to 100%
        const duration = Math.random() * 10 + 10; // 10s to 20s
        const delay = Math.random() * 15; // 0s to 15s

        return {
          id: i,
          style: {
            left: `${left}%`,
            width: `${size}rem`,
            height: `${size}rem`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          },
        };
      });
      setRockets(newRockets);
    };

    generateRockets();
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {rockets.map((rocket) => (
        <Rocket
          key={rocket.id}
          className="absolute bottom-[-10rem] text-muted-foreground/20 animate-float"
          style={rocket.style}
        />
      ))}
    </div>
  );
}
