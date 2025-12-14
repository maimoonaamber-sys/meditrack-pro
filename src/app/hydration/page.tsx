
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Activity, Footprints, Heart, Bed, GlassWater, Flame, Zap, Moon, Droplet } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

interface DailyActivityReport {
  activityName: string;
  steps: number;
  avgHeartRate: number;
  peakHeartRate: number;
  sleepDuration: string;
  sleepQuality: 'Good' | 'Fair' | 'Poor';
  waterIntake: number; // in Liters
  caloriesBurned: number;
  insight: string;
}

const StatCard = ({ icon: Icon, label, value, unit, iconBgColor }: { icon: React.ElementType, label: string, value: string | number, unit?: string, iconBgColor?: string }) => (
    <div className="flex items-center gap-3 bg-muted/50 p-3 rounded-lg">
        <div className={`p-2 rounded-full ${iconBgColor || 'bg-primary/10'}`}>
            <Icon className="h-5 w-5 text-primary" />
        </div>
        <div>
            <p className="font-bold text-lg">{value} <span className="text-sm font-normal text-muted-foreground">{unit}</span></p>
            <p className="text-xs text-muted-foreground">{label}</p>
        </div>
    </div>
);


export default function AutomatedActivityReportPage() {
  const [report, setReport] = useState<DailyActivityReport | null>(null);

  useEffect(() => {
    // Simulate fetching and processing sensor data on the client
    const generateReport = () => {
      const randomSeed = (new Date().getDate() % 5) + 1; // Changes daily
      
      const steps = 6000 + Math.floor(Math.random() * 8000 * (randomSeed/3));
      const avgHeartRate = 65 + Math.floor(Math.random() * 15);
      const peakHeartRate = avgHeartRate + 30 + Math.floor(Math.random() * 20);
      const sleepHours = 6 + Math.random() * 2.5;
      const sleepQuality = sleepHours > 7.5 ? 'Good' : sleepHours > 6 ? 'Fair' : 'Poor';
      const waterIntake = 1.5 + Math.random() * 1.5;
      const caloriesBurned = Math.floor(steps * 0.04 + (avgHeartRate - 60) * 10);
      
      let activityName = "Light Activity Day";
      let insight = "Looks like a pretty standard day. Keep up the consistent effort!";
      if (steps > 12000) {
        activityName = "Very Active Day";
        insight = "Fantastic step count! You've been very active today. Make sure to rehydrate and rest well.";
      } else if (steps > 8000) {
        activityName = "Active Day";
        insight = "Great job staying active! Your heart rate was healthy and stable. Keep it up!";
      } else if (steps < 4000) {
         activityName = "Rest Day";
         insight = "A good day for recovery. Remember to stretch and drink plenty of water even on rest days."
      }

      if (sleepQuality === 'Poor') {
          insight += " Your sleep seemed a bit short. Try to wind down earlier tonight for better recovery."
      }


      setReport({
        activityName,
        steps,
        avgHeartRate,
        peakHeartRate,
        sleepDuration: `${Math.floor(sleepHours)}h ${Math.floor((sleepHours % 1) * 60)}m`,
        sleepQuality,
        waterIntake: parseFloat(waterIntake.toFixed(1)),
        caloriesBurned,
        insight,
      });
    };
    
    // Use a timeout to simulate the async nature of sensor data processing
    const timer = setTimeout(generateReport, 500);
    return () => clearTimeout(timer);

  }, []);

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
                            <CardTitle className="font-headline text-lg">Today's Activity Report 📈</CardTitle>
                            <CardDescription>An automated summary of your health signals for {format(new Date(), 'MMMM d')}.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    {report ? (
                        <>
                            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-center">
                                <h3 className="font-headline text-xl text-primary">{report.activityName}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{report.insight}</p>
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                <StatCard icon={Footprints} label="Steps Walked" value={report.steps.toLocaleString()} unit="steps" iconBgColor="bg-blue-500/10" />
                                <StatCard icon={Heart} label="Avg. Heart Rate" value={report.avgHeartRate} unit="bpm" iconBgColor="bg-red-500/10" />
                                <StatCard icon={Zap} label="Peak Heart Rate" value={report.peakHeartRate} unit="bpm" iconBgColor="bg-yellow-500/10" />
                                <StatCard icon={Moon} label="Time Slept" value={report.sleepDuration} unit={report.sleepQuality} iconBgColor="bg-indigo-500/10" />
                                <StatCard icon={Droplet} label="Water Intake" value={report.waterIntake} unit="liters" iconBgColor="bg-sky-500/10" />
                                <StatCard icon={Flame} label="Calories Burned" value={report.caloriesBurned} unit="kcal" iconBgColor="bg-orange-500/10" />
                            </div>
                        </>
                    ) : (
                        <>
                           <div className="bg-muted/50 rounded-lg p-4 text-center h-24 flex items-center justify-center">
                               <Skeleton className="h-4 w-3/4" />
                           </div>
                           <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                <Skeleton className="h-20 w-full" />
                                <Skeleton className="h-20 w-full" />
                                <Skeleton className="h-20 w-full" />
                                <Skeleton className="h-20 w-full" />
                                <Skeleton className="h-20 w-full" />
                                <Skeleton className="h-20 w-full" />
                           </div>
                        </>
                    )}
                </CardContent>
            </Card>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
