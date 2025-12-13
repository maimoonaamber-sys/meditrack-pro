
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pill, Search, AlertTriangle } from 'lucide-react';
import { askMedico, MedicoOutput } from '@/ai/flows/medico-flow';
import { Skeleton } from '../ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export function MedicineInfo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [info, setInfo] = useState<MedicoOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    const medicineName = inputRef.current?.value;
    if (medicineName) {
      setIsLoading(true);
      setInfo(null);
      try {
        const result = await askMedico({ query: medicineName, type: 'medicine' });
        setInfo(result);
      } catch (e) {
        console.error(e);
        setInfo({
          analysis: 'There was an error fetching medicine information. Please try again.',
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
          <Pill className="h-6 w-6" />
          <div className="flex-1">
            <CardTitle className="font-headline text-lg">Medicine Assistant (AI)</CardTitle>
            <CardDescription>
              Get information on any medicine from Medico AI.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <form onSubmit={handleSearch}>
        <CardContent className="space-y-4">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="medicineName">Medicine Name</Label>
              <Input
                id="medicineName"
                name="medicineName"
                placeholder="e.g., Paracetamol"
                ref={inputRef}
                disabled={isLoading}
              />
            </div>
          </div>
           {isLoading && (
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          )}

          {info && (
            <div className="space-y-4 rounded-md border bg-muted/30 p-4">
               <div>
                  <h3 className="font-semibold text-foreground mb-2">Medico&apos;s Information</h3>
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
            <Search />
            {isLoading ? 'Medico is searching...' : 'Get Info'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
