'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, XCircle, PlusCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

type LedgerSide = {
    entries: number[];
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

export function TAccountsLedger({ initialAccounts, solution }: TAccountsLedgerProps) {
    const createEmptyTAccount = (id: number, name = ''): TAccount => ({
        id,
        name,
        debits: { entries: [0] },
        credits: { entries: [0] },
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

    const handleAmountChange = (accountId: number, side: 'debits' | 'credits', entryIndex: number, value: string) => {
        const numericValue = parseFloat(value);
        setAccounts(prevAccounts =>
            prevAccounts.map(acc => {
                if (acc.id === accountId) {
                    const newSide = { ...acc[side] };
                    newSide.entries[entryIndex] = isNaN(numericValue) ? 0 : numericValue;

                    // Add a new empty input if the last one was filled
                    if (entryIndex === newSide.entries.length - 1 && newSide.entries[entryIndex] !== 0) {
                        newSide.entries.push(0);
                    }

                    return { ...acc, [side]: newSide };
                }
                return acc;
            })
        );
    };

    const addAccount = () => {
        setAccounts(prev => [...prev, createEmptyTAccount(Date.now())]);
    };

    const calculateTotal = (entries: number[]) => {
        return entries.reduce((sum, current) => sum + (current || 0), 0).toFixed(2);
    };

    const handleSubmit = () => {
        const userLedger: SolutionLedger = {};
        let totalDebits = 0;
        let totalCredits = 0;

        accounts.forEach(acc => {
            if (acc.name.trim()) {
                const debits = acc.debits.entries.filter(e => e > 0);
                const credits = acc.credits.entries.filter(e => e > 0);
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
                            <div className="p-2 border-r">
                                <p className="text-xs text-muted-foreground text-center mb-1">Debit</p>
                                {account.debits.entries.map((amount, index) => (
                                    <Input
                                        key={index}
                                        type="number"
                                        placeholder="0.00"
                                        className="text-right h-8 mb-1"
                                        value={amount === 0 && account.debits.entries.length > 1 ? '' : amount}
                                        onChange={(e) => handleAmountChange(account.id, 'debits', index, e.target.value)}
                                    />
                                ))}
                            </div>
                            <div className="p-2">
                                <p className="text-xs text-muted-foreground text-center mb-1">Credit</p>
                                {account.credits.entries.map((amount, index) => (
                                    <Input
                                        key={index}
                                        type="number"
                                        placeholder="0.00"
                                        className="text-right h-8 mb-1"
                                        value={amount === 0 && account.credits.entries.length > 1 ? '' : amount}
                                        onChange={(e) => handleAmountChange(account.id, 'credits', index, e.target.value)}
                                    />
                                ))}
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
