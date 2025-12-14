
import { Droplets, HeartPulse, ClipboardPlus, Contact, LineChart, BrainCircuit } from "lucide-react";
import { Alerts } from "./alerts";
import { BloodPressurePulseTracker } from "./blood-pressure-pulse-tracker";
import { CurrentMedications } from "./current-medications";
import { DiabetesTracker } from "./diabetes-tracker";
import { GreetingCard } from "./greeting-card";
import { InfoCard } from "./info-card";
import { NotificationManager } from "./notification-manager";
import { RiskScore } from "./risk-score";
import { Button } from "../ui/button";
import Link from "next/link";
import { HealthTrends } from "./health-trends";
import { MentalHealthQuestionnaire } from "./mental-health-questionnaire";

export function HealthDashboard() {
  return (
    <>
      <NotificationManager />
      <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 grid auto-rows-max items-start gap-4 md:gap-8">
          <GreetingCard />
          <Alerts />
          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard
              icon={Droplets}
              title="Diabetes Monitor"
              description="Track your before and after meal blood sugar."
              cardClassName="bg-[hsl(var(--card-pink-bg))]"
            >
              <DiabetesTracker />
            </InfoCard>
            <InfoCard
              icon={HeartPulse}
              title="Vitals"
              description="Monitor your blood pressure and pulse rate."
              cardClassName="bg-[hsl(var(--card-skyblue-bg))]"
            >
              <BloodPressurePulseTracker />
            </InfoCard>
          </div>
           <InfoCard
              icon={ClipboardPlus}
              title="Current Medications"
              description="Add your prescriptions and get reminders."
              cardClassName="bg-[hsl(var(--card-cream-bg))]"
            >
              <CurrentMedications />
            </InfoCard>
             <InfoCard
                icon={Contact}
                title="My Doctor"
                description="Manage your doctor's details and appointments."
                cardClassName="bg-blue-100 dark:bg-blue-900/50"
                titleClassName="text-blue-900 dark:text-blue-200"
                descriptionClassName="text-blue-800/90 dark:text-blue-300/90"
                iconClassName="bg-blue-500/20 text-blue-700 dark:text-blue-300"
             >
                <div className="text-center">
                    <p className="mb-4 text-blue-900/90 dark:text-blue-300/90">View and manage your doctor's contact information and visit history.</p>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Link href="/doctors">Manage Doctors</Link>
                    </Button>
                </div>
             </InfoCard>
             <InfoCard
              icon={LineChart}
              title="Health Trends 📈"
              description="Visualize your blood pressure over time to spot trends."
            >
              <HealthTrends />
            </InfoCard>
        </div>
        <div className="lg:col-span-1 grid auto-rows-max items-start gap-4 md:gap-8">
          <RiskScore />
          <InfoCard
            icon={BrainCircuit}
            title="Mental Health Check-in 🧠"
            description="Take a moment to reflect on your emotional well-being."
            cardClassName="bg-purple-100 dark:bg-purple-900/50"
          >
            <MentalHealthQuestionnaire />
          </InfoCard>
        </div>
      </div>
    </>
  );
}
