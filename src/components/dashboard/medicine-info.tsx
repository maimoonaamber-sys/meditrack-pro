
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
import { Pill, Search } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { InfoCard } from "./info-card";

export function MedicineInfo() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const query = inputRef.current?.value;
    if (query) {
      setIsLoading(true);
      const url = `https://www.google.com/search?q=Medication ${encodeURIComponent(
        query
      )}: uses, why it is prescribed, side effects, and overdose information`;
      window.open(url, "_blank");
      setIsLoading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <InfoCard
      icon={Pill}
      title="Medicine Information 💊"
      description="Enter a medicine name to search for its uses and side effects."
      cardClassName="flex flex-col"
    >
      <form onSubmit={handleSearch} className="flex flex-col flex-1">
        <div className="flex-1">
          <Textarea
            placeholder="e.g., 'Aspirin'"
            rows={3}
            ref={inputRef}
            disabled={isLoading}
            className="h-full"
          />
        </div>
        <div className="mt-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            <Search />
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </div>
      </form>
    </InfoCard>
  );
}
