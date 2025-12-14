
import { Alerts } from "./alerts";
import { HealthTrends } from "./health-trends";
import { LabReports } from "./lab-reports";
import { RiskScore } from "./risk-score";
import { SicknessHistory } from "./sickness-history";
import { CurrentMedications } from "./current-medications";
import { DiabetesTracker } from "./diabetes-tracker";
import { BloodPressurePulseTracker } from "./blood-pressure-pulse-tracker";
import { SymptomChecker } from "./symptom-checker";
import { MedicineInfo } from "./medicine-info";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { MessageCircle } from "lucide-react";
import { MentalHealthQuestionnaire } from "./mental-health-questionnaire";
import { GreetingCard } from "./greeting-card";
import { NotificationManager } from "./notification-manager";

export function HealthDashboard() {
  return (
    <>
      <NotificationManager />
      <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 grid auto-rows-max items-start gap-4 md:gap-8">
          <GreetingCard />
          <Alerts />
          <div className="grid gap-4 md:grid-cols-2">
            <SymptomChecker />
            <MedicineInfo />
          </div>
          <div id="health-trends">
            <HealthTrends />
          </div>
          <MentalHealthQuestionnaire />
          <div id="blood-pressure-pulse-tracker">
            <BloodPressurePulseTracker />
          </div>
          <div id="diabetes-tracker">
            <DiabetesTracker />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <div id="sickness-history">
              <SicknessHistory />
            </div>
            <div id="lab-reports">
              <LabReports />
            </div>
          </div>
        </div>
        <div className="lg:col-span-1 grid auto-rows-max items-start gap-4 md:gap-8">
          <div id="current-medications">
            <CurrentMedications />
          </div>
          <RiskScore />
        </div>
      </div>
    </>
  );
}
