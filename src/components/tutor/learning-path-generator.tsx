'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { generatePersonalizedLearningPath } from '@/ai/flows/personalized-learning-path';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock performance data
const mockPerformanceData = JSON.stringify({
    topics: {
        'Basic Accounting Equation': { score: 95, attempts: 10 },
        'Debits and Credits': { score: 70, attempts: 25 },
        'Journal Entries': { score: 65, attempts: 20 },
        'Ledger Accounts': { score: 85, attempts: 15 },
        'Trial Balance': { score: 55, attempts: 5 },
        'Financial Statements': { score: 'not_started' },
    },
    recentActivity: [
        'Failed quiz on Trial Balances.',
        'Struggled with journal entries involving liabilities.',
        'Completed "Debits and Credits" module with a low score.'
    ],
    strengths: ['Understanding of the basic accounting equation'],
    weaknesses: ['Balancing trial balances', 'Complex journal entries'],
});

export default function LearningPathGenerator() {
    const [loading, setLoading] = useState(false);
    const [learningPath, setLearningPath] = useState('');
    const { toast } = useToast();

    const handleGenerate = async () => {
        setLoading(true);
        setLearningPath('');
        try {
            const result = await generatePersonalizedLearningPath({ performanceData: mockPerformanceData });
            setLearningPath(result.learningPath);
        } catch (error) {
            console.error(error);
            toast({
                title: 'Error',
                description: 'Failed to generate learning path. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <Button onClick={handleGenerate} disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {loading ? 'Analyzing Performance...' : 'Generate My Path'}
            </Button>

            {loading && (
                <div className="flex items-center justify-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            )}

            {learningPath && (
                <Card className="bg-secondary/50">
                    <CardHeader>
                        <CardTitle>Your Custom Learning Path</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-foreground/90 leading-relaxed">
                        {learningPath.split('\n\n').map((paragraph, pIndex) => (
                            <div key={pIndex} className="mb-4">
                                {paragraph.split('\n').map((line, lIndex) => {
                                     const isHeading = /^[A-Za-z\s]+:$/.test(line.trim());
                                     const isListItem = line.trim().startsWith('-') || line.trim().startsWith('*');

                                     if (isHeading) {
                                         return <p key={lIndex} className="font-semibold text-base mt-2">{line}</p>
                                     }
                                     if(isListItem) {
                                        return <p key={lIndex} className="ml-4">{line}</p>
                                     }
                                     return <p key={lIndex}>{line}</p>
                                })}
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
