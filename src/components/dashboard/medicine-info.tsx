
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
import { PillIcon, Search } from 'lucide-react';

export function MedicineInfo() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const medicine = inputRef.current?.value;
    if (medicine) {
      const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(medicine + ' uses and formula')}`;
      window.open(googleUrl, '_blank');
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <PillIcon className="h-6 w-6" />
          <div className="flex-1">
            <CardTitle className="font-headline text-lg">Medicine Information</CardTitle>
            <CardDescription>
              Enter a medicine name to get its details from Google.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <form onSubmit={handleSearch}>
        <CardContent>
          <div className="space-y-1.5">
            <Label htmlFor="medicine">Medicine Name</Label>
            <Input id="medicine" placeholder="e.g., Ibuprofen" ref={inputRef} />
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
