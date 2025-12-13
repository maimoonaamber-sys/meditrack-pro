
'use client';

import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileQuestion, Search } from 'lucide-react';

export function SymptomFinder() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const symptoms = inputRef.current?.value;
    if (symptoms) {
      const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(symptoms)}`;
      window.open(googleUrl, '_blank');
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <FileQuestion className="h-6 w-6" />
          <div className="flex-1">
            <CardTitle className="font-headline text-lg">Symptom Finder</CardTitle>
            <CardDescription>
              Enter your symptoms to search for information on Google.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <form onSubmit={handleSearch}>
        <CardContent>
          <div className="space-y-1.5">
            <Label htmlFor="symptoms">Symptoms</Label>
            <Input id="symptoms" placeholder="e.g., headache, sore throat" ref={inputRef} />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            <Search />
            Search on Google
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
