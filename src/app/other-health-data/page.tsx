
'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Layers, PlusCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { format } from 'date-fns';

type MetricType = 'alcohol' | 'blood_alcohol' | 'blood_glucose' | 'inhaler' | 'insulin' | 'falls' | 'sexual_activity' | 'toothbrushing' | 'uv_index' | 'water_temp';

interface HealthMetric {
  id: string;
  type: MetricType;
  value: string;
  unit: string;
  notes?: string;
  date: string; // ISO string
}

const metricOptions: { value: MetricType; label: string; unit: string, inputType?: string }[] = [
    { value: 'alcohol', label: 'Alcohol Consumption', unit: 'std drinks', inputType: 'number' },
    { value: 'blood_alcohol', label: 'Blood Alcohol Content', unit: '%', inputType: 'number' },
    { value: 'blood_glucose', label: 'Blood Glucose', unit: 'mg/dL', inputType: 'number' },
    { value: 'inhaler', label: 'Inhaler Usage', unit: 'puffs', inputType: 'number' },
    { value: 'insulin', label: 'Insulin Delivery', unit: 'units', inputType: 'number' },
    { value: 'falls', label: 'Number of Times Fallen', unit: 'falls', inputType: 'number' },
    { value: 'sexual_activity', label: 'Sexual Activity', unit: 'count', inputType: 'number' },
    { value: 'toothbrushing', label: 'Toothbrushing', unit: 'times', inputType: 'number' },
    { value: 'uv_index', label: 'UV Index', unit: 'index', inputType: 'number' },
    { value: 'water_temp', label: 'Water Temperature', unit: '°C', inputType: 'number' },
];

export default function OtherHealthDataPage() {
  const [entries, setEntries] = useState<HealthMetric[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('alcohol');
  const valueRef = useRef<HTMLInputElement>(null);
  const notesRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedEntries = localStorage.getItem('otherHealthDataEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('otherHealthDataEntries', JSON.stringify(entries));
  }, [entries]);

  const currentMetric = useMemo(() => metricOptions.find(m => m.value === selectedMetric)!, [selectedMetric]);

  const handleAddEntry = (event: React.FormEvent) => {
    event.preventDefault();
    const value = valueRef.current?.value;
    const notes = notesRef.current?.value;

    if (value && selectedMetric) {
      const newEntry: HealthMetric = {
        id: new Date().toISOString() + Math.random(),
        type: selectedMetric,
        value,
        unit: currentMetric.unit,
        notes,
        date: new Date().toISOString(),
      };

      setEntries(prevEntries => [...prevEntries, newEntry].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      
      toast({
        title: 'Metric Logged',
        description: `${currentMetric.label} has been added to your log.`,
      });

      formRef.current?.reset();
      if(notesRef.current) notesRef.current.value = "";

    } else {
       toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please select a metric and enter a value.',
      });
    }
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
    toast({
      title: 'Entry Removed',
      description: 'The entry has been removed from your log.',
    });
  };

  const groupedEntries = entries.reduce((acc, entry) => {
    const date = format(new Date(entry.date), 'yyyy-MM-dd');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(entry);
    return acc;
  }, {} as Record<string, HealthMetric[]>);

  const getMetricLabel = (type: MetricType) => {
    return metricOptions.find(m => m.value === type)?.label || 'Metric';
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
                  <Layers className="h-6 w-6" />
                  <div className="flex-1">
                    <CardTitle className="font-headline text-lg">Other Health Data</CardTitle>
                    <CardDescription>Log additional health metrics to get a more complete picture of your well-being.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddEntry} ref={formRef} className="space-y-4 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label>Metric Type</Label>
                            <Select onValueChange={(value) => setSelectedMetric(value as any)} defaultValue={selectedMetric}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a metric" />
                                </SelectTrigger>
                                <SelectContent>
                                    {metricOptions.map(opt => (
                                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1.5">
                             <Label htmlFor="metricValue">Value ({currentMetric.unit})</Label>
                             <Input id="metricValue" type={currentMetric.inputType || 'text'} placeholder="e.g., 2" ref={valueRef} required />
                        </div>
                        <div className="space-y-1.5 md:col-span-2">
                            <Label htmlFor="metricNotes">Notes (Optional)</Label>
                            <Textarea id="metricNotes" placeholder="e.g., After dinner" ref={notesRef} />
                        </div>
                    </div>
                     <Button type="submit" className="w-full">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Log Metric
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
                                                <p className="font-medium">{getMetricLabel(entry.type)}: <span className="font-bold">{entry.value}</span> {entry.unit}</p>
                                                {entry.notes && <p className="text-sm text-muted-foreground italic">"{entry.notes}"</p>}
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
                ): (
                    <div className="text-center text-sm text-muted-foreground mt-6">
                        <p>No data logged yet.</p>
                        <p>Use the form above to add your first entry.</p>
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
