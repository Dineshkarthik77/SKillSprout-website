'use client';

import { useEffect, useState, useRef } from 'react';

interface AnimatedStatsProps {
  finalValue: number;
  label: string;
  isPercentage?: boolean;
}

export function AnimatedStats({ finalValue, label, isPercentage = false }: AnimatedStatsProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = finalValue;
    const duration = 2000;
    const startTime = performance.now();

    const animateCount = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const currentCount = Math.floor(progress * end);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isVisible, finalValue]);
  
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K+`;
    }
    return `${num}${isPercentage ? '%' : '+'}`;
  }

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl font-bold font-headline text-primary-foreground">
        {formatNumber(count)}
      </p>
      <p className="text-sm text-primary-foreground/80">{label}</p>
    </div>
  );
}
