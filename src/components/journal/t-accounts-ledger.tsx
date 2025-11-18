'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, XCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

type Ledger = {
    [account: string]: {
        debits: number[];
        credits: number[];
    };
};

type TAccountsLedgerProps = {
    accounts: string[];
    solution: Ledger;
};

export function TAccountsLedger({ accounts, solution }: TAccountsLedgerProps) {
    const initialLedger = accounts.reduce((acc, account) => {
        acc[account] = { debits: [], credits: [] };
        return acc;
    }, {} as Ledger);

    const [ledger, setLedger] = useState<Ledger>(initialLedger);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const handleAmountChange = (account: string, side: 'debits' | 'credits', index: number, value: string) => {
        const newLedger = { ...ledger };
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue) || value === '') {
            newLedger[account][side][index] = isNaN(numericValue) ? 0 : numericValue;
        }
        
        // Ensure there's always a blank input
        const entries = newLedger[account][side].filter(v => v !== 0 || v === 0 && newLedger[account][side].length === 1);
        if (entries.length === newLedger[account][side].length && entries[entries.length - 1] !== 0){
             newLedger[account][side].push(0);
        }

        setLedger(newLedger);
    };

    const getSideInputs = (account: string, side: 'debits' | 'credits') => {
        const amounts = [...(ledger[account]?.[side] || []), 0].filter((val, index, arr) => val !== 0 || index === arr.length -1);

        return amounts.map((amount, index) => (
            <Input
                key={index}
                type="number"
                placeholder="0.00"
                className="text-right h-8 mb-1"
                value={amount === 0 ? '' : amount}
                onChange={(e) => handleAmountChange(account, side, index, e.target.value)}
            />
        ));
    };

    const calculateTotal = (amounts: number[]) => {
        return amounts.reduce((sum, current) => sum + (current || 0), 0).toFixed(2);
    };

    const handleSubmit = () => {
        let isCorrect = true;
        let totalDebits = 0;
        let totalCredits = 0;

        for (const account of accounts) {
            const userDebits = ledger[account].debits.map(d => d || 0).filter(d => d > 0).sort();
            const userCredits = ledger[account].credits.map(c => c || 0).filter(c => c > 0).sort();
            
            const solutionDebits = (solution[account]?.debits || []).filter(d => d > 0).sort();
            const solutionCredits = (solution[account]?.credits || []).filter(c => c > 0).sort();

            totalDebits += userDebits.reduce((s, v) => s + v, 0);
            totalCredits += userCredits.reduce((s, v) => s + v, 0);

            if (userDebits.length !== solutionDebits.length || userCredits.length !== solutionCredits.length) {
                isCorrect = false;
                continue;
            }

            if (JSON.stringify(userDebits) !== JSON.stringify(solutionDebits) || JSON.stringify(userCredits) !== JSON.stringify(solutionCredits)) {
                isCorrect = false;
            }
        }
        
        if (totalDebits.toFixed(2) !== totalCredits.toFixed(2)) {
             setFeedback({ type: 'error', message: 'The ledger is not balanced. Total debits must equal total credits.' });
             return;
        }

        if (isCorrect) {
            setFeedback({ type: 'success', message: 'Correct! All accounts are posted perfectly.' });
        } else {
            setFeedback({ type: 'error', message: 'Some entries are incorrect. Please review your T-accounts.' });
        }
    };


    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accounts.map(account => (
                    <div key={account} className="border rounded-lg shadow-sm">
                        <h3 className="font-semibold text-center py-2 bg-secondary/50 rounded-t-lg">{account}</h3>
                        <div className="grid grid-cols-2">
                            <div className="p-2 border-r">
                                <p className="text-xs text-muted-foreground text-center mb-1">Debit</p>
                                {getSideInputs(account, 'debits')}
                            </div>
                            <div className="p-2">
                                <p className="text-xs text-muted-foreground text-center mb-1">Credit</p>
                                {getSideInputs(account, 'credits')}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 border-t mt-1">
                             <div className="p-2 border-r text-right font-bold text-sm">{calculateTotal(ledger[account]?.debits || [])}</div>
                             <div className="p-2 text-right font-bold text-sm">{calculateTotal(ledger[account]?.credits || [])}</div>
                        </div>
                    </div>
                ))}
            </div>

            <Separator />
            
            <div className="flex items-center justify-end">
                <Button onClick={handleSubmit}>Submit Ledger</Button>
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
