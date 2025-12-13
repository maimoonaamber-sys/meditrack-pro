
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClipboardPlus, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Medication {
  name: string;
  frequency: string;
  nextDose: number;
}

function Countdown({ nextDose }: { nextDose: number }) {
  const [timeLeft, setTimeLeft] = useState(nextDose - Date.now());

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      const newTimeLeft = nextDose - Date.now();
      if (newTimeLeft <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
      } else {
        setTimeLeft(newTimeLeft);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [nextDose, timeLeft]);

  if (timeLeft <= 0) {
    return <Badge variant="destructive">Time for dose!</Badge>;
  }

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <span className="text-sm font-mono text-muted-foreground">
      {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </span>
  );
}

export function CurrentMedications() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const frequencyInputRef = useRef<HTMLInputElement>(null);
  const nextDoseTimeRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const savedMedications = localStorage.getItem('medications');
    if (savedMedications) {
      setMedications(JSON.parse(savedMedications));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('medications', JSON.stringify(medications));
  }, [medications]);


  const handleAddMedication = (event: React.FormEvent) => {
    event.preventDefault();
    const name = nameInputRef.current?.value;
    const frequency = frequencyInputRef.current?.value;
    const nextDoseTime = nextDoseTimeRef.current?.value; // e.g., "14:30"

    if (name && frequency && nextDoseTime) {
      const [hours, minutes] = nextDoseTime.split(':').map(Number);
      const nextDoseDate = new Date();
      nextDoseDate.setHours(hours, minutes, 0, 0);

      // If the time is in the past for today, set it for tomorrow
      if (nextDoseDate.getTime() < Date.now()) {
        nextDoseDate.setDate(nextDoseDate.getDate() + 1);
      }

      setMedications([
        ...medications,
        { name, frequency: `${frequency} time(s) a day`, nextDose: nextDoseDate.getTime() },
      ]);
      formRef.current?.reset();
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <ClipboardPlus className="h-6 w-6" />
          <div className="flex-1">
            <CardTitle className="font-headline text-lg">Current Medications</CardTitle>
            <CardDescription>
              Add and manage your daily medications.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <form onSubmit={handleAddMedication} ref={formRef}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="medicationName">Medicine Name</Label>
              <Input id="medicationName" placeholder="e.g., Aspirin" ref={nameInputRef} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="frequency">Times per Day</Label>
              <Input id="frequency" type="number" min="1" placeholder="e.g., 2" ref={frequencyInputRef} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="nextDoseTime">Next Dose Time</Label>
              <Input id="nextDoseTime" type="time" ref={nextDoseTimeRef} />
            </div>
          </div>
           <Button type="submit" className="w-full">
            <PlusCircle />
            Add Medication
          </Button>
          {medications.length > 0 && (
            <div className="space-y-2 pt-4">
              <h3 className="text-sm font-medium">Your Medications</h3>
              <ul className="space-y-2">
                {medications.map((med, index) => (
                  <li key={index} className="flex justify-between items-center text-sm bg-muted/50 p-2 rounded-md">
                    <div>
                      <span className="font-medium">{med.name}</span>
                      <span className="text-muted-foreground text-xs block">{med.frequency}</span>
                    </div>
                    <Countdown nextDose={med.nextDose} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </form>
    </Card>
  );
}
