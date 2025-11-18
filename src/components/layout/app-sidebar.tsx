'use client';

import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { BookOpen, CircleDollarSign, Compass, LayoutDashboard, Trophy, User, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/journal', label: 'Journal Entry', icon: BookOpen },
  { href: '/scenarios', label: 'Scenarios', icon: Compass },
  { href: '/quizzes', label: 'Quizzes', icon: CircleDollarSign },
  { href: '/tutor', label: 'AI Tutor', icon: BrainCircuit },
  { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { href: '/profile', label: 'Profile', icon: User },
];

export default function AppSidebar() {
  const pathname = usePathname();
  
  return (
    <>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 p-2">
            <Trophy className="h-8 w-8 text-primary" />
            <span className="font-headline text-xl font-semibold">LedgerLeague</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref legacyBehavior>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-2">
      </SidebarFooter>
    </>
  );
}
