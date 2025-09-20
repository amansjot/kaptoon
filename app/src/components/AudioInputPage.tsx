import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Mic, Send, Sparkles } from 'lucide-react';

interface AudioInputPageProps {
  onQuestionSubmit: (question: string) => void;
}

export function AudioInputPage({ onQuestionSubmit }: AudioInputPageProps) {
  const [question, setQuestion] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = () => {
    if (question.trim()) {
      onQuestionSubmit(question);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real app, this would handle actual audio recording
    if (!isRecording) {
      setTimeout(() => setIsRecording(false), 3000);
    }
  };

  const suggestedQuestions = [
    "Why does it rain?",
    "How do birds fly?",
    "What are stars made of?",
    "Why do we need to sleep?",
    "How do plants grow?",
    "What makes thunder?"
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-purple-800 mb-2">Ask Me Anything!</h1>
            <p className="text-purple-600">What would you like to learn about today?</p>
          </div>
        </div>

        {/* Input Card */}
        <Card className="shadow-lg border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="text-center text-purple-700">Your Question</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your question here..."
                className="pr-12 text-lg py-6 border-2 border-purple-200 rounded-xl"
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              />
              <Button
                onClick={toggleRecording}
                size="sm"
                variant={isRecording ? "destructive" : "secondary"}
                className={`absolute right-2 top-2 rounded-full w-10 h-10 ${
                  isRecording ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-purple-200 hover:bg-purple-300'
                }`}
              >
                <Mic className="w-4 h-4" />
              </Button>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!question.trim()}
              className="w-full py-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl text-lg"
            >
              <Send className="w-5 h-5 mr-2" />
              Create My Comic!
            </Button>
          </CardContent>
        </Card>

        {/* Suggested Questions */}
        <Card className="shadow-lg border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="text-center text-blue-700">Need Ideas? Try These!</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2">
              {suggestedQuestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  onClick={() => setQuestion(suggestion)}
                  className="text-left justify-start p-3 h-auto bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}