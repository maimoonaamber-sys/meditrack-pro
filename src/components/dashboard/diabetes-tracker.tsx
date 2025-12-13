
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
import { Droplets, Save } from "lucide-react";

interface Reading {
  date: string;
  beforeMeal: string;
  afterMeal: string;
}

export function DiabetesTracker() {
  const [readings, setReadings] = useState<Reading[]>([]);
  const beforeMealRef = useRef<HTMLInputElement>(null);
  const afterMealRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const savedReadings = localStorage.getItem('diabetesReadings');
    if (savedReadings) {
      setReadings(JSON.parse(savedReadings));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('diabetesReadings', JSON.stringify(readings));
  }, [readings]);


  const handleAddReading = (event: React.FormEvent) => {
    event.preventDefault();
    const beforeMeal = beforeMealRef.current?.value;
    const afterMeal = afterMealRef.current?.value;

    if (beforeMeal || afterMeal) {
      const newReading: Reading = {
        date: new Date().toLocaleDateString(),
        beforeMeal: beforeMeal || "N/A",
        afterMeal: afterMeal || "N/A",
      };
      setReadings([newReading, ...readings]);
      formRef.current?.reset();
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Droplets className="h-6 w-6" />
          <div className="flex-1">
            <CardTitle className="font-headline text-lg">Diabetes Tracker</CardTitle>
            <CardDescription>
              Log your blood sugar readings before and after meals.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddReading} ref={formRef} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="beforeMeal">Before Meal (mg/dL)</Label>
              <Input id="beforeMeal" type="number" placeholder="e.g., 90" ref={beforeMealRef} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="afterMeal">After Meal (mg/dL)</Label>
              <Input id="afterMeal" type="number" placeholder="e.g., 140" ref={afterMealRef} />
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
                  <TableHead>Before Meal</TableHead>
                  <TableHead>After Meal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {readings.map((reading, index) => (
                  <TableRow key={index}>
                    <TableCell>{reading.date}</TableCell>
                    <TableCell>{reading.beforeMeal}</TableCell>
                    <TableCell>{reading.afterMeal}</TableCell>
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
