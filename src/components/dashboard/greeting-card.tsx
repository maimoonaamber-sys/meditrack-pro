
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

    const setGreetingBasedOnTime = () => {
      const hour = new Date().getHours();
      if (hour < 12) setGreeting('Good Morning');
      else if (hour < 18) setGreeting('Good Afternoon');
      else setGreeting('Good Evening');
    };

    // Defer the greeting generation to client-side only after mount
    setGreetingBasedOnTime();
  }, []);

  const getSummary = () => {
    // This could be dynamic later
    return "You have 2 medications due soon and your daily hydration goal is 75% complete. Keep it up!";
  }

  // Render a skeleton/placeholder while waiting for client-side state
  if (greeting === null || name === null) {
    return (
       <Card>
        <CardHeader>
          <div className="space-y-2">
             <div className="w-3/4 h-6 bg-muted rounded-md animate-pulse"></div>
             <div className="w-full h-4 bg-muted rounded-md animate-pulse"></div>
          </div>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 text-primary p-3 rounded-full">
             <Hand className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <CardTitle className="font-headline text-xl">
              {greeting}, {name || 'there'}!
            </CardTitle>
            <CardDescription>
              {getSummary()}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
