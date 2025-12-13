import { Alerts } from "./alerts";
import { HealthTrends } from "./health-trends";
import { LabReports } from "./lab-reports";
import { MedicineInfo } from "./medicine-info";
import { RiskScore } from "./risk-score";
import { SicknessHistory } from "./sickness-history";
import { SymptomChecker } from "./symptom-checker";
import { CurrentMedications } from "./current-medications";
import { DiabetesTracker } from "./diabetes-tracker";
import { BloodPressurePulseTracker } from "./blood-pressure-pulse-tracker";

export function HealthDashboard() {
  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 grid auto-rows-max items-start gap-4 md:gap-8">
        <Alerts />
        <div id="health-trends">
          <HealthTrends />
        </div>
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
        <div id="medicine-info">
          <MedicineInfo />
        </div>
        <div id="symptom-checker">
          <SymptomChecker />
        </div>
        <RiskScore />
      </div>
    </div>
  );
}
