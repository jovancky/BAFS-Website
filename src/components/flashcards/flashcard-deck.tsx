
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

type Flashcard = {
  question: string;
  answer: string;
};

type FlashcardDeckProps = {
  cards: Flashcard[];
};

export default function FlashcardDeck({ cards }: FlashcardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
     setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
    }, 150);
  };
  
  if (!cards || cards.length === 0) {
    return <p>No flashcards available.</p>;
  }

  const currentCard = cards[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full max-w-xl">
      <div className="w-full h-64 perspective-1000">
        <div
          className={cn(
            'relative w-full h-full text-center transition-transform duration-700 transform-style-3d',
            isFlipped ? 'rotate-y-180' : ''
          )}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front of the card */}
          <div className="absolute w-full h-full backface-hidden">
            <Card className="h-full flex items-center justify-center p-6 bg-card cursor-pointer">
              <p className="text-xl font-semibold">{currentCard.question}</p>
            </Card>
          </div>
          {/* Back of the card */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180">
            <Card className="h-full flex items-center justify-center p-6 bg-secondary cursor-pointer">
               <p className="text-lg font-medium text-secondary-foreground">{currentCard.answer}</p>
            </Card>
          </div>
        </div>
      </div>
      
       <div className="text-sm text-muted-foreground">
          Card {currentIndex + 1} of {cards.length}
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button variant="outline" size="icon" onClick={handlePrev}>
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Previous Card</span>
        </Button>
         <Button variant="ghost" size="icon" onClick={() => setIsFlipped(!isFlipped)}>
            <RefreshCw className="h-5 w-5" />
            <span className="sr-only">Flip Card</span>
        </Button>
        <Button variant="outline" size="icon" onClick={handleNext}>
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Next Card</span>
        </Button>
      </div>

       <style jsx>{`
        .perspective-1000 {
            perspective: 1000px;
        }
        .transform-style-3d {
            transform-style: preserve-3d;
        }
        .rotate-y-180 {
            transform: rotateY(180deg);
        }
        .backface-hidden {
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
        }
      `}</style>

    </div>
  );
}
