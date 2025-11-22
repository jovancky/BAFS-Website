
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Compass, Layers, Scale } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const shortcuts = [
  {
    href: '/journal',
    icon: BookOpen,
    title: 'Interactive Journal',
    description: 'Master debits and credits with real-time feedback.',
    pattern: 'bg-blue-500/10',
    color: 'text-blue-500',
  },
  {
    href: '/scenarios',
    icon: Compass,
    title: 'Real-world Scenarios',
    description: 'Apply your knowledge to various business situations.',
    pattern: 'bg-purple-500/10',
    color: 'text-purple-500',
  },
  {
    href: '/balance-quiz',
    icon: Scale,
    title: 'Balance Quiz',
    description: 'Test your understanding of T-account balances.',
    pattern: 'bg-green-500/10',
    color: 'text-green-500',
  },
  {
    href: '/flashcards',
    icon: Layers,
    title: 'Flashcards',
    description: 'Quickly review and reinforce key concepts.',
    pattern: 'bg-yellow-500/10',
    color: 'text-yellow-500',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-4xl font-bold text-primary">Welcome, let's study</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Select an activity below to get started.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {shortcuts.map((shortcut) => (
          <Link href={shortcut.href} key={shortcut.title} legacyBehavior>
            <a className="block h-full">
              <Card className="group h-full transform transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
                <CardContent className={cn("flex h-full flex-col items-center justify-center p-6 text-center", shortcut.pattern)}>
                  <div className={cn("mb-4 rounded-full p-4", shortcut.pattern)}>
                    <shortcut.icon className={cn("h-10 w-10", shortcut.color)} />
                  </div>
                  <h3 className="mb-2 text-lg font-bold">{shortcut.title}</h3>
                  <p className="text-sm text-muted-foreground">{shortcut.description}</p>
                </CardContent>
              </Card>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
