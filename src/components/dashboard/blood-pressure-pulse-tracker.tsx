
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
import { HeartPulse, Save } from "lucide-react";

interface Reading {
  date: string;
  pulseRate: string;
  systolic: string;
  diastolic: string;
}

const MAX_READINGS = 100;
const PREVIEW_COUNT = 5;

export function BloodPressurePulseTracker() {
  const [readings, setReadings] = useState<Reading[]>([]);
  const [showAll, setShowAll] = useState(false);
  const pulseRateRef = useRef<HTMLInputElement>(null);
  const systolicRef = useRef<HTMLInputElement>(null);
  const diastolicRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const savedReadings = localStorage.getItem("bloodPressureReadings");
    if (savedReadings) {
      setReadings(JSON.parse(savedReadings));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bloodPressureReadings", JSON.stringify(readings));
  }, [readings]);

  const handleAddReading = (event: React.FormEvent) => {
    event.preventDefault();
    const pulseRate = pulseRateRef.current?.value;
    const systolic = systolicRef.current?.value;
    const diastolic = diastolicRef.current?.value;

    if (pulseRate || systolic || diastolic) {
      const newReading: Reading = {
        date: new Date().toLocaleString(),
        pulseRate: pulseRate || "N/A",
        systolic: systolic || "N/A",
        diastolic: diastolic || "N/A",
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="pulseRate">Pulse Rate (bpm)</Label>
            <Input
              id="pulseRate"
              type="number"
              placeholder="Normal, 70"
              ref={pulseRateRef}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="systolic">Systolic BP (mmHg)</Label>
            <Input
              id="systolic"
              type="number"
              placeholder="Normal, 120"
              ref={systolicRef}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="diastolic">Diastolic BP (mmHg)</Label>
            <Input
              id="diastolic"
              type="number"
              placeholder="Normal, 80"
              ref={diastolicRef}
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
                <TableHead>Pulse Rate</TableHead>
                <TableHead>Systolic BP</TableHead>
                <TableHead>Diastolic BP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedReadings.map((reading, index) => (
                <TableRow key={index}>
                  <TableCell>{reading.date}</TableCell>
                  <TableCell>{reading.pulseRate}</TableCell>
                  <TableCell>{reading.systolic}</TableCell>
                  <TableCell>{reading.diastolic}</TableCell>
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
