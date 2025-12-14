
import { Alerts } from "./alerts";
import { LabReports } from "./lab-reports";
import { RiskScore } from "./risk-score";
import { SicknessHistory } from "./sickness-history";
import { CurrentMedications } from "./current-medications";
import { DiabetesTracker } from "./diabetes-tracker";
import { BloodPressurePulseTracker } from "./blood-pressure-pulse-tracker";
import { GreetingCard } from "./greeting-card";
import { NotificationManager } from "./notification-manager";
import { InfoCard } from "./info-card";
import { MentalHealthQuestionnaire } from "./mental-health-questionnaire";
import { HealthTrends } from "./health-trends";

export function HealthDashboard() {
  return (
    <>
      <NotificationManager />
      <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 grid auto-rows-max items-start gap-4 md:gap-8">
          <GreetingCard />
          <Alerts />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
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
