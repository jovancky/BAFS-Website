
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const TAccountDisplay = ({ debits, credits }: { debits: number[], credits: number[] }) => {
    const totalDebits = debits.reduce((a, b) => a + b, 0);
    const totalCredits = credits.reduce((a, b) => a + b, 0);

    return (
        <div className="border rounded-lg shadow-sm max-w-md mx-auto">
            <div className="p-2 bg-secondary/50 rounded-t-lg">
                <p className="font-semibold text-center">Cash</p>
            </div>
            <div className="grid grid-cols-2">
                <div className="border-r p-2">
                    <p className="text-xs text-muted-foreground text-center p-2 border-b">Debit</p>
                    <div className="flex flex-col items-end pr-4">
                        {debits.map((amount, i) => <span key={i}>{amount.toFixed(2)}</span>)}
                    </div>
                </div>
                <div className="p-2">
                    <p className="text-xs text-muted-foreground text-center p-2 border-b">Credit</p>
                     <div className="flex flex-col items-end pr-4">
                        {credits.map((amount, i) => <span key={i}>{amount.toFixed(2)}</span>)}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 border-t mt-1">
                <div className="p-2 border-r text-right font-bold text-sm">{totalDebits.toFixed(2)}</div>
                <div className="p-2 text-right font-bold text-sm">{totalCredits.toFixed(2)}</div>
            </div>
        </div>
    );
};

const generateQuestion = () => {
    const numDebits = Math.floor(Math.random() * 4) + 1; // 1 to 4 debit entries
    const numCredits = Math.floor(Math.random() * 4) + 1; // 1 to 4 credit entries
    
    const debits = Array.from({ length: numDebits }, () => Math.floor(Math.random() * 500) + 50);
    const credits = Array.from({ length: numCredits }, () => Math.floor(Math.random() * 500) + 50);

    const totalDebits = debits.reduce((a, b) => a + b, 0);
    const totalCredits = credits.reduce((a, b) => a + b, 0);
    
    let correctAnswer: 'debit' | 'credit' | 'zero';
    if (totalDebits > totalCredits) {
        correctAnswer = 'debit';
    } else if (totalCredits > totalDebits) {
        correctAnswer = 'credit';
    } else {
        // To make zero balance less frequent, we can force a change if they are equal
        debits[0] += 100;
        correctAnswer = 'debit';
    }

    return { debits, credits, correctAnswer };
};


export default function BalanceQuizPage() {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [quizData, setQuizData] = useState<{debits: number[], credits: number[], correctAnswer: string} | null>(null);
    
    const loadNewQuestion = useCallback(() => {
        setQuizData(generateQuestion());
        setSelectedAnswer(null);
        setFeedback(null);
        setSubmitted(false);
    }, []);

    useEffect(() => {
        loadNewQuestion();
    }, [loadNewQuestion]);
    

    const handleSubmit = () => {
        if (!selectedAnswer || !quizData) {
            setFeedback({ type: 'error', message: 'Please select an answer.' });
            return;
        }

        setSubmitted(true);
        const totalDebits = quizData.debits.reduce((a,b) => a+b, 0);
        const totalCredits = quizData.credits.reduce((a,b) => a+b, 0);

        if (selectedAnswer === quizData.correctAnswer) {
            setFeedback({ type: 'success', message: 'Correct! The total debits are greater than the total credits, resulting in a debit balance.' });
        } else {
            const correctType = quizData.correctAnswer.charAt(0).toUpperCase() + quizData.correctAnswer.slice(1);
            setFeedback({ type: 'error', message: `Not quite. The correct answer is ${correctType} Balance. The total debits ($${totalDebits.toFixed(2)}) and total credits ($${totalCredits.toFixed(2)}) determine the final balance.` });
        }
    };

    if (!quizData) {
        return <div className="container mx-auto py-10 text-center">Loading quiz...</div>;
    }

    return (
        <div className="container mx-auto py-10 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Account Balance Quiz</CardTitle>
                    <CardDescription>Determine the final balance of the T-account shown below.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <TAccountDisplay debits={quizData.debits} credits={quizData.credits} />
                    
                    <div className="space-y-4 max-w-md mx-auto">
                        <p className="font-semibold text-center">What is the normal balance of this account?</p>
                        <RadioGroup 
                            value={selectedAnswer || ''}
                            onValueChange={setSelectedAnswer}
                            className="flex justify-center gap-4"
                            disabled={submitted}
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="debit" id="debit" />
                                <Label htmlFor="debit">Debit Balance</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="credit" id="credit" />
                                <Label htmlFor="credit">Credit Balance</Label>
                            </div>
                             <div className="flex items-center space-x-2">
                                <RadioGroupItem value="zero" id="zero" />
                                <Label htmlFor="zero">Zero Balance</Label>
                            </div>
                        </RadioGroup>
                    </div>

                     <div className="flex justify-center">
                        {submitted ? (
                            <Button onClick={loadNewQuestion}>Try Another</Button>
                        ) : (
                            <Button onClick={handleSubmit}>Submit Answer</Button>
                        )}
                    </div>

                    {feedback && (
                        <div className={cn(
                            "flex items-center gap-2 p-3 rounded-lg max-w-md mx-auto", 
                            feedback.type === 'success' ? 'bg-green-500/10 text-green-700 dark:text-green-400' : 'bg-red-500/10 text-red-700 dark:text-red-400'
                        )}>
                            {feedback.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                            <p className="font-medium text-sm">{feedback.message}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
