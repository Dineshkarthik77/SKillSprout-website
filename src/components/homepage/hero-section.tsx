"use client";

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardPreview } from './dashboard-preview';
import { AnimatedStats } from './animated-stats';
import { FloatingRockets } from './floating-rockets';

export function HeroSection() {
  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden">
      <FloatingRockets />
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tighter text-primary-foreground">
              Take control of your schedule
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto md:mx-0">
              SkillSprout uses AI to analyze your unique talents and guide you toward your ideal career path with personalized learning journeys.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg" variant="accent">
                <Link href="/career-gateway">
                  Get started for free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
             <div className="mt-8 pt-8 border-t border-primary-foreground/20 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-8">
              <AnimatedStats finalValue={200} label="Courses Available" />
              <AnimatedStats finalValue={50000} label="Active Learners" />
              <AnimatedStats finalValue={95} label="Job Placement Rate" isPercentage={true} />
            </div>
          </div>
          <div className="relative w-full h-full aspect-square max-w-md mx-auto md:max-w-none">
            <DashboardPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
