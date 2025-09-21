"use client";

export function Footer() {
  const [currentYear, setCurrentYear] = React.useState<number | null>(null);

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="py-6 px-4 md:px-6 lg:px-8 bg-muted/50">
      <div className="container mx-auto text-center text-sm text-muted-foreground">
        {currentYear !== null && (
          <p>&copy; {currentYear} SkillSprout. All rights reserved.</p>
        )}
      </div>
    </footer>
  );
}
