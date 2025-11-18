'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, PlusCircle, CheckCircle, XCircle } from 'lucide-react';

type JournalLine = {
    id: number;
    account: string;
    debit: string;
    credit: string;
};

type AnswerLine = Omit<JournalLine, 'id'>;

type JournalEntryProps = {
    scenario?: string;
    answer?: AnswerLine[];
};

const accounts = [
    'Cash', 'Bank', 'Accounts Receivable', 'Inventory', 'Prepaid Rent', 'Equipment', 'Machinery',
    'Accounts Payable', 'Trade Payables', 'Salaries Payable', 'Unearned Revenue', 'Notes Payable',
    'Capital', 'Drawings',
    'Revenue', 'Commission Revenue',
    'Expenses', 'Rent', 'Salaries Expense', 'Purchases'
];

const defaultAnswer: AnswerLine[] = [
    { account: 'Rent', debit: '1200', credit: '' },
    { account: 'Cash', debit: '', credit: '1200' }
];

export function JournalEntry({ scenario = "The company paid $1,200 for monthly office rent.", answer = defaultAnswer }: JournalEntryProps) {
    const [lines, setLines] = useState<JournalLine[]>([
        { id: 1, account: '', debit: '', credit: '' },
        { id: 2, account: '', debit: '', credit: '' },
    ]);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const handleAddLine = () => {
        setLines([...lines, { id: Date.now(), account: '', debit: '', credit: '' }]);
    };

    const handleRemoveLine = (id: number) => {
        if (lines.length > 2) {
            setLines(lines.filter(line => line.id !== id));
        }
    };

    const handleLineChange = (id: number, field: keyof Omit<JournalLine, 'id'>, value: string) => {
        setLines(lines.map(line => (line.id === id ? { ...line, [field]: value } : line)));
    };

    const handleSubmit = () => {
        const totalDebits = lines.reduce((sum, line) => sum + (parseFloat(line.debit) || 0), 0);
        const totalCredits = lines.reduce((sum, line) => sum + (parseFloat(line.credit) || 0), 0);
        
        if (totalDebits === 0 && totalCredits === 0) {
            setFeedback({ type: 'error', message: "Please enter debit and credit amounts."});
            return;
        }

        if (totalDebits.toFixed(2) !== totalCredits.toFixed(2)) {
            setFeedback({ type: 'error', message: `Debits (${totalDebits.toFixed(2)}) do not equal Credits (${totalCredits.toFixed(2)}).` });
            return;
        }

        if (answer) {
            const userEntry = lines
                .map(({ account, debit, credit }) => ({ account, debit: parseFloat(debit) || 0, credit: parseFloat(credit) || 0 }))
                .filter(l => l.account && (l.debit > 0 || l.credit > 0));

            const correctAnswer = answer
                .map(({ account, debit, credit }) => ({ account, debit: parseFloat(debit) || 0, credit: parseFloat(credit) || 0 }))
                .filter(l => l.account && (l.debit > 0 || l.credit > 0));

            if (userEntry.length !== correctAnswer.length) {
                setFeedback({ type: 'error', message: 'Incorrect number of accounts used. Please review your entry.' });
                return;
            }

            const isCorrect = correctAnswer.every(correctLine => {
                return userEntry.some(userLine =>
                    userLine.account === correctLine.account &&
                    userLine.debit === correctLine.debit &&
                    userLine.credit === correctLine.credit
                );
            });

            if (isCorrect) {
                setFeedback({ type: 'success', message: 'Correct! Transaction recorded successfully.' });
            } else {
                setFeedback({ type: 'error', message: 'The accounts or amounts are incorrect. Please try again.' });
            }
        } else {
             // Fallback for when no answer is provided
            setFeedback({ type: 'success', message: 'Transaction is balanced! Well done.' });
        }
    };

    return (
        <div className="space-y-6">
            <div className="p-4 bg-secondary/50 rounded-lg">
                <p className="font-semibold">Transaction Scenario:</p>
                <p className="text-muted-foreground">{scenario}</p>
            </div>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[40%]">Account</TableHead>
                            <TableHead className="text-right">Debit</TableHead>
                            <TableHead className="text-right">Credit</TableHead>
                            <TableHead className="w-12"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {lines.map(line => (
                            <TableRow key={line.id}>
                                <TableCell>
                                    <Select onValueChange={(value) => handleLineChange(line.id, 'account', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an account" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {accounts.map(acc => <SelectItem key={acc} value={acc}>{acc}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        placeholder="0.00"
                                        className="text-right"
                                        value={line.debit}
                                        onChange={(e) => handleLineChange(line.id, 'debit', e.target.value)}
                                        onFocus={() => handleLineChange(line.id, 'credit', '')}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        placeholder="0.00"
                                        className="text-right"
                                        value={line.credit}
                                        onChange={(e) => handleLineChange(line.id, 'credit', e.target.value)}
                                        onFocus={() => handleLineChange(line.id, 'debit', '')}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="icon" onClick={() => handleRemoveLine(line.id)} disabled={lines.length <= 2}>
                                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between">
                <Button variant="outline" onClick={handleAddLine}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Line
                </Button>
                <Button onClick={handleSubmit}>Submit Entry</Button>
            </div>
            {feedback && (
                <div className={`flex items-center gap-2 p-3 rounded-lg ${feedback.type === 'success' ? 'bg-green-500/10 text-green-700 dark:text-green-400' : 'bg-red-500/10 text-red-700 dark:text-red-400'}`}>
                    {feedback.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                    <p className="font-medium text-sm">{feedback.message}</p>
                </div>
            )}
        </div>
    );
}
