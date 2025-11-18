import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const quizzes = [
  { title: "The Accounting Equation", level: "Beginner", questions: 10, completed: true },
  { title: "Debits and Credits Basics", level: "Beginner", questions: 15, completed: true },
  { title: "Journal Entries Fundamentals", level: "Intermediate", questions: 10, completed: false },
  { title: "T-Accounts and Ledgers", level: "Intermediate", questions: 20, completed: false },
  { title: "Understanding Financial Statements", level: "Advanced", questions: 25, completed: false },
  { title: "Depreciation Methods", level: "Advanced", questions: 15, completed: false },
];

export default function QuizzesPage() {
    return (
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="font-headline text-4xl font-bold text-primary">Quizzes &amp; Flashcards</h1>
                <p className="text-lg text-muted-foreground mt-2">Test your knowledge and reinforce key concepts.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Available Quizzes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {quizzes.map((quiz) => (
                        <div key={quiz.title} className="flex items-center justify-between p-4 rounded-lg border hover:bg-secondary/50 transition-colors">
                            <div>
                                <h3 className="font-semibold text-lg">{quiz.title}</h3>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Badge variant={
                                        quiz.level === "Beginner" ? "secondary" :
                                        quiz.level === "Intermediate" ? "outline" : "default"
                                    }>{quiz.level}</Badge>
                                    <span>{quiz.questions} questions</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                               {quiz.completed && <Badge variant="outline" className="text-green-500 border-green-500">Completed</Badge>}
                                <Link href="#" passHref>
                                    <Button variant={quiz.completed ? "outline" : "default"}>
                                        {quiz.completed ? 'Review' : 'Start Quiz'}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
