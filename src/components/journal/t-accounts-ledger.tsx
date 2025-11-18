'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, XCircle, PlusCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

type LedgerEntry = {
    id: number;
    date: string;
    accountName: string;
    amount: number;
};

type LedgerSide = {
    entries: LedgerEntry[];
};

type TAccount = {
    id: number;
    name: string;
    debits: LedgerSide;
    credits: LedgerSide;
};

type SolutionLedger = {
    [account: string]: {
        debits: number[];
        credits: number[];
    };
};

type TAccountsLedgerProps = {
    initialAccounts: string[];
    solution: SolutionLedger;
};

const createEmptyEntry = (): LedgerEntry => ({ id: Date.now(), date: '', accountName: '', amount: 0 });

export function TAccountsLedger({ initialAccounts, solution }: TAccountsLedgerProps) {
    const createEmptyTAccount = (id: number, name = ''): TAccount => ({
        id,
        name,
        debits: { entries: [createEmptyEntry()] },
        credits: { entries: [createEmptyEntry()] },
    });

    const [accounts, setAccounts] = useState<TAccount[]>(() => 
        Array.from({ length: 9 }, (_, i) => createEmptyTAccount(i + 1))
    );
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const handleAccountNameChange = (id: number, newName: string) => {
        setAccounts(prevAccounts =>
            prevAccounts.map(acc => (acc.id === id ? { ...acc, name: newName } : acc))
        );
    };

    const handleEntryChange = (
        accountId: number,
        side: 'debits' | 'credits',
        entryIndex: number,
        field: keyof Omit<LedgerEntry, 'id'>,
        value: string | number
    ) => {
        setAccounts(prevAccounts =>
            prevAccounts.map(acc => {
                if (acc.id === accountId) {
                    const newEntries = [...acc[side].entries];
                    const entryToUpdate = { ...newEntries[entryIndex] };

                    if (field === 'amount') {
                        const numericValue = parseFloat(value as string);
                        entryToUpdate.amount = isNaN(numericValue) ? 0 : numericValue;
                    } else {
                        (entryToUpdate[field] as string) = value as string;
                    }
                    
                    newEntries[entryIndex] = entryToUpdate;

                    if (entryIndex === newEntries.length - 1 && (entryToUpdate.amount !== 0 || entryToUpdate.date || entryToUpdate.accountName)) {
                        newEntries.push(createEmptyEntry());
                    }

                    return { ...acc, [side]: { entries: newEntries } };
                }
                return acc;
            })
        );
    };

    const addAccount = () => {
        setAccounts(prev => [...prev, createEmptyTAccount(Date.now())]);
    };

    const calculateTotal = (entries: LedgerEntry[]) => {
        return entries.reduce((sum, current) => sum + (current.amount || 0), 0).toFixed(2);
    };

    const handleSubmit = () => {
        const userLedger: SolutionLedger = {};
        let totalDebits = 0;
        let totalCredits = 0;

        accounts.forEach(acc => {
            if (acc.name.trim()) {
                const debits = acc.debits.entries.filter(e => e.amount > 0).map(e => e.amount);
                const credits = acc.credits.entries.filter(e => e.amount > 0).map(e => e.amount);
                userLedger[acc.name.trim().toLowerCase()] = { debits, credits };
                totalDebits += debits.reduce((s, v) => s + v, 0);
                totalCredits += credits.reduce((s, v) => s + v, 0);
            }
        });
        
        if (totalDebits.toFixed(2) !== totalCredits.toFixed(2)) {
             setFeedback({ type: 'error', message: 'The ledger is not balanced. Total debits must equal total credits.' });
             return;
        }

        const solutionTotalDebits = Object.values(solution).flatMap(acc => acc.debits).reduce((s,v) => s+v, 0);
        const solutionTotalCredits = Object.values(solution).flatMap(acc => acc.credits).reduce((s,v) => s+v, 0);

        if (totalDebits.toFixed(2) !== solutionTotalDebits.toFixed(2) || totalCredits.toFixed(2) !== solutionTotalCredits.toFixed(2)) {
            setFeedback({ type: 'error', message: 'The total debits and credits do not match the solution. Please review your entries.' });
            return;
        }

        const normalizedSolution: SolutionLedger = {};
        Object.keys(solution).forEach(key => {
            normalizedSolution[key.toLowerCase()] = {
                debits: solution[key].debits.filter(d => d > 0).sort(),
                credits: solution[key].credits.filter(c => c > 0).sort(),
            }
        });

        let isCorrect = true;
        const userAccountKeys = Object.keys(userLedger);
        const solutionAccountKeys = Object.keys(normalizedSolution);

        if (userAccountKeys.length !== solutionAccountKeys.length) {
            isCorrect = false;
        } else {
            const matchedSolutionKeys = new Set();
            for (const userKey of userAccountKeys) {
                const userAccount = {
                    debits: userLedger[userKey].debits.sort(),
                    credits: userLedger[userKey].credits.sort()
                };

                const foundMatch = solutionAccountKeys.some(solutionKey => {
                    if (matchedSolutionKeys.has(solutionKey)) return false;

                    const solutionAccount = normalizedSolution[solutionKey];
                    if (JSON.stringify(userAccount.debits) === JSON.stringify(solutionAccount.debits) &&
                        JSON.stringify(userAccount.credits) === JSON.stringify(solutionAccount.credits)) {
                        matchedSolutionKeys.add(solutionKey);
                        return true;
                    }
                    return false;
                });

                if (!foundMatch) {
                    isCorrect = false;
                    break;
                }
            }
             if(matchedSolutionKeys.size !== solutionAccountKeys.length) isCorrect = false;
        }


        if (isCorrect) {
            setFeedback({ type: 'success', message: 'Correct! All accounts are posted perfectly.' });
        } else {
            setFeedback({ type: 'error', message: 'Some entries are incorrect. Please review your T-accounts.' });
        }
    };

    const renderSide = (accountId: number, side: 'debits' | 'credits') => (
        <div className="p-2">
            <div className="grid grid-cols-3 gap-1 mb-1 text-xs text-muted-foreground text-center">
                <span>Date</span>
                <span>Account</span>
                <span className="text-right pr-2">Amount</span>
            </div>
            {accounts.find(acc => acc.id === accountId)?.[side].entries.map((entry, index) => {
                const isLast = index === accounts.find(acc => acc.id === accountId)![side].entries.length - 1;
                return (
                    <div key={entry.id} className="grid grid-cols-3 gap-1 mb-1 items-center">
                        <Input
                            type="text"
                            placeholder="Jan 1"
                            className="h-8 text-xs"
                            value={entry.date}
                            onChange={(e) => handleEntryChange(accountId, side, index, 'date', e.target.value)}
                        />
                         <Input
                            type="text"
                            placeholder="e.g. Cash"
                            className="h-8 text-xs"
                            value={entry.accountName}
                            onChange={(e) => handleEntryChange(accountId, side, index, 'accountName', e.target.value)}
                        />
                        <Input
                            type="number"
                            placeholder="0.00"
                            className="text-right h-8 text-xs"
                            value={entry.amount === 0 && !isLast ? '' : entry.amount}
                            onChange={(e) => handleEntryChange(accountId, side, index, 'amount', e.target.value)}
                        />
                    </div>
                );
            })}
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accounts.map(account => (
                    <div key={account.id} className="border rounded-lg shadow-sm">
                        <div className="p-2 bg-secondary/50 rounded-t-lg">
                            <Input
                                placeholder="Account Name"
                                className="font-semibold text-center border-0 bg-transparent h-8 focus-visible:ring-1 focus-visible:ring-ring"
                                value={account.name}
                                onChange={(e) => handleAccountNameChange(account.id, e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="border-r">
                                <p className="text-xs text-muted-foreground text-center p-2 border-b">Debit</p>
                                {renderSide(account.id, 'debits')}
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground text-center p-2 border-b">Credit</p>
                                {renderSide(account.id, 'credits')}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 border-t mt-1">
                            <div className="p-2 border-r text-right font-bold text-sm">{calculateTotal(account.debits.entries)}</div>
                            <div className="p-2 text-right font-bold text-sm">{calculateTotal(account.credits.entries)}</div>
                        </div>
                    </div>
                ))}
            </div>

            <Separator />
            
            <div className="flex items-center justify-between">
                 <Button variant="outline" onClick={addAccount}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Account
                </Button>
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
