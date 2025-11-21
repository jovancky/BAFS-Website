
'use client';

import { useState } from 'react';
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


export default function BalanceQuizPage() {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const [submitted, setSubmitted] = useState(false);
    
    const correctAnswer = "debit";
    const accountData = {
        debits: [1000, 500],
        credits: [200, 300]
    };

    const handleSubmit = () => {
        if (!selectedAnswer) {
            setFeedback({ type: 'error', message: 'Please select an answer.' });
            return;
        }

        setSubmitted(true);
        if (selectedAnswer === correctAnswer) {
            setFeedback({ type: 'success', message: 'Correct! The total debits are greater than the total credits, resulting in a debit balance.' });
        } else {
            setFeedback({ type: 'error', message: `Not quite. The correct answer is Debit Balance. The total debits ($1500) exceed the total credits ($500).` });
        }
    };
    
    const handleReset = () => {
        setSelectedAnswer(null);
        setFeedback(null);
        setSubmitted(false);
    }

    return (
        <div className="container mx-auto py-10 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Account Balance Quiz</CardTitle>
                    <CardDescription>Determine the final balance of the T-account shown below.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <TAccountDisplay debits={accountData.debits} credits={accountData.credits} />
                    
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
                            <Button onClick={handleReset}>Try Another</Button>
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
