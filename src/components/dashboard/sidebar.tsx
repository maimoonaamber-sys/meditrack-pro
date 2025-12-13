
'use client';

import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  Pill,
  LineChart,
  History,
  FileText,
  Stethoscope,
  ClipboardPlus,
  Droplets,
  HeartPulse,
  Camera,
  CalendarDays,
  Contact,
  Menu,
} from 'lucide-react';
import Link from 'next/link';

const menuItems = [
  {
    href: '/#health-trends',
    label: 'Health Trends',
    icon: LineChart,
  },
  {
    href: '/#blood-pressure-pulse-tracker',
    label: 'BP & Pulse',
    icon: HeartPulse,
  },
  {
    href: '/#diabetes-tracker',
    label: 'Diabetes Tracker',
    icon: Droplets,
  },
  {
    href: '/#current-medications',
    label: 'Current Medications',
    icon: ClipboardPlus,
  },
  {
    href: '/#doctor-visits',
    label: 'Doctor Visits',
    icon: CalendarDays,
  },
  {
    href: '/#doctor-contacts',
    label: 'Doctor Contacts',
    icon: Contact,
  },
  {
    href: '/#sickness-history',
    label: 'Sickness History',
    icon: History,
  },
  {
    href: '/#lab-reports',
    label: 'Lab Reports',
    icon: FileText,
  },
  {
    href: '/#medicine-info',
    label: 'Medicine Assistant',
    icon: Pill,
  },
  {
    href: '/#symptom-checker',
    label: 'Symptom Checker',
    icon: Stethoscope,
  },
];

export function DashboardSidebar() {
  const [open, setOpen] = React.useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[300px]">
        <SheetHeader>
          <div className="flex items-center gap-2">
            <Pill className="h-6 w-6 text-primary" />
            <SheetTitle className="text-xl font-bold font-headline text-foreground">
              MediTrack Pro
            </SheetTitle>
          </div>
        </SheetHeader>
        <nav className="mt-8 flex flex-col gap-1">
          <Link href="/skin-scanner" onClick={() => setOpen(false)}>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Camera />
              Skin Photo Log
            </Button>
          </Link>
          {menuItems.map((item) => (
            <Link key={item.label} href={item.href} onClick={() => setOpen(false)}>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <item.icon />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
