
"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Stethoscope, Search } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { InfoCard } from "./info-card";

export function SymptomChecker() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const query = inputRef.current?.value;
    if (query) {
      setIsLoading(true);
      const url = `https://www.google.com/search?q=Why am I experiencing ${encodeURIComponent(
        query
      )}, what are the recovery options, and is it dangerous if ignored?`;
      window.open(url, "_blank");
      setIsLoading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <InfoCard
      icon={Stethoscope}
      title="Symptom Checker 🩺"
      description="Enter symptoms to search for causes and treatments on Google."
      cardClassName="flex flex-col"
    >
      <form onSubmit={handleSearch} className="flex flex-col flex-1">
        <div className="flex-1">
          <Textarea
            placeholder="e.g., 'Headache and fatigue'"
            rows={3}
            ref={inputRef}
            disabled={isLoading}
            className="h-full"
          />
        </div>
        <div className="mt-4">
          <Button
            type="submit"
            className="w-full bg-[hsl(var(--chart-3))] hover:bg-[hsl(var(--chart-3)/0.9)] text-white"
            disabled={isLoading}
          >
            <Search />
            {isLoading ? "Analyzing..." : "Analyze"}
          </Button>
        </div>
      </form>
    </InfoCard>
  );
}
