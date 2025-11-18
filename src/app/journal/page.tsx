
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { JournalEntry } from '@/components/journal/journal-entry';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const journalScenarios = [
    {
        scenario: "The company paid $1,200 for monthly office rent by cash.",
        answer: [
            { account: 'Rent', debit: '1200', credit: '' },
            { account: 'Cash', debit: '', credit: '1200' }
        ]
    },
    {
        scenario: "Received $5,000 cash as commission for services rendered.",
        answer: [
            { account: 'Cash', debit: '5000', credit: '' },
            { account: 'Commission Revenue', debit: '', credit: '5000' }
        ]
    },
    {
        scenario: "Purchased office supplies worth $750 on credit from 'Supplies Co.'",
        answer: [
            { account: 'Office Supplies', debit: '750', credit: '' },
            { account: 'Accounts Payable', debit: '', credit: '750' }
        ]
    },
    {
        scenario: "The owner invested an additional $20,000 cash into the business.",
        answer: [
            { account: 'Cash', debit: '20000', credit: '' },
            { account: 'Capital', debit: '', credit: '20000' }
        ]
    }
];

export default function JournalPage() {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [key, setKey] = useState(Date.now()); // Used to reset the JournalEntry component

    const currentScenario = journalScenarios[questionIndex];
    const isLastQuestion = questionIndex === journalScenarios.length - 1;

    const handleSubmitFeedback = (correct: boolean) => {
        setIsSubmitted(true);
        setIsCorrect(correct);
    };

    const handleNextQuestion = () => {
        if (!isLastQuestion) {
            setQuestionIndex(prev => prev + 1);
            setIsSubmitted(false);
            setIsCorrect(false);
            setKey(Date.now()); // Change key to force re-mount of JournalEntry
        }
    };

    return (
        <div className="container mx-auto py-10 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Interactive Journal Entry</CardTitle>
                    <CardDescription>Practice makes perfect. Record the transaction below to test your skills.</CardDescription>
                </CardHeader>
                <CardContent>
                    <JournalEntry
                        key={key}
                        scenario={currentScenario.scenario}
                        answer={currentScenario.answer}
                        onSubmission={handleSubmitFeedback}
                    />
                </CardContent>
            </Card>

            {isSubmitted && (
                 <div className="flex justify-end">
                    {isLastQuestion ? (
                        <Card className="bg-green-500/10 border-green-500/20 p-4 flex flex-col items-center gap-2">
                             <CheckCircle className="h-8 w-8 text-green-500"/>
                            <p className="font-semibold text-green-500">You've completed all journal entries!</p>
                            <Link href="/journal" passHref>
                                <Button variant="outline" onClick={() => {
                                    setQuestionIndex(0);
                                    setIsSubmitted(false);
                                    setIsCorrect(false);
                                    setKey(Date.now());
                                }}>Practice Again</Button>
                            </Link>
                        </Card>
                    ) : (
                        <Button onClick={handleNextQuestion}>
                            Next Question <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}
