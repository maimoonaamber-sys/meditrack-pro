
"use client";

import { useEffect, useState } from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Hand } from "lucide-react";

export function GreetingCard() {
  const [name, setName] = useState<string>('');
  const [greeting, setGreeting] = useState<string>('');

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setName(profile.name);
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

  return (
    <Card className="bg-primary/5 border-primary/20">
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
