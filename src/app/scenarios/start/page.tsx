'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TAccountsLedger } from '@/components/journal/t-accounts-ledger';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const initialScenario = {
    transactions: [
        { date: "Jan 1", description: "Started business with $100,000 cash, which was deposited into the bank." },
        { date: "Jan 7", description: "Purchases goods for $60,000 in cash." },
        { date: "Jan 9", description: "Purchased a machine on credit from Advance Machinery Company for $12,000." },
        { date: "Jan 15", description: "Paid rent by cash $5,000." },
        { date: "Jan 20", description: "Provided services to a client and received $20,000 cash." },
        { date: "Jan 25", description: "Owner took $2,000 cash for personal use." },
        { date: "Jan 30", description: "Paid Advance Machinery Company in full by cheque." },
    ],
    solution: {
        "Bank": { debits: [{amount: 100000, date: 'Jan 1', account: 'Capital'}], credits: [{amount: 12000, date: 'Jan 30', account: 'Other Payables: Advance Machinery Company'}] },
        "Cash": { debits: [{amount: 20000, date: 'Jan 20', account: 'Commission Revenue'}], credits: [{amount: 60000, date: 'Jan 7', account: 'Purchases'}, {amount: 5000, date: 'Jan 15', account: 'Rent'}, {amount: 2000, date: 'Jan 25', account: 'Drawings'}] },
        "Purchases": { debits: [{amount: 60000, date: 'Jan 7', account: 'Cash'}], credits: [] },
        "Machinery": { debits: [{amount: 12000, date: 'Jan 9', account: 'Other Payables: Advance Machinery Company'}], credits: [] },
        "Other Payables: Advance Machinery Company": { debits: [{amount: 12000, date: 'Jan 30', account: 'Bank'}], credits: [{amount: 12000, date: 'Jan 9', account: 'Machinery'}] },
        "Capital": { debits: [], credits: [{amount: 100000, date: 'Jan 1', account: 'Bank'}] },
        "Rent": { debits: [{amount: 5000, date: 'Jan 15', account: 'Cash'}], credits: [] },
        "Commission Revenue": { debits: [], credits: [{amount: 20000, date: 'Jan 20', account: 'Cash'}] },
        "Drawings": { debits: [{amount: 2000, date: 'Jan 25', account: 'Cash'}], credits: [] },
    }
};

export default function ScenarioStartPage() {
    const [scenario, setScenario] = useState(initialScenario);
    const [key, setKey] = useState(Date.now()); // Used to reset the TAccountsLedger component

    const handleNextQuestion = () => {
        // For now, we will just reset the current scenario.
        // In the future, this will fetch a new scenario.
        setKey(Date.now()); 
    };

    return (
        <div className="container mx-auto py-10 space-y-8">
            <div>
                <h1 className="font-headline text-4xl font-bold text-primary">Scenario: Starting a Small Business</h1>
                <p className="text-lg text-muted-foreground mt-2">Record the following transactions for January in the ledgers below.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Transactions for January</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        {scenario.transactions.map((transaction, index) => (
                            <li key={index}>
                                <span className="font-semibold">{transaction.date}:</span> {transaction.description}
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">General Ledger</CardTitle>
                    <CardDescription>
                        Create T-accounts and enter the amounts for each transaction into the correct side.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <TAccountsLedger key={key} solution={scenario.solution} />
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button onClick={handleNextQuestion}>
                    Next Question <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}