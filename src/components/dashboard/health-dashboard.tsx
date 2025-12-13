
import { Alerts } from "./alerts";
import { HealthTrends } from "./health-trends";
import { LabReports } from "./lab-reports";
import { RiskScore } from "./risk-score";
import { SicknessHistory } from "./sickness-history";
import { CurrentMedications } from "./current-medications";
import { DiabetesTracker } from "./diabetes-tracker";
import { BloodPressurePulseTracker } from "./blood-pressure-pulse-tracker";
import { DoctorVisits } from "./doctor-visits";
import { DoctorContacts } from "./doctor-contacts";
import { MedipopAssist } from "./medipop-assist";
import { MedipopFab } from "./medipop-fab";

export function HealthDashboard() {
  return (
    <>
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
           <div id="doctor-visits">
              <DoctorVisits />
            </div>
        </div>
        <div className="lg:col-span-1 grid auto-rows-max items-start gap-4 md:gap-8">
          <div id="medipop-assist">
              <MedipopAssist />
          </div>
          <div id="current-medications">
            <CurrentMedications />
          </div>
          <div id="doctor-contacts">
            <DoctorContacts />
          </div>
          <RiskScore />
        </div>
      </div>
      <MedipopFab />
    </>
  );
}
