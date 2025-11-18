import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const leaderboardData = [
  { name: 'Alex Johnson', score: 15200, rank: 1, avatarId: 'alex-avatar-sm' },
  { name: 'Maria Garcia', score: 14800, rank: 2, avatarId: 'maria-avatar-sm' },
  { name: 'Chen Wei', score: 14500, rank: 3, avatarId: 'chen-avatar-sm' },
  { name: 'Emily Smith', score: 13900, rank: 4, avatarId: 'emily-avatar-sm' },
  { name: 'Your Rank', score: 12450, rank: 12, avatarId: 'user-avatar-sm', isCurrentUser: true },
];

export default function LeaderboardPreview() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Leaderboard</CardTitle>
        <Link href="/leaderboard" className="text-sm font-medium text-primary hover:underline">View All</Link>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {leaderboardData.map((user) => {
            const avatar = PlaceHolderImages.find(p => p.id === user.avatarId);
            return (
              <div key={user.rank} className={`flex items-center gap-4 p-2 rounded-lg ${user.isCurrentUser ? 'bg-primary/10' : ''}`}>
                <span className={`font-bold text-lg w-6 text-center ${user.rank <= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
                  {user.rank}
                </span>
                <Avatar>
                  <AvatarImage src={avatar?.imageUrl} alt={avatar?.description || user.name} data-ai-hint={avatar?.imageHint} />
                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <span className="font-medium flex-grow">{user.name}</span>
                <span className="font-semibold text-primary">{user.score.toLocaleString()} pts</span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  );
}
