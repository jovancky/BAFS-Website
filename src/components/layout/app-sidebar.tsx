
'use client';

import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { BookOpen, Compass, Trophy, Scale, Lightbulb, Layers } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { href: '/journal', label: 'Journal Entry', icon: BookOpen },
  { href: '/scenarios', label: 'Scenarios', icon: Compass },
  { href: '/balance-quiz', label: 'Balance Quiz', icon: Scale },
  { href: '/flashcards', label: 'Flashcards', icon: Layers },
  { href: '/revision-summary', label: 'Revision Summary', icon: Lightbulb },
];

export default function AppSidebar() {
  const pathname = usePathname();
  
  return (
    <>
      <SidebarHeader className="border-b">
        <Link href="/" className="flex items-center gap-2 p-2">
            <Trophy className="h-8 w-8 text-primary" />
            <span className="font-headline text-xl font-semibold">LedgerLeague</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                href={item.href}
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-2">
      </SidebarFooter>
    </>
  );
}
