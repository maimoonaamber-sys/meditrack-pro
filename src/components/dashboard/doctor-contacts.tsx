
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
import { Contact, PlusCircle, X } from "lucide-react";

interface Doctor {
  name: string;
  number: string;
}

export function DoctorContacts() {
  const [doctors, setDoctors] = useState<Doctor[]>([
    { name: "Dr. Smith", number: "123-456-7890" }
  ]);
  const nameRef = useRef<HTMLInputElement>(null);
  const numberRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const savedDoctors = localStorage.getItem('doctorContacts');
    if (savedDoctors) {
      setDoctors(JSON.parse(savedDoctors));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('doctorContacts', JSON.stringify(doctors));
  }, [doctors]);

  const handleAddDoctor = (event: React.FormEvent) => {
    event.preventDefault();
    const name = nameRef.current?.value;
    const number = numberRef.current?.value;

    if (name && number) {
      setDoctors([...doctors, { name, number }]);
      formRef.current?.reset();
    }
  };

  const handleDeleteDoctor = (indexToDelete: number) => {
    setDoctors(doctors.filter((_, index) => index !== indexToDelete));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Contact className="h-6 w-6" />
          <div className="flex-1">
            <CardTitle className="font-headline text-lg">Doctor Contacts</CardTitle>
            <CardDescription>
              Manage your doctors' contact information.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddDoctor} ref={formRef} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="doctorName">Doctor's Name</Label>
              <Input id="doctorName" placeholder="e.g., Dr. Jane Doe" ref={nameRef} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="doctorNumber">Phone Number</Label>
              <Input id="doctorNumber" type="tel" placeholder="e.g., 555-123-4567" ref={numberRef} />
            </div>
          </div>
          <Button type="submit" className="w-full">
            <PlusCircle />
            Add Doctor
          </Button>
        </form>
        {doctors.length > 0 && (
          <div className="space-y-2 pt-4">
            <h3 className="text-sm font-medium">Your Doctors</h3>
            <ul className="space-y-2">
              {doctors.map((doc, index) => (
                <li key={index} className="flex justify-between items-center text-sm bg-muted/50 p-2 rounded-md pl-3">
                  <div>
                    <span className="font-medium">{doc.name}</span>
                    <a href={`tel:${doc.number}`} className="text-sm text-primary hover:underline block">
                      {doc.number}
                    </a>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDeleteDoctor(index)}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">Delete contact</span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
