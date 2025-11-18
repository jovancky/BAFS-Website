import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart, BookOpenCheck, BrainCircuit, Trophy, Star } from 'lucide-react';
import Link from 'next/link';
import ProgressChart from '@/components/dashboard/progress-chart';
import LeaderboardPreview from '@/components/dashboard/leaderboard-preview';

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Points</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,450</div>
            <p className="text-xs text-muted-foreground">+150 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Badges Unlocked</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 / 20</div>
            <p className="text-xs text-muted-foreground">"Assets Ace" unlocked</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Streak</CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.3-.8.8l1.8 8.4.5 2.3L8.7 18l1.8.7.5 2.3 1.8 8.4c.1.5.7.9.8.8l8.4-1.8Z"/><path d="m2.3 2.3 7.9 7.9"/><path d="M13 8a5 5 0 0 0-5-5"/></svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7 Days</div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leaderboard Rank</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#12</div>
            <p className="text-xs text-muted-foreground">Top 10% of learners</p>
          </CardContent>
        </Card>
      </div>

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
