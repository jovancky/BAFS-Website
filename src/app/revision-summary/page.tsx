import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, ArrowUp, ArrowDown } from 'lucide-react';

export default function RevisionSummaryPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <Lightbulb className="h-12 w-12 text-primary"/>
                <div>
                    <h1 className="font-headline text-4xl font-bold text-primary">Core Principles</h1>
                    <p className="text-lg text-muted-foreground mt-1">Master the fundamental rules of double-entry accounting.</p>
                </div>
            </div>

            <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                    <CardTitle className="text-center font-headline text-2xl tracking-wider">The Accounting Equation</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center text-center">
                    <div className="font-semibold text-lg md:text-xl p-4 rounded-md">
                        <span className="text-blue-400">Assets</span> + <span className="text-red-400">Expenses</span> + <span className="text-orange-400">Drawings</span>
                        <span className="mx-4 text-primary">=</span>
                        <span className="text-purple-400">Capital</span> + <span className="text-green-400">Revenue</span> + <span className="text-yellow-400">Liabilities</span>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <Card className="border-blue-400/30">
                    <CardHeader>
                        <CardTitle className="text-blue-400">Debit Accounts (AED)</CardTitle>
                        <CardDescription>
                           Assets, Expenses, Drawings
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4 p-4 rounded-lg bg-green-500/10">
                            <ArrowUp className="h-6 w-6 text-green-500" />
                            <div>
                                <h3 className="font-semibold text-green-500">To Increase, you Debit.</h3>
                                <p className="text-sm text-muted-foreground">Record an increase in an AED account on the Debit side (left).</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-lg bg-red-500/10">
                            <ArrowDown className="h-6 w-6 text-red-500" />
                            <div>
                                <h3 className="font-semibold text-red-500">To Decrease, you Credit.</h3>
                                <p className="text-sm text-muted-foreground">Record a decrease in an AED account on the Credit side (right).</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                 <Card className="border-purple-400/30">
                    <CardHeader>
                        <CardTitle className="text-purple-400">Credit Accounts (CRL)</CardTitle>
                        <CardDescription>
                            Capital, Revenue, Liabilities
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="flex items-center gap-4 p-4 rounded-lg bg-green-500/10">
                            <ArrowUp className="h-6 w-6 text-green-500" />
                            <div>
                                <h3 className="font-semibold text-green-500">To Increase, you Credit.</h3>
                                <p className="text-sm text-muted-foreground">Record an increase in a CRL account on the Credit side (right).</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-lg bg-red-500/10">
                            <ArrowDown className="h-6 w-6 text-red-500" />
                            <div>
                                <h3 className="font-semibold text-red-500">To Decrease, you Debit.</h3>
                                <p className="text-sm text-muted-foreground">Record a decrease in a CRL account on the Debit side (left).</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
