import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LearningPathGenerator from '@/components/tutor/learning-path-generator';
import { BrainCircuit } from 'lucide-react';

export default function TutorPage() {
    return (
        <div className="space-y-6">
             <div className="flex items-center gap-4">
                <BrainCircuit className="h-12 w-12 text-primary"/>
                <div>
                    <h1 className="font-headline text-4xl font-bold text-primary">AI-Powered Tutor</h1>
                    <p className="text-lg text-muted-foreground mt-1">Your personalized path to mastering accounting.</p>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Generate Your Learning Path</CardTitle>
                    <CardDescription>
                        Click the button below to have our AI analyze your performance and create a custom-tailored study plan just for you.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <LearningPathGenerator />
                </CardContent>
            </Card>
        </div>
    );
}
