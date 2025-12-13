import Image from "next/image";
import { Alerts } from "./alerts";
import { HealthTrends } from "./health-trends";
import { LabReports } from "./lab-reports";
import { MedicineInfo } from "./medicine-info";
import { RiskScore } from "./risk-score";
import { SicknessHistory } from "./sickness-history";
import { SymptomChecker } from "./symptom-checker";

export function HealthDashboard() {
  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
      <div className="lg:col-span-3 mb-4">
        <Image
          src="https://picsum.photos/seed/cartoon/1200/300"
          alt="Lively cartoon"
          width={1200}
          height={300}
          className="rounded-lg object-cover w-full"
          data-ai-hint="lively cartoon"
        />
      </div>
      <div className="lg:col-span-2 grid auto-rows-max items-start gap-4 md:gap-8">
        <Alerts />
        <HealthTrends />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          <SicknessHistory />
          <LabReports />
        </div>
      </div>
      <div className="lg:col-span-1 grid auto-rows-max items-start gap-4 md:gap-8">
        <MedicineInfo />
        <SymptomChecker />
        <RiskScore />
      </div>
    </div>
  );
}
