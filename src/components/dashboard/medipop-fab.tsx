
'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Stethoscope, X, BrainCircuit, AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '../ui/textarea';
import { askMedipop, type MedipopOutput } from '@/ai/flows/medipop-flow';
import { Skeleton } from '../ui/skeleton';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';

export function MedipopFab() {
  const [isOpen, setIsOpen] = useState(false);
  const [analysis, setAnalysis] = useState<MedipopOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    const symptoms = textareaRef.current?.value;
    if (symptoms) {
      setIsLoading(true);
      setAnalysis(null);
      try {
        const result = await askMedipop({ query: symptoms });
        setAnalysis(result);
      } catch (e) {
        console.error(e);
        setAnalysis({
          analysis: 'There was an error analyzing your query. Please try again.',
          disclaimer: 'This is not medical advice.',
        });
      }
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setAnalysis(null);
      setIsLoading(false);
    }
    setIsOpen(open);
  }

  return (
    <>
      <Button
        onClick={() => handleOpenChange(true)}
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg"
      >
        <Stethoscope className="h-8 w-8" />
        <span className="sr-only">Open Medipop AI Assist</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
                <Stethoscope /> Medipop (AI Assist)
            </DialogTitle>
            <DialogDescription>
              Ask about your symptoms or a medication.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSearch}>
            <div className="grid gap-4 py-4">
              <Textarea
                placeholder="e.g., 'persistent headache, mild fever' or 'Aspirin'"
                rows={4}
                ref={textareaRef}
                disabled={isLoading}
              />
            </div>

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
                    <h3 className="font-semibold text-foreground mb-2">Medipop's Analysis</h3>
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

            <DialogFooter className="mt-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                <BrainCircuit className="mr-2 h-4 w-4" />
                {isLoading ? 'Medipop is thinking...' : 'Ask Medipop'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
