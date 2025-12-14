
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
import { InfoCard } from "./info-card";

export function MentalHealthQuestionnaire() {
  const { toast } = useToast();

  const handleTakeQuestionnaire = () => {
    toast({
      title: "Feature Coming Soon",
      description: "The mental health questionnaire is not yet implemented.",
    });
  };

  return (
    <InfoCard
      icon={BrainCircuit}
      title="Mental Health Check-in 🧠"
      description="Regularly assessing your mental health is an important part of your
        overall well-being."
    >
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
    </InfoCard>
  );
}
