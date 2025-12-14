
'use client';

import { BrainCircuit } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function MentalHealthQuestionnaire() {
  const { toast } = useToast();

  const handleTakeQuestionnaire = () => {
    toast({
      title: "Feature Coming Soon",
      description: "The mental health questionnaire is not yet implemented.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <BrainCircuit className="h-6 w-6" />
          <div className="flex-1">
            <CardTitle className="font-headline text-lg">Mental Health Check-in 🧠</CardTitle>
            <CardDescription>
              Regularly assessing your mental health is an important part of your overall well-being.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
            Take a few moments for a confidential questionnaire to reflect on your current emotional state.
        </p>
        <Button className="w-full" onClick={handleTakeQuestionnaire}>
          Take Questionnaire
        </Button>
      </CardContent>
    </Card>
  );
}
