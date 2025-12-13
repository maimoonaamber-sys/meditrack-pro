
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { HeartPulse, Save } from "lucide-react";

interface Reading {
  date: string;
  pulseRate: string;
  systolic: string;
  diastolic: string;
}

export function BloodPressurePulseTracker() {
  const [readings, setReadings] = useState<Reading[]>([]);
  const pulseRateRef = useRef<HTMLInputElement>(null);
  const systolicRef = useRef<HTMLInputElement>(null);
  const diastolicRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const savedReadings = localStorage.getItem('bloodPressureReadings');
    if (savedReadings) {
      setReadings(JSON.parse(savedReadings));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bloodPressureReadings', JSON.stringify(readings));
  }, [readings]);


  const handleAddReading = (event: React.FormEvent) => {
    event.preventDefault();
    const pulseRate = pulseRateRef.current?.value;
    const systolic = systolicRef.current?.value;
    const diastolic = diastolicRef.current?.value;

    if (pulseRate || systolic || diastolic) {
      const newReading: Reading = {
        date: new Date().toLocaleDateString(),
        pulseRate: pulseRate || "N/A",
        systolic: systolic || "N/A",
        diastolic: diastolic || "N/A",
      };
      setReadings([newReading, ...readings]);
      formRef.current?.reset();
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <HeartPulse className="h-6 w-6" />
          <div className="flex-1">
            <CardTitle className="font-headline text-lg">Blood Pressure & Pulse Tracker</CardTitle>
            <CardDescription>
              Log your daily pulse and blood pressure readings.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddReading} ref={formRef} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="pulseRate">Pulse Rate (bpm)</Label>
              <Input id="pulseRate" type="number" placeholder="e.g., 72" ref={pulseRateRef} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="systolic">Systolic BP (mmHg)</Label>
              <Input id="systolic" type="number" placeholder="e.g., 120" ref={systolicRef} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="diastolic">Diastolic BP (mmHg)</Label>
              <Input id="diastolic" type="number" placeholder="e.g., 80" ref={diastolicRef} />
            </div>
          </div>
          <Button type="submit" className="w-full">
            <Save />
            Save Reading
          </Button>
        </form>
        {readings.length > 0 && (
          <div className="pt-6">
            <h3 className="text-sm font-medium mb-2">Your Readings</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Pulse Rate</TableHead>
                  <TableHead>Systolic BP</TableHead>
                  <TableHead>Diastolic BP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {readings.map((reading, index) => (
                  <TableRow key={index}>
                    <TableCell>{reading.date}</TableCell>
                    <TableCell>{reading.pulseRate}</TableCell>
                    <TableCell>{reading.systolic}</TableCell>
                    <TableCell>{reading.diastolic}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
