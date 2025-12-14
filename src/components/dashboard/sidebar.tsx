
'use client';

import React from 'react';
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
  X,
  User,
  FilePenLine,
  UtensilsCrossed,
  Dumbbell,
  ShieldAlert,
  Link as LinkIcon,
  Info,
  GlassWater,
} from 'lucide-react';
import Link from 'next/link';
import { useSidebar } from '../ui/sidebar';


const menuItems = [
  {
    href: '/#health-trends',
    label: 'Health Trends',
    icon: LineChart,
  },
   {
    href: '/hydration',
    label: 'Hydration Tracker',
    icon: GlassWater,
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
    href: '/diet-chart',
    label: 'Diet Chart',
    icon: UtensilsCrossed,
  },
  {
    href: '/exercises',
    label: 'Exercise Log',
    icon: Dumbbell,
  },
  {
    href: '/doctors',
    label: 'Doctors',
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
];

const bottomMenuItems = [
    {
        href: '/notes',
        label: 'Notes',
        icon: FilePenLine
    },
    {
        href: '/about',
        label: 'App Info',
        icon: Info
    }
]

export function DashboardSidebar() {
  const { setOpen } = useSidebar();
  return (
        <nav className="mt-8 flex flex-col gap-1 h-full">
            <div className="flex-grow">
              <Link href="/emergency-card" onClick={() => setOpen(false)}>
                <Button variant="default" className="w-full justify-start gap-2 mb-2 bg-accent text-accent-foreground hover:bg-accent/90">
                  <ShieldAlert />
                  Emergency Card
                </Button>
              </Link>
              <Link href="/skin-scanner" onClick={() => setOpen(false)}>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Camera />
                  Skin Photo Log
                </Button>
              </Link>
              <Link href="/connect-devices" onClick={() => setOpen(false)}>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <LinkIcon />
                  Connect Devices
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
            </div>
             <div className="mt-auto pt-4 border-t border-sidebar-border">
                {bottomMenuItems.map((item) => (
                     <Link key={item.label} href={item.href} onClick={() => setOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <item.icon />
                            {item.label}
                        </Button>
                    </Link>
                ))}
            </div>
        </nav>
  );
}
