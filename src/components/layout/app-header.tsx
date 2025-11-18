'use client';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, LogOut, Settings } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import Link from 'next/link';
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
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src={userAvatar?.imageUrl} alt={userAvatar?.description || 'User Avatar'} data-ai-hint={userAvatar?.imageHint}/>
              <AvatarFallback>LL</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Ledger Learner</p>
              <p className="text-xs leading-none text-muted-foreground">learner@ledgerleague.com</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/profile"><User className="mr-2 h-4 w-4" /><span>Profile</span></Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="#"><Settings className="mr-2 h-4 w-4" /><span>Settings</span></Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
