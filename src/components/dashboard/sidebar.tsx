
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  ShieldAlert,
  Contact,
  ClipboardPlus,
  HeartPulse,
  Droplets,
  Activity,
  Dumbbell,
  UtensilsCrossed,
  LineChart,
  FileText,
  History,
  Camera,
  Layers,
  Link as LinkIcon,
  FilePenLine,
  Info,
} from 'lucide-react';
import Link from 'next/link';
import { useSidebar } from '../ui/sidebar';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const sections: NavSection[] = [
  {
    title: 'Essentials',
    items: [
      { href: '/doctors', label: 'Doctors', icon: Contact },
    ],
  },
  {
    title: 'Health Tracking',
    items: [
      { href: '/hydration', label: 'Today\'s Activity', icon: Activity },
      { href: '/exercises', label: 'Exercise Log', icon: Dumbbell },
      { href: '/diet-chart', label: 'Diet & Nutrition', icon: UtensilsCrossed },
    ],
  },
  {
    title: 'Insights & Records',
    items: [
      { href: '/skin-scanner', label: 'Skin Health Log', icon: Camera },
    ],
  },
  {
    title: 'Tools & Integrations',
    items: [
        { href: '/other-health-data', label: 'Other Health Metrics', icon: Layers },
        { href: '/connect-devices', label: 'Connected Devices', icon: LinkIcon },
    ]
  }
];

const bottomMenuItems: NavItem[] = [
    { href: '/notes', label: 'Notes', icon: FilePenLine },
    { href: '/about', label: 'About Us', icon: Info },
];

const NavGroup: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 mt-4 mb-2">{title}</h3>
        <div className="flex flex-col gap-1">
            {children}
        </div>
    </div>
);


export function DashboardSidebar() {
  const { setOpen } = useSidebar();
  return (
        <nav className="flex flex-col h-full">
           <div className="flex-grow space-y-2 overflow-y-auto -mr-4 pr-4">
              <Link href="/emergency-card" onClick={() => setOpen(false)} className="px-2">
                <Button variant="destructive" className="w-full justify-start gap-2 mb-2">
                  <ShieldAlert />
                  Emergency Card
                </Button>
              </Link>
             <Link href="/" onClick={() => setOpen(false)} className="px-2">
                <Button variant="ghost" className="w-full justify-start gap-2">
                    <ClipboardPlus />
                    Dashboard
                </Button>
            </Link>

             {sections.map((section) => (
                <NavGroup title={section.title} key={section.title}>
                    {section.items.map((item) => (
                         <Button asChild variant="ghost" className="w-full justify-start gap-2" key={item.label} onClick={() => setOpen(false)}>
                            <Link href={item.href}>
                                <item.icon />
                                {item.label}
                            </Link>
                        </Button>
                    ))}
                </NavGroup>
             ))}
            </div>

             <div className="mt-auto pt-4 border-t border-sidebar-border">
                {bottomMenuItems.map((item) => (
                     <Button asChild variant="ghost" className="w-full justify-start gap-2" key={item.label} onClick={() => setOpen(false)}>
                        <Link href={item.href}>
                            <item.icon />
                            {item.label}
                        </Link>
                    </Button>
                ))}
            </div>
        </nav>
  );
}
