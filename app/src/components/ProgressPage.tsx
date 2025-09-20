import React, { useEffect, useState } from 'react';
import { Progress } from './ui/progress';
import { Card, CardContent } from './ui/card';
import { Sparkles, BookOpen, Palette, Zap } from 'lucide-react';

interface ProgressPageProps {
  topic: string;
  onComplete: () => void;
}

export function ProgressPage({ topic, onComplete }: ProgressPageProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: Sparkles, text: "Understanding your question...", duration: 1000 },
    { icon: BookOpen, text: "Gathering knowledge...", duration: 1500 },
    { icon: Palette, text: "Creating beautiful illustrations...", duration: 2000 },
    { icon: Zap, text: "Bringing your comic to life...", duration: 1000 }
  ];

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    const runStep = (stepIndex: number) => {
      if (stepIndex >= steps.length) {
        setTimeout(onComplete, 500);
        return;
      }

      setCurrentStep(stepIndex);
      const step = steps[stepIndex];
      const startProgress = (stepIndex / steps.length) * 100;
      const endProgress = ((stepIndex + 1) / steps.length) * 100;
      const progressIncrement = (endProgress - startProgress) / (step.duration / 50);
      let currentProgress = startProgress;

      intervalId = setInterval(() => {
        currentProgress += progressIncrement;
        setProgress(Math.min(currentProgress, endProgress));

        if (currentProgress >= endProgress) {
          clearInterval(intervalId);
          timeoutId = setTimeout(() => runStep(stepIndex + 1), 200);
        }
      }, 50);
    };

    runStep(0);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [onComplete]);

  const CurrentIcon = steps[currentStep]?.icon || Sparkles;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center animate-pulse">
              <CurrentIcon className="w-12 h-12 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-purple-800 mb-2">Creating Your Comic!</h1>
            <p className="text-purple-600">About: "{topic}"</p>
          </div>
        </div>

        {/* Progress Card */}
        <Card className="shadow-lg border-2 border-purple-200">
          <CardContent className="p-6 space-y-6">
            <Progress 
              value={progress} 
              className="h-4 bg-purple-100" 
            />
            
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <CurrentIcon className="w-5 h-5 text-purple-600" />
                <span className="text-purple-700 font-medium">
                  {steps[currentStep]?.text || "Getting ready..."}
                </span>
              </div>
              <p className="text-sm text-purple-500">
                {Math.round(progress)}% complete
              </p>
            </div>

            {/* Step indicators */}
            <div className="flex justify-center space-x-4">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = index === currentStep;
                const isComplete = index < currentStep;
                
                return (
                  <div
                    key={index}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isComplete 
                        ? 'bg-green-400 text-white scale-110' 
                        : isActive 
                        ? 'bg-purple-400 text-white scale-125 animate-bounce' 
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    <StepIcon className="w-5 h-5" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Fun facts while waiting */}
        <Card className="shadow-lg border-2 border-blue-200">
          <CardContent className="p-4 text-center">
            <p className="text-blue-600 text-sm">
              💡 Did you know? Comics are a great way to learn because they combine pictures and words!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}