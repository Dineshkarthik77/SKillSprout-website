"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: 10000, label: "Students Learning", suffix: "+" },
  { value: 95, label: "Career Success Rate", suffix: "%" },
  { value: 50, label: "Courses Available", suffix: "+" },
  { value: 200, label: "Industry Experts", suffix: "+" },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [currentValue, setCurrentValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const end = value;
          const duration = 2000;
          
          if (end === 0) return;

          const frameDuration = 1000 / 60;
          const totalFrames = Math.round(duration / frameDuration);
          const increment = end / totalFrames;


          const animate = () => {
            start += increment;
            if (start < end) {
              setCurrentValue(Math.ceil(start));
              requestAnimationFrame(animate);
            } else {
              setCurrentValue(end);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
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
  }, [value]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold font-headline text-foreground">
      {currentValue.toLocaleString()}{suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">By the Numbers</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Join a growing community of learners who are taking control of their careers.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center space-y-2">
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Button asChild size="lg" className="animate-pulse-subtle hover:animate-glow">
            <Link href="/career-gateway">
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
