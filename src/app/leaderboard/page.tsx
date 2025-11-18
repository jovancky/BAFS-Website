import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Shield, Gem } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const fullLeaderboard = [
    { rank: 1, name: 'Alex Johnson', score: 15200, tier: 'Diamond', avatarId: 'alex-avatar' },
    { rank: 2, name: 'Maria Garcia', score: 14800, tier: 'Diamond', avatarId: 'maria-avatar' },
    { rank: 3, name: 'Chen Wei', score: 14500, tier: 'Diamond', avatarId: 'chen-avatar' },
    { rank: 4, name: 'Emily Smith', score: 13900, tier: 'Platinum', avatarId: 'emily-avatar' },
    { rank: 5, name: 'David Lee', score: 13750, tier: 'Platinum', avatarId: 'david-avatar' },
    { rank: 6, name: 'Fatima Ahmed', score: 13500, tier: 'Platinum', avatarId: 'fatima-avatar' },
    { rank: 7, name: 'Satoshi Tanaka', score: 13200, tier: 'Gold', avatarId: 'satoshi-avatar' },
    { rank: 8, name: 'Chloe Dubois', score: 13100, tier: 'Gold', avatarId: 'chloe-avatar' },
    { rank: 9, name: 'Ben Carter', score: 12950, tier: 'Gold', avatarId: 'ben-avatar' },
    { rank: 10, name: 'Oliva Rodriguez', score: 12800, tier: 'Gold', avatarId: 'oliva-avatar' },
    { rank: 11, name: 'Liam Wilson', score: 12600, tier: 'Silver', avatarId: 'liam-avatar' },
    { rank: 12, name: 'You', score: 12450, tier: 'Silver', avatarId: 'user-avatar-md', isCurrentUser: true },
];

const TierIcon = ({ tier }: { tier: string }) => {
    switch (tier) {
        case 'Diamond': return <Gem className="h-5 w-5 text-blue-400" />;
        case 'Platinum': return <Trophy className="h-5 w-5 text-gray-400" />;
        case 'Gold': return <Trophy className="h-5 w-5 text-yellow-500" />;
        default: return <Shield className="h-5 w-5 text-orange-400" />;
    }
};

export default function LeaderboardPage() {
    return (
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="font-headline text-4xl font-bold text-primary">Leaderboard</h1>
                <p className="text-lg text-muted-foreground mt-2">See how you stack up against other learners.</p>
            </div>
            <Card>
                <CardContent className="p-0">
                    <div className="flex flex-col">
                        {fullLeaderboard.map((user, index) => {
                             const avatar = PlaceHolderImages.find(p => p.id === user.avatarId);
                             return (
                                <div key={user.rank} className={`flex items-center gap-4 p-4 ${user.isCurrentUser ? 'bg-primary/10' : ''} ${index !== fullLeaderboard.length -1 ? 'border-b' : ''}`}>
                                    <span className={`font-bold text-xl w-8 text-center ${user.rank <= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
                                        {user.rank}
                                    </span>
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={avatar?.imageUrl} alt={avatar?.description || user.name} data-ai-hint={avatar?.imageHint} />
                                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-grow">
                                        <p className="font-semibold text-base">{user.name}</p>
                                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                            <TierIcon tier={user.tier} />
                                            <span>{user.tier} Tier</span>
                                        </div>
                                    </div>
                                    <span className="font-bold text-lg text-primary">{user.score.toLocaleString()} pts</span>
                                </div>
                             )
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
