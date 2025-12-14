
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
import { InfoCard } from "./info-card";

export function HealthDashboard() {

  return (
    <>
      <NotificationManager />
      <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 grid auto-rows-max items-start gap-4 md:gap-8">
          <GreetingCard />
          <Alerts />
          <InfoCard
            icon={MentalHealthQuestionnaire}
            title="Mental Health Check-in 🧠"
            description="Regularly assessing your mental health is an important part of your
        overall well-being."
          >
            <MentalHealthQuestionnaire />
          </InfoCard>
          <div id="blood-pressure-pulse-tracker">
            <InfoCard
              icon={BloodPressurePulseTracker}
              title="Vitals 🩺"
              description="Log your daily pulse and blood pressure readings."
            >
              <BloodPressurePulseTracker />
            </InfoCard>
          </div>
          <div id="diabetes-tracker">
             <InfoCard
              icon={DiabetesTracker}
              title="Diabetes Monitor 🩸"
              description="Log your blood sugar readings before and after meals."
            >
              <DiabetesTracker />
            </InfoCard>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <div id="sickness-history">
              <InfoCard
                icon={SicknessHistory}
                title="Sickness History 📜"
                description="Log your past illnesses and treatments."
              >
                <SicknessHistory />
              </InfoCard>
            </div>
            <div id="lab-reports">
              <InfoCard
                icon={LabReports}
                title="Lab Reports 📄"
                description="Upload and review key test results"
              >
                <LabReports />
              </InfoCard>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1 grid auto-rows-max items-start gap-4 md:gap-8">
          <div id="current-medications">
            <InfoCard
              icon={CurrentMedications}
              title="Current Medications 💊"
              description="Add your daily medications to get AI-powered safety analysis."
            >
              <CurrentMedications />
            </InfoCard>
          </div>
          <RiskScore />
        </div>
      </div>
    </>
  );
}
