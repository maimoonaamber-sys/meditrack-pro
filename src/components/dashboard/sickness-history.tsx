
"use client";

import { useState, useRef, useEffect } from "react";
import { History, PlusCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';

interface SicknessEntry {
  illness: string;
  duration: string;
  date: string; // Keep as string to be JSON serializable
  medicines: string;
}

export function SicknessHistory() {
  const [history, setHistory] = useState<SicknessEntry[]>([]);
  const illnessRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const durationRef = useRef<HTMLInputElement>(null);
  const medicinesRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem('sicknessHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sicknessHistory', JSON.stringify(history));
  }, [history]);

  const handleAddEntry = (event: React.FormEvent) => {
    event.preventDefault();
    const illness = illnessRef.current?.value;
    const date = dateRef.current?.value;
    const duration = durationRef.current?.value;
    const medicines = medicinesRef.current?.value;

    if (illness && date && duration && medicines) {
      const newEntry: SicknessEntry = {
        illness,
        date: new Date(date).toISOString(), // Store as ISO string
        duration: `${duration} days`,
        medicines,
      };
      setHistory(prevHistory => [...prevHistory, newEntry].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      formRef.current?.reset();
    }
  };


  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <History className="h-6 w-6" />
          <div className="flex-1">
            <CardTitle className="font-headline">Sickness History</CardTitle>
            <CardDescription>Log your past illnesses and treatments.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddEntry} ref={formRef} className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <Label htmlFor="illness">Illness/Symptom</Label>
                    <Input id="illness" placeholder="e.g., Common Cold" ref={illnessRef} />
                </div>
                 <div className="space-y-1.5">
                    <Label htmlFor="sicknessDate">Start Date</Label>
                    <Input id="sicknessDate" type="date" ref={dateRef} />
                </div>
                 <div className="space-y-1.5">
                    <Label htmlFor="duration">Duration (in days)</Label>
                    <Input id="duration" type="number" placeholder="e.g., 7" ref={durationRef} />
                </div>
                <div className="space-y-1.5">
                    <Label htmlFor="medicines">Prescribed Medicines</Label>
                    <Input id="medicines" placeholder="e.g., Paracetamol" ref={medicinesRef} />
                </div>
            </div>
             <Button type="submit" className="w-full">
                <PlusCircle />
                Add Sickness Entry
            </Button>
        </form>

        {history.length > 0 && (
          <ul className="space-y-3">
            {history.map((item, index) => (
              <li key={index} className="flex justify-between items-start text-sm bg-muted/50 p-3 rounded-md">
                <div>
                  <p className="font-medium">{item.illness}</p>
                  <p className="text-muted-foreground text-xs mt-1">Duration: {item.duration}</p>
                  <p className="text-muted-foreground text-xs">Medicines: {item.medicines}</p>
                </div>
                <span className="text-muted-foreground text-xs text-right shrink-0 ml-4">{format(new Date(item.date), 'MMM d, yyyy')}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
