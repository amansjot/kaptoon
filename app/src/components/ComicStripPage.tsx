import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ArrowLeft, ArrowRight, Home, RefreshCw } from 'lucide-react';
import { generateComicPanels } from '../api/comic.ts';

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
  const [panels, setPanels] = useState<ComicPanel[]>([]);
  const [currentPanel, setCurrentPanel] = useState(0);
  const [loading, setLoading] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchPanels() {
      setLoading(true);
      try {
        const result = await generateComicPanels(topic);
        setPanels(result);
      } catch (err) {
        console.error("Error generating comic:", err);
        setPanels([{
          id: 1,
          title: "Oops!",
          content: "We couldn't create your comic right now. Please try again!",
          backgroundColor: "bg-gradient-to-br from-red-200 to-pink-100",
          illustration: "😅"
        }]);
      }
      setLoading(false);
    }
    fetchPanels();
  }, [topic]);

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

  const regenerateComic = async () => {
    setLoading(true);
    setCurrentPanel(0);
    try {
      const result = await generateComicPanels(topic);
      setPanels(result);
    } catch (err) {
      console.error("Error regenerating comic:", err);
      setPanels([{
        id: 1,
        title: "Oops!",
        content: "We couldn't create your comic right now. Please try again!",
        backgroundColor: "bg-gradient-to-br from-red-200 to-pink-100",
        illustration: "😅"
      }]);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
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
            <h1 className="text-xl font-bold text-purple-800 text-center flex-1">
              Creating Your Comic...
            </h1>
            <div className="w-20"></div>
          </div>
          {/* Show topic under header while loading */}
          <div className="text-center mt-2 text-gray-600 italic">
            Topic: "{topic}"
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-bounce">✨</div>
            <div className="text-xl font-bold text-purple-700">
              Making your comic about "{topic}"...
            </div>
          </div>
        </div>
      </div>
    );
  }

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

    {/* Main title + Topic */}
    <div className="flex flex-col items-center flex-1">
      <h1 className="text-xl font-bold text-purple-800">Your Comic Story</h1>
      <span className="text-xl font-bold text-purple-800">
        Topic: "{topic}"
      </span>
    </div>

    <Button
      onClick={regenerateComic}
      variant="outline"
      size="sm"
      className="flex items-center space-x-2"
      disabled={loading}
    >
      <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
    </Button>
  </div>
</div>


      {/* Comic Strip Carousel */}
      <div className="flex-1 p-4">
        <div className="max-w-2xl mx-auto">
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
                      {panel.illustration && panel.illustration.startsWith('http') ? (
                        <img
                          src={panel.illustration}
                          alt={panel.title}
                          className="w-64 h-64 rounded-xl object-cover shadow-lg mb-4"
                        />
                      ) : (
                        <div className="text-6xl mb-4">
                          {panel.illustration || '🎨'}
                        </div>
                      )}
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

          {/* Navigation */}
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
