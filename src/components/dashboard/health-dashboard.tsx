
import { Droplets, HeartPulse, ClipboardPlus, Contact } from "lucide-react";
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
                cardClassName="bg-[hsl(var(--card-darkgrey-bg))] text-white"
                titleClassName="text-white"
                descriptionClassName="text-white/80"
                iconClassName="bg-white/20 text-white"
             >
                <div className="text-center">
                    <p className="mb-4">View and manage your doctor's contact information and visit history.</p>
                    <Button asChild variant="secondary">
                        <Link href="/doctors">Manage Doctors</Link>
                    </Button>
                </div>
             </InfoCard>
        </div>
        <div className="lg:col-span-1 grid auto-rows-max items-start gap-4 md:gap-8">
          <RiskScore />
        </div>
      </div>
    </>
  );
}
