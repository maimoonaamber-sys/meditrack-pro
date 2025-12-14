
'use client';

import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface Medication {
  name: string;
  nextDose: number;
}

interface WaterLogEntry {
    amount: number; // in ml
    timestamp: number;
}

const TWO_HOURS_MS = 2 * 60 * 60 * 1000;
const CHECK_INTERVAL_MS = 60 * 1000; // 1 minute

export function NotificationManager() {
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const checkNotifications = () => {
      // 1. Medication Reminders
      const savedMedications = localStorage.getItem('medications');
      const notifiedMedsKey = 'notifiedMeds';
      
      if (savedMedications) {
        const medications: Medication[] = JSON.parse(savedMedications);
        const notifiedMeds: string[] = JSON.parse(localStorage.getItem(notifiedMedsKey) || '[]');
        const now = Date.now();

        medications.forEach(med => {
          if (now >= med.nextDose && !notifiedMeds.includes(med.name)) {
            toast({
              title: 'Medication Reminder 💊',
              description: `It's time to take your ${med.name}.`,
              duration: 30000,
            });
            const updatedNotified = [...notifiedMeds, med.name];
            localStorage.setItem(notifiedMedsKey, JSON.stringify(updatedNotified));
          }
        });
      }

      // 2. Post-Meal Reminders
      const lastMealTimeStr = localStorage.getItem('lastMealTime');
      const notifiedPostMealKey = 'notifiedPostMeal';
      if (lastMealTimeStr) {
        const lastMealTime = parseInt(lastMealTimeStr, 10);
        const notifiedPostMeal = localStorage.getItem(notifiedPostMealKey) === 'true';
        
        if (Date.now() > lastMealTime + TWO_HOURS_MS && !notifiedPostMeal) {
           toast({
              title: 'After-Meal Check-in 🩺',
              description: "It's time to log your after-meal blood pressure and blood sugar levels.",
              duration: 30000,
              action: <button onClick={() => router.push('/#diabetes-tracker')} className="px-3 py-1 rounded-md bg-white text-black text-sm">Log Now</button>
            });
            localStorage.setItem(notifiedPostMealKey, 'true');
        }
      }

      // 3. Hydration Reminders
      const lastHydrationNotification = localStorage.getItem('lastHydrationNotification');
      const now = new Date();
      // Only remind between 9 AM and 9 PM
      if (now.getHours() >= 9 && now.getHours() <= 21) {
        if (!lastHydrationNotification || (Date.now() - parseInt(lastHydrationNotification, 10)) > TWO_HOURS_MS) {
            const savedLog = localStorage.getItem('waterLog');
            const log: WaterLogEntry[] = savedLog ? JSON.parse(savedLog) : [];
            const today = new Date().setHours(0, 0, 0, 0);
            const totalIntakeToday = log
                .filter(entry => entry.timestamp >= today)
                .reduce((total, entry) => total + entry.amount, 0);
            
            if (totalIntakeToday < 2000) { // Arbitrary goal, can be improved
                 toast({
                    title: 'Stay Hydrated! 💧',
                    description: "Don't forget to drink some water to reach your daily goal.",
                    duration: 20000,
                    action: <button onClick={() => router.push('/hydration')} className="px-3 py-1 rounded-md bg-white text-black text-sm">Log Water</button>
                });
                localStorage.setItem('lastHydrationNotification', Date.now().toString());
            }
        }
      }
    };

    // Reset daily notifications at midnight
    const resetDailyNotifications = () => {
        const now = new Date();
        if (now.getHours() === 0 && now.getMinutes() < 5) { // Reset in the first 5 mins of the day
            localStorage.removeItem('notifiedMeds');
            localStorage.removeItem('notifiedPostMeal');
        }
    }

    const intervalId = setInterval(() => {
        checkNotifications();
        resetDailyNotifications();
    }, CHECK_INTERVAL_MS);

    // Initial check
    checkNotifications();

    return () => clearInterval(intervalId);
  }, [toast, router]);

  return null; // This component does not render anything
}
