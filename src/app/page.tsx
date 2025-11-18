
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Compass } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      
      <Card className="bg-primary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-primary">Welcome, Let's study.</CardTitle>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <BookOpen className="h-6 w-6 text-primary" />
                    <span>Interactive Journal Entry</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Practice recording transactions with real-time feedback to master the art of debits and credits.</p>
              <Button asChild className="w-full">
                <Link href="/journal">
                    Start Journaling <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <Compass className="h-6 w-6 text-primary" />
                    <span>Real-world Scenarios</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">Apply your knowledge by posting transactions from various business scenarios to the general ledger.</p>
                 <Button asChild className="w-full">
                    <Link href="/scenarios">
                        Explore Scenarios <ArrowRight className="ml-2" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
