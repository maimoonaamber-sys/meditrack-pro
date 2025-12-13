import { Stethoscope, BrainCircuit } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function SymptomChecker() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Stethoscope className="h-6 w-6" />
          <div className="flex-1">
            <CardTitle className="font-headline">Symptom Checker</CardTitle>
            <CardDescription>Describe your symptoms for analysis</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea placeholder="e.g., persistent headache, mild fever, sore throat..." rows={4} />
        <Button className="w-full">
          <BrainCircuit className="mr-2 h-4 w-4" />
          Analyze Symptoms
        </Button>
        <div className="space-y-2">
            <h3 className="text-sm font-medium">Potential Conditions (Demo)</h3>
            <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Common Flu</Badge>
                <Badge variant="outline">Migraine</Badge>
                <Badge variant="destructive">Strep Throat</Badge>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
