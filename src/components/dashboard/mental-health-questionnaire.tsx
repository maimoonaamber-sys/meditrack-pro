
"use client";

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
    <>
      <p className="text-sm text-muted-foreground mb-4">
        Take a few moments for a confidential questionnaire to reflect on your
        current emotional state.
      </p>
      <Button
        className="w-full bg-[hsl(var(--chart-4))] hover:bg-[hsl(var(--chart-4)/0.9)] text-white"
        onClick={handleTakeQuestionnaire}
      >
        Take Questionnaire
      </Button>
    </>
  );
}
