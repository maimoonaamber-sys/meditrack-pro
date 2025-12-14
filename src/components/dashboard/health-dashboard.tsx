

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
import CuteDoctor from "./cute-doctor";

export function HealthDashboard() {
  return (
    <>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 grid auto-rows-max items-start gap-4 md:gap-8">
          <Alerts />
          <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="w-24">
                      <CuteDoctor />
                    </div>
                    <div className="flex-1">
                        <CardTitle className="font-headline text-lg">Meet Medipop!</CardTitle>
                        <CardDescription>
                            Your personal AI health assistant for quick information. Click the sparkle button in the corner!
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
        </Card>
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

