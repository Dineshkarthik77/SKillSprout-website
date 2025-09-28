"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function Footer() {
  const [currentYear, setCurrentYear] = React.useState<number | null>(null);
  const pathname = usePathname();

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const isHomePage = pathname === '/';

  return (
    <footer className={cn(
      "py-6 px-4 md:px-6 lg:px-8",
      isHomePage ? "bg-primary" : "bg-background"
    )}>
      <div className="container mx-auto text-center text-sm text-primary-foreground/80">
        {currentYear !== null && (
          <p>&copy; {currentYear} SkillSprout. All rights reserved.</p>
        )}
      </div>
    </footer>
  );
}
