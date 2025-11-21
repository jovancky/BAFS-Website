
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, ArrowUp, ArrowDown, ShoppingCart, Package, Users } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

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

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Understanding Creditors</CardTitle>
                    <CardDescription>Creditors are entities to whom the business owes money. They are divided into two main types.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 text-center">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-2 font-bold text-xl mb-2">
                           <Users className="h-6 w-6 text-primary"/>
                           <span>Creditors</span>
                        </div>
                        <div className="w-px h-8 bg-border"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                         {/* Connecting line */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-border -translate-y-12"></div>
                        <div className="hidden md:block absolute top-1/2 left-1/2 w-px h-8 bg-border -translate-x-1/2 -translate-y-12"></div>
                       
                        {/* Trade Creditors */}
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative">
                               <div className="absolute -top-4 left-1/2 w-px h-4 bg-border -translate-x-1/2 md:hidden"></div>
                                <h3 className="font-semibold text-lg text-primary">Trade Creditors</h3>
                            </div>
                             <div className="flex flex-col gap-2 p-4 rounded-lg border bg-secondary/50 text-left w-full">
                                <div className="flex items-center gap-3">
                                    <ShoppingCart className="h-6 w-6 text-primary" />
                                    <h4 className="font-semibold">Trade Payables</h4>
                                </div>
                                <p className="text-sm text-muted-foreground">Arises from the purchase of goods on credit (e.g., buying inventory from a supplier).</p>
                            </div>
                        </div>

                         {/* Non-Trade Creditors */}
                        <div className="flex flex-col items-center gap-4">
                             <div className="relative">
                               <div className="absolute -top-4 left-1/2 w-px h-4 bg-border -translate-x-1/2 md:hidden"></div>
                                <h3 className="font-semibold text-lg text-primary">Non-Trade Creditors</h3>
                            </div>
                           <div className="flex flex-col gap-2 p-4 rounded-lg border bg-secondary/50 text-left w-full">
                                <div className="flex items-center gap-3">
                                    <Package className="h-6 w-6 text-primary" />
                                    <h4 className="font-semibold">Other Payables</h4>
                                </div>
                                <p className="text-sm text-muted-foreground">Arises from transactions other than purchasing goods (e.g., buying equipment on credit, unpaid expenses).</p>
                            </div>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}
