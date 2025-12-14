
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Droplets, Save } from "lucide-react";

interface Reading {
  date: string;
  beforeMeal: string;
  afterMeal: string;
}

const MAX_READINGS = 100;
const PREVIEW_COUNT = 5;

export function DiabetesTracker() {
  const [readings, setReadings] = useState<Reading[]>([]);
  const [showAll, setShowAll] = useState(false);
  const beforeMealRef = useRef<HTMLInputElement>(null);
  const afterMealRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const savedReadings = localStorage.getItem("diabetesReadings");
    if (savedReadings) {
      setReadings(JSON.parse(savedReadings));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("diabetesReadings", JSON.stringify(readings));
  }, [readings]);

  const handleAddReading = (event: React.FormEvent) => {
    event.preventDefault();
    const beforeMeal = beforeMealRef.current?.value;
    const afterMeal = afterMealRef.current?.value;

    if (beforeMeal || afterMeal) {
      const newReading: Reading = {
        date: new Date().toLocaleString(),
        beforeMeal: beforeMeal || "N/A",
        afterMeal: afterMeal || "N/A",
      };
      setReadings(
        (prevReadings) =>
          [newReading, ...prevReadings].slice(0, MAX_READINGS)
      );
      formRef.current?.reset();
    }
  };

  const displayedReadings = showAll ? readings : readings.slice(0, PREVIEW_COUNT);

  return (
    <>
      <form onSubmit={handleAddReading} ref={formRef} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="beforeMeal">Before Meal (mg/dL)</Label>
            <Input
              id="beforeMeal"
              type="number"
              placeholder="Normal"
              ref={beforeMealRef}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="afterMeal">After Meal (mg/dL)</Label>
            <Input
              id="afterMeal"
              type="number"
              placeholder="Normal"
              ref={afterMealRef}
            />
          </div>
        </div>
        <Button
          type="submit"
          className="w-full"
        >
          <Save />
          Save Reading
        </Button>
      </form>
      {readings.length > 0 && (
        <div className="pt-6">
          <h3 className="text-sm font-medium mb-2">Your Readings 📜</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Before Meal</TableHead>
                <TableHead>After Meal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedReadings.map((reading, index) => (
                <TableRow key={index}>
                  <TableCell>{reading.date}</TableCell>
                  <TableCell>{reading.beforeMeal}</TableCell>
                  <TableCell>{reading.afterMeal}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {readings.length > PREVIEW_COUNT && (
            <div className="text-center mt-4">
              <Button variant="link" onClick={() => setShowAll(!showAll)}>
                {showAll ? "Show Less" : "Show All"}
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
