
"use client";

import { useState, useRef } from "react";
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

interface Medication {
  name: string;
  frequency: string;
}

export function CurrentMedications() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const frequencyInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleAddMedication = (event: React.FormEvent) => {
    event.preventDefault();
    const name = nameInputRef.current?.value;
    const frequency = frequencyInputRef.current?.value;

    if (name && frequency) {
      setMedications([...medications, { name, frequency: `${frequency} time(s) a day` }]);
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="medicationName">Medicine Name</Label>
              <Input id="medicationName" placeholder="e.g., Aspirin" ref={nameInputRef} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="frequency">Times per Day</Label>
              <Input id="frequency" type="number" min="1" placeholder="e.g., 2" ref={frequencyInputRef} />
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
                    <span className="font-medium">{med.name}</span>
                    <span className="text-muted-foreground">{med.frequency}</span>
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
