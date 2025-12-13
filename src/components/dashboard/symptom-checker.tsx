
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
import { Stethoscope, Search } from 'lucide-react';
import { Textarea } from '../ui/textarea';

export function SymptomChecker() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const query = inputRef.current?.value;
    if (query) {
      setIsLoading(true);
      const url = `https://www.google.com/search?q=Why am I experiencing ${encodeURIComponent(
        query
      )}, what are the recovery options, and is it dangerous if ignored?`;
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
            <CardTitle className="font-headline text-lg">Symptom Checker</CardTitle>
            <CardDescription>
              Enter symptoms to search for causes and treatments on Google.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <form onSubmit={handleSearch}>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="e.g., 'Headache and fatigue'"
            rows={3}
            ref={inputRef}
            disabled={isLoading}
          />
        </CardContent>
        <CardFooter className="flex">
          <Button type="submit" className="w-full" disabled={isLoading}>
            <Search />
            {isLoading ? 'Searching...' : 'Analyze with Google'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
