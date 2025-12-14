
"use client";

import { useState, useRef, useEffect, useMemo } from "react";
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
import {
  ClipboardPlus,
  PlusCircle,
  AlertTriangle,
  Sparkles,
  LoaderCircle,
  Info,
  WheatOff,
  Hand,
  Check,
  ChevronsUpDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  analyzeMedications,
  type MedicationAnalysis,
} from "@/ai/flows/medication-analysis-flow";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { medications as medicationList } from "@/lib/medication-list";
import { cn } from "@/lib/utils";

interface Medication {
  name: string;
  frequency: string; // e.g., "2 time(s) a day"
  nextDose: number; // timestamp
}


function Countdown({ nextDose }: { nextDose: number }) {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    // This function will only run on the client
    const calculateTimeLeft = () => nextDose - Date.now();

    // Set initial value on mount
    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      if (newTimeLeft <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
      } else {
        setTimeLeft(newTimeLeft);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [nextDose]);

  // Don't render on the server or until timeLeft is calculated
  if (timeLeft === null) {
    return null;
  }

  if (timeLeft <= 0) {
    return <Badge variant="destructive">Time for dose!</Badge>;
  }

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <span className="text-sm font-mono text-muted-foreground">
      {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
      {String(seconds).padStart(2, "0")}
    </span>
  );
}

function MedicationCombobox({ value, setValue }: { value: string, setValue: (value: string) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? medicationList.find((med) => med.toLowerCase() === value.toLowerCase()) || value
            : "Select medicine..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput 
            placeholder="Search for a medicine..."
            onValueChange={(search) => setValue(search)}
           />
          <CommandEmpty>No medicine found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {medicationList
                .filter(med => med.toLowerCase().startsWith(value.toLowerCase()))
                .slice(0, 10)
                .map((med) => (
                <CommandItem
                  key={med}
                  value={med}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.toLowerCase() === med.toLowerCase() ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {med}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function CurrentMedications() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [medicationName, setMedicationName] = useState("");
  const frequencyInputRef = useRef<HTMLInputElement>(null);
  const nextDoseTimeRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [analysis, setAnalysis] = useState<MedicationAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedMedications = localStorage.getItem("medications");
    if (savedMedications) {
      setMedications(JSON.parse(savedMedications));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("medications", JSON.stringify(medications));
    if (medications.length > 0) {
      handleAnalyzeMedications();
    } else {
      setAnalysis(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [medications]);

  const handleAnalyzeMedications = async () => {
    setIsLoading(true);
    const medNames = medications.map((m) => m.name);
    try {
      const result = await analyzeMedications(medNames);
      setAnalysis(result);
    } catch (error) {
      console.error("Failed to analyze medications:", error);
      setAnalysis(null);
    }
    setIsLoading(false);
  };

  const handleAddMedication = (event: React.FormEvent) => {
    event.preventDefault();
    const name = medicationName;
    const frequency = frequencyInputRef.current?.value;
    const nextDoseTime = nextDoseTimeRef.current?.value; // e.g., "14:30"

    if (name && frequency && nextDoseTime) {
      const [hours, minutes] = nextDoseTime.split(":").map(Number);
      const nextDoseDate = new Date();
      nextDoseDate.setHours(hours, minutes, 0, 0);

      // If the time is in the past for today, set it for tomorrow
      if (nextDoseDate.getTime() < Date.now()) {
        nextDoseDate.setDate(nextDoseDate.getDate() + 1);
      }

      setMedications((prevMeds) => {
        const existingMed = prevMeds.find(
          (m) => m.name.toLowerCase() === name.toLowerCase()
        );
        if (existingMed) return prevMeds; // Avoid duplicates
        return [
          ...prevMeds,
          {
            name,
            frequency: `${frequency} time(s) a day`,
            nextDose: nextDoseDate.getTime(),
          },
        ];
      });
      formRef.current?.reset();
      setMedicationName("");
    }
  };

  const handleMarkAsTaken = (medName: string) => {
    setMedications(prevMeds => {
      return prevMeds.map(med => {
        if (med.name === medName) {
          const timesPerDay = parseInt(med.frequency, 10) || 1;
          if (timesPerDay > 0) {
            const intervalMs = (24 / timesPerDay) * 60 * 60 * 1000;
            const newNextDose = Date.now() + intervalMs;
            return { ...med, nextDose: newNextDose };
          }
        }
        return med;
      });
    });
  };

  return (
      <form onSubmit={handleAddMedication} ref={formRef}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="medicationName">Medicine Name</Label>
              <MedicationCombobox value={medicationName} setValue={setMedicationName} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="frequency">Times per Day</Label>
              <Input
                id="frequency"
                type="number"
                min="1"
                placeholder="e.g., 2"
                ref={frequencyInputRef}
              />
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
              <h3 className="text-sm font-medium">Your Medications 📝</h3>
              <ul className="space-y-2">
                {medications.map((med, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center text-sm bg-muted/50 p-2 rounded-md"
                  >
                    <div>
                      <span className="font-medium">{med.name}</span>
                      <span className="text-muted-foreground text-xs block">
                        {med.frequency}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Countdown nextDose={med.nextDose} />
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-green-500" onClick={() => handleMarkAsTaken(med.name)}>
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(isLoading || analysis) && (
            <div className="pt-4 space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <Sparkles className="h-5 w-5" />
                <h3 className="text-md font-semibold font-headline">AI Analysis ✨</h3>
              </div>

              <Alert variant="destructive" className="flex items-start">
                <AlertTriangle className="h-5 w-5 mt-0.5" />
                <div className="ml-4">
                  <AlertTitle>Important Disclaimer ⚠️</AlertTitle>
                  <AlertDescription>
                    This AI-powered analysis is for informational purposes only and is
                    not a substitute for professional medical advice. Always consult
                    your doctor or pharmacist.
                  </AlertDescription>
                </div>
              </Alert>

              {isLoading && (
                <div className="flex items-center justify-center gap-2 text-muted-foreground py-4">
                  <LoaderCircle className="animate-spin h-5 w-5" />
                  <span>Analyzing your medications...</span>
                </div>
              )}

              {analysis && !isLoading && (
                <div className="space-y-4 animate-fade-in-up">
                  {analysis.interactionWarning && (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-5 w-5" />
                      <AlertTitle className="ml-2 font-headline">
                        Potential Interaction Warning! 💥
                      </AlertTitle>
                      <AlertDescription className="ml-2 mt-2">
                        {analysis.interactionWarning}
                      </AlertDescription>
                    </Alert>
                  )}

                  <Accordion type="single" collapsible className="w-full">
                    {analysis.medications.map((med, index) => (
                      <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="font-medium text-base">
                          {med.name}
                        </AccordionTrigger>
                        <AccordionContent className="space-y-3 pl-2">
                          <div className="flex items-start gap-2">
                            <Hand className="h-4 w-4 mt-1 text-primary shrink-0" />
                            <div>
                              <h4 className="font-semibold">Side Effects 🥴</h4>
                              <p className="text-sm text-muted-foreground">
                                {med.sideEffects}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <WheatOff className="h-4 w-4 mt-1 text-primary shrink-0" />
                            <div>
                              <h4 className="font-semibold">Food Restrictions 🥑</h4>
                              <p className="text-sm text-muted-foreground">
                                {med.foodRestrictions}
                              </p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}
            </div>
          )}
        </div>
      </form>
  );
}
