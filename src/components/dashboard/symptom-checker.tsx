
'use client';

import { useRef, useState } from 'react';
import { Stethoscope, BrainCircuit, AlertTriangle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { askMedico, type MedicoOutput } from '@/ai/flows/medico-flow';
import { Skeleton } from '../ui/skeleton';

export function SymptomChecker() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [analysis, setAnalysis] = useState<MedicoOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    const symptoms = textareaRef.current?.value;
    if (symptoms) {
      setIsLoading(true);
      setAnalysis(null);
      try {
        const result = await askMedico({ query: symptoms, type: 'symptom' });
        setAnalysis(result);
      } catch (e) {
        console.error(e);
        setAnalysis({
          analysis: 'There was an error analyzing your symptoms. Please try again.',
          disclaimer: 'This is not medical advice.',
        });
      }
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Stethoscope className="h-6 w-6" />
          <div className="flex-1">
            <CardTitle className="font-headline">Symptom Checker (AI)</CardTitle>
            <CardDescription>
              Describe your symptoms for analysis by Medico AI.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <form onSubmit={handleSearch}>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="e.g., persistent headache, mild fever, sore throat..."
            rows={4}
            ref={textareaRef}
            disabled={isLoading}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            <BrainCircuit className="mr-2 h-4 w-4" />
            {isLoading ? 'Medico is thinking...' : 'Analyze Symptoms'}
          </Button>

          {isLoading && (
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          )}

          {analysis && (
            <div className="space-y-4 rounded-md border bg-muted/30 p-4">
               <div>
                  <h3 className="font-semibold text-foreground mb-2">Medico&apos;s Analysis</h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{analysis.analysis}</p>
               </div>
               <Alert variant="destructive" className="flex items-start">
                    <AlertTriangle className="h-5 w-5 mt-0.5" />
                    <div className="ml-4">
                        <AlertTitle>Disclaimer</AlertTitle>
                        <AlertDescription>
                           {analysis.disclaimer}
                        </AlertDescription>
                    </div>
                </Alert>
            </div>
          )}
        </CardContent>
      </form>
    </Card>
  );
}
