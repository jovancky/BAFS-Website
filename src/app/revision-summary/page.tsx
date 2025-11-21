import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, BookCheck, AlertTriangle } from 'lucide-react';

const revisionTopics = {
    strengths: [
        {
            title: "Basic Accounting Equation",
            description: "You have a solid understanding of Assets = Liabilities + Equity. Keep it up!",
        },
        {
            title: "Ledger Accounts",
            description: "You are proficient at posting to T-Accounts. Great job!",
        }
    ],
    weaknesses: [
        {
            title: "Trial Balance",
            description: "You've had some trouble balancing the trial balance. Focus on ensuring total debits equal total credits.",
        },
        {
            title: "Complex Journal Entries",
            description: "Journal entries involving multiple accounts or accruals are challenging. Practice these scenarios.",
        },
        {
            title: "Debits and Credits Rules",
            description: "Review the normal balances for different account types (Assets, Liabilities, Equity, Revenue, Expenses).",
        }
    ]
};


export default function RevisionSummaryPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <Lightbulb className="h-12 w-12 text-primary"/>
                <div>
                    <h1 className="font-headline text-4xl font-bold text-primary">Revision Summary</h1>
                    <p className="text-lg text-muted-foreground mt-1">A summary of your performance and key areas for improvement.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <Card className="border-green-500/30">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-green-500">
                            <BookCheck className="h-6 w-6" />
                            <span>Strengths</span>
                        </CardTitle>
                        <CardDescription>
                            These are the topics you've mastered. Well done!
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {revisionTopics.strengths.map(topic => (
                             <div key={topic.title} className="p-4 rounded-lg bg-green-500/5">
                                <h3 className="font-semibold">{topic.title}</h3>
                                <p className="text-sm text-muted-foreground">{topic.description}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                 <Card className="border-red-500/30">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-red-500">
                            <AlertTriangle className="h-6 w-6" />
                            <span>Areas for Improvement</span>
                        </CardTitle>
                        <CardDescription>
                            Focus your revision on these topics to boost your score.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {revisionTopics.weaknesses.map(topic => (
                            <div key={topic.title} className="p-4 rounded-lg bg-red-500/5">
                                <h3 className="font-semibold">{topic.title}</h3>
                                <p className="text-sm text-muted-foreground">{topic.description}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
