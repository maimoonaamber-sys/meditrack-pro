
"use client";

import { useEffect, useState } from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Hand } from "lucide-react";

export function GreetingCard() {
  const [name, setName] = useState<string | null>(null);
  const [greeting, setGreeting] = useState<string | null>(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setName(profile.name);
    } else {
      setName(''); // Set to empty string if no profile to avoid null
    }

    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const getSummary = () => {
    // This could be dynamic later
    return "You have 2 medications due soon and your daily hydration goal is 75% complete. Keep it up!";
  }

  if (greeting === null || name === null) {
    return (
       <Card className="bg-[hsl(var(--chart-4))] text-primary-foreground">
        <CardHeader>
          <div className="space-y-2">
             <div className="w-3/4 h-6 bg-primary-foreground/20 rounded-md animate-pulse"></div>
             <div className="w-full h-4 bg-primary-foreground/20 rounded-md animate-pulse"></div>
          </div>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="bg-[hsl(var(--chart-4))] text-primary-foreground">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="bg-primary-foreground/10 text-primary-foreground p-3 rounded-full">
             <Hand className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <CardTitle className="font-headline text-xl">
              {greeting}, {name || 'there'}!
            </CardTitle>
            <CardDescription className="text-primary-foreground/80">
              {getSummary()}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
