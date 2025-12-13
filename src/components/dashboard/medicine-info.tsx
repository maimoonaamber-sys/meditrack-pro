
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
import { Pill, Search } from 'lucide-react';
import { Textarea } from '../ui/textarea';

export function MedicineInfo() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const query = inputRef.current?.value;
    if (query) {
      setIsLoading(true);
      const url = `https://www.google.com/search?q=Medication ${encodeURIComponent(
        query
      )}: uses, why it is prescribed, side effects, and overdose information`;
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
          <Pill className="h-6 w-6" />
          <div className="flex-1">
            <CardTitle className="font-headline text-lg">Medicine Information</CardTitle>
            <CardDescription>
              Enter a medicine name to search for its uses and side effects.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <form onSubmit={handleSearch}>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="e.g., 'Aspirin'"
            rows={3}
            ref={inputRef}
            disabled={isLoading}
          />
        </CardContent>
        <CardFooter className="flex">
          <Button type="submit" className="w-full" disabled={isLoading}>
            <Search />
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
