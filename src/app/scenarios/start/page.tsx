import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { JournalEntry } from '@/components/journal/journal-entry';

const transactions = [
    { 
        date: "Jan 7", 
        description: "Purchased goods for $60,000 in cash.",
        answer: [
            { account: 'Purchases', debit: '60000', credit: '' },
            { account: 'Cash', debit: '', credit: '60000' }
        ]
    },
    { 
        date: "Jan 9", 
        description: "Purchased a machine on credit from Advance Machinery Company for $12,000.",
        answer: [
            { account: 'Machinery', debit: '12000', credit: '' },
            { account: 'Accounts Payable', debit: '', credit: '12000' }
        ]
    },
];

export default function ScenarioStartPage() {
    return (
        <div className="container mx-auto py-10 space-y-8">
            <div>
                <h1 className="font-headline text-4xl font-bold text-primary">Scenario: Starting a Small Business</h1>
                <p className="text-lg text-muted-foreground mt-2">Record the following transactions in your journal.</p>
            </div>

            {transactions.map((transaction, index) => (
                <Card key={index}>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Transaction {index + 1}: {transaction.date}</CardTitle>
                        <CardDescription>{transaction.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <JournalEntry scenario={transaction.description} answer={transaction.answer} />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
