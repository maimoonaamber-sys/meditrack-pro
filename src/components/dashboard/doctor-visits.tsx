
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarDays, PlusCircle } from "lucide-react";
import { format, formatDistanceToNow } from 'date-fns';


interface Visit {
  doctorName: string;
  visitDate: string; // Store as ISO string
}

export function DoctorVisits() {
  const [visits, setVisits] = useState<Visit[]>([]);
  const nameRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const savedVisits = localStorage.getItem('doctorVisits');
    if (savedVisits) {
      setVisits(JSON.parse(savedVisits));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('doctorVisits', JSON.stringify(visits));
  }, [visits]);

  const handleAddVisit = (event: React.FormEvent) => {
    event.preventDefault();
    const doctorName = nameRef.current?.value;
    const visitDate = dateRef.current?.value;

    if (doctorName && visitDate) {
      const newVisit = { doctorName, visitDate: new Date(visitDate).toISOString() };
      setVisits(prevVisits => [...prevVisits, newVisit].sort((a,b) => new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime()));
      formRef.current?.reset();
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <CalendarDays className="h-6 w-6" />
          <div className="flex-1">
            <CardTitle className="font-headline text-lg">Doctor Visits</CardTitle>
            <CardDescription>
              Log and get reminders for your doctor appointments.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddVisit} ref={formRef} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="doctorNameVisit">Doctor/Hospital Name</Label>
              <Input id="doctorNameVisit" placeholder="e.g., City Clinic" ref={nameRef} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="visitDate">Date of Visit</Label>
              <Input id="visitDate" type="date" ref={dateRef} />
            </div>
          </div>
          <Button type="submit" className="w-full">
            <PlusCircle />
            Add Visit
          </Button>
        </form>
        {visits.length > 0 && (
          <div className="space-y-2 pt-4">
            <h3 className="text-sm font-medium">Recent Visits</h3>
            <ul className="space-y-2">
              {visits.map((visit, index) => (
                <li key={index} className="flex justify-between items-center text-sm bg-muted/50 p-2 rounded-md">
                  <div>
                    <span className="font-medium">{visit.doctorName}</span>
                    <span className="text-muted-foreground text-xs block">{format(new Date(visit.visitDate), 'MMMM d, yyyy')}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{formatDistanceToNow(new Date(visit.visitDate), { addSuffix: true })}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
