
import { cn } from "@/lib/utils";

export type Step = {
  id: number;
  title: string;
  status: 'completed' | 'current' | 'upcoming';
};

type ProgressTrackerProps = {
  steps: Step[];
  className?: string;
};

export default function ProgressTracker({ steps, className }: ProgressTrackerProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between items-center relative">
        {steps.map((step, index) => {
          const isCompleted = step.status === 'completed';
          const isCurrent = step.status === 'current';
          
          // Add connecting lines between steps
          if (index < steps.length - 1) {
            const nextCompleted = steps[index + 1].status === 'completed';
            const lineColorClass = isCompleted && nextCompleted 
              ? "bg-survey-green" 
              : isCurrent 
                ? "bg-survey-blue" 
                : "bg-survey-gray";
            
            const lineWidth = `calc(100% / ${steps.length - 1})`;
            const leftPosition = `calc(${index} * ${lineWidth})`;
            
            return (
              <div key={step.id} className="flex flex-col items-center z-10 w-full">
                <div 
                  className={cn(
                    "progress-line",
                    lineColorClass
                  )}
                  style={{ 
                    left: leftPosition,
                    width: lineWidth
                  }}
                ></div>
                <div 
                  className={cn(
                    "progress-step",
                    isCompleted
                      ? "border-survey-green bg-white text-survey-green"
                      : isCurrent
                        ? "border-survey-blue bg-survey-blue text-white animate-pulse-light"
                        : "border-survey-gray bg-white text-survey-gray"
                  )}
                >
                  {isCompleted ? "✓" : step.id}
                </div>
                <div className="mt-2 text-xs font-medium text-center">
                  {step.title}
                </div>
              </div>
            );
          } else {
            return (
              <div key={step.id} className="flex flex-col items-center z-10">
                <div 
                  className={cn(
                    "progress-step",
                    isCompleted
                      ? "border-survey-green bg-white text-survey-green"
                      : isCurrent
                        ? "border-survey-blue bg-survey-blue text-white animate-pulse-light"
                        : "border-survey-gray bg-white text-survey-gray"
                  )}
                >
                  {isCompleted ? "✓" : step.id}
                </div>
                <div className="mt-2 text-xs font-medium text-center">
                  {step.title}
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
