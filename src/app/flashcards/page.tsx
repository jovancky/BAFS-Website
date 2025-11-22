
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Layers } from 'lucide-react';
import FlashcardDeck from '@/components/flashcards/flashcard-deck';

const flashcardData = [
  {
    question: "What is the fundamental accounting equation?",
    answer: "Assets = Liabilities + Equity"
  },
  {
    question: "What does 'AED' stand for in the context of debit accounts?",
    answer: "Assets, Expenses, Drawings"
  },
  {
    question: "What does 'CRL' stand for in the context of credit accounts?",
    answer: "Capital, Revenue, Liabilities"
  },
  {
    question: "How do you increase an AED (Assets, Expenses, Drawings) account?",
    answer: "You Debit it."
  },
  {
    question: "How do you decrease a CRL (Capital, Revenue, Liabilities) account?",
    answer: "You Debit it."
  },
  {
    question: "How do you increase a CRL (Capital, Revenue, Liabilities) account?",
    answer: "You Credit it."
  },
   {
    question: "How do you decrease an AED (Assets, Expenses, Drawings) account?",
    answer: "You Credit it."
  },
  {
    question: "What kind of balance do Asset accounts normally have?",
    answer: "A Debit Balance."
  },
  {
    question: "What kind of balance do Liability accounts normally have?",
    answer: "A Credit Balance."
  },
  {
    question: "The term for a debtor that arises from the sale of goods on credit is...",
    answer: "Trade Receivables (or Trade Debtors)"
  },
  {
    question: "The term for a creditor that arises from the purchase of goods for resale on credit is...",
    answer: "Trade Payables (or Trade Creditors)"
  },
   {
    question: "Can the Cash account have a credit balance?",
    answer: "No. You cannot spend cash you do not have. However, a Bank account can have a credit balance (an overdraft)."
  }
];

export default function FlashcardsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Layers className="h-12 w-12 text-primary"/>
                <div>
                    <h1 className="font-headline text-4xl font-bold text-primary">Flashcards</h1>
                    <p className="text-lg text-muted-foreground mt-1">Review the core concepts with this interactive deck.</p>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Core Principles Deck</CardTitle>
                    <CardDescription>Click a card to flip it. Use the arrows to navigate.</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center p-6">
                    <FlashcardDeck cards={flashcardData} />
                </CardContent>
            </Card>
        </div>
    );
}
