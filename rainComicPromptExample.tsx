import React, { useState } from 'react';
import { Cloud, Sun, ArrowDown, Droplets, Eye, EyeOff } from 'lucide-react';

const RainComic = () => {
  const [currentPanel, setCurrentPanel] = useState(0);
  const [showFactBox, setShowFactBox] = useState(false);

  const panels = [
    {
      title: "Meet Rainy the Water Drop!",
      content: "Hi there! I'm Rainy, and I'm going to show you how I travel from the ocean to the clouds and back down as rain!",
      illustration: "ocean",
      character: "happy",
      funFact: "The ocean contains 97% of all water on Earth!"
    },
    {
      title: "The Sun Heats Me Up!",
      content: "When the warm sun shines on me in the ocean, I get so excited that I turn into invisible water vapor and float up into the sky!",
      illustration: "evaporation",
      character: "excited",
      funFact: "This process is called evaporation - it happens when water gets hot enough to become a gas!"
    },
    {
      title: "I Join My Friends in the Clouds!",
      content: "High up in the sky where it's cold, I meet millions of other water drops! We stick together to form fluffy white clouds!",
      illustration: "cloud",
      character: "friendly",
      funFact: "Clouds can hold millions of gallons of water, but they float because water vapor is lighter than air!"
    },
    {
      title: "Time to Fall as Rain!",
      content: "When our cloud gets too heavy with water drops, we can't stay up anymore. So we fall down as raindrops to water the plants and fill up rivers!",
      illustration: "rain",
      character: "falling",
      funFact: "A single raindrop can fall at speeds of up to 20 miles per hour!"
    }
  ];

  const getIllustration = (type) => {
    switch(type) {
      case 'ocean':
        return (
          <div className="relative bg-gradient-to-b from-blue-200 to-blue-500 rounded-lg p-4 h-48 flex items-center justify-center">
            <div className="absolute top-2 right-2">
              <Sun className="w-12 h-12 text-yellow-400 animate-pulse" />
            </div>
            <div className="flex space-x-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-blue-300 rounded-full animate-bounce" style={{animationDelay: `${i * 0.1}s`}} />
              ))}
            </div>
            <div className="absolute bottom-2 left-2 text-blue-800 font-bold text-sm">Ocean</div>
          </div>
        );
      case 'evaporation':
        return (
          <div className="relative bg-gradient-to-b from-yellow-200 to-blue-300 rounded-lg p-4 h-48 flex flex-col items-center justify-center">
            <Sun className="w-16 h-16 text-yellow-500 mb-4 animate-spin" style={{animationDuration: '4s'}} />
            {[...Array(6)].map((_, i) => (
              <div key={i} className="absolute w-2 h-2 bg-blue-400 rounded-full animate-pulse" 
                   style={{
                     left: `${30 + i * 8}%`,
                     bottom: `${20 + i * 10}%`,
                     animationDelay: `${i * 0.2}s`
                   }} />
            ))}
            <div className="text-orange-600 font-bold text-sm mt-4">Heat Rising!</div>
          </div>
        );
      case 'cloud':
        return (
          <div className="relative bg-gradient-to-b from-sky-200 to-sky-100 rounded-lg p-4 h-48 flex items-center justify-center">
            <Cloud className="w-24 h-24 text-gray-300 animate-bounce" />
            <div className="absolute top-4 right-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-3 h-3 bg-blue-400 rounded-full inline-block mr-1 animate-pulse" />
              ))}
            </div>
            <div className="absolute bottom-2 center text-gray-600 font-bold text-sm">Cloud Formation</div>
          </div>
        );
      case 'rain':
        return (
          <div className="relative bg-gradient-to-b from-gray-400 to-green-200 rounded-lg p-4 h-48 flex items-center justify-center">
            <Cloud className="w-16 h-16 text-gray-600 mb-8" />
            {[...Array(8)].map((_, i) => (
              <ArrowDown key={i} className="absolute w-3 h-6 text-blue-500 animate-bounce" 
                        style={{
                          left: `${20 + i * 8}%`,
                          top: `${40 + (i % 3) * 15}%`,
                          animationDelay: `${i * 0.1}s`
                        }} />
            ))}
            <div className="absolute bottom-2 left-2 text-green-700 font-bold text-sm">Rain!</div>
          </div>
        );
      default:
        return <div className="bg-gray-200 rounded-lg p-4 h-48" />;
    }
  };

  const getCharacter = (mood) => {
    const baseClasses = "w-16 h-16 rounded-full border-4 border-blue-600 bg-blue-400 flex items-center justify-center text-2xl transition-all duration-300";
    switch(mood) {
      case 'happy':
        return <div className={baseClasses}>😊</div>;
      case 'excited':
        return <div className={baseClasses + " animate-pulse"}>🤩</div>;
      case 'friendly':
        return <div className={baseClasses}>👋</div>;
      case 'falling':
        return <div className={baseClasses + " animate-bounce"}>🌧️</div>;
      default:
        return <div className={baseClasses}>💧</div>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-800 mb-2">The Amazing Journey of Rain!</h1>
        <p className="text-lg text-indigo-600">An Educational Adventure with Rainy the Water Drop</p>
      </div>

      {/* Comic Panel */}
      <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6 border-4 border-indigo-200">
        <div className="flex items-start space-x-6">
          {/* Character */}
          <div className="flex-shrink-0">
            {getCharacter(panels[currentPanel].character)}
          </div>

          {/* Content */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-indigo-800 mb-3">{panels[currentPanel].title}</h2>
            
            {/* Illustration */}
            <div className="mb-4">
              {getIllustration(panels[currentPanel].illustration)}
            </div>

            {/* Speech Bubble */}
            <div className="bg-yellow-100 border-2 border-yellow-300 rounded-2xl p-4 relative">
              <div className="absolute -left-3 top-6 w-0 h-0 border-t-8 border-t-transparent border-r-12 border-r-yellow-100 border-b-8 border-b-transparent"></div>
              <p className="text-gray-800 text-lg leading-relaxed">{panels[currentPanel].content}</p>
            </div>
          </div>
        </div>

        {/* Fun Fact Toggle */}
        <div className="mt-4">
          <button 
            onClick={() => setShowFactBox(!showFactBox)}
            className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            {showFactBox ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{showFactBox ? 'Hide' : 'Show'} Fun Fact!</span>
          </button>
          
          {showFactBox && (
            <div className="mt-3 bg-green-100 border-2 border-green-300 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl">🧠</span>
                <span className="font-bold text-green-800">Did You Know?</span>
              </div>
              <p className="text-green-700">{panels[currentPanel].funFact}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center space-x-4 mb-6">
        <button 
          onClick={() => setCurrentPanel(Math.max(0, currentPanel - 1))}
          disabled={currentPanel === 0}
          className="px-6 py-3 bg-indigo-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-indigo-600 transition-colors font-semibold"
        >
          ← Previous
        </button>
        
        <div className="flex items-center space-x-2">
          {panels.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPanel(index)}
              className={`w-4 h-4 rounded-full transition-colors ${
                index === currentPanel ? 'bg-indigo-600' : 'bg-indigo-200'
              }`}
            />
          ))}
        </div>
        
        <button 
          onClick={() => setCurrentPanel(Math.min(panels.length - 1, currentPanel + 1))}
          disabled={currentPanel === panels.length - 1}
          className="px-6 py-3 bg-indigo-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-indigo-600 transition-colors font-semibold"
        >
          Next →
        </button>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-200 rounded-full h-3 mb-6">
        <div 
          className="bg-indigo-500 h-3 rounded-full transition-all duration-300"
          style={{ width: `${((currentPanel + 1) / panels.length) * 100}%` }}
        />
      </div>

      {/* Summary */}
      {currentPanel === panels.length - 1 && (
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 border-2 border-purple-200">
          <h3 className="text-2xl font-bold text-purple-800 mb-3">🎉 Great Job Learning!</h3>
          <p className="text-purple-700 text-lg mb-4">
            Now you know the water cycle! Rain happens when water evaporates from oceans, forms clouds, and falls back down. 
            This cycle keeps happening over and over, bringing fresh water to plants, animals, and people!
          </p>
          <div className="flex space-x-4">
            <button className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-semibold">
              🔄 Read Again
            </button>
            <button 
              onClick={() => setCurrentPanel(0)}
              className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-semibold"
            >
              🏠 Start Over
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RainComic;