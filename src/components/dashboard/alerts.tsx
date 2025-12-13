import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Alerts() {
  return (
    <Card className="border-accent/50 bg-accent/10">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium font-headline text-accent-foreground/90">
          Health Alerts
        </CardTitle>
        <AlertTriangle className="h-5 w-5 text-accent" />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-accent-foreground/80 mb-4">
          Your recent symptoms and medication overlap may indicate a moderate health risk. We recommend consulting a doctor.
        </p>
        <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">Consult a Doctor</Button>
      </CardContent>
    </Card>
  );
}
