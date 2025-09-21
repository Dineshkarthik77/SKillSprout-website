import { ModelViewer } from "./model-viewer";
import { FloatingRockets } from "./floating-rockets";

export function HeroSection() {
  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden">
      <FloatingRockets />
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tighter">
              Grow Your Skills, Shape Your Future.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              SkillSprout uses AI to analyze your unique talents and guide you toward your ideal career path with personalized learning journeys.
            </p>
          </div>
          <div className="relative w-full h-full aspect-square max-w-md mx-auto md:max-w-none">
            <ModelViewer />
          </div>
        </div>
      </div>
    </section>
  );
}
