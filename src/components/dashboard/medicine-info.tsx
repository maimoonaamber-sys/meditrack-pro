"use client";

import { useRef } from "react";
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
import { Pill, Search } from "lucide-react";

export function MedicineInfo() {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const medicineName = inputRef.current?.value;
    if (medicineName) {
      const query = `${medicineName} uses`;
      const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      window.open(url, "_blank");
      formRef.current?.reset();
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Pill className="h-6 w-6" />
          <div className="flex-1">
            <CardTitle className="font-headline text-lg">Medicine Assistant</CardTitle>
            <CardDescription>
              Get information on any medicine.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <form onSubmit={handleSearch} ref={formRef}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="medicineName">Medicine Name</Label>
              <Input
                id="medicineName"
                name="medicineName"
                placeholder="e.g., Paracetamol"
                ref={inputRef}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex">
          <Button type="submit" className="w-full">
            <Search />
            Get Info
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
