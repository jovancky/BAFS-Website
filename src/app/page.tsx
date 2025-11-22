
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Compass, Layers, Scale, Trophy } from 'lucide-react';
import Link from 'next/link';
import ProgressChart from '@/components/dashboard/progress-chart';
import LeaderboardPreview from '@/components/dashboard/leaderboard-preview';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar-lg');

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="hover:shadow-md transition-shadow">
                  <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                          <BookOpen className="h-6 w-6 text-primary" />
                          <span>Interactive Journal</span>
                      </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">Master debits and credits with real-time feedback.</p>
                    <Button asChild className="w-full">
                      <Link href="/journal">
                          Start Journaling <ArrowRight />
                      </Link>
                    </Button>
                  </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                  <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                          <Compass className="h-6 w-6 text-primary" />
                          <span>Real-world Scenarios</span>
                      </CardTitle>
                  </CardHeader>
                  <CardContent>
                      <p className="text-muted-foreground mb-4">Apply your knowledge to various business situations.</p>
                      <Button asChild className="w-full">
                          <Link href="/scenarios">
                              Explore Scenarios <ArrowRight />
                          </Link>
                      </Button>
                  </CardContent>
              </Card>
               <Card className="hover:shadow-md transition-shadow">
                  <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                          <Scale className="h-6 w-6 text-primary" />
                          <span>Balance Quiz</span>
                      </CardTitle>
                  </CardHeader>
                  <CardContent>
                      <p className="text-muted-foreground mb-4">Test your understanding of T-account balances.</p>
                      <Button asChild className="w-full">
                          <Link href="/balance-quiz">
                              Start Quiz <ArrowRight />
                          </Link>
                      </Button>
                  </CardContent>
              </Card>
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                          <Layers className="h-6 w-6 text-primary" />
                          <span>Flashcards</span>
                      </CardTitle>
                  </CardHeader>
                  <CardContent>
                      <p className="text-muted-foreground mb-4">Quickly review and reinforce key concepts.</p>
                      <Button asChild className="w-full">
                          <Link href="/flashcards">
                              Study Cards <ArrowRight />
                          </Link>
                      </Button>
                  </CardContent>
              </Card>
          </div>
           <Card>
              <CardHeader>
                <CardTitle>Your Monthly Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <ProgressChart />
              </CardContent>
            </Card>
        </div>

        {/* Right Sidebar Column */}
        <div className="space-y-6">
           <LeaderboardPreview />
           <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <Trophy className="h-6 w-6 text-yellow-500" />
                        <span>Achievements</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Coming soon! Earn badges for your progress.</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
