import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TAccountsLedger } from '@/components/journal/t-accounts-ledger';

const transactions = [
    { date: "Jan 1", description: "Started business with $100,000 cash, which was deposited into the bank." },
    { date: "Jan 7", description: "Purchased goods for $60,000 in cash." },
    { date: "Jan 9", description: "Purchased a machine on credit from Advance Machinery Company for $12,000." },
    { date: "Jan 15", description: "Paid rent by cash $5,000." },
    { date: "Jan 20", description: "Provided services to a client and received $20,000 cash." },
    { date: "Jan 25", description: "Owner took $2,000 cash for personal use." },
    { date: "Jan 30", description: "Paid Advance Machinery Company in full by cheque." },
];

const correctLedger = {
    "Bank": { debits: [{amount: 100000, date: 'Jan 1', account: 'Capital'}], credits: [{amount: 12000, date: 'Jan 30', account: 'Accounts Payable'}] },
    "Cash": { debits: [{amount: 20000, date: 'Jan 20', account: 'Commission Revenue'}], credits: [{amount: 60000, date: 'Jan 7', account: 'Purchases'}, {amount: 5000, date: 'Jan 15', account: 'Rent'}, {amount: 2000, date: 'Jan 25', account: 'Drawings'}] },
    "Purchases": { debits: [{amount: 60000, date: 'Jan 7', account: 'Cash'}], credits: [] },
    "Machinery": { debits: [{amount: 12000, date: 'Jan 9', account: 'Accounts Payable'}], credits: [] },
    "Accounts Payable": { debits: [{amount: 12000, date: 'Jan 30', account: 'Bank'}], credits: [{amount: 12000, date: 'Jan 9', account: 'Machinery'}] },
    "Capital": { debits: [], credits: [{amount: 100000, date: 'Jan 1', account: 'Bank'}] },
    "Rent": { debits: [{amount: 5000, date: 'Jan 15', account: 'Cash'}], credits: [] },
    "Commission Revenue": { debits: [], credits: [{amount: 20000, date: 'Jan 20', account: 'Cash'}] },
    "Drawings": { debits: [{amount: 2000, date: 'Jan 25', account: 'Cash'}], credits: [] },
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
                    <TAccountsLedger solution={correctLedger} />
                </CardContent>
            </Card>
        </div>
    );
}
