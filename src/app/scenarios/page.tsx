
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TAccountsLedger } from '@/components/journal/t-accounts-ledger';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const scenarios = [
    {
        title: "Starting a Small Business",
        businessType: "You have started a new consulting business. The following transactions occurred during the first month. As a service business, any equipment purchased is for internal use, not for resale.",
        transactions: [
            { date: "Jan 1", description: "Started business with $100,000 cash, which was deposited into the bank." },
            { date: "Jan 7", description: "Purchases office supplies for $60,000 in cash." },
            { date: "Jan 9", description: "Purchased an office machine on credit from Advance Machinery Company for $12,000." },
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
    },
    {
        title: "Merchandising Operations",
        businessType: "You run a small electronics store that buys and sells goods. The following transactions occurred in February.",
        transactions: [
            { date: "Feb 1", description: "Purchased goods on credit from Tech Supplies Inc. for $30,000." },
            { date: "Feb 5", description: "Sold goods for $15,000 cash." },
            { date: "Feb 8", description: "Sold goods on credit to 'The Gadget Hub' for $10,000." },
            { date: "Feb 12", description: "The Gadget Hub returned goods worth $1,000." },
            { date: "Feb 16", description: "Paid monthly store rent of $2,500 by cheque." },
            { date: "Feb 20", description: "Returned defective goods worth $2,000 to Tech Supplies Inc." },
            { date: "Feb 25", description: "Received full payment from The Gadget Hub via bank transfer." },
            { date: "Feb 28", description: "Paid Tech Supplies Inc. the amount due by cheque." },
        ],
        solution: {
            "Purchases": { debits: [{ amount: 30000, date: 'Feb 1', account: 'Trade Payables: Tech Supplies Inc.' }], credits: [] },
            "Cash": { debits: [{ amount: 15000, date: 'Feb 5', account: 'Sales' }], credits: [] },
            "Bank": { debits: [{ amount: 9000, date: 'Feb 25', account: 'Trade Receivables: The Gadget Hub' }], credits: [{ amount: 2500, date: 'Feb 16', account: 'Rent' }, { amount: 28000, date: 'Feb 28', account: 'Trade Payables: Tech Supplies Inc.' }] },
            "Sales": { debits: [], credits: [{ amount: 15000, date: 'Feb 5', account: 'Cash' }, { amount: 10000, date: 'Feb 8', account: 'Trade Receivables: The Gadget Hub' }] },
            "Trade Receivables: The Gadget Hub": { debits: [{ amount: 10000, date: 'Feb 8', account: 'Sales' }], credits: [{ amount: 1000, date: 'Feb 12', account: 'Returns Inwards' }, { amount: 9000, date: 'Feb 25', account: 'Bank' }] },
            "Returns Inwards": { debits: [{ amount: 1000, date: 'Feb 12', account: 'Trade Receivables: The Gadget Hub' }], credits: [] },
            "Rent": { debits: [{ amount: 2500, date: 'Feb 16', account: 'Bank' }], credits: [] },
            "Trade Payables: Tech Supplies Inc.": { debits: [{ amount: 2000, date: 'Feb 20', account: 'Returns Outwards' }, { amount: 28000, date: 'Feb 28', account: 'Bank' }], credits: [{ amount: 30000, date: 'Feb 1', account: 'Purchases' }] },
            "Returns Outwards": { debits: [], credits: [{ amount: 2000, date: 'Feb 20', account: 'Trade Payables: Tech Supplies Inc.' }] },
        }
    },
    {
        title: "Service Business: Law Firm",
        businessType: "You are the accountant for a law firm. The firm provides legal services and bills clients. It does not sell any goods.",
        transactions: [
            { date: "Mar 1", description: "Billed a client, 'Innovate Corp', $15,000 for legal services rendered." },
            { date: "Mar 5", description: "Paid monthly salaries of $35,000 by bank transfer." },
            { date: "Mar 10", description: "Received a payment of $10,000 from Innovate Corp." },
            { date: "Mar 15", description: "Purchased new law books for the office library for $3,000 cash. These are considered office equipment." },
            { date: "Mar 20", description: "Paid electricity bill of $1,200 by cheque." },
            { date: "Mar 25", description: "Provided legal advice and received $5,000 cash on the spot." },
            { date: "Mar 31", description: "Received the remaining amount from Innovate Corp." },
        ],
        solution: {
            "Trade Receivables: Innovate Corp": { debits: [{ amount: 15000, date: 'Mar 1', account: 'Legal Fees Revenue' }], credits: [{ amount: 10000, date: 'Mar 10', account: 'Bank' }, { amount: 5000, date: 'Mar 31', account: 'Bank' }] },
            "Legal Fees Revenue": { debits: [], credits: [{ amount: 15000, date: 'Mar 1', account: 'Trade Receivables: Innovate Corp' }, { amount: 5000, date: 'Mar 25', account: 'Cash' }] },
            "Salaries": { debits: [{ amount: 35000, date: 'Mar 5', account: 'Bank' }], credits: [] },
            "Bank": { debits: [{ amount: 10000, date: 'Mar 10', account: 'Trade Receivables: Innovate Corp' }, { amount: 5000, date: 'Mar 31', account: 'Trade Receivables: Innovate Corp' }], credits: [{ amount: 35000, date: 'Mar 5', account: 'Salaries' }, { amount: 1200, date: 'Mar 20', account: 'Electricity' }] },
            "Equipment": { debits: [{ amount: 3000, date: 'Mar 15', account: 'Cash' }], credits: [] },
            "Cash": { debits: [{ amount: 5000, date: 'Mar 25', account: 'Legal Fees Revenue' }], credits: [{ amount: 3000, date: 'Mar 15', account: 'Equipment' }] },
            "Electricity": { debits: [{ amount: 1200, date: 'Mar 20', account: 'Bank' }], credits: [] },
        }
    },
    {
        title: "Retail Operations: Clothing Store",
        businessType: "You manage the finances for a trendy clothing boutique that buys and sells apparel.",
        transactions: [
            { date: "Apr 1", description: "Purchased a new collection of dresses on credit from 'Fashion Forward Co.' for $25,000." },
            { date: "Apr 3", description: "Paid for a one-year insurance policy for $2,400 with a cheque." },
            { date: "Apr 7", description: "Sold clothes for $8,000 cash." },
            { date: "Apr 10", description: "A customer returned a dress purchased for cash and was given a $200 cash refund." },
            { date: "Apr 15", description: "Paid half of the amount owed to Fashion Forward Co. by cheque." },
            { date: "Apr 18", description: "Sold a bulk order of shirts on credit to a local school for $5,000." },
            { date: "Apr 22", description: "The school returned shirts worth $500 as they were the wrong size." },
            { date: "Apr 28", description: "Received full payment from the school." },
        ],
        solution: {
            "Purchases": { debits: [{ amount: 25000, date: 'Apr 1', account: 'Trade Payables: Fashion Forward Co.' }], credits: [] },
            "Prepaid Insurance": { debits: [{ amount: 2400, date: 'Apr 3', account: 'Bank' }], credits: [] },
            "Bank": { debits: [{ amount: 4500, date: 'Apr 28', account: 'Trade Receivables: School' }], credits: [{ amount: 2400, date: 'Apr 3', account: 'Prepaid Insurance' }, { amount: 12500, date: 'Apr 15', account: 'Trade Payables: Fashion Forward Co.' }] },
            "Cash": { debits: [{ amount: 8000, date: 'Apr 7', account: 'Sales' }], credits: [{ amount: 200, date: 'Apr 10', account: 'Returns Inwards' }] },
            "Sales": { debits: [], credits: [{ amount: 8000, date: 'Apr 7', account: 'Cash' }, { amount: 5000, date: 'Apr 18', account: 'Trade Receivables: School' }] },
            "Returns Inwards": { debits: [{ amount: 200, date: 'Apr 10', account: 'Cash' }, { amount: 500, date: 'Apr 22', account: 'Trade Receivables: School' }], credits: [] },
            "Trade Payables: Fashion Forward Co.": { debits: [{ amount: 12500, date: 'Apr 15', account: 'Bank' }], credits: [{ amount: 25000, date: 'Apr 1', account: 'Purchases' }] },
            "Trade Receivables: School": { debits: [{ amount: 5000, date: 'Apr 18', account: 'Sales' }], credits: [{ amount: 500, date: 'Apr 22', account: 'Returns Inwards' }, { amount: 4500, date: 'Apr 28', account: 'Bank' }] },
        }
    }
];

export default function ScenariosPage() {
    const [scenarioIndex, setScenarioIndex] = useState(0);
    const [key, setKey] = useState(Date.now());
    const [submitted, setSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const scenario = scenarios[scenarioIndex];
    const isLastQuestion = scenarioIndex === scenarios.length - 1;

    const handleNextQuestion = () => {
        if (!isLastQuestion) {
            setScenarioIndex((prevIndex) => prevIndex + 1);
            setKey(Date.now()); 
            setSubmitted(false);
            setIsCorrect(false);
        }
    };

    const onLedgerSubmit = (correct: boolean) => {
        setSubmitted(true);
        setIsCorrect(correct);
    };

    return (
        <div className="container mx-auto py-10 space-y-8">
            <div>
                <h1 className="font-headline text-4xl font-bold text-primary">Scenario: {scenario.title}</h1>
                <p className="text-lg text-muted-foreground mt-2">{scenario.businessType}</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Transactions</CardTitle>
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
                    <TAccountsLedger key={key} solution={scenario.solution} onLedgerSubmit={onLedgerSubmit} />
                </CardContent>
            </Card>

            {submitted && (
                 <div className="flex justify-end">
                    {isLastQuestion && isCorrect ? (
                        <Card className="bg-green-500/10 border-green-500/20 p-4 flex flex-col items-center gap-2">
                             <CheckCircle className="h-8 w-8 text-green-500"/>
                            <p className="font-semibold text-green-500">You've completed all scenarios!</p>
                            <Link href="/scenarios" passHref>
                                <Button variant="outline">Back to Scenarios</Button>
                            </Link>
                        </Card>
                    ) : (
                        <Button onClick={handleNextQuestion} disabled={isLastQuestion || !isCorrect}>
                            Next Scenario <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}
