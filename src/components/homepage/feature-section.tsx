import { Target, Leaf, Rocket } from "lucide-react";
import { FeatureCard } from "./feature-card";

const features = [
  {
    icon: Target,
    title: "AI-Powered Guidance",
    description: "Receive intelligent career and learning path recommendations tailored just for you.",
  },
  {
    icon: Leaf,
    title: "Visualize Your Progress",
    description: "Watch your skills come to life as you build a unique 3D project with every lesson completed.",
  },
  {
    icon: Rocket,
    title: "Build Your Portfolio",
    description: "Automatically create a dynamic portfolio that showcases your projects and achievements.",
  },
];

export function FeatureSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
