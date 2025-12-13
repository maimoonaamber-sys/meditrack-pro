
'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Stethoscope, BrainCircuit, AlertTriangle } from 'lucide-react';
import { askMedipop, MedipopOutput } from '@/ai/flows/medipop-flow';
import { Skeleton } from '../ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Textarea } from '../ui/textarea';

export function MedipopAssist() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [info, setInfo] = useState<MedipopOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    const query = inputRef.current?.value;
    if (query) {
      setIsLoading(true);
      setInfo(null);
      try {
        const result = await askMedipop({ query });
        setInfo(result);
      } catch (e) {
        console.error(e);
        setInfo({
          analysis: 'There was an error fetching information. Please try again.',
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
            <CardTitle className="font-headline text-lg">Medipop (AI Assist)</CardTitle>
            <CardDescription>
              Ask about symptoms or medicines.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <form onSubmit={handleSearch}>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="e.g., 'sore throat and headache' or 'Ibuprofen'"
            rows={3}
            ref={inputRef}
            disabled={isLoading}
          />
           {isLoading && (
            <div className="space-y-2 pt-4">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          )}

          {info && (
            <div className="space-y-4 rounded-md border bg-muted/30 p-4 pt-4">
               <div>
                  <h3 className="font-semibold text-foreground mb-2">Medipop's Analysis</h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{info.analysis}</p>
               </div>
               <Alert variant="destructive" className="flex items-start">
                    <AlertTriangle className="h-5 w-5 mt-0.5" />
                    <div className="ml-4">
                        <AlertTitle>Disclaimer</AlertTitle>
                        <AlertDescription>
                           {info.disclaimer}
                        </AlertDescription>
                    </div>
                </Alert>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex">
          <Button type="submit" className="w-full" disabled={isLoading}>
            <BrainCircuit />
            {isLoading ? 'Medipop is thinking...' : 'Ask Medipop'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
