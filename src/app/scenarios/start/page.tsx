import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TAccountsLedger } from '@/components/journal/t-accounts-ledger';

const transactions = [
    { date: "Jan 1", description: "Started business with $100,000 cash, which was deposited into the bank." },
    { date: "Jan 7", description: "Purchased goods for $60,000 in cash." },
    { date: "Jan 9", description: "Purchased a machine on credit from Advance Machinery Company for $12,000." },
    { date: "Jan 15", description: "Paid rent by cash $5,000." },
    { date: "Jan 20", description: "Provided services to a client and received $20,000 cash." },
    { date: "Jan 25", description: "Owner took $2,000 cash for personal use." },
    { date: "Jan 30", description: "Paid Advance Machinery Company in full." },
];

const initialAccounts = [
    "Bank", "Cash", "Purchases", "Machinery", "Accounts Payable", "Capital", "Rent Expense", "Service Revenue", "Drawings"
];

const correctLedger = {
    "Bank": { debits: [100000], credits: [] },
    "Cash": { debits: [20000], credits: [60000, 5000, 2000, 12000] },
    "Purchases": { debits: [60000], credits: [] },
    "Machinery": { debits: [12000], credits: [] },
    "Accounts Payable": { debits: [12000], credits: [12000] },
    "Capital": { debits: [], credits: [100000] },
    "Rent Expense": { debits: [5000], credits: [] },
    "Service Revenue": { debits: [], credits: [20000] },
    "Drawings": { debits: [2000], credits: [] },
};

export default function ScenarioStartPage() {
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
                        {transactions.map((transaction, index) => (
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
                    <TAccountsLedger initialAccounts={initialAccounts} solution={correctLedger} />
                </CardContent>
            </Card>
        </div>
    );
}
