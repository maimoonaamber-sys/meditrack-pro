
'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Stethoscope, BrainCircuit } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '../ui/textarea';

export function MedipopFab() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const query = textareaRef.current?.value;
    if (query) {
      setIsLoading(true);
      const url = `https://gemini.google.com/`;
      window.open(url, '_blank');
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
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
              Ask about your symptoms or a medication on Gemini.
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
            <DialogFooter className="mt-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                <BrainCircuit className="mr-2 h-4 w-4" />
                {isLoading ? 'Redirecting...' : 'Ask Medipop on Gemini'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
