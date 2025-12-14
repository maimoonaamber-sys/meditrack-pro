
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Activity, Footprints, Heart, Bed, GlassWater, Flame, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { format } from 'date-fns';

interface DailyActivity {
  steps?: number;
  heartRate?: number;
  sleep?: number;
  water?: number;
  calories?: number;
}

const ActivityInput = ({ icon: Icon, label, unit, value, onChange }: { icon: React.ElementType, label: string, unit: string, value: number | undefined, onChange: (val: number) => void }) => (
    <div className="space-y-1.5">
        <Label className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-primary"/>
            {label} <span className="text-xs text-muted-foreground">({unit})</span>
        </Label>
        <Input 
            type="number" 
            placeholder={`e.g., ${label === 'Steps Walked' ? '10000' : '75'}`}
            value={value || ''}
            onChange={(e) => onChange(parseInt(e.target.value, 10) || 0)}
        />
    </div>
);


export default function TodaysActivityPage() {
  const [activity, setActivity] = useState<DailyActivity>({});
  const { toast } = useToast();
  const today = format(new Date(), 'yyyy-MM-dd');
  const storageKey = `dailyActivity-${today}`;

  useEffect(() => {
    const savedActivity = localStorage.getItem(storageKey);
    if (savedActivity) {
      setActivity(JSON.parse(savedActivity));
    }
  }, [storageKey]);

  const handleSave = () => {
    localStorage.setItem(storageKey, JSON.stringify(activity));
    toast({
        title: "Activity Saved! 🎉",
        description: "Your activities for today have been saved."
    });
  }

  const handleActivityChange = (field: keyof DailyActivity, value: number) => {
    setActivity(prev => ({...prev, [field]: value}));
  }

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

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                    <Activity className="h-6 w-6" />
                    <div className="flex-1">
                        <CardTitle className="font-headline text-lg">Today's Activity 💪</CardTitle>
                        <CardDescription>Log your key health and fitness metrics for today, {format(new Date(), 'MMMM d')}.</CardDescription>
                    </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ActivityInput icon={Footprints} label="Steps Walked" unit="steps" value={activity.steps} onChange={(val) => handleActivityChange('steps', val)} />
                        <ActivityInput icon={Heart} label="Heart Rate" unit="avg bpm" value={activity.heartRate} onChange={(val) => handleActivityChange('heartRate', val)} />
                        <ActivityInput icon={Bed} label="Time Slept" unit="hours" value={activity.sleep} onChange={(val) => handleActivityChange('sleep', val)} />
                        <ActivityInput icon={GlassWater} label="Water Intake" unit="ml" value={activity.water} onChange={(val) => handleActivityG/File[src/components/dashboard/sidebar.tsx] is being modified
Change('water', val)} />
                        <ActivityInput icon={Flame} label="Calories Burned" unit="kcal" value={activity.calories} onChange={(val) => handleActivityChange('calories', val)} />
                   </div>
                   <Button onClick={handleSave} className="w-full">
                       <Save className="mr-2" /> Save Today's Activity
                   </Button>
                </CardContent>
            </Card>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
