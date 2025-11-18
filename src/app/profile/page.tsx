import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const avatars = [
    { id: 'custom-avatar-1', name: 'Adventurer' },
    { id: 'custom-avatar-2', name: 'Scholar' },
    { id: 'custom-avatar-3', name: 'Wizard' },
    { id: 'custom-avatar-4', name: 'Robot' },
    { id: 'custom-avatar-5', name: 'Ninja' },
    { id: 'custom-avatar-6', name: 'Detective' },
];

export default function ProfilePage() {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="text-center">
                <h1 className="font-headline text-4xl font-bold text-primary">Your Profile</h1>
                <p className="text-lg text-muted-foreground mt-2">Customize your learning identity.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" defaultValue="Ledger Learner" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" defaultValue="learner@ledgerleague.com" />
                            </div>
                            <Button>Save Changes</Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Customize Avatar</CardTitle>
                            <CardDescription>Select an avatar that represents you.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-3 gap-4">
                                {avatars.map(avatarInfo => {
                                    const avatar = PlaceHolderImages.find(p => p.id === avatarInfo.id);
                                    if (!avatar) return null;
                                    return (
                                    <div key={avatar.id} className="flex flex-col items-center gap-2">
                                        <button className={`rounded-full p-1 ring-2 ring-transparent hover:ring-primary focus:ring-primary focus:outline-none ${avatarInfo.name === 'Detective' ? 'ring-primary' : ''}`}>
                                            <Image src={avatar.imageUrl} alt={avatar.description} width={80} height={80} className="rounded-full" data-ai-hint={avatar.imageHint}/>
                                        </button>
                                        <span className="text-xs text-muted-foreground">{avatarInfo.name}</span>
                                    </div>
                                )})}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
