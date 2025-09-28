import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Code, Framer, Zap } from "lucide-react";

export function DashboardPreview() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute top-10 left-0 w-72 h-40 bg-accent/80 backdrop-blur-md rounded-2xl p-4 transform -rotate-12 transition-all duration-300 hover:rotate-0 hover:scale-105">
        <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-accent-foreground">Focus Block</h3>
            <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-primary/20 border-primary text-primary">CODE</Badge>
                <Badge variant="outline" className="bg-primary/20 border-primary text-primary flex items-center gap-1"><Framer className="w-3 h-3"/> FRAMER</Badge>
            </div>
        </div>
        
        <div className="absolute bottom-4 left-4 right-4">
            <Progress value={24} className="h-2 bg-black/20"/>
            <p className="text-right text-xs mt-1 font-bold text-accent-foreground">24%</p>
        </div>
      </div>
      <div className="relative w-80 h-48 bg-accent shadow-2xl rounded-2xl p-4 transform rotate-6 transition-all duration-300 hover:rotate-0 hover:scale-105">
         <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full border-4 border-dashed border-primary-foreground/50 flex items-center justify-center text-center text-xs font-bold text-primary-foreground">
            Get started for free
         </div>
         <div className="absolute top-4 right-4 w-10 h-10 bg-white/30 backdrop-blur-lg rounded-full flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
         </div>
         <h2 className="text-xl font-bold text-accent-foreground mt-8">EVERY EXPERT WAS ONCE A BEGINNER</h2>
         <p className="text-sm text-accent-foreground/60 mt-2">Start today!!</p>
      </div>
    </div>
  );
}
