import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase } from 'lucide-react';
import Link from 'next/link';

const scenarios = [
    {
        title: 'Starting a Small Business',
        description: 'Navigate the initial financial steps of launching a new venture.',
        icon: Briefcase,
        link: '/scenarios/start'
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
                    <Link href={scenario.link} key={scenario.title} className="block hover:bg-card/95 rounded-lg border bg-card text-card-foreground shadow-sm transition-colors">
                        <Card className="flex flex-col h-full border-0 shadow-none">
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
                            </CardContent>
                            <CardFooter>
                                <div className="flex items-center text-sm font-medium text-primary w-full">
                                    Start Scenario <ArrowRight className="ml-2 h-4 w-4" />
                                </div>
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
