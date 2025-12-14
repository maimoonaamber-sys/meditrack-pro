
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, UtensilsCrossed, PlusCircle, Trash2 } from 'lucide-react';
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

interface DietEntry {
  id: string;
  date: string; // ISO string
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  foodItems: string;
}

export default function DietChartPage() {
  const [entries, setEntries] = useState<DietEntry[]>([]);
  const [mealType, setMealType] = useState<'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'>('Breakfast');
  const foodItemsRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedEntries = localStorage.getItem('dietChartEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dietChartEntries', JSON.stringify(entries));
  }, [entries]);

  const handleAddEntry = (event: React.FormEvent) => {
    event.preventDefault();
    const foodItems = foodItemsRef.current?.value;

    if (foodItems && mealType) {
      const newEntry: DietEntry = {
        id: new Date().toISOString() + Math.random(),
        date: new Date().toISOString(),
        mealType,
        foodItems,
      };

      setEntries(prevEntries => [...prevEntries, newEntry].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      
      toast({
        title: 'Meal Added',
        description: `${mealType} has been added to your diet chart.`,
      });

      formRef.current?.reset();
      if(foodItemsRef.current) foodItemsRef.current.value = "";

    } else {
       toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please select a meal type and list food items.',
      });
    }
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
    toast({
      title: 'Entry Removed',
      description: 'The meal entry has been removed from your chart.',
    });
  };

  const groupedEntries = entries.reduce((acc, entry) => {
    const date = format(new Date(entry.date), 'yyyy-MM-dd');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(entry);
    return acc;
  }, {} as Record<string, DietEntry[]>);


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
                  <UtensilsCrossed className="h-6 w-6" />
                  <div className="flex-1">
                    <CardTitle className="font-headline text-lg">Diet Chart</CardTitle>
                    <CardDescription>Log your daily meals to keep track of your diet.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddEntry} ref={formRef} className="space-y-4 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="space-y-1.5">
                            <Label>Meal Type</Label>
                            <Select onValueChange={(value) => setMealType(value as any)} defaultValue="Breakfast">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a meal type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Breakfast">Breakfast</SelectItem>
                                    <SelectItem value="Lunch">Lunch</SelectItem>
                                    <SelectItem value="Dinner">Dinner</SelectItem>
                                    <SelectItem value="Snack">Snack</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1.5 md:col-span-2">
                             <Label htmlFor="foodItems">Food Items</Label>
                             <Textarea id="foodItems" placeholder="e.g., Oatmeal, berries, nuts" ref={foodItemsRef} />
                        </div>
                    </div>
                     <Button type="submit" className="w-full">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Meal
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
                                                <p className="font-medium">{entry.mealType} <span className="text-xs text-muted-foreground">({format(new Date(entry.date), 'p')})</span></p>
                                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{entry.foodItems}</p>
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
                     <p className="text-center text-sm text-muted-foreground mt-6">No meals logged yet. Use the form above to add your first meal.</p>
                )}
              </CardContent>
            </Card>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
