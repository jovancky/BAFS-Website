
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import ProgressChart from '@/components/dashboard/progress-chart';
import LeaderboardPreview from '@/components/dashboard/leaderboard-preview';

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      
      <Card className="bg-primary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-primary">Welcome, Let's study.</CardTitle>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ProgressChart />
          </CardContent>
        </Card>
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Daily Challenge</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold">Trial Balance Challenge</h3>
              <p className="text-sm text-muted-foreground mb-4">Balance the books in record time!</p>
              <Button className="w-full">Start Challenge <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </CardContent>
          </Card>
          <Card className="bg-primary/10 border-primary/40">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BrainCircuit className="text-primary"/>
                    <span>Personalized Path</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Your AI Tutor has a new learning path ready for you based on your recent activity.</p>
              <Link href="/tutor" passHref legacyBehavior><Button variant="outline" className="w-full bg-background">View Path <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
         <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Continue Learning</CardTitle>
                <Link href="/scenarios" className="text-sm font-medium text-primary hover:underline">View All</Link>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <div>
                        <h4 className="font-semibold">Scenario: Starting a Business</h4>
                        <p className="text-sm text-muted-foreground">Master the initial transactions of a new venture.</p>
                    </div>
                    <Button variant="ghost" size="icon"><ArrowRight/></Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <div>
                        <h4 className="font-semibold">Quiz: Debits &amp; Credits</h4>
                        <p className="text-sm text-muted-foreground">Test your fundamental knowledge.</p>
                    </div>
                     <Button variant="ghost" size="icon"><ArrowRight/></Button>
                </div>
            </CardContent>
        </Card>
        <LeaderboardPreview />
      </div>
    </div>
  );
}
