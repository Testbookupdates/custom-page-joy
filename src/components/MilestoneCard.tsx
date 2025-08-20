import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface MilestoneCardProps {
  title: string;
  reward: string;
  currentProgress: number;
  targetProgress: number;
  isCompleted: boolean;
  className?: string;
}

export function MilestoneCard({ 
  title, 
  reward, 
  currentProgress, 
  targetProgress, 
  isCompleted,
  className 
}: MilestoneCardProps) {
  const progressPercentage = Math.min((currentProgress / targetProgress) * 100, 100);
  
  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-200 hover:shadow-md",
      isCompleted && "ring-2 ring-primary bg-gradient-to-r from-primary/5 to-accent/5",
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{reward}</p>
          </div>
          {isCompleted && (
            <div className="animate-bounce">
              🎉
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">
              {currentProgress} / {targetProgress}
            </span>
          </div>
          <Progress 
            value={progressPercentage}
            className="h-2"
          />
          <div className="text-xs text-muted-foreground text-right">
            {isCompleted ? "Completed! 🏆" : `${Math.round(progressPercentage)}% complete`}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}