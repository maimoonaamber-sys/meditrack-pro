
'use client';

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
import { Contact, PlusCircle, X, CalendarDays, ArrowLeft } from "lucide-react";
import { format, formatDistanceToNow } from 'date-fns';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast";
import CuteDoctor from "@/components/dashboard/cute-doctor";

// Interfaces
interface Doctor {
  name: string;
  number: string;
}

interface Visit {
  doctorName: string;
  visitDate: string; // Store as ISO string
}

export default function DoctorsPage() {
  // State for Doctor Contacts
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const contactNameRef = useRef<HTMLInputElement>(null);
  const contactNumberRef = useRef<HTMLInputElement>(null);
  const contactFormRef = useRef<HTMLFormElement>(null);
  
  // State for Doctor Visits
  const [visits, setVisits] = useState<Visit[]>([]);
  const visitNameRef = useRef<HTMLInputElement>(null);
  const visitDateRef = useRef<HTMLInputElement>(null);
  const visitFormRef = useRef<HTMLFormElement>(null);

  const { toast } = useToast();

  // Effects for Doctor Contacts
  useEffect(() => {
    try {
      const savedDoctors = localStorage.getItem('doctorContacts');
      if (savedDoctors) {
        setDoctors(JSON.parse(savedDoctors));
      }
    } catch (e) {
      console.error("Failed to parse doctor contacts from localStorage", e);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('doctorContacts', JSON.stringify(doctors));
  }, [doctors]);

  // Effects for Doctor Visits
  useEffect(() => {
    try {
        const savedVisits = localStorage.getItem('doctorVisits');
        if (savedVisits) {
        setVisits(JSON.parse(savedVisits));
        }
    } catch (e) {
        console.error("Failed to parse doctor visits from localStorage", e);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('doctorVisits', JSON.stringify(visits));
  }, [visits]);

  // Handlers for Doctor Contacts
  const handleAddDoctor = (event: React.FormEvent) => {
    event.preventDefault();
    const name = contactNameRef.current?.value;
    const number = contactNumberRef.current?.value;

    if (name && number) {
      setDoctors([...doctors, { name, number }]);
      contactFormRef.current?.reset();
      toast({ title: "Doctor Added", description: `${name} has been added to your contacts.` });
    }
  };

  const handleDeleteDoctor = (indexToDelete: number) => {
    const doctorName = doctors[indexToDelete].name;
    setDoctors(doctors.filter((_, index) => index !== indexToDelete));
    toast({ title: "Doctor Removed", description: `${doctorName} has been removed.` });
  };

  // Handlers for Doctor Visits
  const handleAddVisit = (event: React.FormEvent) => {
    event.preventDefault();
    const doctorName = visitNameRef.current?.value;
    const visitDate = visitDateRef.current?.value;

    if (doctorName && visitDate) {
      const newVisit = { doctorName, visitDate: new Date(visitDate).toISOString() };
      setVisits(prevVisits => [...prevVisits, newVisit].sort((a,b) => new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime()));
      visitFormRef.current?.reset();
      toast({ title: "Appointment Added", description: `Your visit with ${doctorName} has been logged.`});
    }
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <DashboardSidebar />
      </Sidebar>
      <SidebarInset>
        <div className="flex min-h-screen w-full flex-col">
          <Header />
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 animate-fade-in-up">
            <Link href="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Doctor Contacts Card */}
                <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                    <Contact className="h-6 w-6" />
                    <div className="flex-1">
                        <CardTitle className="font-headline text-lg">Doctor Contacts 📞</CardTitle>
                        <CardDescription>Manage your doctors' contact information.</CardDescription>
                    </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAddDoctor} ref={contactFormRef} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                        <Label htmlFor="doctorName">Doctor's Name</Label>
                        <Input id="doctorName" placeholder="e.g., Dr. Jane Doe" ref={contactNameRef} />
                        </div>
                        <div className="space-y-1.5">
                        <Label htmlFor="doctorNumber">Phone Number</Label>
                        <Input id="doctorNumber" type="tel" placeholder="e.g., 555-123-4567" ref={contactNumberRef} />
                        </div>
                    </div>
                    <Button type="submit" className="w-full">
                        <PlusCircle /> Add Doctor
                    </Button>
                    </form>
                    {doctors.length > 0 && (
                    <div className="space-y-2 pt-4">
                        <h3 className="text-sm font-medium">Your Doctors 👨‍⚕️</h3>
                        <ul className="space-y-2">
                        {doctors.map((doc, index) => (
                            <li key={index} className="flex justify-between items-center text-sm bg-muted/50 p-2 rounded-md pl-3">
                            <div>
                                <span className="font-medium">{doc.name}</span>
                                <a href={`tel:${doc.number}`} className="text-sm text-primary hover:underline block">
                                {doc.number}
                                </a>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDeleteDoctor(index)}>
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

                {/* Doctor Visits Card */}
                <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                    <CalendarDays className="h-6 w-6" />
                    <div className="flex-1">
                        <CardTitle className="font-headline text-lg">Doctor Visits 🗓️</CardTitle>
                        <CardDescription>Log and get reminders for your doctor appointments.</CardDescription>
                    </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAddVisit} ref={visitFormRef} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                        <Label htmlFor="doctorNameVisit">Doctor/Hospital Name</Label>
                        <Input id="doctorNameVisit" placeholder="e.g., City Clinic" ref={visitNameRef} />
                        </div>
                        <div className="space-y-1.5">
                        <Label htmlFor="visitDate">Date of Visit</Label>
                        <Input id="visitDate" type="date" ref={visitDateRef} />
                        </div>
                    </div>
                    <Button type="submit" className="w-full">
                        <PlusCircle /> Add Visit
                    </Button>
                    </form>
                    {visits.length > 0 ? (
                    <div className="space-y-2 pt-4">
                        <h3 className="text-sm font-medium">Recent & Upcoming Visits ✨</h3>
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
                    ) : (
                      <div className="text-center text-sm text-muted-foreground mt-6">
                        <CuteDoctor />
                        <p>No visits logged yet.</p>
                        <p>Use the form above to add your first one.</p>
                      </div>
                    )}
                </CardContent>
                </Card>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
