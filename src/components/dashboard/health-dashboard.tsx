
import { Alerts } from "./alerts";
import { RiskScore } from "./risk-score";
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
        </div>
        <div className="lg:col-span-1 grid auto-rows-max items-start gap-4 md:gap-8">
          <RiskScore />
        </div>
      </div>
    </>
  );
}
