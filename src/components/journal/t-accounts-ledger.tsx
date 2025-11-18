'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, XCircle, PlusCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


type LedgerEntry = {
    id: number;
    date: string;
    accountName: string;
    amount: number;
};

type SolutionEntry = {
    amount: number;
    date: string;
    account: string;
}

type TAccount = {
    id: number;
    name: string;
    debits: LedgerEntry[];
    credits: LedgerEntry[];
};

type SolutionLedger = {
    [account: string]: {
        debits: SolutionEntry[];
        credits: SolutionEntry[];
    };
};

type TAccountsLedgerProps = {
    solution: SolutionLedger;
    onLedgerSubmit: (isCorrect: boolean) => void;
};

type ErrorState = {
    accounts?: { [id: number]: string | undefined };
    entries?: { [entryId: number]: { amount?: boolean, general?: boolean } };
    general?: string;
    score?: { user: number, total: number };
};

const createEmptyEntry = (): LedgerEntry => ({ id: Date.now() + Math.random(), date: '', accountName: '', amount: 0 });

const SolutionDisplay = ({ solution }: { solution: SolutionLedger }) => {
    const calculateTotal = (entries: SolutionEntry[]) => entries.reduce((sum, current) => sum + current.amount, 0).toFixed(2);

    return (
        <Card className="mt-6 bg-green-500/5 border-green-500/20">
            <CardHeader>
                <CardTitle className="text-green-500 flex items-center gap-2">
                    <CheckCircle />
                    Correct Solution
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 gap-6">
                    {Object.entries(solution).map(([accountName, accountData]) => (
                        <div key={accountName} className="border rounded-lg bg-background shadow-sm">
                            <div className="p-2 bg-secondary/50 rounded-t-lg">
                                <p className="font-semibold text-center">{accountName}</p>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="border-r p-2">
                                    <p className="text-xs text-muted-foreground text-center p-2 border-b">Debit</p>
                                     <div className="grid grid-cols-3 gap-1 mb-1 text-xs text-muted-foreground text-center">
                                        <span>Date</span>
                                        <span>Account</span>
                                        <span className="text-right pr-2">Amount</span>
                                    </div>
                                    {accountData.debits.filter(entry => entry.amount > 0).map((entry, i) => (
                                        <div key={i} className="grid grid-cols-3 gap-1 text-sm py-1">
                                            <span className="text-center">{entry.date}</span>
                                            <span className="text-center">{entry.account}</span>
                                            <span className="text-right pr-2">{entry.amount.toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-2">
                                    <p className="text-xs text-muted-foreground text-center p-2 border-b">Credit</p>
                                    <div className="grid grid-cols-3 gap-1 mb-1 text-xs text-muted-foreground text-center">
                                        <span>Date</span>
                                        <span>Account</span>
                                        <span className="text-right pr-2">Amount</span>
                                    </div>
                                     {accountData.credits.filter(entry => entry.amount > 0).map((entry, i) => (
                                        <div key={i} className="grid grid-cols-3 gap-1 text-sm py-1">
                                            <span className="text-center">{entry.date}</span>
                                            <span className="text-center">{entry.account}</span>
                                            <span className="text-right pr-2">{entry.amount.toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 border-t mt-1">
                                <div className="p-2 border-r text-right font-bold text-sm">{calculateTotal(accountData.debits)}</div>
                                <div className="p-2 text-right font-bold text-sm">{calculateTotal(accountData.credits)}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};


export function TAccountsLedger({ solution, onLedgerSubmit }: TAccountsLedgerProps) {
    const createEmptyTAccount = (id: number, name = ''): TAccount => ({
        id,
        name,
        debits: [createEmptyEntry()],
        credits: [createEmptyEntry()],
    });

    const [accounts, setAccounts] = useState<TAccount[]>(() =>
        Array.from({ length: 1 }, (_, i) => createEmptyTAccount(i + 1))
    );
    const [errors, setErrors] = useState<ErrorState>({});
    const [showSolution, setShowSolution] = useState(false);

    const handleAccountNameChange = (id: number, newName: string) => {
        setAccounts(prevAccounts =>
            prevAccounts.map(acc => (acc.id === id ? { ...acc, name: newName } : acc))
        );
        // Clear errors on change
        if(errors.accounts?.[id]) {
            const newErrors = {...errors};
            if(newErrors.accounts) delete newErrors.accounts[id];
            setErrors(newErrors);
        }
        setShowSolution(false);
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
                    const newSideEntries = [...acc[side]];
                    const entryToUpdate = { ...newSideEntries[entryIndex] };

                    if (field === 'amount') {
                        const numericValue = parseFloat(value as string);
                        entryToUpdate.amount = isNaN(numericValue) ? 0 : numericValue;
                    } else {
                        (entryToUpdate[field] as string) = value as string;
                    }
                    
                    newSideEntries[entryIndex] = entryToUpdate;

                    if (entryIndex === newSideEntries.length - 1 && (entryToUpdate.amount !== 0 || entryToUpdate.date || entryToUpdate.accountName)) {
                        newSideEntries.push(createEmptyEntry());
                    }

                    return { ...acc, [side]: newSideEntries };
                }
                return acc;
            })
        );

         // Clear errors on change
        const entryId = accounts.find(a => a.id === accountId)?.[side][entryIndex].id;
        if(entryId && errors.entries?.[entryId]) {
            const newErrors = {...errors};
            if(newErrors.entries) delete newErrors.entries[entryId];
            setErrors(newErrors);
        }
        setShowSolution(false);
    };

    const addAccount = () => {
        setAccounts(prev => [...prev, createEmptyTAccount(Date.now())]);
    };

    const calculateTotal = (entries: LedgerEntry[]) => {
        return entries.reduce((sum, current) => sum + (current.amount || 0), 0).toFixed(2);
    };

    const handleSubmit = () => {
        setErrors({});
        setShowSolution(false);
        let newErrors: ErrorState = { accounts: {}, entries: {} };
        let userScore = 0;

        const userLedger: { [accountName: string]: TAccount } = {};
        let totalDebits = 0;
        let totalCredits = 0;

        const accountAliases: {[key: string]: string[]} = {
            'trade payables: tech supplies inc.': ['accounts payable: tech supplies inc.'],
            'trade receivables: the gadget hub': ['accounts receivable: the gadget hub'],
            'other payables: advance machinery company': ['accounts payable: advance machinery company', 'non-trade payables: advance machinery company', 'accounts payable'],
        };

        const getCanonicalName = (name: string) => {
            const lowerName = name.trim().toLowerCase();
            for (const canonical in accountAliases) {
                if (accountAliases[canonical].includes(lowerName) || canonical === lowerName) {
                    return canonical;
                }
            }
            return lowerName;
        };
        

        accounts.forEach(acc => {
            if (acc.name.trim()) {
                const canonicalName = getCanonicalName(acc.name);
                userLedger[canonicalName] = acc;
                totalDebits += acc.debits.reduce((s, e) => s + e.amount, 0);
                totalCredits += acc.credits.reduce((s, e) => s + e.amount, 0);
            }
        });
        
        // Sum of all correct debit/credit values + one point for each correct account
        const solutionTotalValue = Object.values(solution).reduce((sum, acc) => {
            const debitsSum = acc.debits.reduce((s, v) => s + v.amount, 0);
            const creditsSum = acc.credits.reduce((s, v) => s + v.amount, 0);
            return sum + debitsSum + creditsSum;
        }, 0);
        const totalMarks = Object.keys(solution).length + solutionTotalValue;


        if (totalDebits.toFixed(2) !== totalCredits.toFixed(2)) {
             newErrors.general = `The ledger is not balanced. Total Debits ($${totalDebits.toFixed(2)}) do not equal Total Credits ($${totalCredits.toFixed(2)}).`;
        }
        else if (totalDebits.toFixed(2) !== Object.values(solution).flatMap(acc => acc.debits).reduce((s, v) => s + v.amount, 0).toFixed(2)) {
            const solutionTotalDebits = Object.values(solution).flatMap(acc => acc.debits).reduce((s, v) => s + v.amount, 0);
            newErrors.general = `The total debits and credits ($${totalDebits.toFixed(2)}) do not match the correct total of $${solutionTotalDebits.toFixed(2)}. Please review your entries.`;
        }

        type NormalizedSolution = {
            [account: string]: {
                debits: {amount: number}[],
                credits: {amount: number}[]
            }
        }
        const normalizedSolution: NormalizedSolution = {};
        Object.keys(solution).forEach(key => {
            normalizedSolution[getCanonicalName(key)] = {
                debits: solution[key].debits.filter(d => d.amount > 0).map(d => ({amount: d.amount})).sort((a,b) => a.amount-b.amount),
                credits: solution[key].credits.filter(c => c.amount > 0).map(c => ({amount: c.amount})).sort((a,b) => a.amount-b.amount),
            }
        });

        const userAccountKeys = Object.keys(userLedger);
        const solutionAccountKeys = Object.keys(normalizedSolution);
        
        let correctAccountsValue = 0;
        let correctDebitsValue = 0;
        let correctCreditsValue = 0;

        solutionAccountKeys.forEach(solKey => {
            if(userLedger[solKey]) {
                correctAccountsValue++;
                const userAccount = userLedger[solKey];
                const solutionAccount = normalizedSolution[solKey];

                const userDebits = userAccount.debits.map(d => d.amount).filter(d => d > 0).sort((a,b) => a-b);
                const solutionDebitAmounts = solutionAccount.debits.map(d => d.amount);

                if (JSON.stringify(userDebits) === JSON.stringify(solutionDebitAmounts)) {
                    correctDebitsValue += solutionDebitAmounts.reduce((s,v) => s + v, 0);
                } else {
                    userAccount.debits.forEach(entry => {
                         if(entry.amount > 0 && !solutionDebitAmounts.includes(entry.amount)) {
                             if(newErrors.entries) newErrors.entries[entry.id] = { amount: true };
                         }
                    })
                }

                const userCredits = userAccount.credits.map(c => c.amount).filter(c => c > 0).sort((a,b) => a-b);
                const solutionCreditAmounts = solutionAccount.credits.map(c => c.amount);

                if (JSON.stringify(userCredits) === JSON.stringify(solutionCreditAmounts)) {
                    correctCreditsValue += solutionCreditAmounts.reduce((s, v) => s + v, 0);
                } else {
                     userAccount.credits.forEach(entry => {
                         if(entry.amount > 0 && !solutionCreditAmounts.includes(entry.amount)) {
                             if(newErrors.entries) newErrors.entries[entry.id] = { amount: true };
                         }
                    })
                }
            }
        });
        
        userAccountKeys.forEach(userKey => {
            if(!normalizedSolution[userKey]){
                const wrongAccount = accounts.find(a => getCanonicalName(a.name) === userKey);
                if (wrongAccount && newErrors.accounts) {
                    newErrors.accounts[wrongAccount.id] = 'Incorrect account or misspelled.';
                }
            }
        });
        
        userScore = correctAccountsValue + correctDebitsValue + correctCreditsValue;
        newErrors.score = { user: userScore, total: totalMarks };
        const isCorrect = !newErrors.general && userScore === totalMarks;

        if(isCorrect) {
            newErrors.general = 'Correct! All accounts are posted perfectly.'
        } else if (!newErrors.general) {
            newErrors.general = 'Some entries are incorrect. Compare with the solution below.'
            setShowSolution(true);
        } else {
            setShowSolution(true);
        }
        
        setErrors(newErrors);
        onLedgerSubmit(isCorrect);
    };

    const renderSide = (accountId: number, side: 'debits' | 'credits') => (
        <div className="p-2">
            <div className="grid grid-cols-3 gap-1 mb-1 text-xs text-muted-foreground text-center">
                <span>Date</span>
                <span>Account</span>
                <span className="text-right pr-2">Amount</span>
            </div>
            {accounts.find(acc => acc.id === accountId)?.[side].map((entry, index) => {
                const isLast = index === accounts.find(acc => acc.id === accountId)![side].length - 1;
                const isFirst = index === 0;
                const hasError = errors.entries?.[entry.id];
                return (
                    <div key={entry.id} className="grid grid-cols-3 gap-1 mb-1 items-center">
                        <Input
                            type="text"
                            placeholder={isFirst ? "Jan 1" : ""}
                            className={cn("h-8 text-xs", hasError?.general && "border-red-500")}
                            value={entry.date}
                            onChange={(e) => handleEntryChange(accountId, side, index, 'date', e.target.value)}
                        />
                         <Input
                            type="text"
                            placeholder={isFirst ? "e.g. Cash" : ""}
                            className={cn("h-8 text-xs", hasError?.general && "border-red-500")}
                            value={entry.accountName}
                            onChange={(e) => handleEntryChange(accountId, side, index, 'accountName', e.target.value)}
                        />
                        <Input
                            type="number"
                            placeholder={isFirst ? "0.00" : ""}
                            className={cn("text-right h-8 text-xs", hasError?.amount && "border-red-500")}
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
            <div className="grid grid-cols-1 gap-6">
                {accounts.map(account => (
                    <div key={account.id} className="border rounded-lg shadow-sm">
                        <div className={cn("p-2 bg-secondary/50 rounded-t-lg", errors.accounts?.[account.id] && "bg-red-500/10")}>
                            <Input
                                placeholder="Account Name"
                                className={cn(
                                    "font-semibold text-center border-0 bg-transparent h-8 focus-visible:ring-1 focus-visible:ring-ring",
                                    errors.accounts?.[account.id] && "border-red-500 ring-red-500 placeholder:text-red-400"
                                    )}
                                value={account.name}
                                onChange={(e) => handleAccountNameChange(account.id, e.target.value)}
                            />
                             {errors.accounts?.[account.id] && <p className="text-xs text-center text-red-500 mt-1">{errors.accounts[account.id]}</p>}
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
                            <div className="p-2 border-r text-right font-bold text-sm">{calculateTotal(account.debits)}</div>
                            <div className="p-2 text-right font-bold text-sm">{calculateTotal(account.credits)}</div>
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
            {errors.general && (
                <div className={`flex items-center gap-2 p-3 rounded-lg ${errors.score?.user === errors.score?.total ? 'bg-green-500/10 text-green-700 dark:text-green-400' : 'bg-red-500/10 text-red-700 dark:text-red-400'}`}>
                    {errors.score?.user === errors.score?.total ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                    <p className="font-medium text-sm">{errors.general}</p>
                </div>
            )}
             {errors.score && (
                <div className="flex items-center justify-center p-4 bg-secondary/50 rounded-lg">
                    <p className="font-bold text-lg">Your Score: <span className="text-primary">{errors.score.user} / {errors.score.total}</span></p>
                </div>
            )}
             {showSolution && <SolutionDisplay solution={solution} />}
        </div>
    );
}