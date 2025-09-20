import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ArrowLeft, ArrowRight, Home, RefreshCw } from 'lucide-react';

interface ComicStripPageProps {
  topic: string;
  onBackToStart: () => void;
}

interface ComicPanel {
  id: number;
  title: string;
  content: string;
  backgroundColor: string;
  illustration: string;
}

export function ComicStripPage({ topic, onBackToStart }: ComicStripPageProps) {
  const [currentPanel, setCurrentPanel] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Generate comic panels based on topic
  const generateComicPanels = (topic: string): ComicPanel[] => {
    const topicLower = topic.toLowerCase();

    if (topicLower.includes('rain') || topicLower.includes('water')) {
      return [
        {
          id: 1,
          title: "The Water Cycle Begins",
          content: "The sun heats up water in oceans, lakes, and rivers. This makes tiny water droplets rise up into the sky!",
          backgroundColor: "bg-gradient-to-br from-blue-200 to-cyan-100",
          illustration: "☀️💧🌊"
        },
        {
          id: 2,
          title: "Clouds Form",
          content: "High up in the sky, these water droplets get cold and stick together to form fluffy white clouds!",
          backgroundColor: "bg-gradient-to-br from-gray-100 to-blue-200",
          illustration: "☁️☁️☁️"
        },
        {
          id: 3,
          title: "Clouds Get Heavy",
          content: "More and more water droplets join together in the cloud. The cloud becomes heavy and dark!",
          backgroundColor: "bg-gradient-to-br from-gray-300 to-gray-400",
          illustration: "⛈️🌩️"
        },
        {
          id: 4,
          title: "Rain Falls!",
          content: "When the cloud can't hold any more water, the droplets fall down as rain! The water returns to Earth.",
          backgroundColor: "bg-gradient-to-br from-blue-300 to-green-200",
          illustration: "🌧️🌱🌍"
        }
      ];
    } else if (topicLower.includes('bird') || topicLower.includes('fly')) {
      return [
        {
          id: 1,
          title: "Special Bird Wings",
          content: "Birds have amazing wings with feathers! Their wings are curved on top and flatter on the bottom.",
          backgroundColor: "bg-gradient-to-br from-yellow-200 to-orange-100",
          illustration: "🐦🪶✨"
        },
        {
          id: 2,
          title: "Air Moves Differently",
          content: "When birds flap their wings, air moves faster over the top than the bottom. This creates lift!",
          backgroundColor: "bg-gradient-to-br from-blue-100 to-sky-200",
          illustration: "💨🔄🐦"
        },
        {
          id: 3,
          title: "Up, Up, and Away!",
          content: "The lift force pushes the bird up into the sky! Birds can control their flight by moving their wings and tail.",
          backgroundColor: "bg-gradient-to-br from-sky-200 to-blue-300",
          illustration: "🦅🌤️🏔️"
        }
      ];
    } else if (topicLower.includes('star') || topicLower.includes('space')) {
      return [
        {
          id: 1,
          title: "Cosmic Gas Clouds",
          content: "Stars begin as huge clouds of gas and dust floating in space. These clouds are called nebulae!",
          backgroundColor: "bg-gradient-to-br from-purple-300 to-pink-200",
          illustration: "🌌✨☁️"
        },
        {
          id: 2,
          title: "Gravity Pulls Together",
          content: "Gravity pulls all the gas and dust together, making it spin and get hotter and hotter!",
          backgroundColor: "bg-gradient-to-br from-orange-200 to-red-200",
          illustration: "🔥🌀💫"
        },
        {
          id: 3,
          title: "Nuclear Fusion Begins",
          content: "When it gets super hot, hydrogen gas starts fusing together, creating enormous amounts of energy!",
          backgroundColor: "bg-gradient-to-br from-yellow-200 to-white",
          illustration: "⚛️💥⭐"
        },
        {
          id: 4,
          title: "A Star is Born!",
          content: "Now the star shines bright in space! It will keep burning for millions and millions of years!",
          backgroundColor: "bg-gradient-to-br from-yellow-300 to-gold-200",
          illustration: "⭐🌟✨"
        }
      ];
    } else {
      // Default general knowledge comic
      return [
        {
          id: 1,
          title: "Great Question!",
          content: `You asked about "${topic}" - that's such a wonderful thing to be curious about!`,
          backgroundColor: "bg-gradient-to-br from-purple-200 to-pink-100",
          illustration: "🤔💭❓"
        },
        {
          id: 2,
          title: "Learning is Fun",
          content: "Asking questions is how we learn new things! Scientists ask questions all the time.",
          backgroundColor: "bg-gradient-to-br from-green-200 to-blue-100",
          illustration: "🔬📚👨‍🔬"
        },
        {
          id: 3,
          title: "Keep Exploring",
          content: "The world is full of amazing things to discover! Keep asking questions and learning.",
          backgroundColor: "bg-gradient-to-br from-yellow-200 to-orange-100",
          illustration: "🌍🚀🔍"
        }
      ];
    }
  };

  const panels = generateComicPanels(topic);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentPanel < panels.length - 1) {
      setCurrentPanel(currentPanel + 1);
    }
    if (isRightSwipe && currentPanel > 0) {
      setCurrentPanel(currentPanel - 1);
    }
  };

  const nextPanel = () => {
    if (currentPanel < panels.length - 1) {
      setCurrentPanel(currentPanel + 1);
    }
  };

  const prevPanel = () => {
    if (currentPanel > 0) {
      setCurrentPanel(currentPanel - 1);
    }
  };

  const goToPanel = (index: number) => {
    setCurrentPanel(index);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-4 bg-white shadow-sm">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <Button
            onClick={onBackToStart}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Ask Another Question</span>
          </Button>
          <h1 className="text-xl font-bold text-purple-800 text-center flex-1">Your Comic Story</h1>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Comic Strip */}
      <div className="flex-1 p-4">
        <div className="max-w-2xl mx-auto">
          {/* Custom Carousel */}
          <div className="relative overflow-hidden rounded-xl">
            <div
              ref={carouselRef}
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentPanel * 100}%)` }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {panels.map((panel, index) => (
                <div key={panel.id} className="w-full flex-shrink-0 px-2">
                  <Card className={`${panel.backgroundColor} border-4 border-white shadow-2xl min-h-[500px]`}>
                    <CardContent className="p-8 flex flex-col items-center justify-center text-center space-y-6">
                      <div className="text-6xl mb-4">
                        {panel.illustration}
                      </div>
                      <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                          {panel.title}
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed max-w-md">
                          {panel.content}
                        </p>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mt-6">
                        <span>Panel {index + 1} of {panels.length}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {panels.map((_, index) => (
              <button
                key={index}
                onClick={() => goToPanel(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentPanel 
                    ? 'bg-purple-600' 
                    : 'bg-purple-200 hover:bg-purple-300'
                }`}
                aria-label={`Go to panel ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center space-x-4 mt-8">
            <Button
              onClick={prevPanel}
              disabled={currentPanel === 0}
              variant="outline"
              size="lg"
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Previous</span>
            </Button>
            <Button
              onClick={nextPanel}
              disabled={currentPanel === panels.length - 1}
              variant="outline"
              size="lg"
              className="flex items-center space-x-2"
            >
              <span>Next</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Swipe Instructions */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
              💡 Swipe left or right to navigate between panels
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}