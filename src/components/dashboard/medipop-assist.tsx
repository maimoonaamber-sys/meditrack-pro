
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
import { Stethoscope, BrainCircuit } from 'lucide-react';
import { Textarea } from '../ui/textarea';

export function MedipopAssist() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const query = inputRef.current?.value;
    if (query) {
      setIsLoading(true);
      const url = `https://gemini.google.com/q/${encodeURIComponent(query)}`;
      window.open(url, '_blank');
      setIsLoading(false);
      if(inputRef.current) {
        inputRef.current.value = '';
      }
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
        </CardContent>
        <CardFooter className="flex">
          <Button type="submit" className="w-full" disabled={isLoading}>
            <BrainCircuit />
            {isLoading ? 'Redirecting...' : 'Ask Medipop on Gemini'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
