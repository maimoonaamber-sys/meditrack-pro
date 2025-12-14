
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Dumbbell, PlusCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { format } from 'date-fns';

interface ExerciseEntry {
  id: string;
  date: string; // ISO string
  exerciseType: string;
  duration: number; // in minutes
  notes: string;
}

export default function ExerciseLogPage() {
  const [entries, setEntries] = useState<ExerciseEntry[]>([]);
  const exerciseTypeRef = useRef<HTMLInputElement>(null);
  const durationRef = useRef<HTMLInputElement>(null);
  const notesRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedEntries = localStorage.getItem('exerciseLogEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('exerciseLogEntries', JSON.stringify(entries));
  }, [entries]);

  const handleAddEntry = (event: React.FormEvent) => {
    event.preventDefault();
    const exerciseType = exerciseTypeRef.current?.value;
    const duration = durationRef.current?.value;
    const notes = notesRef.current?.value;

    if (exerciseType && duration) {
      const newEntry: ExerciseEntry = {
        id: new Date().toISOString() + Math.random(),
        date: new Date().toISOString(),
        exerciseType,
        duration: parseInt(duration, 10),
        notes: notes || '',
      };

      setEntries(prevEntries => [...prevEntries, newEntry].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));

      toast({
        title: 'Workout Added',
        description: `${exerciseType} has been added to your exercise log.`,
      });

      formRef.current?.reset();
    } else {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please enter the exercise type and duration.',
      });
    }
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
    toast({
      title: 'Entry Removed',
      description: 'The exercise entry has been removed from your log.',
    });
  };

  const groupedEntries = entries.reduce((acc, entry) => {
    const date = format(new Date(entry.date), 'yyyy-MM-dd');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(entry);
    return acc;
  }, {} as Record<string, ExerciseEntry[]>);

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
                  <Dumbbell className="h-6 w-6" />
                  <div className="flex-1">
                    <CardTitle className="font-headline text-lg">Exercise Log</CardTitle>
                    <CardDescription>Log your daily workouts and physical activity.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddEntry} ref={formRef} className="space-y-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="exerciseType">Exercise Type</Label>
                      <Input id="exerciseType" ref={exerciseTypeRef} placeholder="e.g., Brisk Walking" required />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="duration">Duration (minutes)</Label>
                      <Input id="duration" type="number" ref={durationRef} placeholder="e.g., 30" required />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea id="notes" ref={notesRef} placeholder="e.g., Felt energetic, beautiful weather." />
                  </div>
                  <Button type="submit" className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Workout
                  </Button>
                </form>

                {Object.keys(groupedEntries).length > 0 ? (
                  <div className="space-y-6">
                    {Object.entries(groupedEntries).map(([date, dateEntries]) => (
                      <div key={date}>
                        <h3 className="text-lg font-semibold font-headline mb-3 border-b pb-2">{format(new Date(date), 'MMMM d, yyyy')}</h3>
                        <div className="space-y-3">
                          {dateEntries.map((entry) => (
                            <div key={entry.id} className="flex justify-between items-start bg-muted/50 p-3 rounded-md">
                              <div>
                                <p className="font-medium">{entry.exerciseType} - <span className="font-normal">{entry.duration} mins</span></p>
                                {entry.notes && <p className="text-sm text-muted-foreground whitespace-pre-wrap mt-1">{entry.notes}</p>}
                                <p className="text-xs text-muted-foreground mt-1">Logged at: {format(new Date(entry.date), 'p')}</p>
                              </div>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive shrink-0" onClick={() => handleDeleteEntry(entry.id)}>
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete entry</span>
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-sm text-muted-foreground mt-6">
                    <p>No workouts logged yet.</p>
                    <p>Use the form above to add your first one.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
