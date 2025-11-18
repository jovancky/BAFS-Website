import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase, Building2, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

const scenarios = [
    {
        title: 'Starting a Small Business',
        description: 'Navigate the initial financial steps of launching a new coffee shop.',
        icon: Briefcase,
        tags: ['Beginner', 'Equity', 'Assets'],
        link: '#'
    },
    {
        title: 'Inventory Purchase and Sale',
        description: 'Manage inventory for a retail store, from purchase to sale.',
        icon: ShoppingCart,
        tags: ['Intermediate', 'COGS', 'Revenue'],
        link: '#'
    },
    {
        title: 'Handling Depreciation',
        description: 'Learn how to account for the depreciation of long-term assets.',
        icon: Building2,
        tags: ['Advanced', 'Depreciation', 'Expenses'],
        link: '#'
    }
];

export default function ScenariosPage() {
    return (
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="font-headline text-4xl font-bold text-primary">Real-World Scenarios</h1>
                <p className="text-lg text-muted-foreground mt-2">Apply your knowledge in realistic business situations.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {scenarios.map((scenario) => (
                    <Card key={scenario.title} className="flex flex-col">
                        <CardHeader className="flex-row items-start gap-4 space-y-0">
                           <div className="p-3 bg-primary/10 rounded-lg">
                             <scenario.icon className="w-6 h-6 text-primary" />
                           </div>
                           <div>
                            <CardTitle>{scenario.title}</CardTitle>
                            <CardDescription>{scenario.description}</CardDescription>
                           </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                             <div className="flex gap-2">
                                {scenario.tags.map(tag => (
                                    <span key={tag} className="px-2 py-1 text-xs bg-secondary rounded-full">{tag}</span>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Link href={scenario.link} className="w-full">
                                <Button className="w-full">
                                    Start Scenario <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
