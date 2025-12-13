
'use client';

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
} from '@/components/ui/sidebar';
import { Pill, LineChart, History, FileText, Stethoscope, ClipboardPlus, Droplets, HeartPulse } from 'lucide-react';

const menuItems = [
  {
    href: '#health-trends',
    label: 'Health Trends',
    icon: LineChart,
  },
  {
    href: '#blood-pressure-pulse-tracker',
    label: 'BP & Pulse',
    icon: HeartPulse,
  },
  {
    href: '#diabetes-tracker',
    label: 'Diabetes Tracker',
    icon: Droplets,
  },
  {
    href: '#sickness-history',
    label: 'Sickness History',
    icon: History,
  },
  {
    href: '#lab-reports',
    label: 'Lab Reports',
    icon: FileText,
  },
  {
    href: '#current-medications',
    label: 'Current Medications',
    icon: ClipboardPlus,
  },
  {
    href: '#medicine-info',
    label: 'Medicine Assistant',
    icon: Pill,
  },
  {
    href: '#symptom-checker',
    label: 'Symptom Checker',
    icon: Stethoscope,
  },
];

export function DashboardSidebar() {
  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Pill className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold font-headline text-foreground">
            MediTrack Pro
          </h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <a href={item.href}>
                <SidebarMenuButton>
                  <item.icon />
                  {item.label}
                </SidebarMenuButton>
              </a>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
