'use client';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSidebar } from '@/components/ui/sidebar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AppHeader() {
  const { isMobile } = useSidebar();
  const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar-lg');
  
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <div className="flex items-center gap-2">
        {isMobile && <SidebarTrigger />}
        <h1 className="font-headline text-2xl font-semibold text-primary">LedgerLeague</h1>
      </div>
      
      <Button variant="ghost" className="relative h-10 w-10 rounded-full">
        <Avatar className="h-10 w-10">
          <AvatarImage src={userAvatar?.imageUrl} alt={userAvatar?.description || 'User Avatar'} data-ai-hint={userAvatar?.imageHint}/>
          <AvatarFallback>LL</AvatarFallback>
        </Avatar>
      </Button>
    </header>
  );
}
