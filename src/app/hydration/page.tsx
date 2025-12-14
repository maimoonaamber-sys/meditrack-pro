
'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, GlassWater, Plus, Minus, Trophy, Sparkles, BrainCircuit, AlertTriangle, Droplets, History, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface ProfileData {
    weight?: number;
    gender?: 'Male' | 'Female' | 'Other' | '';
    activityLevel?: 'Sedentary' | 'Light' | 'Moderate' | 'Active' | 'Very Active' | '';
}

interface WaterLogEntry {
    amount: number; // in ml
    timestamp: number;
}

const getOrdinal = (n: number) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export default function HydrationPage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [waterLog, setWaterLog] = useState<WaterLogEntry[]>([]);
  const [dailyGoal, setDailyGoal] = useState(2500); // Default goal in ml
  const { toast } = useToast();

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
        const parsedProfile = JSON.parse(savedProfile);
        setProfile(parsedProfile);
        // Simple goal calculation placeholder
        let goal = 2500;
        if (parsedProfile.activityLevel === 'Active' || parsedProfile.activityLevel === 'Very Active') {
            goal += 500;
        }
        if (parsedProfile.gender === 'Male') {
            goal += 200;
        }
        setDailyGoal(goal);
    }
    
    const savedLog = localStorage.getItem('waterLog');
    if (savedLog) {
        setWaterLog(JSON.parse(savedLog));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('waterLog', JSON.stringify(waterLog));
  }, [waterLog]);
  
  const totalIntakeToday = useMemo(() => {
    const today = new Date().setHours(0, 0, 0, 0);
    return waterLog
      .filter(entry => entry.timestamp >= today)
      .reduce((total, entry) => total + entry.amount, 0);
  }, [waterLog]);

  const progressPercentage = useMemo(() => (totalIntakeToday / dailyGoal) * 100, [totalIntakeToday, dailyGoal]);

  const addWater = (amount: number) => {
    const newEntry: WaterLogEntry = { amount, timestamp: Date.now() };
    setWaterLog(prevLog => [...prevLog, newEntry]);
    toast({
        title: "Water Logged!",
        description: `${amount} ml added to your daily intake.`
    });
  };

  const removeLastEntry = () => {
    if (waterLog.length === 0) return;
    const lastEntry = waterLog[waterLog.length - 1];
    setWaterLog(prevLog => prevLog.slice(0, -1));
     toast({
        title: "Entry Removed",
        description: `Removed the last entry of ${lastEntry.amount} ml.`
    });
  }

  // Placeholder data for streaks and correlations
  const streak = 3; 

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

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Left Column */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                            <GlassWater className="h-6 w-6" />
                            <div className="flex-1">
                                <CardTitle className="font-headline text-lg">Hydration Tracker</CardTitle>
                                <CardDescription>Log your daily water intake to stay hydrated.</CardDescription>
                            </div>
                            </div>
                        </CardHeader>
                        <CardContent className="text-center space-y-4">
                            <div className="text-5xl font-bold font-headline text-primary">{totalIntakeToday.toLocaleString()} <span className="text-xl text-muted-foreground">/ {dailyGoal.toLocaleString()} ml</span></div>
                            <Progress value={progressPercentage} className="h-4" />
                            <div className="grid grid-cols-3 gap-2 pt-4">
                                <Button onClick={() => addWater(250)} variant="outline">
                                    <Plus className="mr-2" /> 250ml
                                </Button>
                                <Button onClick={() => addWater(500)} variant="outline">
                                    <Plus className="mr-2" /> 500ml
                                </Button>
                                <Button onClick={() => addWater(750)} variant="outline">
                                    <Plus className="mr-2" /> 750ml
                                </Button>
                            </div>
                             <Button onClick={removeLastEntry} variant="destructive" className="w-full" disabled={waterLog.length === 0}>
                                <Minus className="mr-2" /> Remove Last Entry
                            </Button>
                        </CardContent>
                    </Card>

                     <Card>
                        <CardHeader>
                             <div className="flex items-center gap-3">
                                <Trophy className="h-6 w-6" />
                                <div className="flex-1">
                                    <CardTitle className="font-headline text-lg">Streaks & Achievements</CardTitle>
                                    <CardDescription>Stay motivated with your progress.</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex items-center justify-around text-center">
                            <div>
                                <p className="text-4xl font-bold font-headline">{streak}</p>
                                <p className="text-sm text-muted-foreground">Day Streak</p>
                            </div>
                             <div>
                                <p className="text-4xl font-bold font-headline">🏆</p>
                                <p className="text-sm text-muted-foreground">First Goal Badge</p>
                            </div>
                             <div>
                                <p className="text-4xl font-bold font-headline">💧</p>
                                <p className="text-sm text-muted-foreground">Hydration Pro</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                
                {/* Right Column */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <BrainCircuit className="h-6 w-6 text-primary" />
                                <div className="flex-1">
                                    <CardTitle className="font-headline text-lg">AI Hydration Insights</CardTitle>
                                    <CardDescription>Personalized analysis and recommendations.</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <Alert variant="destructive">
                                <AlertTriangle className="h-5 w-5"/>
                                <AlertTitle>Disclaimer</AlertTitle>
                                <AlertDescription>
                                    This is not medical advice. Consult a healthcare professional for any health concerns. AI analysis feature coming soon.
                                </AlertDescription>
                            </Alert>
                             <div className="p-4 bg-muted/50 rounded-lg text-center">
                                <Sparkles className="h-8 w-8 text-muted-foreground mx-auto mb-2"/>
                                <p className="text-sm text-muted-foreground">Your personalized hydration insights will appear here once enough data is collected.</p>
                             </div>
                             <div className="p-4 bg-muted/50 rounded-lg text-center">
                                <p className="text-sm font-semibold">Dehydration Risk</p>
                                <p className="text-2xl font-bold font-headline text-primary">Low</p>
                                <p className="text-xs text-muted-foreground">Based on your current intake and activity.</p>
                             </div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-lg">Hydration Correlation</CardTitle>
                            <CardDescription>How hydration affects your well-being.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center gap-3">
                                <Droplets className="h-5 w-5 text-primary"/>
                                <p className="text-sm">On days you met your hydration goal, you reported <span className="font-bold">75% fewer headaches</span>.</p>
                            </div>
                             <div className="flex items-center gap-3">
                                <Activity className="h-5 w-5 text-primary"/>
                                <p className="text-sm">You reported feeling <span className="font-bold">more energetic</span> on days with optimal hydration.</p>
                            </div>
                              <div className="flex items-center gap-3">
                                <History className="h-5 w-5 text-primary"/>
                                <p className="text-sm">No correlation found with medication side effects yet. Keep logging!</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

