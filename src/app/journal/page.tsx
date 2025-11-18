import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { JournalEntry } from '@/components/journal/journal-entry';

export default function JournalPage() {
    return (
        <div className="container mx-auto py-10">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Interactive Journal Entry</CardTitle>
                    <CardDescription>Practice makes perfect. Record the transaction below to test your skills.</CardDescription>
                </CardHeader>
                <CardContent>
                    <JournalEntry />
                </CardContent>
            </Card>
        </div>
    );
}
